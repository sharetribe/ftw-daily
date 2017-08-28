import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, createListing, currencyConfig, fakeIntl } from '../../util/test-data';
import { ListingCardComponent } from './ListingCard';

describe('ListingCard', () => {
  it('matches snapshot', () => {
    const author = createUser('user1');
    const listing = { ...createListing('listing1'), author };
    const tree = renderShallow(<ListingCardComponent listing={listing} intl={fakeIntl} />);
    expect(tree).toMatchSnapshot();
  });
});
