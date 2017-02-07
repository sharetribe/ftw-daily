import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';
import routesConfiguration, { pathByRouteName } from '../../routesConfiguration';

// wrap `Match` and use this everywhere instead, then when
// sub routes are added to any route it'll work
// This will also check if route needs authentication.
/* eslint-disable arrow-body-style */
const MatchWithSubRoutes = props => {
  const { auth, component: Component, isAuthenticated, ...rest } = props;
  const canShowComponent = !auth || isAuthenticated;
  return (
    <Match
      {...rest}
      render={matchProps => {
        return canShowComponent
          ? <Component {...matchProps} />
          : <Redirect
              to={{
                pathname: pathByRouteName('LogInPage', routesConfiguration, {}),
                state: { from: matchProps.location },
              }}
            />;
      }}
    />
  );
};
/* eslint-enable arrow-body-style */
MatchWithSubRoutes.defaultProps = { auth: false, exactly: false };

const { bool, func, node, oneOfType, string } = PropTypes;

MatchWithSubRoutes.propTypes = {
  pattern: string.isRequired,
  auth: bool,
  exactly: bool,
  name: string.isRequired,
  component: oneOfType([func, node]).isRequired,
  isAuthenticated: bool.isRequired,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

export default connect(mapStateToProps)(MatchWithSubRoutes);
