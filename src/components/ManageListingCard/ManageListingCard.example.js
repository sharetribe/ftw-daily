/* eslint-disable no-console */
import React from 'react';
import ManageListingCard from './ManageListingCard';
import { createListing, fakeIntl } from '../../util/test-data';

const noop = () => null;

const ManageListingCardWrapper = props => (
  <div style={{ maxWidth: '400px' }}>
    <ManageListingCard {...props} />
  </div>
);

export const ManageListingCardWrapped = {
  component: ManageListingCardWrapper,
  props: {
    intl: fakeIntl,
    listing: createListing('listing1'),
    isMenuOpen: false,
    onCloseListing: noop,
    onOpenListing: noop,
    onToggleMenu: noop,
    flattenedRoutes: [],
    history: { push: noop },
  },
};
