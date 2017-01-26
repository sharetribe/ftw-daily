/* eslint-disable import/prefer-default-export */
import BookingInfo from './BookingInfo';

export const Empty = {
  component: BookingInfo,
  props: {
    pricePerDay: '55\u20AC',
    bookingPeriod: 'Jan 2nd - Jan 4th',
    bookingDuration: '3 days',
    total: '165\u20AC',
  },
};
