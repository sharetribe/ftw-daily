import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import OrderDiscussionPanel from './OrderDiscussionPanel.js';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('OrderDiscussionPanel', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <RoutesProvider routes={routesConfiguration}>
          <OrderDiscussionPanel />
        </RoutesProvider>
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
