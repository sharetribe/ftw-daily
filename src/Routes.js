import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './containers';
import { NamedRedirect } from './components';
import * as propTypes from './util/propTypes';

const Routes = props => {
  const { isAuthenticated, routes } = props;

  const renderComponent = (route, matchProps) => {
    const { auth, component: Component } = route;
    const { match, location } = matchProps;
    const canShowComponent = !auth || isAuthenticated;
    return canShowComponent
      ? <Component params={match.params} location={location} />
      : <NamedRedirect name="LogInPage" state={{ from: match.url }} />;
  };

  const toRouteComponent = route => (
    <Route
      key={route.name}
      path={route.pattern}
      exact={route.exact}
      render={matchProps => renderComponent(route, matchProps)}
    />
  );

  return (
    <Switch>
      {routes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const { bool, arrayOf } = PropTypes;

Routes.propTypes = {
  isAuthenticated: bool.isRequired,
  routes: arrayOf(propTypes.route).isRequired,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

export default connect(mapStateToProps)(Routes);
