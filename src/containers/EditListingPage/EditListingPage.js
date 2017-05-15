import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { union, without } from 'lodash';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { EditListingWizard, NamedRedirect, PageLayout } from '../../components';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import {
  createListingDraft,
  updateListingDraft,
  requestCreateListing,
  requestShowListing,
  requestImageUpload,
  updateImageOrder,
} from './EditListingPage.duck';

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
export class EditListingPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { pageClassNames: '' };
    this.togglePageClassNames = this.togglePageClassNames.bind(this);
  }
  togglePageClassNames(className, addClass = true) {
    this.setState(prevState => {
      const prevPageClassNames = prevState.pageClassNames.split(' ');
      const pageClassNames = addClass
        ? union(prevPageClassNames, [className]).join(' ')
        : without(prevPageClassNames, className).join(' ');

      return { pageClassNames };
    });
  }

  render() {
    const {
      flattenedRoutes,
      history,
      intl,
      onCreateListing,
      onImageUpload,
      onUpdateImageOrder,
      page,
      params,
      tab,
      type,
      currentUser,
      getListing,
      onCreateListingDraft,
      onUpdateListingDraft,
    } = this.props;
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
        <PageLayout title={title} className={this.state.pageClassNames}>
          <EditListingWizard
            disabled={disableForm}
            flattenedRoutes={flattenedRoutes}
            history={history}
            images={images}
            listing={page.listingDraft}
            onCreateListing={onCreateListing}
            onCreateListingDraft={onCreateListingDraft}
            onUpdateListingDraft={onUpdateListingDraft}
            onImageUpload={onImageUpload}
            onUpdateImageOrder={onUpdateImageOrder}
            selectedTab={tab}
            currentUser={currentUser}
            togglePageClassNames={this.togglePageClassNames}
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
  }
}

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

const { arrayOf, func, object, shape, string } = PropTypes;

EditListingPageComponent.propTypes = {
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  onCreateListing: func.isRequired,
  onImageUpload: func.isRequired,
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
  onUpdateListingDraft: func.isRequired,
};

const mapStateToProps = state => {
  const page = state.EditListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const listings = getListingsById(state, [id]);
    return listings.length === 1 ? listings[0] : null;
  };
  return { page, currentUser, getListing };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateListing: values => dispatch(requestCreateListing(formatRequestData(values))),
    onImageUpload: data => dispatch(requestImageUpload(data)),
    onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
    onCreateListingDraft: values => dispatch(createListingDraft(values)),
    onUpdateListingDraft: values => dispatch(updateListingDraft(values)),
  };
};

const EditListingPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  injectIntl(EditListingPageComponent)
);

export default EditListingPage;
