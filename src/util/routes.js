import { find } from 'lodash';
import { matchPath } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { stringify } from './urlHelpers';

const findRouteByName = (nameToFind, routes) => find(routes, route => route.name === nameToFind);

/**
 * E.g. ```const toListingPath = toPathByRouteName('ListingPage', routes);```
 * Then we can generate listing paths with given params (```toListingPath({ id: uuidX })```)
 */
const toPathByRouteName = (nameToFind, routes) => {
  const route = findRouteByName(nameToFind, routes);
  if (!route) {
    throw new Error(`Path "${nameToFind}" was not found.`);
  }
  return pathToRegexp.compile(route.path);
};

/**
 * Shorthand for single path call. (```pathByRouteName('ListingPage', routes, { id: uuidX });```)
 */
export const pathByRouteName = (nameToFind, routes, params = {}) =>
  toPathByRouteName(nameToFind, routes)(params);

/**
 * Find the matching routes and their params for the given pathname
 *
 * @param {String} pathname - Full URL path from root with possible
 * search params and hash included
 *
 * @return {Array<{ route, params }>} - All matches as { route, params } objects
 */
export const matchPathname = (pathname, routeConfiguration) => {
  return routeConfiguration.reduce(
    (matches, route) => {
      const { path, exact = false } = route;
      const match = matchPath(pathname, { path, exact });
      if (match) {
        matches.push({
          route,
          params: match.params || {},
        });
      }
      return matches;
    },
    []
  );
};

/**
 * ResourceLocatorString is used to direct webapp to correct page.
 * In contrast to Universal Resource Locator (URL), this doesn't contain protocol, host, or port.
 */
export const createResourceLocatorString = (
  routeName,
  routes,
  pathParams = {},
  searchParams = {}
) => {
  const searchQuery = stringify(searchParams);
  const includeSearchQuery = searchQuery.length > 0 ? `?${searchQuery}` : '';
  const path = pathByRouteName(routeName, routes, pathParams);
  return `${path}${includeSearchQuery}`;
};

/**
 * Find component related to route name
 * E.g. `const PageComponent = findComponentByRouteName('CheckoutPage', routes);`
 * Then we can call static methods of given component:
 * `dispatch(PageComponent.setInitialValues({ listing, bookingDates }));`
 *
 * @param {String} nameToFind - Route name
 * @param {Array<{ route }>} routes - Route configuration as flat array.
 *
 * @return {Route} - Route that matches the given route name.
 */
export const findRouteByRouteName = (nameToFind, routes) => {
  const route = findRouteByName(nameToFind, routes);
  if (!route) {
    throw new Error(`Component "${nameToFind}" was not found.`);
  }
  return route;
};
