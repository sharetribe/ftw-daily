import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './containers';
import { NamedRedirect } from './components';

const Routes = props => {
  const { isAuthenticated, routes } = props;

  const renderComponent = (route, match) => {
    const { auth, component: Component } = route;
    const canShowComponent = !auth || isAuthenticated;
    return canShowComponent
      ? <Component {...match} />
      : <NamedRedirect name="LogInPage" state={{ from: match.location }} />;
  };

  const toRouteComponent = route => (
    <Route
      key={route.name}
      path={route.pattern}
      exact={route.exactly}
      render={matchProps => renderComponent(route, matchProps.match)}
    />
  );

  return (
    <Switch>
      {routes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const { bool, arrayOf, shape, string, func } = PropTypes;

Routes.propTypes = {
  isAuthenticated: bool.isRequired,
  routes: arrayOf(
    shape({
      name: string.isRequired,
      pattern: string.isRequired,
      exactly: bool,
      strict: bool,
      component: func.isRequired,
      loadData: func,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

export default connect(mapStateToProps)(Routes);
