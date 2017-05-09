import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ensureListing } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import { NamedRedirect, Tabs } from '../../components';

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
    listing,
    onCreateListing,
    onCreateListingDraft,
    onUpdateListingDraft,
    rootClassName,
    selectedTab,
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
      <TestPanel
        tabLabel="Description"
        tabLinkProps={descriptionLinkProps}
        onSubmit={onUpcertListingDraft}
        selected={selectedTab === DESCRIPTION}
        disabled={!stepsStatus[DESCRIPTION]}
      >
        Description form
      </TestPanel>
      <TestPanel
        tabLabel="Location"
        tabLinkProps={{ name: 'EditListingLocationPage' }}
        onSubmit={onUpdateListingDraft}
        selected={selectedTab === LOCATION}
        disabled={!stepsStatus[LOCATION]}
      >
        Location form
      </TestPanel>
      <TestPanel
        tabLabel="Pricing"
        tabLinkProps={{ name: 'EditListingPricePage' }}
        onSubmit={onUpdateListingDraft}
        selected={selectedTab === PRICE}
        disabled={!stepsStatus[PRICING]}
      >
        Pricing form
      </TestPanel>
      <TestPanel
        tabLabel="Photos"
        tabLinkProps={{ name: 'EditListingPhotosPage' }}
        onSubmit={onCreateListing}
        selected={selectedTab === PHOTOS}
        disabled={!stepsStatus[PHOTOS]}
      >
        Photos form
      </TestPanel>
    </Tabs>
  );
};

EditListingWizard.defaultProps = {
  className: null,
  listing: null,
  rootClassName: null,
};

const { func, oneOf, string } = PropTypes;

EditListingWizard.propTypes = {
  className: string,
  listing: propTypes.listing,
  onCreateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onUpdateListingDraft: func.isRequired,
  rootClassName: string,
  selectedTab: oneOf(STEPS).isRequired,
};

export default EditListingWizard;
