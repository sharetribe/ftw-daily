import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ensureListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
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

/**
 * Check which wizard steps are active and which are not yet available. Step is active is previous
 * step is completed.
 *
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different steps of this wizard
 */
const stepsActive = listing => {
  const { address, description, geolocation, price, title } = listing.attributes;
  const descriptionStep = !!title && !!description;
  const locationStep = !!address && !!geolocation;
  const pricingStep = !!price;

  // photosStep is about adding listing.images

  return {
    [DESCRIPTION]: true,
    [LOCATION]: descriptionStep,
    [PRICING]: locationStep,
    [PHOTOS]: pricingStep,
  };
};

// TODO remove TestPanel when different wizard forms are available
const TestPanel = props => {
  return <div>{props.children}</div>;
};

TestPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

// Create a new or edit listing through EditListingWizard
const EditListingWizard = props => {
  const {
    className,
    flattenedRoutes,
    history,
    images,
    listing,
    onCreateListing,
    onCreateListingDraft,
    onImageUpload,
    onUpdateImageOrder,
    onUpdateListingDraft,
    rootClassName,
    selectedTab,
    currentUser,
  } = props;

  const rootClasses = rootClassName || css.root;
  const classes = classNames(rootClasses, className);
  const currentListing = ensureListing(listing);
  const stepsStatus = stepsActive(currentListing);

  // If selectedStep is not active, redirect to the beginning of wizard
  if (!stepsStatus[selectedTab]) {
    if (currentListing.id) {
      const slug = currentListing.id ? createSlug(currentListing.attributes.title) : null;
      return (
        <NamedRedirect
          name="EditListingDescriptionPage"
          params={{ id: currentListing.id.uuid, slug }}
        />
      );
    }
    return <NamedRedirect name="NewListingPage" />;
  }

  const descriptionLinkProps = currentListing.id
    ? { name: 'EditListingDescriptionPage' }
    : { name: 'NewListingPage' };

  const onUpsertListingDraft = currentListing.id ? onUpdateListingDraft : onCreateListingDraft;

  return (
    <Tabs className={classes}>
      <EditListingDescriptionPanel
        tabLabel="Description"
        tabLinkProps={descriptionLinkProps}
        selected={selectedTab === DESCRIPTION}
        disabled={!stepsStatus[DESCRIPTION]}
        listing={listing}
        onSubmit={values => {
          onUpsertListingDraft(values);
          // Redirect to EditListingLocationPage
          history.push(
            createResourceLocatorString('EditListingLocationPage', flattenedRoutes, {}, {})
          );
        }}
      />
      <EditListingLocationPanel
        tabLabel="Location"
        tabLinkProps={{ name: 'EditListingLocationPage' }}
        selected={selectedTab === LOCATION}
        disabled={!stepsStatus[LOCATION]}
        listing={listing}
        onSubmit={values => {
          const { selectedPlace: { address, origin } } = values.location;
          onUpdateListingDraft({ address, geolocation: origin });

          // Redirect to EditListingPricingPage
          history.push(
            createResourceLocatorString('EditListingPricingPage', flattenedRoutes, {}, {})
          );
        }}
      />
      <EditListingPricingPanel
        tabLabel="Pricing"
        tabLinkProps={{ name: 'EditListingPricingPage' }}
        selected={selectedTab === PRICING}
        disabled={!stepsStatus[PRICING]}
        listing={listing}
        onSubmit={values => {
          onUpdateListingDraft(values);
          // Redirect to EditListingPhotosPage
          history.push(
            createResourceLocatorString('EditListingPhotosPage', flattenedRoutes, {}, {})
          );
        }}
      />
      <EditListingPhotosPanel
        tabLabel="Photos"
        tabLinkProps={{ name: 'EditListingPhotosPage' }}
        selected={selectedTab === PHOTOS}
        disabled={!stepsStatus[PHOTOS]}
        listing={listing}
        images={images}
        onImageUpload={onImageUpload}
        onSubmit={values => {
          const { country, images: updatedImages } = values;
          onCreateListing({ ...listing.attributes, country, images: updatedImages });
        }}
        onUpdateImageOrder={onUpdateImageOrder}
        currentUser={currentUser}
      />
    </Tabs>
  );
};

EditListingWizard.defaultProps = {
  className: null,
  listing: null,
  rootClassName: null,
  currentUser: null,
};

const { array, arrayOf, func, object, oneOf, shape, string } = PropTypes;

EditListingWizard.propTypes = {
  className: string,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  images: array.isRequired,
  listing: shape({
    // TODO Should be propTypes.listing after API support is added.
    attributes: shape({
      address: string,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),
  onCreateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onUpdateListingDraft: func.isRequired,
  rootClassName: string,
  selectedTab: oneOf(STEPS).isRequired,
  currentUser: propTypes.currentUser,
};

export default EditListingWizard;
