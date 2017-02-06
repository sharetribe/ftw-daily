import React from 'react';
import { renderTree } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import FilterPanel from './FilterPanel';

describe('FilterPanel', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <FilterPanel />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
