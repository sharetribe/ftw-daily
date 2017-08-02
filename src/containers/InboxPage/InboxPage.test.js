import React from 'react';
import { RoutesProvider } from '../../components';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import { fakeIntl, createUser, createTransaction, createBooking } from '../../util/test-data';
import { InboxPageComponent, InboxItem } from './InboxPage';
import routesConfiguration from '../../routesConfiguration';
import { flattenRoutes } from '../../util/routes';

const noop = () => null;

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const flattenedRoutes = flattenRoutes(routesConfiguration);
    const provider = createUser('provider-user-id');
    const customer = createUser('customer-user-id');
    const booking1 = createBooking(
      'booking1',
      new Date(Date.UTC(2017, 1, 15)),
      new Date(Date.UTC(2017, 1, 16))
    );
    const booking2 = createBooking(
      'booking2',
      new Date(Date.UTC(2017, 2, 15)),
      new Date(Date.UTC(2017, 2, 16))
    );

    const ordersProps = {
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      params: {
        tab: 'orders',
      },
      authInProgress: false,
      currentUserHasListings: false,
      isAuthenticated: false,
      fetchInProgress: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      transactions: [
        createTransaction({
          id: 'order-1',
          state: 'state/preauthorized',
          provider,
          lastTransitionedAt: new Date(Date.UTC(2017, 0, 15)),
          booking: booking1,
        }),
        createTransaction({
          id: 'order-2',
          state: 'state/preauthorized',
          provider,
          lastTransitionedAt: new Date(Date.UTC(2016, 0, 15)),
          booking: booking2,
        }),
      ],
      intl: fakeIntl,
      scrollingDisabled: false,
    };

    const ordersTree = renderShallow(<InboxPageComponent {...ordersProps} />);
    expect(ordersTree).toMatchSnapshot();

    // Deeply render one InboxItem
    const orderItem = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <InboxItem type="order" tx={ordersProps.transactions[0]} intl={fakeIntl} />
      </RoutesProvider>
    );
    expect(orderItem).toMatchSnapshot();

    const salesProps = {
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      params: {
        tab: 'sales',
      },
      authInProgress: false,
      currentUserHasListings: false,
      isAuthenticated: false,
      fetchInProgress: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      transactions: [
        createTransaction({
          id: 'sale-1',
          state: 'state/preauthorized',
          customer,
          lastTransitionedAt: new Date(Date.UTC(2017, 0, 15)),
          booking: booking1,
        }),
        createTransaction({
          id: 'sale-2',
          state: 'state/preauthorized',
          customer,
          lastTransitionedAt: new Date(Date.UTC(2016, 0, 15)),
          booking: booking2,
        }),
      ],
      intl: fakeIntl,
      scrollingDisabled: false,
    };

    const salesTree = renderShallow(<InboxPageComponent {...salesProps} />);
    expect(salesTree).toMatchSnapshot();

    // Deeply render one InboxItem
    const saleItem = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <InboxItem type="sale" tx={salesProps.transactions[0]} intl={fakeIntl} />
      </RoutesProvider>
    );
    expect(saleItem).toMatchSnapshot();
  });
});
