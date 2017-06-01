import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';
import { flattenRoutes } from '../../util/routes';
import TopbarDesktop from './TopbarDesktop';

const noop = () => null;

describe('TopbarDesktop', () => {
  it('data matches snapshot', () => {
    const flattenedRoutes = flattenRoutes(routesConfiguration);
    const tree = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <TopbarDesktop
          isAuthenticated
          currentUserHasListings
          name="John Doe"
          intl={fakeIntl}
          onLogout={noop}
        />
      </RoutesProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
