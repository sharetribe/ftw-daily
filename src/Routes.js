import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { types } from 'sharetribe-sdk';
import { NotFoundPage } from './containers';
import { NamedRedirect } from './components';
import { withFlattenedRoutes } from './util/routes';
import * as propTypes from './util/propTypes';

const { bool, arrayOf, object, func, shape, string, any } = PropTypes;

// Currently the SDK serialisation doesn't work with mixed types from
// client bundle and server imports. To fix this temporarily, we wrap
// the id param here for the client side instead of doing the same in
// the loadData handler.
// TODO: remove this once the SDK serialisation works
const fixParams = params => {
  if (params.id) {
    return { ...params, id: new types.UUID(params.id) };
  }
  return params;
};

class RouteComponentRenderer extends Component {
  constructor(props) {
    super(props);
    this.canShowComponent = this.canShowComponent.bind(this);
  }
  componentDidMount() {
    const { match, route, dispatch } = this.props;
    const { loadData, name } = route;
    const shouldLoadData = typeof loadData === 'function' && this.canShowComponent();

    if (shouldLoadData) {
      dispatch(loadData(fixParams(match.params), {}))
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
    const { route, match, location, staticContext } = this.props;
    const { component: RouteComponent } = route;
    const canShow = this.canShowComponent();
    if (!canShow) {
      staticContext.forbidden = true;
    }
    return canShow
      ? <RouteComponent params={match.params} location={location} />
      : <NamedRedirect name="LogInPage" state={{ from: match.url }} />;
  }
}

RouteComponentRenderer.propTypes = {
  isAuthenticated: bool.isRequired,
  route: propTypes.route.isRequired,
  match: shape({
    params: object.isRequired,
    url: string.isRequired,
  }).isRequired,
  location: any.isRequired,
  staticContext: object.isRequired,
  dispatch: func.isRequired,
};

const Routes = props => {
  const { isAuthenticated, flattenedRoutes, staticContext, dispatch } = props;

  const toRouteComponent = route => {
    const renderProps = { isAuthenticated, route, staticContext, dispatch };
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
