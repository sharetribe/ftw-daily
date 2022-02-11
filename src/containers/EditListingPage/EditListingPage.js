import React from 'react';
import { bool, func, object, shape, string, oneOf } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  createSlug,
} from '../../util/urlHelpers';
import { LISTING_STATE_DRAFT, LISTING_STATE_PENDING_APPROVAL, propTypes } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  stripeAccountClearError,
  createStripeAccount,
  getStripeConnectAccountLink,
} from '../../ducks/stripeConnectAccount.duck';

import { EditListingWizard, NamedRedirect, Page } from '../../components';
import { TopbarContainer } from '../../containers';

import {
  requestFetchBookings,
  requestFetchAvailabilityExceptions,
  requestCreateAvailabilityException,
  requestDeleteAvailabilityException,
  requestCreateListingDraft,
  requestPublishListingDraft,
  requestUpdateListing,
  requestImageUpload,
  updateImageOrder,
  removeListingImage,
  clearUpdatedTab,
  savePayoutDetails,
} from './EditListingPage.duck';

import css from './EditListingPage.module.css';

const STRIPE_ONBOARDING_RETURN_URL_SUCCESS = 'success';
const STRIPE_ONBOARDING_RETURN_URL_FAILURE = 'failure';
const STRIPE_ONBOARDING_RETURN_URL_TYPES = [
  STRIPE_ONBOARDING_RETURN_URL_SUCCESS,
  STRIPE_ONBOARDING_RETURN_URL_FAILURE,
];

const { UUID } = sdkTypes;

// N.B. All the presentational content needs to be extracted to their own components
export const EditListingPageComponent = props => {
  const {
    currentUser,
    createStripeAccountError,
    fetchInProgress,
    fetchStripeAccountError,
    getOwnListing,
    getAccountLinkError,
    getAccountLinkInProgress,
    history,
    intl,
    onFetchAvailabilityExceptions,
    onCreateAvailabilityException,
    onDeleteAvailabilityException,
    onFetchBookings,
    onCreateListingDraft,
    onPublishListingDraft,
    onUpdateListing,
    onImageUpload,
    onRemoveListingImage,
    onManageDisableScrolling,
    onPayoutDetailsFormSubmit,
    onPayoutDetailsFormChange,
    onGetStripeConnectAccountLink,
    onUpdateImageOrder,
    onChange,
    page,
    params,
    scrollingDisabled,
    stripeAccountFetched,
    stripeAccount,
    updateStripeAccountError,
  } = props;

  const { id, type, returnURLType } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isNewListingFlow = isNewURI || isDraftURI;

  const listingId = page.submittedListingId || (id ? new UUID(id) : null);
  const currentListing = ensureOwnListing(getOwnListing(listingId));
  const { state: currentListingState } = currentListing.attributes;

  const isPastDraft = currentListingState && currentListingState !== LISTING_STATE_DRAFT;
  const shouldRedirect = isNewListingFlow && listingId && isPastDraft;

  const hasStripeOnboardingDataIfNeeded = returnURLType ? !!(currentUser && currentUser.id) : true;
  const showForm = hasStripeOnboardingDataIfNeeded && (isNewURI || currentListing.id);

  if (shouldRedirect) {
    const isPendingApproval =
      currentListing && currentListingState === LISTING_STATE_PENDING_APPROVAL;

    // If page has already listingId (after submit) and current listings exist
    // redirect to listing page
    const listingSlug = currentListing ? createSlug(currentListing.attributes.title) : null;

    const redirectProps = isPendingApproval
      ? {
          name: 'ListingPageVariant',
          params: {
            id: listingId.uuid,
            slug: listingSlug,
            variant: LISTING_PAGE_PENDING_APPROVAL_VARIANT,
          },
        }
      : {
          name: 'ListingPage',
          params: {
            id: listingId.uuid,
            slug: listingSlug,
          },
        };

    return <NamedRedirect {...redirectProps} />;
  } else if (showForm) {
    const {
      createListingDraftError = null,
      publishListingError = null,
      updateListingError = null,
      showListingsError = null,
      uploadImageError = null,
    } = page;
    const errors = {
      createListingDraftError,
      publishListingError,
      updateListingError,
      showListingsError,
      uploadImageError,
      createStripeAccountError,
    };
    // TODO: is this dead code? (shouldRedirect is checked before)
    const newListingPublished =
      isDraftURI && currentListing && currentListingState !== LISTING_STATE_DRAFT;

    // Show form if user is posting a new listing or editing existing one
    const disableForm = page.redirectToListing && !showListingsError;

    // Images are passed to EditListingForm so that it can generate thumbnails out of them
    const currentListingImages =
      currentListing && currentListing.images ? currentListing.images : [];

    // Images not yet connected to the listing
    const imageOrder = page.imageOrder || [];
    const unattachedImages = imageOrder.map(i => page.images[i]);

    const allImages = currentListingImages.concat(unattachedImages);
    const removedImageIds = page.removedImageIds || [];
    const images = allImages.filter(img => {
      return !removedImageIds.includes(img.id);
    });

    const title = isNewListingFlow
      ? intl.formatMessage({ id: 'EditListingPage.titleCreateListing' })
      : intl.formatMessage({ id: 'EditListingPage.titleEditListing' });

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <TopbarContainer
          className={css.topbar}
          mobileRootClassName={css.mobileTopbar}
          desktopClassName={css.desktopTopbar}
          mobileClassName={css.mobileTopbar}
        />
        <EditListingWizard
          id="EditListingWizard"
          className={css.wizard}
          params={params}
          disabled={disableForm}
          errors={errors}
          fetchInProgress={fetchInProgress}
          newListingPublished={newListingPublished}
          history={history}
          images={images}
          listing={currentListing}
          availability={{
            calendar: page.availabilityCalendar,
            onFetchAvailabilityExceptions,
            onCreateAvailabilityException,
            onDeleteAvailabilityException,
            onFetchBookings,
          }}
          onUpdateListing={onUpdateListing}
          onCreateListingDraft={onCreateListingDraft}
          onPublishListingDraft={onPublishListingDraft}
          onPayoutDetailsFormChange={onPayoutDetailsFormChange}
          onPayoutDetailsSubmit={onPayoutDetailsFormSubmit}
          onGetStripeConnectAccountLink={onGetStripeConnectAccountLink}
          getAccountLinkInProgress={getAccountLinkInProgress}
          onImageUpload={onImageUpload}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveListingImage}
          onChange={onChange}
          currentUser={currentUser}
          onManageDisableScrolling={onManageDisableScrolling}
          stripeOnboardingReturnURL={params.returnURLType}
          updatedTab={page.updatedTab}
          updateInProgress={page.updateInProgress || page.createListingDraftInProgress}
          payoutDetailsSaveInProgress={page.payoutDetailsSaveInProgress}
          payoutDetailsSaved={page.payoutDetailsSaved}
          stripeAccountFetched={stripeAccountFetched}
          stripeAccount={stripeAccount}
          stripeAccountError={
            createStripeAccountError || updateStripeAccountError || fetchStripeAccountError
          }
          stripeAccountLinkError={getAccountLinkError}
        />
      </Page>
    );
  } else {
    // If user has come to this page through a direct linkto edit existing listing,
    // we need to load it first.
    const loadingPageMsg = {
      id: 'EditListingPage.loadingListingData',
    };
    return (
      <Page title={intl.formatMessage(loadingPageMsg)} scrollingDisabled={scrollingDisabled} />
    );
  }
};

