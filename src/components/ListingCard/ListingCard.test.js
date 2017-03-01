import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, createListing } from '../../util/test-data';
import ListingCard from './ListingCard';

describe('ListingCard', () => {
  it('matches snapshot', () => {
    const author = createUser('user1');
    const listing = { ...createListing('listing1'), author };
    const tree = renderShallow(<ListingCard listing={listing} />);
    expect(tree).toMatchSnapshot();
  });
});
