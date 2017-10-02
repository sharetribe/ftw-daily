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
      currentUser: createCurrentUser('provider1'),
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      authInProgress: false,
      acceptInProgress: false,
      rejectInProgress: false,
      currentUserHasListings: false,
      isAuthenticated: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      onAcceptSale: noop,
      onRejectSale: noop,
      params: { id: txId },
      scrollingDisabled: false,
      transaction,
      tab: 'details',
      intl: fakeIntl,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };

    const tree = renderShallow(<SalePageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
