/* eslint-disable no-console, import/prefer-default-export */
import React from 'react';
import ListingCard from './ListingCard';
import { createUser, createListing } from '../../util/test-data';

const author = createUser('user1');
const listing = { ...createListing('listing1'), author };

const ListingCardWrapper = () => (
  <div style={{ width: '400px' }}>
    <ListingCard listing={listing} />
  </div>
);

export const ListingCardWrapped = {
  component: ListingCardWrapper,
};
