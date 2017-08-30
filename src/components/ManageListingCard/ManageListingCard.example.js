/* eslint-disable no-console */
import React from 'react';
import ManageListingCard from './ManageListingCard';
import { createOwnListing, fakeIntl } from '../../util/test-data';

const noop = () => null;
const listing = { ...createOwnListing('listing1') };

const ManageListingCardWrapper = props => (
  <div style={{ maxWidth: '400px' }}>
    <ManageListingCard {...props} />
  </div>
);

export const ManageListingCardWrapped = {
  component: ManageListingCardWrapper,
  props: {
    intl: fakeIntl,
    listing,
    isMenuOpen: false,
    onCloseListing: noop,
    onOpenListing: noop,
    onToggleMenu: noop,
    flattenedRoutes: [],
    history: { push: noop },
  },
};
