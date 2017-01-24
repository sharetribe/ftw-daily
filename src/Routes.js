import React, { PropTypes } from 'react';
import { Match, Miss, Redirect } from 'react-router';
import { RouterProvider, RoutesProvider } from './components';
import { NotFoundPage } from './containers';
import routesConfiguration, { flattenRoutes, pathByRouteName } from './routesConfiguration';

// Fake authentication module
// An example from react-router v4 repository
// This will be replaced once we have redux store and sdk
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    window.setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    cb();
    window.setTimeout(cb, 100); // weird bug if async?
  },
};

// wrap `Match` and use this everywhere instead, then when
// sub routes are added to any route it'll work
// This will also check if route needs authentication.
/* eslint-disable arrow-body-style */
const MatchWithSubRoutes = props => {
  const { auth, component: Component, ...rest } = props;
  const canShowComponent = !auth || (auth && fakeAuth.isAuthenticated);
  return (
    <Match
      {...rest}
      render={matchProps => {
          return canShowComponent
            ? <Component {...matchProps} />
            : (
              <Redirect
                to={
                  {
                    pathname: pathByRouteName('LogInPage', routesConfiguration, {}),
                    state: { from: matchProps.location },
                  }
                }
              />
            );
        }}
    />
  );
};
/* eslint-enable arrow-body-style */

MatchWithSubRoutes.defaultProps = { auth: false, exactly: false };

const { any, array, bool, func, node, oneOfType, string } = PropTypes;

MatchWithSubRoutes.propTypes = {
  pattern: string.isRequired,
  auth: bool,
  exactly: bool,
  name: string.isRequired,
  component: oneOfType([ func, node ]).isRequired,
};

const Routes = props => {
  const flattenedRoutes = flattenRoutes(props.routes);
  const matches = flattenedRoutes.map(route => <MatchWithSubRoutes key={route.name} {...route} />);

  return (
    <RouterProvider router={props.router}>
      <RoutesProvider routes={props.routes}>
        <div>
          {matches}
          <Miss component={NotFoundPage} />
        </div>
      </RoutesProvider>
    </RouterProvider>
  );
};

Routes.propTypes = { router: any.isRequired, routes: array.isRequired };

export default Routes;
