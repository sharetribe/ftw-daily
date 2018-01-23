import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { withViewport } from '../../util/contextHelpers';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditListingDescriptionPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditListingPoliciesPanel,
  EditListingPricingPanel,
  NamedRedirect,
  Tabs,
} from '../../components';

import css from './EditListingWizard.css';

const DESCRIPTION = 'description';
const POLICY = 'policy';
const LOCATION = 'location';
const PRICING = 'pricing';
const PHOTOS = 'photos';
const STEPS = [DESCRIPTION, POLICY, LOCATION, PRICING, PHOTOS];

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const submitText = (intl, isNew, step) => {
  let key = null;
  if (step === DESCRIPTION) {
    key = isNew ? 'EditListingWizard.saveNewDescription' : 'EditListingWizard.saveEditDescription';
  } else if (step === POLICY) {
    key = isNew ? 'EditListingWizard.saveNewPolicies' : 'EditListingWizard.saveEditPolicies';
  } else if (step === LOCATION) {
    key = isNew ? 'EditListingWizard.saveNewLocation' : 'EditListingWizard.saveEditLocation';
  } else if (step === PRICING) {
    key = isNew ? 'EditListingWizard.saveNewPricing' : 'EditListingWizard.saveEditPricing';
  } else if (step === PHOTOS) {
    key = isNew ? 'EditListingWizard.saveNewPhotos' : 'EditListingWizard.saveEditPhotos';
  }
  return intl.formatMessage({ id: key });
};

const tabLabel = (intl, step) => {
  let key = null;
  if (step === DESCRIPTION) {
    key = 'EditListingWizard.tabLabelDescription';
  } else if (step === POLICY) {
    key = 'EditListingWizard.tabLabelPolicy';
  } else if (step === LOCATION) {
    key = 'EditListingWizard.tabLabelLocation';
  } else if (step === PRICING) {
    key = 'EditListingWizard.tabLabelPricing';
  } else if (step === PHOTOS) {
    key = 'EditListingWizard.tabLabelPhotos';
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
  const policyStep = !!(publicData && typeof publicData.saunaRules !== 'undefined');
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
    [POLICY]: descriptionStep,
    [LOCATION]: policyStep,
    [PRICING]: locationStep,
    [PHOTOS]: pricingStep,
  };
};

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

// Create a new or edit listing through EditListingWizard
class EditListingWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;
  }

  render() {
    const {
      id,
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
      viewport,
    } = this.props;

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

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const panelProps = tab => {
      return {
        className: css.panel,
        disabled: !stepsStatus[tab],
        errors,
        listing,
        onChange,
        panelUpdated: updatedTab === tab,
        selected: selectedTab === tab,
        submitButtonText: submitText(intl, isNew, tab),
        tabId: `${id}_${tab}`,
        tabLabel: tabLabel(intl, tab),
        tabLinkProps: tabLink(tab),
        updateInProgress,
      };
    };

    return (
      <Tabs rootClassName={classes} navRootClassName={css.nav} tabRootClassName={css.tab}>
        <EditListingDescriptionPanel
          {...panelProps(DESCRIPTION)}
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
              const pathParams = tabParams(POLICY);
              // Redirect to location tab
              history.push(
                createResourceLocatorString('EditListingPage', routeConfiguration(), pathParams, {})
              );
            } else {
              update(DESCRIPTION, updateValues);
            }
          }}
        />
        <EditListingPoliciesPanel
          {...panelProps(POLICY)}
          onSubmit={values => {
            const { saunaRules = '' } = values;
            const updateValues = {
              publicData: {
                saunaRules,
              },
            };

            if (isNew) {
              onUpdateListingDraft(updateValues);
              const pathParams = tabParams(LOCATION);
              // Redirect to pricing tab
              history.push(
                createResourceLocatorString('EditListingPage', routeConfiguration(), pathParams, {})
              );
            } else {
              update(POLICY, updateValues);
            }
          }}
        />
        <EditListingLocationPanel
          {...panelProps(LOCATION)}
          onSubmit={values => {
            const { building = '', location } = values;
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
          {...panelProps(PRICING)}
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
          {...panelProps(PHOTOS)}
          newListingCreated={newListingCreated}
          fetchInProgress={fetchInProgress}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onPayoutDetailsFormChange={onPayoutDetailsFormChange}
          onPayoutDetailsSubmit={onPayoutDetailsSubmit}
          onSubmit={values => {
            const { country, images: updatedImages } = values;
            const updateValues = { ...listing.attributes, country, images: updatedImages };
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
  }
}

EditListingWizard.defaultProps = {
  className: null,
  errors: null,
  listing: null,
  rootClassName: null,
  currentUser: null,
  updatedTab: null,
};

const { array, bool, func, number, object, oneOf, shape, string } = PropTypes;

EditListingWizard.propTypes = {
  id: string.isRequired,
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

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withViewport, injectIntl)(EditListingWizard);
