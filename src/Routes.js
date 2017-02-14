import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { RoutesProvider } from './components';
import { NotFoundPage } from './containers';
// import { flattenRoutes } from './routesConfiguration';

// const Routes_old = props => {
//   const { routes } = props;
//   const flattenedRoutes = flattenRoutes(routes);
//   const matches = flattenedRoutes.map(route => <MatchWithSubRoutes key={route.name} {...route} />);
//   console.log('Routes.render()');
//   console.log({ RoutesProvider, Miss });
//   return (
//     <RoutesProvider routes={routes}>
//       <div>
//         {matches}
//         <Miss component={NotFoundPage} />
//       </div>
//     </RoutesProvider>
//   );
// };

// TODO: move RoutesProvider stuff here

const Routes = props => {
  const { routes } = props;
  console.log('Routes.render()');

  const toRouteComponent = route => {
    const { name, path, exact, strict, component } = route;
    return <Route key={name} path={path} exact={exact} strict={strict} component={component} />;
  };

  return (
    <Switch>
      {routes.map(toRouteComponent)}
      <Route component={NotFoundPage}/>
    </Switch>
  );
};

const { any } = PropTypes;

Routes.propTypes = { routes: any.isRequired };

export default Routes;
