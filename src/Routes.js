import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NotFoundPage } from './containers';
import { NamedRedirect } from './components';
import { withFlattenedRoutes } from './util/routes';
import * as propTypes from './util/propTypes';

const Routes = props => {
  const { isAuthenticated, flattenedRoutes, staticContext } = props;

  const renderComponent = (route, matchProps) => {
    const { auth, component: RouteComponent } = route;
    const { match, location } = matchProps;
    const canShowComponent = !auth || isAuthenticated;
    if (!canShowComponent) {
      staticContext.forbidden = true;
    }
    return canShowComponent
      ? <RouteComponent params={match.params} location={location} />
      : <NamedRedirect name="LogInPage" state={{ from: match.url }} />;
  };

  const toRouteComponent = route => (
    <Route
      key={route.name}
      path={route.path}
      exact={route.exact}
      render={matchProps => renderComponent(route, matchProps)}
    />
  );

  return (
    <Switch>
      {flattenedRoutes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

Routes.defaultProps = { staticContext: {} };

const { bool, arrayOf, object } = PropTypes;

Routes.propTypes = {
  isAuthenticated: bool.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  staticContext: object,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

export default compose(connect(mapStateToProps), withRouter, withFlattenedRoutes)(Routes);
