import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { types as sdkTypes } from '../../util/sdkLoader';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureCurrentUser, ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities, getFirstName } from '../../ducks/marketplaceData.duck';
import { getAcceptedAndActiveTransactionsData } from '../CalendarPage/CalendarPage.duck.js';
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
  ToggleText,
  IconMessage,
} from '../../components';
// import SectionHostMaybe from '../ListingPage/SectionHostMaybe';
import { TopbarContainer, NotFoundPage } from '../../containers';
import { loadData } from './ProfilePage.duck';
import config from '../../config';

import css from './ProfilePage.css';

const { UUID } = sdkTypes;
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

  onContactUser() {
    return 
  }

  componentDidMount() {
    this.props.onAcceptedTransactionSelect()
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
      acceptedAndActiveTransactions,
      userRating,
    } = this.props;
   
    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUser(user);
    const isCurrentUser = ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const publicData =  profileUser.attributes.profile.publicData
    const displayName = profileUser.attributes.profile.displayName;
    const firstName = displayName? displayName.split(" ").slice(0,1)[0]: "";
    const bio = profileUser.attributes.profile.bio;
    const hasBio = !!bio;
    const hasLocation = (publicData && publicData.location && publicData.location.search) ? publicData.location.search : null;
    const hasOtherInfo = typeof publicData === 'object' && Object.keys(publicData).length && Object.keys(publicData).filter(v => v !== 'location')//.map(v => ({ [v]: publicData[v] }))
   
    const publicDataPresent = profileUser.attributes.profile.publicData
    const emailVerified =  publicDataPresent && profileUser.attributes.profile.publicData.emailVerified
    const phoneVerified = publicDataPresent && profileUser.attributes.profile.publicData.phoneNumber
    
    const activeAndAcceptedTransactionsPresent = acceptedAndActiveTransactions && acceptedAndActiveTransactions.length

    const hasListings = listings.length > 0;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
    
    const maxBioLength = 239
    const otherInfoConfig = {
      age: {
        custom: 'Alter',
        type: 'text'
      },
      experience: {
        custom: 'Erfahrung',
        type: 'text'
      }, 
      language: {
        custom: 'Sprache',
        type: 'text'
      }, 
      licence: {
        custom: 'Lizenz',
        type: 'text'
      }, 
      drivingLicense: {
        custom: 'Führerschein',
        type: 'boolean'
      }, 
      auto:{
        custom: 'Auto',
        type: 'boolean'
      }, 
    }

    const approvedDataIcon = (
      <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.52 9.098c-.163.188-.397.3-.646.31h-.032c-.238 0-.466-.094-.635-.263L2.783 6.732c-.353-.35-.354-.92-.003-1.273.35-.353.92-.354 1.272-.004L5.794 7.19l4.59-5.278C9.287.738 7.73 0 6 0 2.686 0 0 2.686 0 6c0 3.313 2.686 6 6 6 3.313 0 6-2.687 6-6 0-.91-.21-1.772-.573-2.545L6.52 9.098z" fill="%232ECC71" fill-rule="evenodd"/>
      </svg>)

      const userRatingIcon = (classNameToAdd) => (
        <svg className={css[`${classNameToAdd}`]} width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.938 8.008c-.15-.412-.544-.69-.985-.69H14.38L12.507.758C12.377.31 11.967 0 11.5 0c-.467 0-.88.31-1.006.76L8.618 7.317H1.046c-.442 0-.833.278-.983.69-.15.414-.025.876.314 1.16l5.7 4.75L3.2 21.59c-.16.43-.02.916.346 1.196.362.28.87.29 1.242.02l6.71-4.79 6.713 4.79c.375.27.88.26 1.245-.02.366-.28.504-.765.343-1.196l-2.875-7.67 5.7-4.75c.34-.284.463-.746.315-1.16" fillRule="evenodd">
          </path>
        </svg>
      )
    
    const getRating = () => {
      let rating = userRating
      let total = []
      for(let i = 0; i < 5; i++) {
        let classToAdd = (1 > rating) ? 'empty' : 'filled'
        total.push(userRatingIcon(classToAdd))
        --rating
      }
      return total
    }  
      
    const asideContent = (
      <div className={css.asideContent}>
        <AvatarLarge className={css.avatar} user={user} disableProfileLink />
        <h1 className={css.mobileHeading}>
          {firstName ? (
            <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: firstName }} />
          ) : null}
        </h1>
        <div className={css.userRatingContainer}>
            {getRating()}
        </div>
        {/* <button className={css.contactButton} onClick={this.onContactUser}>
          <FormattedMessage id="ListingPage.contactAuthorButton" />
          <IconMessage />
        </button> */}
        <NamedLink name="CalendarPage" to={{ search:'kalender' }} className={classNames(css.contactButton, !activeAndAcceptedTransactionsPresent ? css.noTransactionsAvailavleBtn : '')}>
          <FormattedMessage id="ProfilePage.noTransactionsAvailavleBtn" />
        </NamedLink>
        <div className={css.contantsContainer}>
          <h4 className={css.secondaryHeader}>
          Identität verifiziert
          </h4>
          <p className={classNames(css.fieldItem, emailVerified ? css.fieldVerified : '')}>
           {approvedDataIcon} E-Mail Adresse
          </p>
          <p className={classNames(css.fieldItem, phoneVerified ? css.fieldVerified : '')}>
          {approvedDataIcon} Telefonnummer
          </p>
        </div> 
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
          <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: firstName }} />
        </h1>
        {hasLocation && <p className={classNames(css.secondaryHeader)}>{hasLocation}</p> }
        {hasBio && (
            <div className={css.infoSection}>
              <ToggleText CustomTag="p" className={css.bio} maxLength={maxBioLength}>{bio}</ToggleText>
            </div> 
          )}
        {hasOtherInfo.length && (
          <div className={css.infoSection}>
            <div className={css.infoWrapper}>
              <h3 className={classNames(css.secondaryHeader, css.primaryHeader)}>
                <FormattedMessage id="ProfileSettingsForm.otherInfo"/>
              </h3>  
              <div className={css.otherInfoContainer}>
                {hasOtherInfo.map(i => {
                  if(otherInfoConfig[i]) {
                    return (
                      <div className={css.otherInfoItem}>
                        <div>{otherInfoConfig[i].custom}</div>
                        <div>{otherInfoConfig[i].type === 'boolean' ? (!publicData[i] ? 'Nein' : 'Ja') : publicData[i]}</div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        )}
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
                  <ListingCard listing={l} />
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
          <LayoutWrapperMain>
            {content}
          </LayoutWrapperMain>
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
    userRating,
  } = state.ProfilePage;

  const { 
    acceptedAndActiveTransactions
   } = state.CalendarPage;

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
    acceptedAndActiveTransactions,
    userRating,
  };
};

const mapDispatchToProps = dispatch => ({
  onAcceptedTransactionSelect: () => dispatch(getAcceptedAndActiveTransactionsData()),
});

const ProfilePage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

ProfilePage.loadData = params => {
  const id = new UUID(params.id);
  return loadData(id);
};

export default ProfilePage;
