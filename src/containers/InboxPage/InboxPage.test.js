import React from 'react';
import { RoutesProvider } from '../../components';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import { fakeIntl, createUser, createTransaction } from '../../util/test-data';
import { InboxPageComponent } from './InboxPage';
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
    };

    const ordersTree = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <InboxPageComponent {...ordersProps} />
      </RoutesProvider>
    );
    expect(ordersTree).toMatchSnapshot();

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
    };

    const salesTree = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <InboxPageComponent {...salesProps} />
      </RoutesProvider>
    );
    expect(salesTree).toMatchSnapshot();
  });
});
