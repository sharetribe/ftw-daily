import { types } from '../../util/sdkLoader';
import BookingBreakdown from './BookingBreakdown';

export const BeforeTX = {
  component: BookingBreakdown,
  props: {
    unitPrice: new types.Money(10, 'USD'),
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
  },
};

export const TXCustomerSide = {
  component: BookingBreakdown,
  props: {
    unitPrice: new types.Money(10, 'USD'),
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    totalPrice: new types.Money(20, 'USD'),
  },
};

export const TXProviderSide = {
  component: BookingBreakdown,
  props: {
    unitPrice: new types.Money(10, 'USD'),
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    subtotalPrice: new types.Money(20, 'USD'),
    commission: new types.Money(2, 'USD'),
  },
};

export const TXNoCalculation = {
  component: BookingBreakdown,
  props: {
    unitPrice: new types.Money(10, 'USD'),
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    subtotalPrice: new types.Money(20, 'USD'),
    commission: new types.Money(2, 'USD'),
    totalPrice: new types.Money(18, 'USD'),
  },
};
