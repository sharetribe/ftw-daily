import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditListingDescriptionPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditListingPricingPanel,
  NamedRedirect,
  Tabs,
} from '../../components';

import css from './EditListingWizard.css';

const DESCRIPTION = 'description';
const LOCATION = 'location';
const PRICING = 'pricing';
const PHOTOS = 'photos';
const STEPS = [DESCRIPTION, LOCATION, PRICING, PHOTOS];

const submitText = (intl, isNew, step) => {
  let key = null;
  if (step === DESCRIPTION) {
    key = isNew ? 'EditListingWizard.saveNewDescription' : 'EditListingWizard.saveEditDescription';
  } else if (step === LOCATION) {
    key = isNew ? 'EditListingWizard.saveNewLocation' : 'EditListingWizard.saveEditLocation';
  } else if (step === PRICING) {
    key = isNew ? 'EditListingWizard.saveNewPricing' : 'EditListingWizard.saveEditPricing';
  } else if (step === PHOTOS) {
    key = isNew ? 'EditListingWizard.saveNewPhotos' : 'EditListingWizard.saveEditPhotos';
  }
  return intl.formatMessage({ id: key });
};

/**
 * Check which wizard steps are active and which are not yet available. Step is active is previous
 * step is completed.
 *
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different steps of this wizard
 */
const stepsActive = listing => {
  const { description, geolocation, price, title, publicData } = listing.attributes;
  const descriptionStep = !!(title && description);
  const locationStep = !!(
    geolocation &&
    publicData &&
    publicData.location &&
    publicData.location.address
  );
  const pricingStep = !!price;

  // photosStep is about adding listing.images

  return {
    [DESCRIPTION]: true,
    [LOCATION]: descriptionStep,
    [PRICING]: locationStep,
    [PHOTOS]: pricingStep,
  };
};

// Create a new or edit listing through EditListingWizard
const EditListingWizard = props => {
  const {
    className,
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
    rootClassName,
    currentUser,
    onManageDisableScrolling,
    updatedTab,
    updateInProgress,
    intl,
  } = props;

  const isNew = params.type === 'new';
  const selectedTab = params.tab;
  const rootClasses = rootClassName || css.root;
  const classes = classNames(rootClasses, className);
  const currentListing = ensureListing(listing);
  const stepsStatus = stepsActive(currentListing);

  const tabParams = tab => {
    return { ...params, tab };
  };
  const tabLink = tab => {
    return { name: 'EditListingPage', params: tabParams(tab) };
  };

  // If selectedStep is not active, redirect to the beginning of wizard
  if (!stepsStatus[selectedTab]) {
    return <NamedRedirect name="EditListingPage" params={tabParams(DESCRIPTION)} />;
  }

  const onUpsertListingDraft = currentListing.id ? onUpdateListingDraft : onCreateListingDraft;
  const update = (tab, values) => {
    onUpdateListing(tab, { ...values, id: currentListing.id });
  };

  return (
    <Tabs rootClassName={classes} navRootClassName={css.nav} tabRootClassName={css.tab}>
      <EditListingDescriptionPanel
        className={css.panel}
        tabLabel={intl.formatMessage({ id: 'EditListingWizard.tabLabelDescription' })}
        tabLinkProps={tabLink(DESCRIPTION)}
        selected={selectedTab === DESCRIPTION}
        panelUpdated={updatedTab === DESCRIPTION}
        updateInProgress={updateInProgress}
        disabled={!stepsStatus[DESCRIPTION]}
        errors={errors}
        listing={listing}
        submitButtonText={submitText(intl, isNew, DESCRIPTION)}
        onChange={onChange}
        onSubmit={values => {
          const { title, description, category } = values;
          const updateValues = {
            title,
            description,
            customAttributes: { category },
            publicData: { category },
          };

          if (isNew) {
            onUpsertListingDraft(updateValues);
            const pathParams = tabParams(LOCATION);
            // Redirect to location tab
            history.push(
              createResourceLocatorString('EditListingPage', routeConfiguration(), pathParams, {})
            );
          } else {
            update(DESCRIPTION, updateValues);
          }
        }}
      />
      <EditListingLocationPanel
        className={css.panel}
        tabLabel={intl.formatMessage({ id: 'EditListingWizard.tabLabelLocation' })}
        tabLinkProps={tabLink(LOCATION)}
        selected={selectedTab === LOCATION}
        panelUpdated={updatedTab === LOCATION}
        updateInProgress={updateInProgress}
        disabled={!stepsStatus[LOCATION]}
        errors={errors}
        listing={listing}
        submitButtonText={submitText(intl, isNew, LOCATION)}
        onChange={onChange}
        onSubmit={values => {
          const { building = "", location } = values;
          const { selectedPlace: { address, origin } } = location;
          const updateValues = {
            geolocation: origin,
            publicData: {
              location: { address, building },
            },
          };

          if (isNew) {
            onUpdateListingDraft(updateValues);
            const pathParams = tabParams(PRICING);
            // Redirect to pricing tab
            history.push(
              createResourceLocatorString('EditListingPage', routeConfiguration(), pathParams, {})
            );
          } else {
            update(LOCATION, updateValues);
          }
        }}
      />
      <EditListingPricingPanel
        className={css.panel}
        tabLabel={intl.formatMessage({ id: 'EditListingWizard.tabLabelPricing' })}
        tabLinkProps={tabLink(PRICING)}
        selected={selectedTab === PRICING}
        panelUpdated={updatedTab === PRICING}
        updateInProgress={updateInProgress}
        disabled={!stepsStatus[PRICING]}
        errors={errors}
        listing={listing}
        submitButtonText={submitText(intl, isNew, PRICING)}
        onChange={onChange}
        onSubmit={values => {
          if (isNew) {
            onUpdateListingDraft(values);
            const pathParams = tabParams(PHOTOS);
            // Redirect to photos tab
            history.push(
              createResourceLocatorString('EditListingPage', routeConfiguration(), pathParams, {})
            );
          } else {
            update(PRICING, values);
          }
        }}
      />
      <EditListingPhotosPanel
        className={css.panel}
        tabLabel={intl.formatMessage({ id: 'EditListingWizard.tabLabelPhotos' })}
        tabLinkProps={tabLink(PHOTOS)}
        selected={selectedTab === PHOTOS}
        disabled={!stepsStatus[PHOTOS]}
        panelUpdated={updatedTab === PHOTOS}
        newListingCreated={newListingCreated}
        updateInProgress={updateInProgress}
        errors={errors}
        fetchInProgress={fetchInProgress}
        listing={listing}
        images={images}
        onImageUpload={onImageUpload}
        onRemoveImage={onRemoveImage}
        onPayoutDetailsFormChange={onPayoutDetailsFormChange}
        onPayoutDetailsSubmit={onPayoutDetailsSubmit}
        submitButtonText={submitText(intl, isNew, PHOTOS)}
        onChange={onChange}
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
    </Tabs>
  );
};

EditListingWizard.defaultProps = {
  className: null,
  errors: null,
  listing: null,
  rootClassName: null,
  currentUser: null,
  updatedTab: null,
};

const { array, bool, func, object, oneOf, shape, string } = PropTypes;

EditListingWizard.propTypes = {
  className: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(['new', 'edit']).isRequired,
    tab: oneOf(STEPS).isRequired,
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
  rootClassName: string,
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(EditListingWizard);
