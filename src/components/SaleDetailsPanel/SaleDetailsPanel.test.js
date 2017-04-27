import React from 'react';
import { types } from '../../util/sdkLoader';
import { createBooking, createListing, createUser } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import SaleDetailsPanel from './SaleDetailsPanel.js';

describe('SaleDetailsPanel', () => {
  it('matches snapshot', () => {
    const { Money } = types;
    const props = {
      commission: null,
      totalPrice: new Money(16500, 'USD'),
      saleState: 'state/preauthorized',
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
    };
    const tree = renderShallow(<SaleDetailsPanel {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
