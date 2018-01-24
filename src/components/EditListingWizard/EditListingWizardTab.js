import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditListingDescriptionPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditListingPoliciesPanel,
  EditListingPricingPanel,
} from '../../components';

import css from './EditListingWizard.css';

export const DESCRIPTION = 'description';
export const POLICY = 'policy';
export const LOCATION = 'location';
export const PRICING = 'pricing';
export const PHOTOS = 'photos';

// EditListingWizardTab component supports these tabs
export const SUPPORTED_TABS = [DESCRIPTION, POLICY, LOCATION, PRICING, PHOTOS];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

const EditListingWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    fetchInProgress,
    newListingCreated,
    history,
    images,
    listing,
    onCreateListing,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onPayoutDetailsFormChange,
    onPayoutDetailsSubmit,
    onUpdateImageOrder,
    onRemoveImage,
    onUpdateListingDraft,
    onChange,
    currentUser,
    onManageDisableScrolling,
    updatedTab,
    updateInProgress,
    intl,
  } = props;

  const isNew = params.type === 'new';
  const currentListing = ensureListing(listing);

  const onUpsertListingDraft = currentListing.id ? onUpdateListingDraft : onCreateListingDraft;
  const update = (tab, values) => {
    onUpdateListing(tab, { ...values, id: currentListing.id });
  };
  const onCompleteEditListingWizardTab = (tab, updateValues) => {
    if (isNew) {
      onUpsertListingDraft(updateValues);
      // Redirect to next tab
      const pathParams = pathParamsToNextTab(params, tab, marketplaceTabs);
      history.push(
        createResourceLocatorString('EditListingPage', routeConfiguration(), pathParams, {})
      );
    } else {
      update(tab, updateValues);
    }
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      listing,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
    };
  };

  switch (tab) {
    case DESCRIPTION: {
      const submitButtonTranslationKey = isNew
        ? 'EditListingWizard.saveNewDescription'
        : 'EditListingWizard.saveEditDescription';
      return (
        <EditListingDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            const { title, description, category } = values;
            const updateValues = {
              title,
              description,
              customAttributes: { category },
              publicData: { category },
            };

            onCompleteEditListingWizardTab(tab, updateValues);
          }}
        />
      );
    }
    case POLICY: {
      const submitButtonTranslationKey = isNew
        ? 'EditListingWizard.saveNewPolicies'
        : 'EditListingWizard.saveEditPolicies';
      return (
        <EditListingPoliciesPanel
          {...panelProps(POLICY)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            const updateValues = {
              publicData: {
                ...values,
              },
            };

            onCompleteEditListingWizardTab(tab, updateValues);
          }}
        />
      );
    }
    case LOCATION: {
      const submitButtonTranslationKey = isNew
        ? 'EditListingWizard.saveNewLocation'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingLocationPanel
          {...panelProps(LOCATION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            const { building = '', location } = values;
            const { selectedPlace: { address, origin } } = location;
            const updateValues = {
              geolocation: origin,
              publicData: {
                location: { address, building },
              },
            };

            onCompleteEditListingWizardTab(tab, updateValues);
          }}
        />
      );
    }
    case PRICING: {
      const submitButtonTranslationKey = isNew
        ? 'EditListingWizard.saveNewPricing'
        : 'EditListingWizard.saveEditPricing';
      return (
        <EditListingPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PHOTOS: {
      const submitButtonTranslationKey = isNew
        ? 'EditListingWizard.saveNewPhotos'
        : 'EditListingWizard.saveEditPhotos';
      return (
        <EditListingPhotosPanel
          {...panelProps(PHOTOS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          newListingCreated={newListingCreated}
          fetchInProgress={fetchInProgress}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onPayoutDetailsFormChange={onPayoutDetailsFormChange}
          onPayoutDetailsSubmit={onPayoutDetailsSubmit}
          onSubmit={values => {
            const { images: updatedImages } = values;
            const updateValues = { ...listing.attributes, images: updatedImages };

            if (isNew) {
              onCreateListing(updateValues);
            } else {
              const imageIds = updatedImages.map(img => img.imageId || img.id);
              update(PHOTOS, { images: imageIds });
            }
          }}
          onUpdateImageOrder={onUpdateImageOrder}
          currentUser={currentUser}
          onManageDisableScrolling={onManageDisableScrolling}
        />
      );
    }
    default:
      return null;
  }
};

EditListingWizardTab.defaultProps = {
  errors: null,
  listing: null,
  currentUser: null,
  updatedTab: null,
};

const { array, bool, func, object, oneOf, shape, string } = PropTypes;

EditListingWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(['new', 'edit']).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  errors: shape({
    createListingsError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  newListingCreated: bool.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  images: array.isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      customAttributes: object, // structure (key: value) can be defined in management console
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  onCreateListing: func.isRequired,
  onUpdateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveImage: func.isRequired,
  onUpdateListingDraft: func.isRequired,
  onChange: func.isRequired,
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  intl: intlShape.isRequired,
};

export default EditListingWizardTab;
