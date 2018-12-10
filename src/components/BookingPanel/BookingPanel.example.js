import React from 'react';
import { createListing } from '../../util/test-data';
import { LISTING_STATE_CLOSED } from '../../util/types';
import BookingPanel from './BookingPanel';
import css from './BookingPanel.example.css';

export const Default = {
  component: BookingPanel,
  props: {
    className: css.example,
    listing: createListing('listing_1'),
    handleBookingSubmit: values => console.log('Submit:', values),
    title: <span>title</span>,
    authorDisplayName: 'Author Name',
    onManageDisableScrolling: () => null,
  },
};

export const WithClosedListing = {
  component: BookingPanel,
  props: {
    className: css.example,
    listing: createListing('listing_1', { state: LISTING_STATE_CLOSED }),
    handleBookingSubmit: values => console.log('Submit:', values),
    title: <span>title</span>,
    authorDisplayName: 'Author Name',
    onManageDisableScrolling: () => null,
  },
};
