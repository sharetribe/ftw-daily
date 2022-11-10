 import React from 'react';
import PropTypes from 'prop-types';
import { propTypes } from '../../util/types';
import { intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  // EditListingAvailabilityPanelDay,
  // EditListingAvailabilityPanelHour,
  EditListingAvailabilityPanel,
  EditListingDescriptionPanel,
  EditListingFeaturesPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditListingPoliciesPanel,
  EditListingPricingPanel,
  EditListingCapacityPanel,
  EditListingSeatsPanel
} from '../../components';

import css from './EditListingWizard.module.css';

export const AVAILABILITY = 'availability';
export const DESCRIPTION = 'description';
export const FEATURES = 'features';
export const CAPACITY = 'capacity';
export const SEATS = 'seats';
export const POLICY = 'policy';
export const LOCATION = 'location';
export const PRICING = 'pricing';
export const PHOTOS = 'photos';

// EditListingWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  DESCRIPTION,
  PHOTOS,
  FEATURES,
  CAPACITY,
  SEATS,
  POLICY,
  LOCATION,
  PRICING,
  AVAILABILITY
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditListingWizardTab
const redirectAfterDraftUpdate = (listingId, params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params,
    type: LISTING_PAGE_PARAM_TYPE_DRAFT,
    id: listingId,
  };
  const routes = routeConfiguration();

  // Replace current "new" path to "draft" path.
  // Browser's back button should lead to editing current draft instead of creating a new one.
  if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
    const draftURI = createResourceLocatorString('EditListingPage', routes, currentPathParams, {});
    history.replace(draftURI);
  }


  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  const to = createResourceLocatorString('EditListingPage', routes, nextPathParams, {});
  history.push(to);
};

const EditListingWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    fetchInProgress,
    newListingPublished,
    history,
    images,
    availability,
    listing,
    handleCreateFlowTabScrolling,
    handlePublishListing,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onUpdateImageOrder,
    onRemoveImage,
    onChange,
    onManageDisableScrolling,
    updatedTab,
    updateInProgress,
    intl,
    fetchExceptionsInProgress,
    availabilityExceptions,
    fetchListingProgress,
    onCurrentUserUpdateProfile,
    userPublicData
  } = props;

  const { type } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isNewListingFlow = isNewURI || isDraftURI;

  const currentListing = ensureListing(listing);
  const imageIds = images => {
    return images ? images.map(img => img.imageId || img.id) : null;
  };

  const onCompleteEditListingWizardTab = (tab, updateValues, passThrownErrors = false) => {
    // Normalize images for API call
    const { images: updatedImages, currency, ...otherValues } = updateValues;
    const imageProperty =
      typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages) } : {};
    let updateValuesWithImages = { ...otherValues, ...imageProperty };

    if (tab === PHOTOS && isNewListingFlow && updatedImages.length) {
      updateValuesWithImages = {
        ...updateValuesWithImages,
        publicData: {
          ...updateValuesWithImages.publicData,
          listingHasImages: true
        }
      }
    }

    if (tab === PRICING) {
      onCurrentUserUpdateProfile({ publicData: { currency } })
    }

    if (isNewListingFlow) {
      const onUpsertListingDraft = isNewURI
        ? (tab, updateValues) => onCreateListingDraft(updateValues)
        : onUpdateListing;

      const upsertValues = isNewURI
        ? updateValuesWithImages
        : { ...updateValuesWithImages, id: currentListing.id };


      return onUpsertListingDraft(tab, upsertValues)
        .then(r => {
          if (tab !== marketplaceTabs[marketplaceTabs.length - 1]) {
            // Create listing flow: smooth scrolling polyfill to scroll to correct tab
            handleCreateFlowTabScrolling(false);
            // After successful saving of draft data, user should be redirected to next tab
            redirectAfterDraftUpdate(r.data.data.id.uuid, params, tab, marketplaceTabs, history);
          } else if (tab === marketplaceTabs[marketplaceTabs.length - 1]) {
            handlePublishListing(currentListing.id);
          }
        })
        .catch(e => {
          if (passThrownErrors) {
            throw e;
          }
          // No need for extra actions
          // Error is logged in EditListingPage.duck file.
        });
    } else {
      return onUpdateListing(tab, { ...updateValuesWithImages, id: currentListing.id });
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
      onManageDisableScrolling,
      // newListingPublished and fetchInProgress are flags for the last wizard tab
      ready: newListingPublished,
      disabled: fetchInProgress,
      fetchListingProgress: fetchListingProgress
    };
  };

  switch (tab) {
    case DESCRIPTION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewDescription'
        : 'EditListingWizard.saveEditDescription';
      return (
        <EditListingDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case FEATURES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewFeatures'
        : 'EditListingWizard.saveEditFeatures';
      return (
        <EditListingFeaturesPanel
          {...panelProps(FEATURES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case CAPACITY: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewCapacity'
        : 'EditListingWizard.saveEditCapacity';
      return (
        <EditListingCapacityPanel
          {...panelProps(CAPACITY)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case SEATS: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewSeats'
        : 'EditListingWizard.saveEditSeats';
      return (
        <EditListingSeatsPanel
          {...panelProps(SEATS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case POLICY: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPolicies'
        : 'EditListingWizard.saveEditPolicies';
      return (
        <EditListingPoliciesPanel
          {...panelProps(POLICY)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case LOCATION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewLocation'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingLocationPanel
          {...panelProps(LOCATION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PRICING: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPricing'
        : 'EditListingWizard.saveEditPricing';
      return (
        <EditListingPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          userPublicData={userPublicData}
        />
      );
    }
    case AVAILABILITY: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditAvailability';

      // const { availabilityPlan } = listing.attributes
      // if (availabilityPlan && availabilityPlan.type === 'availability-plan/time') {
      //   return (
      //     <EditListingAvailabilityPanelHour
      //       {...panelProps(AVAILABILITY)}
      //       fetchExceptionsInProgress={fetchExceptionsInProgress}
      //       availabilityExceptions={availabilityExceptions}
      //       submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
      //       onCreateAvailabilityException={availability.onCreateAvailabilityException}
      //       onDeleteAvailabilityException={availability.onDeleteAvailabilityException}
      //       onSubmit={values => {
      //         // We want to return the Promise to the form,
      //         // so that it doesn't close its modal if an error is thrown.
      //         return onCompleteEditListingWizardTab(tab, values, true);
      //       }}
      //       onNextTab={() =>
      //         redirectAfterDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history)
      //       }
      //     />
      //   );
      // }

      // return (
      //   <EditListingAvailabilityPanelDay
      //     {...panelProps(AVAILABILITY)}
      //     availability={availability}
      //     submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
      //     onSubmit={values => {
      //       onCompleteEditListingWizardTab(tab, values);
      //     }}
      //   />
      // );

      return (
        <EditListingAvailabilityPanel
          {...panelProps(AVAILABILITY)}
          availability={availability}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PHOTOS: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPhotos'
        : 'EditListingWizard.saveEditPhotos';

      return (
        <EditListingPhotosPanel
          {...panelProps(PHOTOS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onUpdateImageOrder={onUpdateImageOrder}
        />
      );
    }
    default:
      return null;
  }
};

EditListingWizardTab.defaultProps = {
  listing: null,
  updatedTab: null,
  availabilityExceptions: [],
};

const { array, arrayOf, bool, func, object, oneOf, shape, string } = PropTypes;

EditListingWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  availabilityExceptions: arrayOf(propTypes.availabilityException),
  errors: shape({
    createListingDraftError: object,
    publishListingError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  fetchExceptionsInProgress: bool.isRequired,
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  images: array.isRequired,
  availability: object.isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  handleCreateFlowTabScrolling: func.isRequired,
  handlePublishListing: func.isRequired,
  onUpdateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveImage: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  intl: intlShape.isRequired,
};

export default EditListingWizardTab;
