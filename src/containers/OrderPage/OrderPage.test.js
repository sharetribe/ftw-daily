import React from 'react';
import { renderTree } from '../../util/test-helpers';
import OrderPage from './OrderPage';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('OrderPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <OrderPage params={{ id: 1234 }} tab="details" />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
