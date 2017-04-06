import React, { PropTypes } from 'react';
import * as propTypes from './propTypes';

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

/**
 * A higher order component (HOC) to take the togglePageClassNames function from
 * the context that the PageLayout component has provided.
 */
export const withTogglePageClassNames = Component => {
  const WithTogglePageClassNamesComponent = (props, context) => (
    <Component togglePageClassNames={context.togglePageClassNames} {...props} />
  );

  WithTogglePageClassNamesComponent.displayName = `withTogglePageClassNames(${Component.displayName || Component.name})`;

  const { func } = PropTypes;

  WithTogglePageClassNamesComponent.contextTypes = {
    togglePageClassNames: func.isRequired,
  };

  return WithTogglePageClassNamesComponent;
};
