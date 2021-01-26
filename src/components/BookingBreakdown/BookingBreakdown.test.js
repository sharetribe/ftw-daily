import React from 'react';
import Decimal from 'decimal.js';
import { fakeIntl, createBooking } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  TRANSITION_CANCEL,
  TRANSITION_REQUEST_PAYMENT,
  TX_TRANSITION_ACTOR_CUSTOMER,
  DATE_TYPE_DATE,
} from '../../util/transaction';
import { LINE_ITEM_NIGHT } from '../../util/types';
import { BookingBreakdownComponent } from './BookingBreakdown';

const { UUID, Money } = sdkTypes;

const exampleTransaction = params => {
  const created = new Date(Date.UTC(2017, 1, 1));
  return {
    id: new UUID('example-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: created,
      lastTransitionedAt: created,
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      transitions: [
        {
          createdAt: created,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
      ],

      // payinTotal, payoutTotal, and lineItems required in params
      ...params,
    },
  };
};

describe('BookingBreakdown', () => {
  it('pretransaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="customer"
        unitType={LINE_ITEM_NIGHT}
        dateType={DATE_TYPE_DATE}
        transaction={exampleTransaction({
          payinTotal: new Money(2000, 'USD'),
          payoutTotal: new Money(2000, 'USD'),
          lineItems: [
            {
              code: 'line-item/night',
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(2),
              lineTotal: new Money(2000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
          ],
        })}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14)),
          end: new Date(Date.UTC(2017, 3, 16)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('customer transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="customer"
        unitType={LINE_ITEM_NIGHT}
        dateType={DATE_TYPE_DATE}
        transaction={exampleTransaction({
          payinTotal: new Money(2000, 'USD'),
          payoutTotal: new Money(2000, 'USD'),
          lineItems: [
            {
              code: 'line-item/night',
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(2),
              lineTotal: new Money(2000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
          ],
        })}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14)),
          end: new Date(Date.UTC(2017, 3, 16)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('provider transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="provider"
        unitType={LINE_ITEM_NIGHT}
        dateType={DATE_TYPE_DATE}
        transaction={exampleTransaction({
          payinTotal: new Money(2000, 'USD'),
          payoutTotal: new Money(1800, 'USD'),
          lineItems: [
            {
              code: 'line-item/night',
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(2),
              lineTotal: new Money(2000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
            {
              code: 'line-item/provider-commission',
              includeFor: ['provider'],
              lineTotal: new Money(-200, 'USD'),
              unitPrice: new Money(-200, 'USD'),
              reversal: false,
            },
          ],
        })}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14)),
          end: new Date(Date.UTC(2017, 3, 16)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('provider canceled transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="provider"
        unitType={LINE_ITEM_NIGHT}
        dateType={DATE_TYPE_DATE}
        transaction={exampleTransaction({
          lastTransition: TRANSITION_CANCEL,
          payinTotal: new Money(0, 'USD'),
          payoutTotal: new Money(0, 'USD'),
          lineItems: [
            {
              code: 'line-item/night',
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(2),
              lineTotal: new Money(2000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
            {
              code: 'line-item/night',
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-2),
              lineTotal: new Money(-2000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: true,
            },
            {
              code: 'line-item/provider-commission',
              includeFor: ['provider'],
              percentage: new Decimal(-10),
              lineTotal: new Money(-200, 'USD'),
              unitPrice: new Money(2000, 'USD'),
              reversal: false,
            },
            {
              code: 'line-item/provider-commission',
              includeFor: ['provider'],
              percentage: new Decimal(10),
              lineTotal: new Money(200, 'USD'),
              unitPrice: new Money(2000, 'USD'),
              reversal: true,
            },
          ],
        })}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14)),
          end: new Date(Date.UTC(2017, 3, 16)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
