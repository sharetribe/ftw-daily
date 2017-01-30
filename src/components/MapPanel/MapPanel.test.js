import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import MapPanel from './MapPanel';

describe('MapPanel', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <RoutesProvider routes={routesConfiguration}>
          <MapPanel />
        </RoutesProvider>
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
