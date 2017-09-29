/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import config from '../../config';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { ensureListing, ensureUser } from '../../util/data';
import {
  AvatarLarge,
  AvatarMedium,
  Button,
  Map,
  ModalInMobile,
  PageLayout,
  ResponsiveImage,
  Topbar,
  NamedLink,
  NamedRedirect,
  Modal,
  ImageCarousel,
} from '../../components';
import EditIcon from './EditIcon';
import { BookingDatesForm } from '../../containers';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { showListing } from './ListingPage.duck';

import css from './ListingPage.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const { UUID } = types;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

export const ActionBar = props => {
  const {
    isOwnListing,
    isClosed,
    editParams,
  } = props;

  if (isOwnListing) {
    return (
      <div className={css.actionBar}>
        <p className={css.ownListingText}>
          <FormattedMessage
            id={isClosed ? 'ListingPage.ownClosedListing' : 'ListingPage.ownListing'}
          />
        </p>
        <NamedLink className={css.editListingLink} name="EditListingPage" params={editParams}>
          <EditIcon className={css.editIcon} />
          <FormattedMessage id="ListingPage.editListing" />
        </NamedLink>
      </div>
    );
  } else if (isClosed) {
    return (
      <div className={css.actionBar}>
        <p className={css.closedListingText}>
          <FormattedMessage id="ListingPage.closedListing" />
        </p>
      </div>
    );
  } else {
    return null;
  }
};

const { arrayOf, bool, func, instanceOf, number, object, oneOf, shape, string } = PropTypes;

ActionBar.propTypes = {
  isOwnListing: bool.isRequired,
  isClosed: bool.isRequired,
  editParams: object.isRequired,
};

ActionBar.displayName = 'ActionBar';

