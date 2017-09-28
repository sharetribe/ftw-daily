import Decimal from 'decimal.js';
import { types } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import BookingBreakdown from './BookingBreakdown';

const { UUID, Money } = types;

const exampleBooking = attributes => {
  return {
    id: new UUID('example-booking'),
    type: 'booking',
    attributes,
  };
};

const exampleTransaction = params => {
  const created = new Date(Date.UTC(2017, 1, 1));
  return {
    id: new UUID('example-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: created,
      lastTransitionedAt: created,
      lastTransition: propTypes.TX_TRANSITION_PREAUTHORIZE,

      // payinTotal, payoutTotal, and lineItems required in params
      ...params,
    },
  };
};

export const Checkout = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    transaction: exampleTransaction({
      payinTotal: new Money(9000, 'USD'),
      payoutTotal: new Money(9000, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(2),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(9000, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const CustomerOrder = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    transaction: exampleTransaction({
      payinTotal: new Money(9000, 'USD'),
      payoutTotal: new Money(9000, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(2),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(9000, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const ProviderSale = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    transaction: exampleTransaction({
      payinTotal: new Money(9000, 'USD'),
      payoutTotal: new Money(7000, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(2),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(9000, 'USD'),
        },
        {
          code: 'line-item/provider-commission',
          unitPrice: new Money(-2000, 'USD'),
          lineTotal: new Money(-2000, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const ProviderSaleZeroCommission = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    transaction: exampleTransaction({
      payinTotal: new Money(9000, 'USD'),
      payoutTotal: new Money(9000, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(2),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(9000, 'USD'),
        },
        {
          code: 'line-item/provider-commission',
          unitPrice: new Money(0, 'USD'),
          lineTotal: new Money(0, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const ProviderSaleSingleNight = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    transaction: exampleTransaction({
      payinTotal: new Money(4500, 'USD'),
      payoutTotal: new Money(2500, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(1),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(4500, 'USD'),
        },
        {
          code: 'line-item/provider-commission',
          unitPrice: new Money(-2000, 'USD'),
          lineTotal: new Money(-2000, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleRejected = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    transaction: exampleTransaction({
      lastTransition: propTypes.TX_TRANSITION_REJECT,
      payinTotal: new Money(4500, 'USD'),
      payoutTotal: new Money(2500, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(1),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(4500, 'USD'),
        },
        {
          code: 'line-item/provider-commission',
          unitPrice: new Money(-2000, 'USD'),
          lineTotal: new Money(-2000, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleDelivered = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    transaction: exampleTransaction({
      lastTransition: propTypes.TX_TRANSITION_MARK_DELIVERED,
      payinTotal: new Money(4500, 'USD'),
      payoutTotal: new Money(2500, 'USD'),
      lineItems: [
        {
          code: 'line-item/night',
          quantity: new Decimal(1),
          unitPrice: new Money(4500, 'USD'),
          lineTotal: new Money(4500, 'USD'),
        },
        {
          code: 'line-item/provider-commission',
          unitPrice: new Money(-2000, 'USD'),
          lineTotal: new Money(-2000, 'USD'),
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};
