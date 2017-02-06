import React from 'react';
import { renderTree } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import SearchResultsPanel from './SearchResultsPanel';

describe('SearchResultsPanel', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <SearchResultsPanel />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
