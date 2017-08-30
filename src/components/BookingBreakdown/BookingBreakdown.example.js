import Decimal from 'decimal.js';
import { types } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import BookingBreakdown from './BookingBreakdown';

export const Checkout = {
  component: BookingBreakdown,
  props: {
    transactionState: propTypes.TX_STATE_PREAUTHORIZED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'customer',
    lineItems: [
      {
        code: 'line-item/night',
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
    transactionState: propTypes.TX_STATE_PREAUTHORIZED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'customer',
    lineItems: [
      {
        code: 'line-item/night',
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
    transactionState: propTypes.TX_STATE_PREAUTHORIZED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item/night',
        quantity: new Decimal(2),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(9000, 'USD'),
      },
      {
        code: 'line-item/provider-commission',
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
    transactionState: propTypes.TX_STATE_PREAUTHORIZED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 16)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item/night',
        quantity: new Decimal(2),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(9000, 'USD'),
      },
      {
        code: 'line-item/provider-commission',
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
    transactionState: propTypes.TX_STATE_PREAUTHORIZED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 15)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item/night',
        quantity: new Decimal(1),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(4500, 'USD'),
      },
      {
        code: 'line-item/provider-commission',
        unitPrice: new types.Money(-2000, 'USD'),
        lineTotal: new types.Money(-2000, 'USD'),
      },
    ],
    payoutTotal: new types.Money(2500, 'USD'),
  },
};

export const ProviderSaleRejected = {
  component: BookingBreakdown,
  props: {
    transactionState: propTypes.TX_STATE_REJECTED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 15)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item/night',
        quantity: new Decimal(1),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(4500, 'USD'),
      },
      {
        code: 'line-item/provider-commission',
        unitPrice: new types.Money(-2000, 'USD'),
        lineTotal: new types.Money(-2000, 'USD'),
      },
    ],
    payoutTotal: new types.Money(2500, 'USD'),
  },
};

export const ProviderSaleDelivered = {
  component: BookingBreakdown,
  props: {
    transactionState: propTypes.TX_STATE_DELIVERED,
    bookingStart: new Date(Date.UTC(2017, 3, 14)),
    bookingEnd: new Date(Date.UTC(2017, 3, 15)),
    userRole: 'provider',
    lineItems: [
      {
        code: 'line-item/night',
        quantity: new Decimal(1),
        unitPrice: new types.Money(4500, 'USD'),
        lineTotal: new types.Money(4500, 'USD'),
      },
      {
        code: 'line-item/provider-commission',
        unitPrice: new types.Money(-2000, 'USD'),
        lineTotal: new types.Money(-2000, 'USD'),
      },
    ],
    payoutTotal: new types.Money(2500, 'USD'),
  },
};
