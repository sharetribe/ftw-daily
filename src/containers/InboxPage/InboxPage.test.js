import React from 'react';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import {
  fakeIntl,
  createCurrentUser,
  createUser,
  createTransaction,
  createBooking,
} from '../../util/test-data';
import { InboxPageComponent, InboxItem, txState } from './InboxPage';
import { TRANSITION_CONFIRM_PAYMENT } from '../../util/transaction';
import { LINE_ITEM_NIGHT } from '../../util/types';

const noop = () => null;

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const provider = createUser('provider-user-id');
    const customer = createUser('customer-user-id');
    const currentUserProvider = createCurrentUser('provider-user-id');
    const currentUserCustomer = createCurrentUser('customer-user-id');

    const startBooking1 = new Date(Date.UTC(2017, 1, 15));
    const endBooking1 = new Date(Date.UTC(2017, 1, 16));

    const booking1 = createBooking('booking1', {
      start: startBooking1,
      end: endBooking1,
      displayStart: startBooking1,
      displayEnd: endBooking1,
    });

    const startBooking2 = new Date(Date.UTC(2017, 2, 15));
    const endBooking2 = new Date(Date.UTC(2017, 2, 16));

    const booking2 = createBooking('booking2', {
      start: startBooking2,
      end: endBooking2,
      displayStart: startBooking2,
      displayEnd: endBooking2,
    });

    const ordersProps = {
      unitType: LINE_ITEM_NIGHT,
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      params: {
        tab: 'orders',
      },
      authInProgress: false,
      currentUser: currentUserProvider,
      currentUserHasListings: false,
      isAuthenticated: false,
      fetchInProgress: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      transactions: [
        createTransaction({
          id: 'order-1',
          lastTransition: TRANSITION_CONFIRM_PAYMENT,
          customer,
          provider,
          lastTransitionedAt: new Date(Date.UTC(2017, 0, 15)),
          booking: booking1,
        }),
        createTransaction({
          id: 'order-2',
          lastTransition: TRANSITION_CONFIRM_PAYMENT,
          customer,
          provider,
          lastTransitionedAt: new Date(Date.UTC(2016, 0, 15)),
          booking: booking2,
        }),
      ],
      intl: fakeIntl,
      scrollingDisabled: false,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };

    const ordersTree = renderShallow(<InboxPageComponent {...ordersProps} />);
    expect(ordersTree).toMatchSnapshot();

    const stateDataOrder = txState(fakeIntl, ordersProps.transactions[0], 'order');

    // Deeply render one InboxItem
    const orderItem = renderDeep(
      <InboxItem
        unitType={LINE_ITEM_NIGHT}
        type="order"
        tx={ordersProps.transactions[0]}
        intl={fakeIntl}
        stateData={stateDataOrder}
      />
    );
    expect(orderItem).toMatchSnapshot();

    const salesProps = {
      unitType: LINE_ITEM_NIGHT,
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      params: {
        tab: 'sales',
      },
      authInProgress: false,
      currentUser: currentUserCustomer,
      currentUserHasListings: false,
      isAuthenticated: false,
      fetchInProgress: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      transactions: [
        createTransaction({
          id: 'sale-1',
          lastTransition: TRANSITION_CONFIRM_PAYMENT,
          customer,
          provider,
          lastTransitionedAt: new Date(Date.UTC(2017, 0, 15)),
          booking: booking1,
        }),
        createTransaction({
          id: 'sale-2',
          lastTransition: TRANSITION_CONFIRM_PAYMENT,
          customer,
          provider,
          lastTransitionedAt: new Date(Date.UTC(2016, 0, 15)),
          booking: booking2,
        }),
      ],
      intl: fakeIntl,
      scrollingDisabled: false,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };

    const salesTree = renderShallow(<InboxPageComponent {...salesProps} />);
    expect(salesTree).toMatchSnapshot();

    const stateDataSale = txState(fakeIntl, salesProps.transactions[0], 'sale');

    // Deeply render one InboxItem
    const saleItem = renderDeep(
      <InboxItem
        unitType={LINE_ITEM_NIGHT}
        type="sale"
        tx={salesProps.transactions[0]}
        intl={fakeIntl}
        stateData={stateDataSale}
      />
    );
    expect(saleItem).toMatchSnapshot();
  });
});
