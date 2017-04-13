import { types } from '../../util/sdkLoader';
import BookingInfo from './BookingInfo';

export const Empty = {
  component: BookingInfo,
  props: {
    unitPrice: new types.Money(10, 'USD'),
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
  },
};
