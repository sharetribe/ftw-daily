import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import ListingPage from './ListingPage';

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <RoutesProvider routes={routesConfiguration}>
          <ListingPage params={{ slug: 'banyan-studios', id: 1234 }} />
        </RoutesProvider>
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
