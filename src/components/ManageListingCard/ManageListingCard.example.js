/* eslint-disable no-console */
import React from 'react';
import ManageListingCard from './ManageListingCard';
import { createOwnListing, fakeIntl } from '../../util/test-data';

const noop = () => null;

const ManageListingCardWrapper = props => (
  <div style={{ maxWidth: '400px' }}>
    <ManageListingCard {...props} />
  </div>
);

export const ManageListingCardWrapped = {
  component: ManageListingCardWrapper,
  props: {
    hasClosingError: false,
    hasOpeningError: false,
    intl: fakeIntl,
    listing: createOwnListing('listing1'),
    isMenuOpen: false,
    onCloseListing: noop,
    onOpenListing: noop,
    onToggleMenu: noop,
    history: { push: noop },
  },
};
