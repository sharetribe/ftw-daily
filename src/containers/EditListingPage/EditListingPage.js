import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { types } from '../../util/sdkLoader';
import { NamedRedirect, PageLayout } from '../../components';
import { EditListingForm } from '../../containers';
import { getListingsById } from '../../ducks/sdk.duck';
import { createSlug } from '../../util/urlHelpers';
import {
  requestCreateListing,
  requestShowListing,
  requestImageUpload,
  updateImageOrder,
} from './EditListingPage.duck';

const formatRequestData = values => {
  const { description, images, location, price, title, bankAccountToken } = values;
  const { selectedPlace: { address, origin, country } } = location;

  return {
    address,
    description,
    geolocation: origin,
    images: images.map(i => i.imageId),
    price,
    title,
    country,
    bankAccountToken,
  };
};

const onSubmit = submitListing => {
  return values => submitListing(values);
};

// N.B. All the presentational content needs to be extracted to their own components
export class EditListingPageComponent extends Component {
  componentDidMount() {
    if (this.props.type === 'edit') {
      EditListingPageComponent.loadData(this.props.params.id, this.props.onLoadListing);
    }
  }

  render() {
    const {
      data,
      intl,
      onCreateListing,
      onImageUpload,
      onUpdateImageOrder,
      page,
      params,
      type,
    } = this.props;
    const isNew = type === 'new';
    const id = page.submittedListingId || (params && new types.UUID(params.id));
    const listingsById = getListingsById(data, [id]);
    const currentListing = listingsById.length > 0 ? listingsById[0] : null;

    const shouldRedirect = page.submittedListingId && currentListing;
    const showForm = isNew || currentListing;

    if (shouldRedirect) {
      // If page has already listingId (after submit) and current listings exist
      // redirect to listing page
      const slug = currentListing ? createSlug(currentListing.attributes.title) : null;
      return <NamedRedirect name="ListingPage" params={{ id: id.uuid, slug }} />;
    } else if (showForm) {
      // Show form if user is posting a new listing or editing existing one
      const saveActionMsg = page.redirectToListing ? 'Redirecting to listing' : 'Create listing';
      const disableForm = page.redirectToListing && !page.showListingsError;

      // Currently creates a new listing based on existing one (sdk doesn't support listings.update)
      const initData = currentListing && type === 'edit'
        ? {
            title: currentListing.attributes.title,
            description: currentListing.attributes.description,
          }
        : {};

      // Images are passed to EditListingForm so that it can generate thumbnails out of them
      const images = page.imageOrder.map(i => page.images[i]);
      const title = isNew
        ? intl.formatMessage({ id: 'EditListingPage.titleCreateListing' })
        : intl.formatMessage({ id: 'EditListingPage.titleEditListing' });

      return (
        <PageLayout title={title}>
          <EditListingForm
            disabled={disableForm}
            images={images}
            initData={initData}
            onImageUpload={onImageUpload}
            onSubmit={onSubmit(onCreateListing)}
            onUpdateImageOrder={onUpdateImageOrder}
            saveActionMsg={saveActionMsg}
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

EditListingPageComponent.loadData = (id, onLoadListing) => {
  onLoadListing(id);
};

EditListingPageComponent.defaultProps = { listing: null, params: null, type: 'edit' };

const { func, object, shape, string } = PropTypes;

EditListingPageComponent.propTypes = {
  data: object.isRequired,
  intl: intlShape.isRequired,
  onCreateListing: func.isRequired,
  onLoadListing: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  page: object.isRequired,
  params: shape({
    id: string,
    slug: string,
  }),
  type: string,
};

const mapStateToProps = state => {
  const { data = {}, EditListingPage } = state;
  return { page: EditListingPage, data };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadListing: id => dispatch(requestShowListing({ id, include: ['author', 'images'] })),
    onCreateListing: values => dispatch(requestCreateListing(formatRequestData(values))),
    onImageUpload: data => dispatch(requestImageUpload(data)),
    onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditListingPageComponent));
