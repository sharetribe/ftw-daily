import React from 'react';
import { renderDeepNoProvider } from '../../util/test-helpers';
import RoutesProvider from './RoutesProvider';

describe('RoutesProvider', () => {
  it('should contain routes from context', () => {
    const routesConf = [{ name: 'SomePage' }];
    const Child = (props, context) => {
      return <div>{context.routes[0].name}</div>;
    };
    Child.contextTypes = { routes: React.PropTypes.array };

    const tree = renderDeepNoProvider(
      <RoutesProvider routes={routesConf}><Child /></RoutesProvider>,
    );
    expect(tree.children).toContain('SomePage');
  });
});
