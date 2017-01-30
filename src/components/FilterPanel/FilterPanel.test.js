import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import FilterPanel from './FilterPanel';

describe('FilterPanel', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <RoutesProvider routes={routesConfiguration}>
          <FilterPanel />
        </RoutesProvider>
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
