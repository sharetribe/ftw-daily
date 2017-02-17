import React, { PropTypes } from 'react';
import { find } from 'lodash';
import { matchPath } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import routesConfiguration from '../routesConfiguration';
import * as propTypes from './propTypes';

export const flattenRoutes = routesArray =>
  routesArray.reduce((a, b) => a.concat(b.routes ? [b].concat(flattenRoutes(b.routes)) : b), []);

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
 * matchRoutesToLocation helps to figure out which routes are related to given location.
 */
const matchRoutesToLocation = (routes, location, matchedRoutes = [], params = {}) => {
  let parameters = { ...params };
  let matched = [...matchedRoutes];

  routes.forEach(route => {
    const { exact = false } = route;
    const match = !route.path || matchPath(location.pathname, route.path, { exact });

    if (match) {
      matched.push(route);

      if (match.params) {
        parameters = { ...parameters, ...match.params };
      }
    }

    if (route.routes) {
      const { matchedRoutes: subRouteMatches, params: subRouteParams } = matchRoutesToLocation(
        route.routes,
        location,
        matched,
        parameters,
      );
      matched = matched.concat(subRouteMatches);
      parameters = { ...parameters, ...subRouteParams };
    }
  });

  return { matchedRoutes: matched, params: parameters };
};

const matchPathnameCreator = routes =>
  (location, matchedRoutes = [], params = {}) =>
    matchRoutesToLocation(routes, { pathname: location }, matchedRoutes, params);

/**
 * matchRoutesToLocation helps to figure out which routes are related to given location.
 */
export const matchPathname = matchPathnameCreator(routesConfiguration);

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

  WithFlattenedRoutesComponent.displayName = `withFlattenedRoutes(${Component.displayName ||
    Component.name})`;

  const { arrayOf } = PropTypes;

  WithFlattenedRoutesComponent.contextTypes = {
    flattenedRoutes: arrayOf(propTypes.route).isRequired,
  };

  return WithFlattenedRoutesComponent;
};
