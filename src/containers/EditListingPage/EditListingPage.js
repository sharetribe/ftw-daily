import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { types } from 'sharetribe-sdk';
import { NamedRedirect, PageLayout } from '../../components';
import { EditListingForm } from '../../containers';
import { getListingsById } from '../../ducks/sdk.duck';
import { createSlug } from '../../util/urlHelpers';
import { requestCreateListing, requestShowListing } from './EditListingPage.duck';

const formatRequestData = values => {
  const { title, description } = values;
  return {
    title,
    description,
    address: 'Bulevardi 14, 00200 Helsinki, Finland',
    geolocation: {
      lat: 40.6,
      lng: 73.9,
    },
  };
};

const onSubmit = (submitListing, onLoadListing) => {
  return values =>
    submitListing(values).then(resp => onLoadListing(resp.payload.data.id.uuid)).catch(e => {
      // eslint-disable-next-line no-console
      console.error(e);
    });
};

// N.B. All the presentational content needs to be extracted to their own components
export class EditListingPageComponent extends Component {
  componentDidMount() {
    if (this.props.type === 'edit') {
      EditListingPageComponent.loadData(this.props.params.id, this.props.onLoadListing);
    }
  }

  render() {
    const { data, intl, onCreateListing, onLoadListing, page, params, type } = this.props;
    const isNew = type === 'new';
    const id = page.submittedListingId || new types.UUID(params.id);
    const listingsById = getListingsById(data, [id]);
    const currentListing = listingsById.length > 0 ? listingsById[0] : null;

    const shouldRedirect = page.submittedListingId && currentListing;
    const showForm = isNew || currentListing;

    if (shouldRedirect) {
      const slug = currentListing ? createSlug(currentListing.attributes.title) : null;
      return <NamedRedirect name="ListingPage" params={{ id: id.uuid, slug }} />;
    } else if (showForm) {
      const saveActionMsg = page.redirectToListing ? 'Redirecting to listing' : 'Create listing';
      const disableForm = page.redirectToListing && !page.showListingsError;

      // Currently creates a new listing based on existing one (sdk doesn't support listings.update)
      const initData = currentListing && type === 'edit'
        ? {
            title: currentListing.attributes.title,
            description: currentListing.attributes.description,
          }
        : {};

      return (
        <PageLayout title={'Edit listing'}>
          <EditListingForm
            onSubmit={onSubmit(onCreateListing, onLoadListing)}
            saveActionMsg={saveActionMsg}
            disabled={disableForm}
            initData={initData}
          />
        </PageLayout>
      );
    } else {
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
  onLoadListing: func.isRequired,
  onCreateListing: func.isRequired,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditListingPageComponent));
