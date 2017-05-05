import React from 'react';
import {
  createBooking,
  createCurrentUser,
  createListing,
  createTransaction,
  createUser,
  fakeIntl,
} from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { SalePageComponent } from './SalePage';

describe('SalePage', () => {
  it('matches snapshot', () => {
    const txId = 'tx-sale-1';
    const transaction = createTransaction({
      id: txId,
      state: 'state/preauthorized',
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
      provider: createUser('provider1'),
    });

    const props = {
      currentUser: createCurrentUser('provider1'),
      onAcceptSale: () => {},
      onRejectSale: () => {},
      params: { id: txId },
      transaction,
      tab: 'details',
      intl: fakeIntl,
    };

    const tree = renderShallow(<SalePageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
