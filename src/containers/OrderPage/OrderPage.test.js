import React from 'react';
import {
  createBooking,
  createListing,
  createTransaction,
  createUser,
  fakeIntl,
} from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { OrderPageComponent } from './OrderPage';

describe('OrderPage', () => {
  it('matches snapshot', () => {
    const transaction = createTransaction({
      id: 'tx-order-1',
      state: 'state/preauthorized',
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      provider: createUser('provider1'),
    });

    const props = {
      transaction,
      tab: 'details',
      intl: fakeIntl,
    };

    const tree = renderShallow(<OrderPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
