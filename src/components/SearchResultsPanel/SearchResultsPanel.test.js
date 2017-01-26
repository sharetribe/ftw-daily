import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import SearchResultsPanel from './SearchResultsPanel';

describe('SearchResultsPanel', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <RoutesProvider routes={routesConfiguration}>
            <SearchResultsPanel />
          </RoutesProvider>
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
