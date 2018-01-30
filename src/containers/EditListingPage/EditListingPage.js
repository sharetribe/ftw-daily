import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { types as sdkTypes } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { LISTING_STATE_PENDING_APPROVAL, propTypes } from '../../util/types';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { stripeAccountClearError, createStripeAccount } from '../../ducks/user.duck';
import { EditListingWizard, NamedRedirect, Page } from '../../components';
import { TopbarContainer } from '../../containers';

import {
  createListingDraft,
  updateListingDraft,
  requestCreateListing,
  requestUpdateListing,
  requestImageUpload,
  updateImageOrder,
  removeListingImage,
  loadData,
  clearUpdatedTab,
} from './EditListingPage.duck';

import css from './EditListingPage.css';

const { UUID } = sdkTypes;

const PENDING_APPROVAL_VARIANT = 'pending-approval';

// N.B. All the presentational content needs to be extracted to their own components
export const EditListingPageComponent = props => {
  const {
    currentUser,
    createStripeAccountError,
    fetchInProgress,
    getOwnListing,
    history,
    intl,
    onCreateListing,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onRemoveListingImage,
    onManageDisableScrolling,
    onPayoutDetailsSubmit,
    onPayoutDetailsFormChange,
    onUpdateImageOrder,
    onUpdateListingDraft,
    onChange,
    page,
    params,
    scrollingDisabled,
  } = props;

  const { id, type } = params;

  const isNew = type === 'new';
  const newListingCreated = isNew && !!page.submittedListingId;
  const listingId = page.submittedListingId || (id ? new UUID(id) : null);
  const currentListing = getOwnListing(listingId);
  const isPendingApproval =
    currentListing && currentListing.attributes.state === LISTING_STATE_PENDING_APPROVAL;

  const shouldRedirect = page.submittedListingId && currentListing;
  const showForm = isNew || currentListing;

  if (shouldRedirect) {
    // If page has already listingId (after submit) and current listings exist
    // redirect to listing page
    const listingSlug = currentListing ? createSlug(currentListing.attributes.title) : null;

    const redirectProps = isPendingApproval
      ? {
          name: 'ListingPageVariant',
          params: {
            id: listingId.uuid,
            slug: listingSlug,
            variant: PENDING_APPROVAL_VARIANT,
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
      createListingsError = null,
      updateListingError = null,
      showListingsError = null,
      uploadImageError = null,
    } = page;
    const errors = {
      createListingsError,
      updateListingError,
      showListingsError,
      uploadImageError,
      createStripeAccountError,
    };

    // Show form if user is posting a new listing or editing existing one
    const disableForm = page.redirectToListing && !showListingsError;

    // Images are passed to EditListingForm so that it can generate thumbnails out of them
    const currentListingImages = currentListing ? currentListing.images : [];

    // Images not yet connected to the listing
    const unattachedImages = page.imageOrder.map(i => page.images[i]);

    const allImages = currentListingImages.concat(unattachedImages);
    const images = allImages.filter(img => {
      return !page.removedImageIds.includes(img.id);
    });

    const title = isNew
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
          newListingCreated={newListingCreated}
          history={history}
          images={images}
          listing={isNew ? page.listingDraft : currentListing}
          onCreateListing={onCreateListing}
          onUpdateListing={onUpdateListing}
          onCreateListingDraft={onCreateListingDraft}
          onUpdateListingDraft={onUpdateListingDraft}
          onPayoutDetailsFormChange={onPayoutDetailsFormChange}
          onPayoutDetailsSubmit={onPayoutDetailsSubmit}
          onImageUpload={onImageUpload}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveListingImage}
          onChange={onChange}
          currentUser={currentUser}
          onManageDisableScrolling={onManageDisableScrolling}
          updatedTab={page.updatedTab}
          updateInProgress={page.updateInProgress || page.createListingInProgress}
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
  currentUser: null,
  currentUserHasOrders: null,
  listing: null,
  listingDraft: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

const { bool, func, object, shape, string, oneOf } = PropTypes;

EditListingPageComponent.propTypes = {
  createStripeAccountError: propTypes.error,
  currentUser: propTypes.currentUser,
  fetchInProgress: bool.isRequired,
  getOwnListing: func.isRequired,
  onCreateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveListingImage: func.isRequired,
  onUpdateListingDraft: func.isRequired,
  onUpdateListing: func.isRequired,
  onChange: func.isRequired,
  page: object.isRequired,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(['new', 'edit']).isRequired,
    tab: string.isRequired,
  }).isRequired,
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
  const { createStripeAccountInProgress, createStripeAccountError, currentUser } = state.user;

  const fetchInProgress = createStripeAccountInProgress;

  const getOwnListing = id => {
    const listings = getMarketplaceEntities(state, [{ id, type: 'ownListing' }]);

    return listings.length === 1 ? listings[0] : null;
  };
  return {
    createStripeAccountError,
    currentUser,
    fetchInProgress,
    getOwnListing,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onCreateListing: values => dispatch(requestCreateListing(values)),
  onUpdateListing: (tab, values) => dispatch(requestUpdateListing(tab, values)),
  onCreateListingDraft: values => dispatch(createListingDraft(values)),
  onImageUpload: data => dispatch(requestImageUpload(data)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onPayoutDetailsFormChange: () => dispatch(stripeAccountClearError()),
  onPayoutDetailsSubmit: values => dispatch(createStripeAccount(values)),
  onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
  onRemoveListingImage: imageId => dispatch(removeListingImage(imageId)),
  onUpdateListingDraft: values => dispatch(updateListingDraft(values)),
  onChange: () => dispatch(clearUpdatedTab()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const EditListingPage = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(
  injectIntl(EditListingPageComponent)
);

EditListingPage.loadData = loadData;

export default EditListingPage;
