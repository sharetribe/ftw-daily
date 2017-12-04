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
import { SalePageComponent } from './SalePage';

const noop = () => null;

describe('SalePage', () => {
  it('matches snapshot', () => {
    const txId = 'tx-sale-1';
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
      currentUser: createCurrentUser('provider1'),
      acceptInProgress: false,
      declineInProgress: false,
      onAcceptSale: noop,
      onDeclineSale: noop,
      scrollingDisabled: false,
      transaction,
      totalMessages: 0,
      totalMessagePages: 0,
      oldestMessagePageFetched: 0,
      messages: [],
      sendMessageInProgress: false,
      onShowMoreMessages: noop,
      onSendMessage: noop,
      onResetForm: noop,
      intl: fakeIntl,
    };

    const tree = renderShallow(<SalePageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
