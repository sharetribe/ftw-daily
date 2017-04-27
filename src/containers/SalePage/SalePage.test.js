import React from 'react';
import {
  createBooking,
  createListing,
  createTransaction,
  createUser,
  fakeIntl,
} from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { SalePageComponent } from './SalePage';

describe('SalePage', () => {
  it('matches snapshot', () => {
    const transaction = createTransaction({
      id: 'tx-sale-1',
      state: 'state/preauthorized',
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
    });

    const props = {
      onAcceptSale: () => {},
      onRejectSale: () => {},
      transaction,
      tab: 'details',
      intl: fakeIntl,
    };

    const tree = renderShallow(<SalePageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