// TODO: price unit (per x), custom fields, contact, reviews
// N.B. All the presentational content needs to be extracted to their own components
export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const tab = props.tab;
    this.state = {
      isBookingModalOpenOnMobile: tab && tab === 'book',
      pageClassNames: [],
      imageCarouselOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { flattenedRoutes, history, getListing, params, useInitialValues } = this.props;
    const listing = getListing(new UUID(params.id));

    this.setState({ isBookingModalOpenOnMobile: false });

    const { bookingDates } = values;

    const initialValues = {
      listing,
      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
    };

    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', flattenedRoutes);
    useInitialValues(setInitialValues, initialValues);

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        flattenedRoutes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }

  render() {
    const {
      authInfoError,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserHasOrders,
      getListing,
      history,
      intl,
      isAuthenticated,
      location,
      logoutError,
      notificationCount,
      onLogout,
      onManageDisableScrolling,
      params,
      scrollingDisabled,
      showListingError,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
    } = this.props;
    const currentListing = ensureListing(getListing(new UUID(params.id)));
    const {
      address = '',
      description = '',
      geolocation = null,
      price = null,
      title = '',
    } = currentListing.attributes;

    const topbar = (
      <Topbar
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentUserHasOrders={currentUserHasOrders}
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
        onResendVerificationEmail={onResendVerificationEmail}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
      />
    );

    const loadingTitle = intl.formatMessage({
      id: 'ListingPage.loadingListingTitle',
    });
    const errorTitle = intl.formatMessage({
      id: 'ListingPage.errorLoadingListingTitle',
    });

    if (showListingError && showListingError.status === 404) {
      // 404 listing not found

      return <NamedRedirect name="NotFoundPage" />;
    } else if (showListingError) {
      // Other error in fetching listing

      return (
        <PageLayout title={errorTitle}>
          {topbar}
          <p className={css.errorText}>
            <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
          </p>
        </PageLayout>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      return (
        <PageLayout title={loadingTitle}>
          {topbar}
          <p className={css.loadingText}>
            <FormattedMessage id="ListingPage.loadingListingMessage" />
          </p>
        </PageLayout>
      );
    }

    const hasImages = currentListing.images && currentListing.images.length > 0;
    const firstImage = hasImages ? currentListing.images[0] : null;

    const handleViewPhotosClick = e => {
      // Stop event from bubbling up to prevent image click handler
      // trying to open the carousel as well.
      e.stopPropagation();
      this.setState({
        imageCarouselOpen: true,
      });
    };
    const viewPhotosButton = hasImages
      ? <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
          <FormattedMessage
            id="ListingPage.viewImagesButton"
            values={{ count: currentListing.images.length }}
          />
        </button>
      : null;

    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing = userAndListingAuthorAvailable &&
      currentListing.author.id.uuid === currentUser.id.uuid;

    const currentAuthor = ensureUser(authorAvailable ? currentListing.author : {});
    const currentAuthorDisplayName = currentAuthor.attributes.profile.displayName;

    // TODO location address is currently serialized inside address field (API will change later)
    // Content is something like { locationAddress: 'Street, Province, Country', building: 'A 42' };
    let locationAddress = '';
    try {
      const deserializedAddress = JSON.parse(address || '{}');
      locationAddress = deserializedAddress.locationAddress;
    } catch (e) {
      locationAddress = address;
    }

    const bookBtnMessage = intl.formatMessage({ id: 'ListingPage.ctaButtonMessage' });
    const { formattedPrice, priceTitle } = priceData(price, intl);
    const map = geolocation
      ? <div className={css.locationContainer}>
          <h3 className={css.locationTitle}>
            <FormattedMessage id="ListingPage.locationTitle" />
          </h3>
          <div className={css.map}><Map center={geolocation} address={locationAddress} /></div>
        </div>
      : null;

    const showClosedListingHelpText = currentListing.id && currentListing.attributes.closed;
    const bookingHeading = (
      <div className={css.bookingHeading}>
        <h2 className={css.bookingTitle}>
          <FormattedMessage id="ListingPage.bookingTitle" values={{ title }} />
        </h2>
        <div className={css.bookingHelp}>
          <FormattedMessage
            id={
              showClosedListingHelpText
                ? 'ListingPage.bookingHelpClosedListing'
                : 'ListingPage.bookingHelp'
            }
          />
        </div>
      </div>
    );

    const handleBookingSubmit = values => {
      const isClosed = currentListing.attributes.closed;
      if (isOwnListing || isClosed) {
        window.scrollTo(0, 0);
      } else {
        this.handleSubmit(values);
      }
    };

    const editParams = { ...params, type: 'edit', tab: 'description' };

    const listingClasses = classNames(css.pageRoot);

    const handleBookButtonClick = () => {
      const isClosed = currentListing.attributes.closed;
      if (isOwnListing || isClosed) {
        window.scrollTo(0, 0);
      } else {
        this.setState({ isBookingModalOpenOnMobile: true });
      }
    };

    // Action bar is wrapped with a div that prevents the click events
    // to the parent that would otherwise open the image carousel
    const actionBar = currentListing.id
      ? <div onClick={e => e.stopPropagation()}>
          <ActionBar
            isOwnListing={isOwnListing}
            isClosed={currentListing.attributes.closed}
            editParams={editParams}
          />
        </div>
      : null;

    return (
      <PageLayout
        authInfoError={authInfoError}
        logoutError={logoutError}
        title={`${title} ${formattedPrice}`}
        scrollingDisabled={scrollingDisabled}
      >
        {topbar}
        <div className={listingClasses}>
          <div className={css.threeToTwoWrapper}>
            <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>
              {actionBar}
              <ResponsiveImage
                rootClassName={css.rootForImage}
                alt={title}
                image={firstImage}
                nameSet={[
                  { name: 'landscape-crop', size: '400w' },
                  { name: 'landscape-crop2x', size: '800w' },
                  { name: 'landscape-crop4x', size: '1600w' },
                  { name: 'landscape-crop6x', size: '2400w' },
                ]}
                sizes="100vw"
              />
              {viewPhotosButton}
            </div>
          </div>
          <Modal
            id="ListingPage.imageCarousel"
            scrollLayerClassName={css.carouselModalScrollLayer}
            containerClassName={css.carouselModalContainer}
            lightCloseButton
            isOpen={this.state.imageCarouselOpen}
            onClose={() => this.setState({ imageCarouselOpen: false })}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <ImageCarousel images={currentListing.images} />
          </Modal>

          <div className={css.contentContainer}>
            <div className={css.avatarWrapper}>
              <AvatarLarge user={currentAuthor} className={css.avatarDesktop} />
              <AvatarMedium user={currentAuthor} className={css.avatarMobile} />
            </div>

            <div className={css.mainContent}>
              <div className={css.headingContainer}>
                <div className={css.desktopPriceContainer}>
                  <div className={css.desktopPriceValue} title={priceTitle}>
                    {formattedPrice}
                  </div>
                  <div className={css.desktopPerNight}>
                    <FormattedMessage id="ListingPage.perNight" />
                  </div>
                </div>
                <div className={css.heading}>
                  <h1 className={css.title}>{title}</h1>
                  <div className={css.author}>
                    <span className={css.authorName}>
                      <FormattedMessage
                        id="ListingPage.hostedBy"
                        values={{ name: currentAuthorDisplayName }}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className={css.descriptionContainer}>
                <h3 className={css.descriptionTitle}>
                  <FormattedMessage id="ListingPage.descriptionTitle" />
                </h3>
                <p className={css.description}>{description}</p>
              </div>

              {map}
            </div>

            <ModalInMobile
              className={css.modalInMobile}
              containerClassName={css.modalContainer}
              id="BookingDatesFormInModal"
              isModalOpenOnMobile={this.state.isBookingModalOpenOnMobile}
              onClose={() => this.setState({ isBookingModalOpenOnMobile: false })}
              showAsModalMaxWidth={MODAL_BREAKPOINT}
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <div className={css.modalHeading}>
                <h1 className={css.title}>{title}</h1>
                <div className={css.author}>
                  <span className={css.authorName}>
                    <FormattedMessage
                      id="ListingPage.hostedBy"
                      values={{ name: currentAuthorDisplayName }}
                    />
                  </span>
                </div>
              </div>

              {bookingHeading}
              {!currentListing.attributes.closed
                ? <BookingDatesForm
                    className={css.bookingForm}
                    onSubmit={handleBookingSubmit}
                    price={price}
                    isOwnListing={isOwnListing}
                  />
                : null}
            </ModalInMobile>
            <div className={css.openBookingForm}>
              <div className={css.priceContainer}>
                <div className={css.priceValue} title={priceTitle}>
                  {formattedPrice}
                </div>
                <div className={css.perNight}>
                  <FormattedMessage id="ListingPage.perNight" />
                </div>
              </div>

              {!currentListing.attributes.closed
                ? <Button rootClassName={css.bookButton} onClick={handleBookButtonClick}>
                    {bookBtnMessage}
                  </Button>
                : <div className={css.closedListingButton}>
                    <FormattedMessage id="ListingPage.closedListingButtonText" />
                  </div>}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
}

ListingPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  showListingError: null,
  tab: 'listing',
  sendVerificationEmailError: null,
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: object.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  // from injectIntl
  intl: intlShape.isRequired,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
  }).isRequired,
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  getListing: func.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  showListingError: instanceOf(Error),
  tab: oneOf(['book', 'listing']),
  useInitialValues: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,
};

const mapStateToProps = state => {
  const { showListingError } = state.ListingPage;
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    getListing,
    isAuthenticated,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    showListingError,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  useInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
});

const ListingPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, injectIntl)(
  ListingPageComponent
);

ListingPage.loadData = params => {
  const id = new UUID(params.id);
  return showListing(id);
};

export default ListingPage;
