import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import RoutesProvider from './RoutesProvider';

describe('RoutesProvider', () => {
  it('should contain routes from context', () => {
    const routesConf = [{ name: 'SomePage', path: 'some-page', component: () => null }];
    const Child = (props, context) => {
      return <div>{context.flattenedRoutes[0].name}</div>;
    };
    Child.contextTypes = { flattenedRoutes: React.PropTypes.array };

    const tree = renderDeep(
      <RoutesProvider flattenedRoutes={routesConf}><Child /></RoutesProvider>,
    );
    expect(tree.children).toContain('SomePage');
  });
});
