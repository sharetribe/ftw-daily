import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout, loginOrLogoutInProgress } from '../../ducks/Auth.duck';
import { NamedLink, Button } from '../../components';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

import css from './Topbar.css';

/* eslint-disable react/no-danger */
const House = () => <span dangerouslySetInnerHTML={{ __html: '&#127968;' }} />;
/* eslint-enable react/no-danger */

const TopbarComponent = props => {
  const { isAuthenticated, authInProgress, onLogout, history, flattenedRoutes } = props;

  const handleLogout = () => {
    const path = pathByRouteName('LandingPage', flattenedRoutes);
    history.push(path);
    onLogout().then(() => {
      // TODO: show flash message
      console.log('logged out'); // eslint-disable-line
    });
  };

  const authAction = isAuthenticated
    ? <Button className={css.logoutButton} onClick={handleLogout}>Logout</Button>
    : <NamedLink name="LogInPage">Login</NamedLink>;

  return (
    <div className={css.container}>
      <div>
        <NamedLink className={css.home} name="LandingPage">
          <House />
        </NamedLink>
      </div>
      <div className={css.user}>
        {authInProgress ? null : authAction}
      </div>
    </div>
  );
};

TopbarComponent.defaultProps = { user: null };

const { bool, func, shape, arrayOf } = PropTypes;

TopbarComponent.propTypes = {
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  onLogout: func.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route),
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  return {
    isAuthenticated,
    authInProgress: loginOrLogoutInProgress(state),
  };
};

const mapDispatchToProps = dispatch => ({ onLogout: historyPush => dispatch(logout(historyPush)) });

const Topbar = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withFlattenedRoutes
)(TopbarComponent);

export default Topbar;
