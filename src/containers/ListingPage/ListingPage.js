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
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { ensureListing, ensureUser, userDisplayName } from '../../util/data';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  AvatarLarge,
  AvatarMedium,
  Button,
  ModalInMobile,
  Page,
  ResponsiveImage,
  NamedLink,
  NamedRedirect,
  Modal,
  ImageCarousel,
  InlineTextButton,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  UserCard,
  Reviews,
  PropertyGroup,
} from '../../components';
import { BookingDatesForm, TopbarContainer, EnquiryForm } from '../../containers';

import { sendEnquiry, loadData, setInitialValues } from './ListingPage.duck';
import EditIcon from './EditIcon';
import SectionRulesMaybe from './SectionRulesMaybe';
import SectionMapMaybe from './SectionMapMaybe';
import css from './ListingPage.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const { UUID } = sdkTypes;

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

export const ActionBarMaybe = props => {
  const { isOwnListing, listing, editParams } = props;
  const state = listing.attributes.state;
  const isPendingApproval = state === LISTING_STATE_PENDING_APPROVAL;
  const isClosed = state === LISTING_STATE_CLOSED;

  if (isOwnListing) {
    let ownListingTextTranslationId = 'ListingPage.ownListing';

    if (isPendingApproval) {
      ownListingTextTranslationId = 'ListingPage.ownListingPendingApproval';
    } else if (isClosed) {
      ownListingTextTranslationId = 'ListingPage.ownClosedListing';
    }

    const ownListingTextClasses = classNames(css.ownListingText, {
      [css.ownListingTextPendingApproval]: isPendingApproval,
    });

    return (
      <div className={css.actionBar}>
        <p className={ownListingTextClasses}>
          <FormattedMessage id={ownListingTextTranslationId} />
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
  }
  return null;
};

const { arrayOf, bool, func, object, oneOf, shape, string } = PropTypes;

ActionBarMaybe.propTypes = {
  isOwnListing: bool.isRequired,
  listing: propTypes.listing.isRequired,
  editParams: object.isRequired,
};

ActionBarMaybe.displayName = 'ActionBarMaybe';

const gotoBookTab = (history, listing) => {
  if (!listing.id) {
    // Listing not fully loaded yet
    return;
  }
  const routes = routeConfiguration();
  history.push(
    createResourceLocatorString(
      'ListingPageBook',
      routes,
      { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
      {}
    )
  );
};

const gotoListingTab = (history, listing) => {
  if (!listing.id) {
    // Listing not fully loaded yet
    return;
  }
  const routes = routeConfiguration();
  history.push(
    createResourceLocatorString(
      'ListingPage',
      routes,
      { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
      {}
    )
  );
};

// TODO: price unit (per x), custom fields, contact, reviews
// N.B. All the presentational content needs to be extracted to their own components
export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params } = props;
    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContactUser = this.onContactUser.bind(this);
    this.onSubmitEnquiry = this.onSubmitEnquiry.bind(this);
  }

  handleSubmit(values) {
    const { history, getListing, params, useInitialValues } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);

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

  onContactUser() {
    const { currentUser, history, useInitialValues, params } = this.props;

    if (!currentUser) {
      const location = window.location;
      const state = { from: `${location.pathname}${location.search}${location.hash}` };

      // We need to log in before showing the modal, but first we need to ensure
      // that modal does open when user is redirected back to this listingpage
      useInitialValues(setInitialValues, { enquiryModalOpenForListingId: params.id });

      // signup and return back to listingPage.
      history.push(createResourceLocatorString('SignupPage', routeConfiguration(), {}, {}), state);
    } else {
      this.setState({ enquiryModalOpen: true });
    }
  }

  onSubmitEnquiry(values) {
    const { history, params, onSendEnquiry } = this.props;
    const routes = routeConfiguration();
    const listingId = new UUID(params.id);
    const { message } = values;

    onSendEnquiry(listingId, message.trim())
      .then(txId => {
        this.setState({ enquiryModalOpen: false });

        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
      .catch(() => {
        // Ignore, error handling in duck file
      });
  }

  render() {
    const {
      unitType,
      tab,
      isAuthenticated,
      currentUser,
      getListing,
      intl,
      onManageDisableScrolling,
      params,
      scrollingDisabled,
      showListingError,
      history,
      reviews,
      fetchReviewsError,
      sendEnquiryInProgress,
      sendEnquiryError,
    } = this.props;

    const listingId = new UUID(params.id);
    const currentListing = ensureListing(getListing(listingId));
    const listingSlug = params.slug || createSlug(currentListing.attributes.title || '');
    const {
      description = '',
      geolocation = null,
      price = null,
      title = '',
      publicData,
    } = currentListing.attributes;

    const { customAttributes } = currentListing.attributes;
    const hasCategoryConfig = config.customAttributes && config.customAttributes.category;
    const hasCategoryAttribute = customAttributes && customAttributes.category;
    const category =
      hasCategoryConfig && hasCategoryAttribute ? (
        <span>
          <FormattedMessage id={`ListingPage.category.${customAttributes.category}`} />
          <span className={css.separator}>•</span>
        </span>
      ) : null;

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
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.errorText}>
                <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      return (
        <Page title={loadingTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.loadingText}>
                <FormattedMessage id="ListingPage.loadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
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
    const isClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
    const showContactUser = !currentUser || (currentUser && !isOwnListing);

    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);

    const bannedUserDisplayName = intl.formatMessage({
      id: 'ListingPage.bannedUserDisplayName',
    });
    const authorDisplayName = userDisplayName(ensuredAuthor, bannedUserDisplayName);

    const bookBtnMessage = intl.formatMessage({ id: 'ListingPage.ctaButtonMessage' });
    const { formattedPrice, priceTitle } = priceData(price, intl);

    const showClosedListingHelpText = currentListing.id && isClosed;
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

    const handleMobileBookModalClose = () => {
      gotoListingTab(history, currentListing);
    };

    const handleBookingSubmit = values => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        this.handleSubmit(values);
      }
    };

    const editParams = { id: listingId.uuid, slug: listingSlug, type: 'edit', tab: 'description' };

    const handleBookButtonClick = () => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        gotoBookTab(history, currentListing);
      }
    };

    // Action bar is wrapped with a div that prevents the click events
    // to the parent that would otherwise open the image carousel
    const actionBar = currentListing.id ? (
      <div onClick={e => e.stopPropagation()}>
        <ActionBarMaybe
          isOwnListing={isOwnListing}
          listing={currentListing}
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

    const hostLink = (
      <NamedLink
        className={css.authorNameLink}
        name="ListingPage"
        params={params}
        to={{ hash: '#host' }}
      >
        {authorDisplayName}
      </NamedLink>
    );

    const reviewsError = (
      <h2 className={css.errorText}>
        <FormattedMessage id="ListingPage.reviewsError" />
      </h2>
    );

    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={authorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ItemPage',
          description: description,
          name: schemaTitle,
          image: schemaImages,
        }}
      >
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div>
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
                  <NamedLink name="ListingPage" params={params} to={{ hash: '#host' }}>
                    <AvatarLarge
                      user={currentAuthor}
                      className={css.avatarDesktop}
                      disableProfileLink
                    />
                  </NamedLink>
                  <NamedLink name="ListingPage" params={params} to={{ hash: '#host' }}>
                    <AvatarMedium
                      user={currentAuthor}
                      className={css.avatarMobile}
                      disableProfileLink
                    />
                  </NamedLink>
                </div>

                <div className={css.mainContent}>
                  <div className={css.headingContainer}>
                    <div className={css.desktopPriceContainer}>
                      <div className={css.desktopPriceValue} title={priceTitle}>
                        {formattedPrice}
                      </div>
                      <div className={css.desktopPerUnit}>
                        <FormattedMessage id="ListingPage.perUnit" />
                      </div>
                    </div>
                    <div className={css.heading}>
                      <h1 className={css.title}>{title}</h1>
                      <div className={css.author}>
                        {category}
                        <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
                        {showContactUser ? (
                          <span className={css.contactWrapper}>
                            <span className={css.separator}>•</span>
                            <InlineTextButton
                              className={css.contactLink}
                              onClick={this.onContactUser}
                            >
                              <FormattedMessage id="ListingPage.contactUser" />
                            </InlineTextButton>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className={css.descriptionContainer}>
                    <h2 className={css.descriptionTitle}>
                      <FormattedMessage id="ListingPage.descriptionTitle" />
                    </h2>
                    <p className={css.description}>{description}</p>
                  </div>

                  <div className={css.featuresContainer}>
                    <h2 className={css.featuresTitle}>
                      <FormattedMessage id="ListingPage.featuresTitle" />
                    </h2>
                    <PropertyGroup
                      id="ListingPage.amenities"
                      options={config.custom.amenities}
                      selectedOptions={publicData.amenities}
                      twoColumns={true}
                    />
                  </div>

                  <SectionRulesMaybe publicData={publicData} />
                  <SectionMapMaybe geolocation={geolocation} publicData={publicData} />

                  <div className={css.reviewsContainer}>
                    <h2 className={css.reviewsHeading}>
                      <FormattedMessage
                        id="ListingPage.reviewsHeading"
                        values={{ count: reviews.length }}
                      />
                    </h2>
                    {fetchReviewsError ? reviewsError : null}
                    <Reviews reviews={reviews} />
                  </div>
                  <div id="host" className={css.yourHostContainer}>
                    <h2 className={css.yourHostHeading}>
                      <FormattedMessage id="ListingPage.yourHostHeading" />
                    </h2>
                    {isOwnListing ? (
                      <NamedLink className={css.editProfileLink} name="ProfileSettingsPage">
                        <FormattedMessage id="ListingPage.editProfileLink" />
                      </NamedLink>
                    ) : null}
                    <UserCard
                      user={currentListing.author}
                      currentUser={currentUser}
                      onContactUser={this.onContactUser}
                    />
                    <Modal
                      id="ListingPage.enquiry"
                      contentClassName={css.enquiryModalContent}
                      isOpen={isAuthenticated && this.state.enquiryModalOpen}
                      onClose={() => this.setState({ enquiryModalOpen: false })}
                      onManageDisableScrolling={onManageDisableScrolling}
                    >
                      <EnquiryForm
                        className={css.enquiryForm}
                        submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
                        listingTitle={title}
                        authorDisplayName={authorDisplayName}
                        sendEnquiryError={sendEnquiryError}
                        onSubmit={this.onSubmitEnquiry}
                        inProgress={sendEnquiryInProgress}
                      />
                    </Modal>
                  </div>
                </div>

                <ModalInMobile
                  className={css.modalInMobile}
                  containerClassName={css.modalContainer}
                  id="BookingDatesFormInModal"
                  isModalOpenOnMobile={tab === 'book'}
                  onClose={handleMobileBookModalClose}
                  showAsModalMaxWidth={MODAL_BREAKPOINT}
                  onManageDisableScrolling={onManageDisableScrolling}
                >
                  <div className={css.modalHeading}>
                    <h1 className={css.title}>{title}</h1>
                    <div className={css.author}>
                      <span className={css.authorName}>
                        <FormattedMessage
                          id="ListingPage.hostedBy"
                          values={{ name: authorDisplayName }}
                        />
                      </span>
                    </div>
                  </div>

                  {bookingHeading}
                  {!isClosed ? (
                    <BookingDatesForm
                      className={css.bookingForm}
                      submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
                      unitType={unitType}
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
                    <div className={css.perUnit}>
                      <FormattedMessage id="ListingPage.perUnit" />
                    </div>
                  </div>

                  {!isClosed ? (
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
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ListingPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  enquiryModalOpenForListingId: null,
  showListingError: null,
  tab: 'listing',
  reviews: [],
  fetchReviewsError: null,
  sendEnquiryError: null,
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
  }).isRequired,
  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  tab: oneOf(['book', 'listing']),
  useInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  onSendEnquiry: func.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    enquiryModalOpenForListingId,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    scrollingDisabled: isScrollingDisabled(state),
    enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    sendEnquiryInProgress,
    sendEnquiryError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  useInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
  onSendEnquiry: (listingId, message) => dispatch(sendEnquiry(listingId, message)),
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

ListingPage.setInitialValues = initialValues => setInitialValues(initialValues);
ListingPage.loadData = loadData;

export default ListingPage;
