import React, { PropTypes } from 'react';
import { Miss } from 'react-router-dom';
import { RouterProvider, RoutesProvider } from './components';
import { NotFoundPage, MatchWithSubRoutes } from './containers';
import { flattenRoutes } from './routesConfiguration';

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

const { any, array } = PropTypes;

Routes.propTypes = { router: any.isRequired, routes: array.isRequired };

export default Routes;
