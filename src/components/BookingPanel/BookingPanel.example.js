import React from 'react';
import { createListing } from '../../util/test-data';
import { LISTING_STATE_CLOSED } from '../../util/types';
import BookingPanel from './BookingPanel';
import css from './BookingPanelExample.module.css';

export const Default = {
  component: BookingPanel,
  props: {
    className: css.example,
    listing: createListing('listing_1'),
    onSubmit: values => console.log('Submit:', values),
    title: <span>Booking title</span>,
    subTitle: 'Hosted by Author N',
    authorDisplayName: 'Author Name',
    onManageDisableScrolling: () => null,
    fetchLineItemsInProgress: false,
    onFetchTransactionLineItems: () => null,
  },
};

export const WithClosedListing = {
  component: BookingPanel,
  props: {
    className: css.example,
    listing: createListing('listing_1', { state: LISTING_STATE_CLOSED }),
    onSubmit: values => console.log('Submit:', values),
    title: <span>Booking title</span>,
    subTitle: 'Hosted by Author N',
    authorDisplayName: 'Author Name',
    onManageDisableScrolling: () => null,
    fetchLineItemsInProgress: false,
    onFetchTransactionLineItems: () => null,
  },
};
