import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NotFoundPage } from './containers';
import { NamedRedirect } from './components';
import { withFlattenedRoutes } from './util/contextHelpers';
import * as propTypes from './util/propTypes';

const { bool, arrayOf, object, func, shape, string, any } = PropTypes;

class RouteComponentRenderer extends Component {
  constructor(props) {
    super(props);
    this.canShowComponent = this.canShowComponent.bind(this);
    this.callLoadData = this.callLoadData.bind(this);
  }

  componentDidMount() {
    // Calling loadData on initial rendering (on client side).
    this.callLoadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // Calling loadData after initial rendering (on client side).
    // This makes it possible to use loadData as default client side data loading technique.
    // However it is better to fetch data before location change to avoid "Loading data" state.
    this.callLoadData(nextProps);
  }

  canShowComponent() {
    const { isAuthenticated, route } = this.props;
    const { auth } = route;
    return !auth || isAuthenticated;
  }

  callLoadData(props) {
    const { match, location, route, dispatch } = props;
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

  render() {
    const { route, match, location, staticContext, flattenedRoutes } = this.props;
    const { component: RouteComponent, preferLogin = false } = route;
    const canShow = this.canShowComponent();
    if (!canShow) {
      staticContext.forbidden = true;
    }
    const authPageName = preferLogin ? 'LoginPage' : 'SignupPage';
    return canShow
      ? <RouteComponent
          params={match.params}
          location={location}
          flattenedRoutes={flattenedRoutes}
        />
      : <NamedRedirect
          name={authPageName}
          state={{ from: `${location.pathname}${location.search}` }}
        />;
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
  // eslint-disable-next-line react/no-unused-prop-types
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

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from withRouter
  staticContext: object,

  // from connect
  dispatch: func.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  return { isAuthenticated };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
export default compose(withRouter, connect(mapStateToProps), withFlattenedRoutes)(Routes);
