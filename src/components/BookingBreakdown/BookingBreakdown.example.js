import { types } from '../../util/sdkLoader';
import BookingBreakdown from './BookingBreakdown';

export const Checkout = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    unitPrice: new types.Money(4500, 'USD'),
    totalPrice: new types.Money(9000, 'USD'),
  },
};

export const CustomerOrder = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    unitPrice: new types.Money(4500, 'USD'),
    totalPrice: new types.Money(9000, 'USD'),
  },
};

export const ProviderSale = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    unitPrice: new types.Money(4500, 'USD'),
    commission: new types.Money(2000, 'USD'),
    totalPrice: new types.Money(7000, 'USD'),
  },
};

export const ProviderSaleZeroCommission = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    unitPrice: new types.Money(4500, 'USD'),
    commission: new types.Money(0, 'USD'),
    totalPrice: new types.Money(7000, 'USD'),
  },
};

export const ProviderSaleSingleNight = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 15)),
    unitPrice: new types.Money(4500, 'USD'),
    commission: new types.Money(2000, 'USD'),
    totalPrice: new types.Money(2500, 'USD'),
  },
};
