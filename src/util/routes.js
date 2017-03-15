import React, { PropTypes } from 'react';
import { find } from 'lodash';
import { matchPath } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import routesConfiguration from '../routesConfiguration';
import * as propTypes from './propTypes';

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
    [],
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
export const matchPathname = pathname => {
  // TODO: remove flattening when routesConfiguration is flat
  const flattenedRoutes = flattenRoutes(routesConfiguration);

  return flattenedRoutes.reduce(
    (matches, route) => {
      const { exact = false } = route;
      const match = !route.path || matchPath(pathname, route.path, { exact });
      if (match) {
        matches.push({
          route,
          params: match.params || {},
        });
      }
      return matches;
    },
    [],
  );
};

/**
 * A higher order component (HOC) to take the flattened routes from
 * the context that the RoutesProvider component has provided.
 *
 * Injects the routes as the `flattenedRoutes` prop in the given
 * component. Works similarly as `withRouter` in React Router.
 */
export const withFlattenedRoutes = Component => {
  const WithFlattenedRoutesComponent = (props, context) => (
    <Component flattenedRoutes={context.flattenedRoutes} {...props} />
  );

  WithFlattenedRoutesComponent.displayName = `withFlattenedRoutes(${Component.displayName || Component.name})`;

  const { arrayOf } = PropTypes;

  WithFlattenedRoutesComponent.contextTypes = {
    flattenedRoutes: arrayOf(propTypes.route).isRequired,
  };

  return WithFlattenedRoutesComponent;
};
