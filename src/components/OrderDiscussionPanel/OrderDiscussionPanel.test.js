import React from 'react';
import { renderTree } from '../../util/test-helpers';
import OrderDiscussionPanel from './OrderDiscussionPanel.js';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('OrderDiscussionPanel', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <OrderDiscussionPanel />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
