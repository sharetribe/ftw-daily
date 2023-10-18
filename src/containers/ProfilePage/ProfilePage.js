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
    const {pets} = profileUser?.attributes?.profile?.publicData || {};

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
        {
          pets?.map((e, index) => (

            <div>
              <h2>
                <FormattedMessage id={`Pet ${index + 1}`} />
              </h2>

              <h2>Pet Details</h2>
              <div>
                <h2>description of pet</h2>
                {e.pet_des}
              </div>
              <div>
                <img src={e.idPetImage?.link} alt="" width='200px' height='200px'/>
              </div>
              <div>
                <h2>Pet Name</h2>
                {e.pet_name}
              </div>
              <div>
                <h2>Type of Pet</h2>
                {e.typeOfPet}
              </div>
              <div>
                <h2>Weight</h2>
                {e.Weight}
              </div>
              <div>
                <h2>Age (Months)</h2>
                {e.pet_month}
              </div>
              <div>
                <h2>Age (Year)</h2>
                {e.pet_year}
              </div>
              <div>
                <h2>Breed</h2>
                {e.pet_breed}
              </div>
              <h3>Additional Details</h3>
              <div>
                <h2> Pet microchipped? </h2>
                {e.microchipped === "microchipped_no" ?
                  <div>NO</div> : <div>Yes</div>
                }
              </div>


              <div>
                <h3> Is your Pet desexed? </h3>

                {e.desexed === "desexed_no" ?
                  <div>NO</div>
                  :
                  <div>Yes</div>}
              </div>
              <div>
                <h2>Pet house trained? </h2>
                {e.house_trained === "trained_yes" ? (
                  <div>Yes</div>
                ) : e.house_trained === "trained_no" ? (
                  <div>No</div>
                ) : e.house_trained === "trained_Unsure" ? (
                  <div>Unsure</div>
                ) : e.house_trained === "trained_Depends" ? (
                  <div>Depends</div>
                ) : null}

              </div>
              <div >
                <h2>Friendly with children?</h2>

                {e.children_pet
                  === "children_yes" ? (
                  <div>Yes</div>
                ) : e.children_pet
                  === "children_no" ? (
                  <div>No</div>
                ) : e.children_pet
                  === "children_Unsure" ? (
                  <div>Unsure</div>
                ) : e.children_pet
                  === "children_Depends" ? (
                  <div>Depends</div>
                ) : null}
              </div>
              <div>
                <h2>Friendly with other Pets? </h2>

                {e.other_pet
                  === "other_yes" ? (
                  <div>Yes</div>
                ) : e.other_pet
                  === "other_no" ? (
                  <div>No</div>
                ) : e.other_pet
                  === "other_Unsure" ? (
                  <div>Unsure</div>
                ) : e.other_pet
                  === "other_Depends" ? (
                  <div>Depends</div>
                ) : null}
              </div>

              <div>
                <h3>About  Pet</h3>
                {e.about_pet}
              </div>
              <h2>Care info</h2>
              <h3>Provide your Pet Host with instructions for walking, feeding and other care</h3>
              <div>
                <h3>Potty break schedule</h3>
                {e.Potty_break
                  === "every_hour" ? (
                  <div>Every hour</div>
                ) : e.Potty_break
                  === "two_hr" ? (
                  <div>2 Hours</div>
                ) : e.Potty_break
                  === "four_hr" ? (
                  <div>4 Hours</div>
                ) : e.Potty_break
                  === "eight_hr" ? (
                  <div>8 Hours</div>
                ) :
                e.Potty_break
                  === "custom" ? (
                  <div>{e.customPottyBreakName}
                    </div>): null}

              </div>
              <div>
                <h3>Energy level</h3>
                     {e.Energy_level
                  === "high" ? (
                  <div>High</div>
                ) : e.Energy_level
                  === "medium" ? (
                  <div>Medium</div>
                ) : e.Energy_level
                  === "low" ? (
                  <div>Low</div>
                )  : null}

              </div>
              <div>
                <h2>Feeding schedule</h2>

        

             {e.Feeding_schedule
                  === "morning" ? (
                  <div>High</div>
                ) : e.Feeding_schedule
                  === "twice" ? (
                  <div>Medium</div>
                ) : e.Feeding_schedule
                  === "feed_custom" ? (
                  <div>{e.customFeedSchedule}</div>
                )  : null}
              </div>
              <div>
                <h3>Can be left alone</h3>
         
                {e.left_alone
                  === "less_one" ? (
                  <div>Less 1 hour</div>
                ) : e.left_alone
                  === "one_four" ? (
                  <div>1 - 4 hours</div>
                ) : e.left_alone
                === "four_eight" ? (
                <div>4 - 8 hours</div>
              ) : e.left_alone
                  === "feed_custom" ? (
                  <div>{e.customLeftAlone}</div>
                )  : null}
              </div>
              <div>
                <h2>Medication</h2>
                {e.Medication}
              </div>
              <div>
                <h3>About Pet Host </h3>
                {e.anything_host}
              </div>
              <h2>Anything else a Pet Host should know?</h2>
              <div>
                <h2>Health info</h2>
                <h4>Add details about your pet's health and care providers</h4>
                {e.Health_info}
              </div>
             
            <div>
              <h2>Veterinary info</h2>
            </div>
              <div>
               <h2> have Pet Insurance for your Pet's?</h2>
               
                {e.Pet_Insurance === "insurance_yes" ?
                  <div>Yes</div>
                  :
                  <div>No</div>}
              </div>

            </div>
          ))
        }

        {hasListings ? (
          <div className={listingsContainerClasses}>
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
