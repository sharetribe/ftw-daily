import React from 'react';
import { RoutesProvider } from '../../components';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import { fakeIntl, createUser, createTransaction } from '../../util/test-data';
import { InboxPageComponent, InboxItem } from './InboxPage';
import routesConfiguration from '../../routesConfiguration';
import { flattenRoutes } from '../../util/routes';

const noop = () => null;

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const flattenedRoutes = flattenRoutes(routesConfiguration);
    const provider = createUser('provider-user-id');
    const customer = createUser('customer-user-id');

    const ordersProps = {
      params: {
        tab: 'orders',
      },
      fetchInProgress: false,
      transactions: [
        createTransaction({
          id: 'order-1',
          state: 'state/preauthorized',
          provider,
          lastTransitionedAt: new Date(Date.UTC(2017, 0, 15)),
        }),
        createTransaction({
          id: 'order-2',
          state: 'state/preauthorized',
          provider,
          lastTransitionedAt: new Date(Date.UTC(2016, 0, 15)),
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
      params: {
        tab: 'sales',
      },
      fetchInProgress: false,
      transactions: [
        createTransaction({
          id: 'sale-1',
          state: 'state/preauthorized',
          customer,
          lastTransitionedAt: new Date(Date.UTC(2017, 0, 15)),
        }),
        createTransaction({
          id: 'sale-2',
          state: 'state/preauthorized',
          customer,
          lastTransitionedAt: new Date(Date.UTC(2016, 0, 15)),
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
