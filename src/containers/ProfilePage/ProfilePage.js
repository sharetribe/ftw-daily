import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureCurrentUser, ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  ListingCard,
  Reviews,
  ButtonTabNavHorizontal,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';

import css from './ProfilePage.module.css';

const MAX_MOBILE_SCREEN_WIDTH = 768;

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    };

    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);
  }

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  render() {
    const {
      scrollingDisabled,
      currentUser,
      user,
      userShowError,
      queryListingsError,
      listings,
      reviews,
      queryReviewsError,
      viewport,
      intl,
    } = this.props;
    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUser(user);
    const isCurrentUser =
      ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser.attributes.profile.displayName;
    const bio = profileUser.attributes.profile.bio;
    const { pets } = profileUser?.attributes?.profile?.publicData || {};
    const hasBio = !!bio;
    const hasListings = listings.length > 0;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

    const editLinkMobile = isCurrentUser ? (
      <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
      </NamedLink>
    ) : null;
    const editLinkDesktop = isCurrentUser ? (
      <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
      </NamedLink>
    ) : null;

    const asideContent = (
      <div className={css.asideContent}>
        <AvatarLarge className={css.avatar} user={user} disableProfileLink />
        <h1 className={css.mobileHeading}>
          {displayName ? (
            <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
          ) : null}
        </h1>
        {editLinkMobile}
        {editLinkDesktop}
      </div>
    );

    const listingsContainerClasses = classNames(css.listingsContainer, {
      [css.withBioMissingAbove]: !hasBio,
    });

    const reviewsError = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
      </p>
    );

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    const mobileReviews = (
      <div className={css.mobileReviews}>
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfProviderTitle"
            values={{ count: reviewsOfProvider.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfProvider} />
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfCustomerTitle"
            values={{ count: reviewsOfCustomer.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfCustomer} />
      </div>
    );

    const desktopReviewTabs = [
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfProviderTitle"
              values={{ count: reviewsOfProvider.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER,
        onClick: this.showOfProviderReviews,
      },
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfCustomerTitle"
              values={{ count: reviewsOfCustomer.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
        onClick: this.showOfCustomerReviews,
      },
    ];

    const desktopReviews = (
      <div className={css.desktopReviews}>
        <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

        {queryReviewsError ? reviewsError : null}

        {this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
          <Reviews reviews={reviewsOfProvider} />
        ) : (
          <Reviews reviews={reviewsOfCustomer} />
        )}
      </div>
    );

    const mainContent = (
      <div>
        <h1 className={css.desktopHeading}>
          <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
        </h1>
        {hasBio ? <p className={css.bio}>{bio}</p> : null}
        <div className={css.petWrapper}>
          {pets?.map((e, index) => (
            <div className={css.petsInformation}>
              <h2 className={css.mainHeading}>
                <FormattedMessage id={`Pet ${index + 1}`} />
              </h2>
              <h3 className={css.mainHeading}>Pet Details</h3>
              <div>
                <img src={e.idPetImage?.link} alt="" width='200px' height='200px' />
              </div>
              <div className={css.dataBox}>
                <h4 className={css.HeadingName}>Description of pet</h4>
                <div className={css.petsData}>{e.pet_des}</div>
              </div>
              <div className={css.threeRowBox}>

                <div className={css.dataBox}>
                  <h4 className={css.HeadingName}>Pet Name</h4>
                  <div className={css.petsData}>{e.pet_name}</div>
                </div>
                <div className={css.dataBox}>
                  <h4 className={css.HeadingName}>Type of Pet</h4>
                  <div className={css.petsData}>{e.typeOfPet}</div>
                </div>
              </div>
              <div className={css.threeRowBox}>
                <div className={css.dataBox}>
                  <h4 className={css.HeadingName}>Weight</h4>
                  <div className={css.petsData}>{e.Weight}</div>
                </div>
                <div className={css.dataBox}>
                  <h4 className={css.HeadingName}>Age (Months)</h4>
                  <div className={css.petsData}>{e.pet_month}</div>
                </div>
                <div className={css.dataBox}>
                  <h4 className={css.HeadingName}>Age (Year)</h4>
                  <div className={css.petsData}>{e.pet_year}</div>
                </div>
              </div>
              <div>
                <h4 className={css.HeadingName}>Breed</h4>
                <div className={css.petsData}>{e.pet_breed}</div>
              </div>
              <h3 className={css.mainHeading}>Additional Details</h3>
              <div className={css.threeRowBox}>
                <div className={css.dataBox}>
                  <h4 className={css.HeadingName}>Pet microchipped?</h4>
                  {e.microchipped === "microchipped_no" ?
                    <div className={css.petsData}>NO</div> :
                    <div className={css.petsData}>Yes</div>
                  }
                </div>
                <div>
                  <h4 className={css.HeadingName}> Is your Pet desexed? </h4>
                  {e.desexed === "desexed_no" ?
                    <div className={css.petsData}>NO</div> :
                    <div className={css.petsData}>Yes</div>}
                </div>
                <div>
                  <h4 className={css.HeadingName}>Pet house trained? </h4>
                  {e.house_trained === "trained_yes" ? (
                    <div className={css.petsData}>Yes</div>
                  ) : e.house_trained === "trained_no" ? (
                    <div className={css.petsData}>No</div>
                  ) : e.house_trained === "trained_Unsure" ? (
                    <div className={css.petsData}>Unsure</div>
                  ) : e.house_trained === "trained_Depends" ? (
                    <div className={css.petsData}>Depends</div>
                  ) : null}
                </div>
              </div>
              <div className={css.threeRowBox}>
                <div>
                  <h4 className={css.HeadingName}>Friendly with children?</h4>
                  {e.children_pet
                    === "children_yes" ? (
                    <div className={css.petsData}>Yes</div>
                  ) : e.children_pet
                    === "children_no" ? (
                    <div className={css.petsData}>No</div>
                  ) : e.children_pet
                    === "children_Unsure" ? (
                    <div className={css.petsData}>Unsure</div>
                  ) : e.children_pet
                    === "children_Depends" ? (
                    <div className={css.petsData}>Depends</div>
                  ) : null}
                </div>
                <div>
                  <h4 className={css.HeadingName}>Friendly with other Pets? </h4>
                  {e.other_pet
                    === "other_yes" ? (
                    <div className={css.petsData}>Yes</div>
                  ) : e.other_pet
                    === "other_no" ? (
                    <div className={css.petsData}>No</div>
                  ) : e.other_pet
                    === "other_Unsure" ? (
                    <div className={css.petsData}>Unsure</div>
                  ) : e.other_pet
                    === "other_Depends" ? (
                    <div className={css.petsData}>Depends</div>
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className={css.HeadingName}>About  Pet</h3>
                <div className={css.petsData}>{e.about_pet}</div>
              </div>
              <h3>Care info</h3>
              <h3>Provide your Pet Host with instructions for walking, feeding and other care</h3>
              <div className={css.threeRowBox}>
                <div>
                  <h4 className={css.HeadingName}>Potty break schedule</h4>
                  {e.Potty_break
                    === "every_hour" ? (
                    <div className={css.petsData}>Every hour</div>
                  ) : e.Potty_break
                    === "two_hr" ? (
                    <div className={css.petsData}>2 Hours</div>
                  ) : e.Potty_break
                    === "four_hr" ? (
                    <div className={css.petsData}>4 Hours</div>
                  ) : e.Potty_break
                    === "eight_hr" ? (
                    <div className={css.petsData}>8 Hours</div>
                  ) :
                    e.Potty_break
                      === "custom" ? (
                      <div className={css.petsData}>{e.customPottyBreakName}
                      </div>) : null}
                </div>
                <div>
                  <h4 className={css.HeadingName}>Energy level</h4>
                  {e.Energy_level
                    === "high" ? (
                    <div className={css.petsData}>High</div>
                  ) : e.Energy_level
                    === "medium" ? (
                    <div className={css.petsData}>Medium</div>
                  ) : e.Energy_level
                    === "low" ? (
                    <div className={css.petsData}>Low</div>
                  ) : null}

                </div>
                <div>
                  <h4 className={css.HeadingName}>Feeding schedule</h4>
                  {e.Feeding_schedule
                    === "morning" ? (
                    <div className={css.petsData}>High</div>
                  ) : e.Feeding_schedule
                    === "twice" ? (
                    <div className={css.petsData}>Medium</div>
                  ) : e.Feeding_schedule
                    === "feed_custom" ? (
                    <div className={css.petsData}>{e.customFeedSchedule}</div>
                  ) : null}
                </div>
                <div>
                  <h4 className={css.HeadingName}>Can be left alone</h4>
                  {e.left_alone
                    === "less_one" ? (
                    <div className={css.petsData}>Less 1 hour</div>
                  ) : e.left_alone
                    === "one_four" ? (
                    <div className={css.petsData}>1 - 4 hours</div>
                  ) : e.left_alone
                    === "four_eight" ? (
                    <div className={css.petsData}>4 - 8 hours</div>
                  ) : e.left_alone
                    === "feed_custom" ? (
                    <div className={css.petsData}>{e.customLeftAlone}</div>
                  ) : null}
                </div>
              </div>
              <div className={css.threeRowBox}>
                <div>
                  <h4 className={css.HeadingName}>Medication</h4>
                  <div className={css.petsData}>{e.Medication}</div>
                </div>
                <div>
                  <h4 className={css.HeadingName}>About Pet Host </h4>
                  <div className={css.petsData}>{e.anything_host}</div>
                </div>
              </div>
              <h3>Anything else a Pet Host should know?</h3>
              <div>
                <h3>Health info</h3>
                <h4 className={css.HeadingName}>Add details about your pet's health and care providers</h4>
                <div className={css.petsData}>{e.Health_info}</div>
              </div>
              <div>
                <h3>Veterinary info</h3>
              </div>
              <div>
                <h4 className={css.HeadingName}> have Pet Insurance for your Pet's?</h4>
                {e.Pet_Insurance === "insurance_yes" ?
                  <div className={css.petsData}>Yes</div> :
                  <div className={css.petsData}>No</div>}
              </div>
            </div>
          ))}
        </div>

        {
          hasListings ? (
            <div className={listingsContainerClasses} >
              <h2 className={css.listingsTitle}>
                <FormattedMessage
                  id="ProfilePage.listingsTitle"
                  values={{ count: listings.length }}
                />
              </h2>
              <ul className={css.listings}>
                {listings.map(l => (
                  <li className={css.listing} key={l.id.uuid}>
                    <ListingCard listing={l} pageName='SearchPage' />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        {isMobileLayout ? mobileReviews : desktopReviews}
      </div>
    );

    let content;

    if (userShowError && userShowError.status === 404) {
      return <NotFoundPage />;
    } else if (userShowError || queryListingsError) {
      content = (
        <p className={css.error}>
          <FormattedMessage id="ProfilePage.loadingDataFailed" />
        </p>
      );
    } else {
      content = mainContent;
    }

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: displayName,
        siteTitle: config.siteTitle,
      }
    );

    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProfilePage',
          name: schemaTitle,
        }}
      >
        <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfilePage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav>
          <LayoutWrapperMain>{content}</LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSideNavigation>
      </Page>
    );
  }
}

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  queryListingsError: propTypes.error,
  listings: arrayOf(propTypes.listing).isRequired,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    userId,
    userShowError,
    queryListingsError,
    userListingRefs,
    reviews,
    queryReviewsError,
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    reviews,
    queryReviewsError,
  };
};

const ProfilePage = compose(
  connect(mapStateToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

export default ProfilePage;
