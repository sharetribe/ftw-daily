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
import { TX_TRANSITION_PREAUTHORIZE } from '../../util/propTypes';
import { OrderPageComponent } from './OrderPage';

const noop = () => null;

describe('OrderPage', () => {
  it('matches snapshot', () => {
    const txId = 'tx-order-1';
    const transaction = createTransaction({
      id: txId,
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
      booking: createBooking('booking1', {
        start: new Date(Date.UTC(2017, 5, 10)),
        end: new Date(Date.UTC(2017, 5, 13)),
      }),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
      provider: createUser('provider1'),
    });

    const props = {
      params: { id: txId },
      tab: 'details',

      currentUser: createCurrentUser('customer1'),
      messages: [],
      scrollingDisabled: false,
      transaction,

      intl: fakeIntl,
    };

    const tree = renderShallow(<OrderPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
