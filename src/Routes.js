import React, { Component } from 'react';
import { arrayOf, bool, object, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NotFoundPage } from './containers';
import { NamedRedirect, LoadableComponentErrorBoundary } from './components';
import { locationChanged } from './ducks/Routing.duck';
import { propTypes } from './util/types';
import * as log from './util/log';
import { canonicalRoutePath } from './util/routes';
import routeConfiguration from './routeConfiguration';

const canShowComponent = props => {
  const { isAuthenticated, route } = props;
  const { auth } = route;
  return !auth || isAuthenticated;
};

const callLoadData = props => {
  const { match, location, route, dispatch, logoutInProgress } = props;
  const { loadData, name } = route;
  const shouldLoadData =
    typeof loadData === 'function' && canShowComponent(props) && !logoutInProgress;

  if (shouldLoadData) {
    dispatch(loadData(match.params, location.search))
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`loadData success for ${name} route`);
      })
      .catch(e => {
        log.error(e, 'load-data-failed', { routeName: name });
      });
  }
};

const setPageScrollPosition = location => {
  if (!location.hash) {
    // No hash, scroll to top
    window.scroll({
      top: 0,
      left: 0,
    });
  } else {
    const el = document.querySelector(location.hash);
    if (el) {
      // Found element from the current page with the given fragment identifier,
      // scrolling to that element.
      //
      // NOTE: This only works on in-app navigation within the same page.
      // If smooth scrolling is needed between different pages, one needs to wait
      //   1. loadData fetch and
      //   2. code-chunk fetch
      // before making el.scrollIntoView call.

      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }
};

const handleLocationChanged = (dispatch, location) => {
  setPageScrollPosition(location);
  const path = canonicalRoutePath(routeConfiguration(), location);
  dispatch(locationChanged(location, path));
};

/**
 * RouteComponentRenderer handles loadData calls on client-side.
 * It also checks authentication and redirects unauthenticated users
 * away from routes that are for authenticated users only
 * (aka "auth: true" is set in routeConfiguration.js)
 *
 * This component is a container: it needs to be connected to Redux.
 */
class RouteComponentRenderer extends Component {
  componentDidMount() {
    // Calling loadData on initial rendering (on client side).
    callLoadData(this.props);
    handleLocationChanged(this.props.dispatch, this.props.location);
  }

  componentDidUpdate(prevProps) {
    // Call for handleLocationChanged affects store/state
    // and it generates an unnecessary update.
    if (prevProps.location !== this.props.location) {
      // Calling loadData after initial rendering (on client side).
      // This makes it possible to use loadData as default client side data loading technique.
      // However it is better to fetch data before location change to avoid "Loading data" state.
      callLoadData(this.props);
      handleLocationChanged(this.props.dispatch, this.props.location);
    }
  }

  render() {
    const { route, match, location, staticContext } = this.props;
    const { component: RouteComponent, authPage = 'SignupPage', extraProps } = route;
    const canShow = canShowComponent(this.props);
    if (!canShow) {
      staticContext.unauthorized = true;
    }
    return canShow ? (
      <LoadableComponentErrorBoundary>
        <RouteComponent params={match.params} location={location} {...extraProps} />
      </LoadableComponentErrorBoundary>
    ) : (
      <NamedRedirect
        name={authPage}
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }
}

RouteComponentRenderer.defaultProps = { staticContext: {} };

RouteComponentRenderer.propTypes = {
  isAuthenticated: bool.isRequired,
  logoutInProgress: bool.isRequired,
  route: propTypes.route.isRequired,
  match: shape({
    params: object.isRequired,
    url: string.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  staticContext: object,
  dispatch: func.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated, logoutInProgress } = state.Auth;
  return { isAuthenticated, logoutInProgress };
};
const RouteComponentContainer = compose(connect(mapStateToProps))(RouteComponentRenderer);

/**
 * Routes component creates React Router rendering setup.
 * It needs routeConfiguration (named as "routes") through props.
 * Using that configuration it creates navigation on top of page-level
 * components. Essentially, it's something like:
 * <Switch>
 *   <Route render={pageA} />
 *   <Route render={pageB} />
 * </Switch>
 */
const Routes = (props, context) => {
  const { isAuthenticated, logoutInProgress, routes } = props;

  const toRouteComponent = route => {
    const renderProps = {
      isAuthenticated,
      logoutInProgress,
      route,
    };

    // By default, our routes are exact.
    // https://reacttraining.com/react-router/web/api/Route/exact-bool
    const isExact = route.exact != null ? route.exact : true;
    return (
      <Route
        key={route.name}
        path={route.path}
        exact={isExact}
        render={matchProps => (
          <RouteComponentContainer
            {...renderProps}
            match={matchProps.match}
            location={matchProps.location}
            staticContext={matchProps.staticContext}
          />
        )}
      />
    );
  };

  // N.B. routes prop within React Router needs to stay the same,
  // so that React is is not rerendering page component.
  // That's why we pass-in props.routes instead of calling routeConfiguration here.
  return (
    <Switch>
      {routes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

Routes.propTypes = {
  routes: arrayOf(propTypes.route).isRequired,
};

export default withRouter(Routes);
