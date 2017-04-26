import React from 'react';
import { types } from '../../util/sdkLoader';
import { createBooking, createListing, createUser } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import OrderDetailsPanel from './OrderDetailsPanel.js';

describe('OrderDetailsPanel', () => {
  it('matches snapshot', () => {
    const { Money } = types;
    const props = {
      commission: null,
      totalPrice: new Money(16500, 'USD'),
      orderState: 'state/preauthorized',
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      provider: createUser('provider'),
    };
    const tree = renderShallow(<OrderDetailsPanel {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
