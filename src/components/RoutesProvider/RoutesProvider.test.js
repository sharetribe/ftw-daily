import React from 'react';
import RoutesProvider from './RoutesProvider';
import renderer from 'react-test-renderer';

describe('RoutesProvider', () => {
  it('should contain routes from context', () => {
    const routesConf = [ { name: 'SomePage' } ];
    const Child = (props, context) => {
      return <div>{context.routes[0].name}</div>;
    };
    Child.contextTypes = { routes: React.PropTypes.array };

    const rendered = renderer
      .create(<RoutesProvider routes={routesConf}><Child /></RoutesProvider>)
      .toJSON();
    expect(rendered.children).toContain('SomePage');
  });
});
