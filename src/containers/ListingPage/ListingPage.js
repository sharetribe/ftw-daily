/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { ensureListing, ensureUser, parseAddress } from '../../util/data';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  AvatarLarge,
  AvatarMedium,
  Button,
  Map,
  ModalInMobile,
  Page,
  ResponsiveImage,
  NamedLink,
  NamedRedirect,
  Modal,
  ImageCarousel,
} from '../../components';
import { BookingDatesForm, TopbarContainer } from '../../containers';

import { showListing } from './ListingPage.duck';
import EditIcon from './EditIcon';
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
  const { isOwnListing, isClosed, editParams } = props;

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

const { bool, func, instanceOf, object, oneOf, shape, string } = PropTypes;

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
    const { history, getListing, params, useInitialValues } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);

    this.setState({ isBookingModalOpenOnMobile: false });

    const { bookingDates } = values;

    const initialValues = {
      listing,
      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
    };

    const routes = routeConfiguration();
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
    useInitialValues(setInitialValues, initialValues);

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }

  render() {
    const {
      authInfoError,
      currentUser,
      getListing,
      intl,
      logoutError,
      onManageDisableScrolling,
      params,
      scrollingDisabled,
      showListingError,
    } = this.props;
    const listingId = new UUID(params.id);
    const currentListing = ensureListing(getListing(listingId));
    const listingSlug = params.slug || createSlug(currentListing.attributes.title || '');
    const {
      address = '',
      description = '',
      geolocation = null,
      price = null,
      title = '',
    } = currentListing.attributes;

    const topbar = <TopbarContainer />;

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
        <Page title={errorTitle}>
          {topbar}
          <p className={css.errorText}>
            <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
          </p>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      return (
        <Page title={loadingTitle}>
          {topbar}
          <p className={css.loadingText}>
            <FormattedMessage id="ListingPage.loadingListingMessage" />
          </p>
        </Page>
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
    const viewPhotosButton = hasImages ? (
      <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
        <FormattedMessage
          id="ListingPage.viewImagesButton"
          values={{ count: currentListing.images.length }}
        />
      </button>
    ) : null;

    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing =
      userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;

    const currentAuthor = ensureUser(authorAvailable ? currentListing.author : {});
    const currentAuthorDisplayName = currentAuthor.attributes.profile.displayName;

    // TODO location address is currently serialized inside address field (API will change later)
    // Content is something like { locationAddress: 'Street, Province, Country', building: 'A 42' };
    const { locationAddress } = parseAddress(address);

    const bookBtnMessage = intl.formatMessage({ id: 'ListingPage.ctaButtonMessage' });
    const { formattedPrice, priceTitle } = priceData(price, intl);
    const map = geolocation ? (
      <div className={css.locationContainer}>
        <h2 className={css.locationTitle}>
          <FormattedMessage id="ListingPage.locationTitle" />
        </h2>
        <div className={css.map}>
          <Map center={geolocation} address={locationAddress} />
        </div>
      </div>
    ) : null;

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

    const editParams = { id: listingId.uuid, slug: listingSlug, type: 'edit', tab: 'description' };

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
    const actionBar = currentListing.id ? (
      <div onClick={e => e.stopPropagation()}>
        <ActionBar
          isOwnListing={isOwnListing}
          isClosed={currentListing.attributes.closed}
          editParams={editParams}
        />
      </div>
    ) : null;

    const facebookImages = hasImages
      ? currentListing.images.map(image => {
          return image.attributes.sizes.find(i => i.name === 'facebook');
        })
      : [];
    const twitterImages = hasImages
      ? currentListing.images.map(image => {
          return image.attributes.sizes.find(i => i.name === 'twitter');
        })
      : [];
    const schemaImages = JSON.stringify(facebookImages.map(img => img.url));
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage(
      { id: 'ListingPage.schemaTitle' },
      { title, price: formattedPrice, siteTitle }
    );

    const canonicalPath = createResourceLocatorString(
      'ListingPageCanonical',
      routeConfiguration(),
      {
        id: listingId.uuid,
      }
    );

    return (
      <Page
        authInfoError={authInfoError}
        logoutError={logoutError}
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={currentAuthorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        canonicalPath={canonicalPath}
        schema={`
          {
            "@context": "http://schema.org",
            "@type": "ItemPage",
            "description": "${description}",
            "name": "${schemaTitle}",
            "image": ${schemaImages}
          }
        `}
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
                <h2 className={css.descriptionTitle}>
                  <FormattedMessage id="ListingPage.descriptionTitle" />
                </h2>
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
              {!currentListing.attributes.closed ? (
                <BookingDatesForm
                  className={css.bookingForm}
                  onSubmit={handleBookingSubmit}
                  price={price}
                  isOwnListing={isOwnListing}
                />
              ) : null}
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

              {!currentListing.attributes.closed ? (
                <Button rootClassName={css.bookButton} onClick={handleBookButtonClick}>
                  {bookBtnMessage}
                </Button>
              ) : (
                <div className={css.closedListingButton}>
                  <FormattedMessage id="ListingPage.closedListingButtonText" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

ListingPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  showListingError: null,
  tab: 'listing',
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
  }).isRequired,
  authInfoError: instanceOf(Error),
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  logoutError: instanceOf(Error),
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  showListingError: instanceOf(Error),
  tab: oneOf(['book', 'listing']),
  useInitialValues: func.isRequired,
};

const mapStateToProps = state => {
  const { showListingError } = state.ListingPage;
  const { authInfoError, logoutError } = state.Auth;
  const { currentUser } = state.user;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    authInfoError,
    currentUser,
    getListing,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    showListingError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  useInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  ListingPageComponent
);

ListingPage.loadData = params => {
  const id = new UUID(params.id);
  return showListing(id);
};

export default ListingPage;
