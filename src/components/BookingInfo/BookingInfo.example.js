import { types } from '../../util/sdkLoader';
import BookingInfo from './BookingInfo';

export const Empty = {
  component: BookingInfo,
  props: {
    unitPrice: new types.Money(10, 'USD'),
    bookingStart: new Date('Fri, 14 Apr 2017 GMT'),
    bookingEnd: new Date('Sun, 16 Apr 2017 GMT'),
  },
};
