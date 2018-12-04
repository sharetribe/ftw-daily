import React from 'react';
import { createListing } from '../../util/test-data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';
import BookingPanel from './BookingPanel';

const { Money } = sdkTypes;
const CURRENCY = config.currency;

export const Default = {
  component: BookingPanel,
  props: {
    listing: createListing('listing_1'),
    isClosed: false,
    price: new Money(4500, CURRENCY),
    handleBookingSubmit: values => console.log('Submit:', values),
    richTitle: <span>title</span>,
    authorDisplayName: 'Author Name',
    onManageDisableScrolling: () => null,
  },
};
