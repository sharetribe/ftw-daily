import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import OrderPage from './OrderPage';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('OrderPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <RoutesProvider routes={routesConfiguration}>
            <OrderPage params={{ id: 1234 }} />
          </RoutesProvider>
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