EditListingPageComponent.defaultProps = {
  createStripeAccountError: null,
  fetchStripeAccountError: null,
  getAccountLinkError: null,
  getAccountLinkInProgress: null,
  stripeAccountFetched: null,
  currentUser: null,
  stripeAccount: null,
  currentUserHasOrders: null,
  listing: null,
  listingDraft: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

EditListingPageComponent.propTypes = {
  createStripeAccountError: propTypes.error,
  fetchStripeAccountError: propTypes.error,
  getAccountLinkError: propTypes.error,
  getAccountLinkInProgress: bool,
  updateStripeAccountError: propTypes.error,
  currentUser: propTypes.currentUser,
  fetchInProgress: bool.isRequired,
  getOwnListing: func.isRequired,
  onFetchAvailabilityExceptions: func.isRequired,
  onCreateAvailabilityException: func.isRequired,
  onDeleteAvailabilityException: func.isRequired,
  onFetchBookings: func.isRequired,
  onGetStripeConnectAccountLink: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onPublishListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsFormSubmit: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveListingImage: func.isRequired,
  onUpdateListing: func.isRequired,
  onChange: func.isRequired,
  page: object.isRequired,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: string.isRequired,
    returnURLType: oneOf(STRIPE_ONBOARDING_RETURN_URL_TYPES),
  }).isRequired,
  stripeAccountFetched: bool,
  stripeAccount: object,
  scrollingDisabled: bool.isRequired,

  /* from withRouter */
  history: shape({
    push: func.isRequired,
  }).isRequired,

  /* from injectIntl */
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const page = state.EditListingPage;
  const {
    getAccountLinkInProgress,
    getAccountLinkError,
    createStripeAccountInProgress,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccount,
    stripeAccountFetched,
  } = state.stripeConnectAccount;

  const { currentUser } = state.user;

  const fetchInProgress = createStripeAccountInProgress;

  const getOwnListing = id => {
    const listings = getMarketplaceEntities(state, [{ id, type: 'ownListing' }]);

    return listings.length === 1 ? listings[0] : null;
  };
  return {
    getAccountLinkInProgress,
    getAccountLinkError,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccount,
    stripeAccountFetched,
    currentUser,
    fetchInProgress,
    getOwnListing,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateListing: (tab, values) => dispatch(requestUpdateListing(tab, values)),
  onFetchBookings: params => dispatch(requestFetchBookings(params)),
  onFetchAvailabilityExceptions: params => dispatch(requestFetchAvailabilityExceptions(params)),
  onCreateAvailabilityException: params => dispatch(requestCreateAvailabilityException(params)),
  onDeleteAvailabilityException: params => dispatch(requestDeleteAvailabilityException(params)),
  onCreateListingDraft: values => dispatch(requestCreateListingDraft(values)),
  onPublishListingDraft: listingId => dispatch(requestPublishListingDraft(listingId)),
  onImageUpload: data => dispatch(requestImageUpload(data)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onPayoutDetailsFormChange: () => dispatch(stripeAccountClearError()),
  onPayoutDetailsSubmit: values => dispatch(createStripeAccount(values)),
  onPayoutDetailsFormSubmit: (values, isUpdateCall) =>
    dispatch(savePayoutDetails(values, isUpdateCall)),
  onGetStripeConnectAccountLink: params => dispatch(getStripeConnectAccountLink(params)),
  onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
  onRemoveListingImage: imageId => dispatch(removeListingImage(imageId)),
  onChange: () => dispatch(clearUpdatedTab()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const EditListingPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(injectIntl(EditListingPageComponent));

export default EditListingPage;
