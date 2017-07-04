import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { EditListingWizard, NamedRedirect, PageLayout } from '../../components';
import { Topbar } from '../../containers';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { createStripeAccount } from '../../ducks/user.duck';
import {
  createListingDraft,
  updateListingDraft,
  requestCreateListing,
  requestShowListing,
  requestImageUpload,
  updateImageOrder,
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
    fetchInProgress,
    flattenedRoutes,
    history,
    intl,
    location,
    onCreateListing,
    onImageUpload,
    onPayoutDetailsSubmit,
    onUpdateImageOrder,
    page,
    params,
    tab,
    type,
    currentUser,
    getListing,
    onCreateListingDraft,
    onManageDisableScrolling,
    onUpdateListingDraft,
    scrollingDisabled,
  } = props;
  const isNew = type === 'new';
  const hasIdParam = params && params.id;
  const id = page.submittedListingId || (hasIdParam ? new types.UUID(params.id) : null);
  const currentListing = getListing(id);

  const shouldRedirect = page.submittedListingId && currentListing;
  const showForm = isNew || currentListing;

  if (shouldRedirect) {
    // If page has already listingId (after submit) and current listings exist
    // redirect to listing page
    const slug = currentListing ? createSlug(currentListing.attributes.title) : null;
    return <NamedRedirect name="ListingPage" params={{ id: id.uuid, slug }} />;
  } else if (showForm) {
    // Show form if user is posting a new listing or editing existing one
    const disableForm = page.redirectToListing && !page.showListingsError;

    // Images are passed to EditListingForm so that it can generate thumbnails out of them
    const images = page.imageOrder.map(i => page.images[i]);

    const title = isNew
      ? intl.formatMessage({ id: 'EditListingPage.titleCreateListing' })
      : intl.formatMessage({ id: 'EditListingPage.titleEditListing' });

    return (
      <PageLayout title={title} scrollingDisabled={scrollingDisabled}>
        <Topbar history={history} location={location} />
        <EditListingWizard
          className={css.wizard}
          disabled={disableForm}
          fetchInProgress={fetchInProgress}
          flattenedRoutes={flattenedRoutes}
          history={history}
          images={images}
          listing={page.listingDraft}
          onCreateListing={onCreateListing}
          onCreateListingDraft={onCreateListingDraft}
          onUpdateListingDraft={onUpdateListingDraft}
          onPayoutDetailsSubmit={onPayoutDetailsSubmit}
          onImageUpload={onImageUpload}
          onUpdateImageOrder={onUpdateImageOrder}
          selectedTab={tab}
          currentUser={currentUser}
          onManageDisableScrolling={onManageDisableScrolling}
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

EditListingPageComponent.loadData = id => {
  requestShowListing({ id, include: ['author', 'images'] });
};

EditListingPageComponent.defaultProps = {
  listing: null,
  listingDraft: null,
  params: null,
  type: 'edit',
  currentUser: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

EditListingPageComponent.propTypes = {
  fetchInProgress: bool.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: object.isRequired,
  intl: intlShape.isRequired,
  onCreateListing: func.isRequired,
  onImageUpload: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  page: object.isRequired,
  params: shape({
    id: string,
    slug: string,
  }),
  tab: string.isRequired,
  type: string,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onUpdateListingDraft: func.isRequired,
  scrollingDisabled: bool.isRequired,
};

const mapStateToProps = state => {
  const page = state.EditListingPage;
  const { currentUser, createStripeAccountInProgress } = state.user;
  const fetchInProgress = createStripeAccountInProgress;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };
  return {
    page,
    currentUser,
    getListing,
    fetchInProgress,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateListing: values => dispatch(requestCreateListing(formatRequestData(values))),
    onImageUpload: data => dispatch(requestImageUpload(data)),
    onPayoutDetailsSubmit: values => dispatch(createStripeAccount(values)),
    onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
    onCreateListingDraft: values => dispatch(createListingDraft(values)),
    onUpdateListingDraft: values => dispatch(updateListingDraft(values)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
  };
};

const EditListingPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  injectIntl(EditListingPageComponent)
);

export default EditListingPage;
