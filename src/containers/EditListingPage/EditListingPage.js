import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { EditListingWizard, NamedRedirect, PageLayout, Topbar } from '../../components';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { createStripeAccount } from '../../ducks/user.duck';
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

const formatRequestData = values => {
  const {
    address,
    description,
    images,
    geolocation,
    price,
    title,
  } = values;

  return {
    address,
    description,
    geolocation,
    images: images.map(i => i.imageId),
    price,
    title,
  };
};

// N.B. All the presentational content needs to be extracted to their own components
export const EditListingPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    fetchInProgress,
    flattenedRoutes,
    getListing,
    history,
    intl,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onCreateListing,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onRemoveListingImage,
    onLogout,
    onManageDisableScrolling,
    onPayoutDetailsSubmit,
    onUpdateImageOrder,
    onUpdateListingDraft,
    onChange,
    page,
    params,
    scrollingDisabled,
  } = props;

  const { id, type } = params;

  const isNew = type === 'new';
  const listingId = page.submittedListingId || (id ? new types.UUID(id) : null);
  const currentListing = getListing(listingId);

  const shouldRedirect = page.submittedListingId && currentListing;
  const showForm = isNew || currentListing;

  if (shouldRedirect) {
    // If page has already listingId (after submit) and current listings exist
    // redirect to listing page
    const listingSlug = currentListing ? createSlug(currentListing.attributes.title) : null;
    return <NamedRedirect name="ListingPage" params={{ id: listingId.uuid, slug: listingSlug }} />;
  } else if (showForm) {
    const {
      createListingsError = null,
      updateListingError = null,
      showListingsError = null,
      uploadImageError = null,
    } = page;
    const errors = { createListingsError, updateListingError, showListingsError, uploadImageError };

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
      <PageLayout
        authInfoError={authInfoError}
        logoutError={logoutError}
        title={title}
        scrollingDisabled={scrollingDisabled}
      >
        <Topbar
          className={css.topbar}
          mobileRootClassName={css.mobileTopbar}
          isAuthenticated={isAuthenticated}
          authInProgress={authInProgress}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          notificationCount={notificationCount}
          history={history}
          location={location}
          onLogout={onLogout}
          onManageDisableScrolling={onManageDisableScrolling}
        />
        <EditListingWizard
          className={css.wizard}
          params={params}
          disabled={disableForm}
          errors={errors}
          fetchInProgress={fetchInProgress}
          flattenedRoutes={flattenedRoutes}
          history={history}
          images={images}
          listing={isNew ? page.listingDraft : currentListing}
          onCreateListing={onCreateListing}
          onUpdateListing={onUpdateListing}
          onCreateListingDraft={onCreateListingDraft}
          onUpdateListingDraft={onUpdateListingDraft}
          onPayoutDetailsSubmit={onPayoutDetailsSubmit}
          onImageUpload={onImageUpload}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveListingImage}
          onChange={onChange}
          currentUser={currentUser}
          onManageDisableScrolling={onManageDisableScrolling}
          updatedTab={page.updatedTab}
          updateInProgress={page.updateInProgress}
        />
      </PageLayout>
    );
  } else {
    // If user has come to this page through a direct linkto edit existing listing,
    // we need to load it first.
    const loadingPageMsg = {
      id: 'ListingPage.loadingListingData',
    };
    return <PageLayout title={intl.formatMessage(loadingPageMsg)} />;
  }
};

EditListingPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  listing: null,
  listingDraft: null,
  logoutError: null,
  notificationCount: 0,
};

const { arrayOf, bool, func, instanceOf, number, object, shape, string, oneOf } = PropTypes;

EditListingPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  fetchInProgress: bool.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  getListing: func.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onCreateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
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
  location: object.isRequired,
  /* from injectIntl */
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const page = state.EditListingPage;
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    createStripeAccountInProgress,
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;

  const fetchInProgress = createStripeAccountInProgress;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    fetchInProgress,
    getListing,
    isAuthenticated,
    logoutError,
    notificationCount,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onCreateListing: values => dispatch(requestCreateListing(formatRequestData(values))),
  onUpdateListing: (tab, values) => dispatch(requestUpdateListing(tab, values)),
  onCreateListingDraft: values => dispatch(createListingDraft(values)),
  onImageUpload: data => dispatch(requestImageUpload(data)),
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onPayoutDetailsSubmit: values => dispatch(createStripeAccount(values)),
  onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
  onRemoveListingImage: imageId => dispatch(removeListingImage(imageId)),
  onUpdateListingDraft: values => dispatch(updateListingDraft(values)),
  onChange: () => dispatch(clearUpdatedTab()),
});

const EditListingPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  injectIntl(EditListingPageComponent)
);

EditListingPage.loadData = loadData;

export default EditListingPage;
