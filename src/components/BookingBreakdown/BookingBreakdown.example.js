import Decimal from 'decimal.js';
import { types } from '../../util/sdkLoader';
import BookingBreakdown from './BookingBreakdown';

export const Checkout = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'customer',
    lineItems: [
      {
        code: 'line-item.purchase/night',
        quantity: new Decimal(2),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(9000, 'USD'),
      },
    ],
    payinTotal: new types.Money(9000, 'USD'),
  },
};

export const CustomerOrder = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'customer',
    lineItems: [
      {
        code: 'line-item.purchase/night',
        quantity: new Decimal(2),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(9000, 'USD'),
      },
    ],
    payinTotal: new types.Money(9000, 'USD'),
  },
};

export const ProviderSale = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item.purchase/night',
        quantity: new Decimal(2),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(9000, 'USD'),
      },
      {
        code: 'line-item.commission/provider',
        unitPrice: new types.Money(-2000, 'USD'),
        lineTotal: new types.Money(-2000, 'USD'),
      },
    ],
    payoutTotal: new types.Money(7000, 'USD'),
  },
};

export const ProviderSaleZeroCommission = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item.purchase/night',
        quantity: new Decimal(2),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(9000, 'USD'),
      },
      {
        code: 'line-item.commission/provider',
        unitPrice: new types.Money(0, 'USD'),
        lineTotal: new types.Money(0, 'USD'),
      },
    ],
    payoutTotal: new types.Money(9000, 'USD'),
  },
};

export const ProviderSaleSingleNight = {
  component: BookingBreakdown,
  props: {
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 15)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item.purchase/night',
        quantity: new Decimal(1),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(4500, 'USD'),
      },
      {
        code: 'line-item.commission/provider',
        unitPrice: new types.Money(-2000, 'USD'),
        lineTotal: new types.Money(-2000, 'USD'),
      },
    ],
    payoutTotal: new types.Money(2500, 'USD'),
  },
};
