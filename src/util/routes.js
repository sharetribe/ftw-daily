import { find } from 'lodash';
import { matchPath } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { stringify } from './urlHelpers';

// Flatten the routes config.
// TODO: flatten the original config and remove this function
export const flattenRoutes = routes =>
  routes.reduce(
    (flatRoutes, route) => {
      const r = { ...route };
      delete r.routes;
      flatRoutes.push(r);
      if (route.routes) {
        return flatRoutes.concat(flattenRoutes(route.routes));
      }
      return flatRoutes;
    },
    []
  );

const findRouteByName = (nameToFind, flattenedRoutes) =>
  find(flattenedRoutes, route => route.name === nameToFind);

/**
 * E.g. ```const toListingPath = toPathByRouteName('ListingPage', routes);```
 * Then we can generate listing paths with given params (```toListingPath({ id: uuidX })```)
 */
const toPathByRouteName = (nameToFind, flattenedRoutes) => {
  const route = findRouteByName(nameToFind, flattenedRoutes);
  if (!route) {
    throw new Error(`Path "${nameToFind}" was not found.`);
  }
  return pathToRegexp.compile(route.path);
};

/**
 * Shorthand for single path call. (```pathByRouteName('ListingPage', routes, { id: uuidX });```)
 */
export const pathByRouteName = (nameToFind, flattenedRoutes, params = {}) =>
  toPathByRouteName(nameToFind, flattenedRoutes)(params);

/**
 * Find the matching routes and their params for the given pathname
 *
 * @param {String} pathname - Full URL path from root with possible
 * search params and hash included
 *
 * @return {Array<{ route, params }>} - All matches as { route, params } objects
 */
export const matchPathname = (pathname, routesConfiguration) => {
  // TODO: remove flattening when routesConfiguration is flat
  const flattenedRoutes = flattenRoutes(routesConfiguration);

  return flattenedRoutes.reduce(
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
  flattenedRoutes,
  pathParams = {},
  searchParams = {}
) => {
  const searchQuery = stringify(searchParams);
  const includeSearchQuery = searchQuery.length > 0 ? `?${searchQuery}` : '';
  const path = pathByRouteName(routeName, flattenedRoutes, pathParams);
  return `${path}${includeSearchQuery}`;
};

/**
 * Find component related to route name
 * E.g. `const PageComponent = findComponentByRouteName('CheckoutPage', routes);`
 * Then we can call static methods of given component:
 * `dispatch(PageComponent.customPageState({ listing, bookingDates }));`
 *
 * @param {String} nameToFind - Route name
 * @param {Array<{ route }>} flattenedRoutes - Route configuration as flattened array.
 *
 * @return {Route} - Route that matches the given route name.
 */
export const findRouteByRouteName = (nameToFind, flattenedRoutes) => {
  const route = findRouteByName(nameToFind, flattenedRoutes);
  if (!route) {
    throw new Error(`Component "${nameToFind}" was not found.`);
  }
  return route;
};
