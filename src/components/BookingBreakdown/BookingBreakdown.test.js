import React from 'react';
import Decimal from 'decimal.js';
import { fakeIntl } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { types } from '../../util/sdkLoader';
import { BookingBreakdownComponent } from './BookingBreakdown';

describe('BookingBreakdown', () => {
  it('pretransaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        bookingStart={new Date(Date.UTC(2017, 3, 14))}
        bookingEnd={new Date(Date.UTC(2017, 3, 16))}
        payinTotal={new types.Money(2000, 'USD')}
        userRole="customer"
        lineItems={[
          {
            code: 'line-item/night',
            quantity: new Decimal(2),
            lineTotal: new types.Money(2000, 'USD'),
            unitPrice: new types.Money(1000, 'USD'),
          },
        ]}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('customer transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        bookingStart={new Date(Date.UTC(2017, 3, 14))}
        bookingEnd={new Date(Date.UTC(2017, 3, 16))}
        userRole="customer"
        payinTotal={new types.Money(2000, 'USD')}
        lineItems={[
          {
            code: 'line-item/night',
            quantity: new Decimal(2),
            lineTotal: new types.Money(2000, 'USD'),
            unitPrice: new types.Money(1000, 'USD'),
          },
        ]}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('provider transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        bookingStart={new Date(Date.UTC(2017, 3, 14))}
        bookingEnd={new Date(Date.UTC(2017, 3, 16))}
        commission={new types.Money(200, 'USD')}
        payoutTotal={new types.Money(1800, 'USD')}
        userRole="provider"
        lineItems={[
          {
            code: 'line-item/night',
            quantity: new Decimal(2),
            lineTotal: new types.Money(2000, 'USD'),
            unitPrice: new types.Money(1000, 'USD'),
          },
          {
            code: 'line-item/provider-commission',
            lineTotal: new types.Money(-200, 'USD'),
            unitPrice: new types.Money(-200, 'USD'),
          },
        ]}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
