import React from 'react';
import { renderTree } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import MapPanel from './MapPanel';

describe('MapPanel', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <MapPanel />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
