import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NotFoundPage } from './containers';
import { NamedRedirect } from './components';
import { withFlattenedRoutes } from './util/routes';
import * as propTypes from './util/propTypes';

const { bool, arrayOf, object, func, shape, string, any } = PropTypes;

class RouteComponentRenderer extends Component {
  constructor(props) {
    super(props);
    this.canShowComponent = this.canShowComponent.bind(this);
  }
  componentDidMount() {
    const { match, location, route, dispatch } = this.props;
    const { loadData, name } = route;
    const shouldLoadData = typeof loadData === 'function' && this.canShowComponent();

    if (shouldLoadData) {
      dispatch(loadData(match.params, location.search))
        .then(() => {
          // eslint-disable-next-line no-console
          console.log(`loadData success for ${name} route`);
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(`loadData error for ${name} route`, e);
        });
    }
  }
  canShowComponent() {
    const { isAuthenticated, route } = this.props;
    const { auth } = route;
    return !auth || isAuthenticated;
  }
  render() {
    const { route, match, location, staticContext, flattenedRoutes } = this.props;
    const { component: RouteComponent } = route;
    const canShow = this.canShowComponent();
    if (!canShow) {
      staticContext.forbidden = true;
    }
    return canShow
      ? <RouteComponent
          params={match.params}
          location={location}
          flattenedRoutes={flattenedRoutes}
        />
      : <NamedRedirect name="LogInPage" state={{ from: match.url }} />;
  }
}

RouteComponentRenderer.propTypes = {
  isAuthenticated: bool.isRequired,
  flattenedRoutes: any.isRequired,
  route: propTypes.route.isRequired,
  match: shape({
    params: object.isRequired,
    url: string.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  staticContext: object.isRequired,
  dispatch: func.isRequired,
};

const Routes = props => {
  const { isAuthenticated, flattenedRoutes, staticContext, dispatch } = props;

  const toRouteComponent = route => {
    const renderProps = { isAuthenticated, route, staticContext, dispatch, flattenedRoutes };
    return (
      <Route
        key={route.name}
        path={route.path}
        exact={route.exact}
        render={matchProps => (
          <RouteComponentRenderer
            {...renderProps}
            match={matchProps.match}
            location={matchProps.location}
          />
        )}
      />
    );
  };

  return (
    <Switch>
      {flattenedRoutes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

Routes.defaultProps = { staticContext: {} };

Routes.propTypes = {
  isAuthenticated: bool.isRequired,
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  staticContext: object,
  dispatch: func.isRequired,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

export default compose(connect(mapStateToProps), withRouter, withFlattenedRoutes)(Routes);
