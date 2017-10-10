import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { RoutesProvider } from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { flattenRoutes } from '../../util/routes';
import TopbarDesktop from './TopbarDesktop';

const noop = () => null;

describe('TopbarDesktop', () => {
  it('data matches snapshot', () => {
    window.google = { maps: {} };
    const flattenedRoutes = flattenRoutes(routeConfiguration());
    const topbarProps = {
      isAuthenticated: true,
      currentUserHasListings: true,
      name: 'John Doe',
      onSearchSubmit: noop,
      intl: fakeIntl,
      onLogout: noop,
    };
    const tree = renderDeep(
      <RoutesProvider flattenedRoutes={flattenedRoutes}>
        <TopbarDesktop {...topbarProps} />
      </RoutesProvider>
    );
    delete window.google;
    expect(tree).toMatchSnapshot();
  });
});
