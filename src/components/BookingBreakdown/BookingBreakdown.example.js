import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  TRANSITION_ACCEPT,
  TRANSITION_CANCEL,
  TRANSITION_COMPLETE,
  TRANSITION_DECLINE,
  TRANSITION_EXPIRE,
  TRANSITION_REQUEST_PAYMENT,
  TRANSITION_CONFIRM_PAYMENT,
  TX_TRANSITION_ACTOR_CUSTOMER,
} from '../../util/transaction';
import {
  LINE_ITEM_DAY,
  LINE_ITEM_NIGHT,
  LINE_ITEM_UNITS,
  DATE_TYPE_DATE,
  DATE_TYPE_DATETIME,
} from '../../util/types';
import config from '../../config';
import BookingBreakdown from './BookingBreakdown';

const { UUID, Money } = sdkTypes;

const CURRENCY = config.currency;

const exampleBooking = attributes => {
  return {
    id: new UUID('example-booking'),
    type: 'booking',
    attributes,
  };
};

const exampleTransaction = params => {
  const created = new Date(Date.UTC(2017, 1, 1));
  const confirmed = new Date(Date.UTC(2017, 1, 1, 0, 1));
  return {
    id: new UUID('example-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: created,
      lastTransitionedAt: created,
      lastTransition: TRANSITION_CONFIRM_PAYMENT,
      transitions: [
        {
          createdAt: created,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
        {
          createdAt: confirmed,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_CONFIRM_PAYMENT,
        },
      ],

      // payinTotal, payoutTotal, and lineItems required in params
      ...params,
    },
  };
};

export const Checkout = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
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
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
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
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(7000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
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
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(0, CURRENCY),
          lineTotal: new Money(0, CURRENCY),
          reversal: false,
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
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATE,
    transaction: exampleTransaction({
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSalePreauthorized = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      lastTransition: TRANSITION_CONFIRM_PAYMENT,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleAccepted = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      lastTransition: TRANSITION_ACCEPT,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleDeclined = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      lastTransition: TRANSITION_DECLINE,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleAutoDeclined = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      lastTransition: TRANSITION_EXPIRE,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
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
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      lastTransition: TRANSITION_COMPLETE,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleCanceled = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      lastTransition: TRANSITION_CANCEL,
      payinTotal: new Money(0, CURRENCY),
      payoutTotal: new Money(0, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(-1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(-4500, CURRENCY),
          reversal: true,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          quantity: new Decimal(-1),
          unitPrice: new Money(2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: true,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const SingleDay = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_DAY,
    dateType: DATE_TYPE_DATE,
    transaction: exampleTransaction({
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(4500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/day',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const MultipleDays = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_DAY,
    dateType: DATE_TYPE_DATE,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/day',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const UnitsType = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_UNITS,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/units',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 18)),
    }),
  },
};

export const CustomPricing = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(12800, CURRENCY),
      payoutTotal: new Money(12600, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/car-cleaning',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(5000, CURRENCY),
          lineTotal: new Money(5000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/season-discount',
          includeFor: ['customer', 'provider'],
          percentage: new Decimal(-10),
          unitPrice: new Money(14000, CURRENCY),
          lineTotal: new Money(-1400, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/customer-commission',
          includeFor: ['customer'],
          percentage: new Decimal(10),
          unitPrice: new Money(2000, CURRENCY),
          lineTotal: new Money(200, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const CustomPricingWithRefund = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_NIGHT,
    dateType: DATE_TYPE_DATETIME,
    transaction: exampleTransaction({
      payinTotal: new Money(0, CURRENCY),
      payoutTotal: new Money(0, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(-2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(-9000, CURRENCY),
          reversal: true,
        },
        {
          code: 'line-item/car-cleaning',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(5000, CURRENCY),
          lineTotal: new Money(5000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/car-cleaning',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(-1),
          unitPrice: new Money(5000, CURRENCY),
          lineTotal: new Money(-5000, CURRENCY),
          reversal: true,
        },
        {
          code: 'line-item/season-discount',
          includeFor: ['customer', 'provider'],
          percentage: new Decimal(-10),
          unitPrice: new Money(14000, CURRENCY),
          lineTotal: new Money(-1400, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/season-discount',
          includeFor: ['customer', 'provider'],
          percentage: new Decimal(10),
          unitPrice: new Money(14000, CURRENCY),
          lineTotal: new Money(1400, CURRENCY),
          reversal: true,
        },
        {
          code: 'line-item/customer-commission',
          includeFor: ['customer'],
          percentage: new Decimal(10),
          unitPrice: new Money(2000, CURRENCY),
          lineTotal: new Money(200, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/customer-commission',
          includeFor: ['customer'],
          percentage: new Decimal(-10),
          unitPrice: new Money(2000, CURRENCY),
          lineTotal: new Money(-200, CURRENCY),
          reversal: true,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};
