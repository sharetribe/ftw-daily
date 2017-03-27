import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../ducks/Auth.duck';
import { NamedLink, Button } from '../../components';

import css from './Topbar.css';

/* eslint-disable react/no-danger */
const House = () => <span dangerouslySetInnerHTML={{ __html: '&#127968;' }} />;
/* eslint-enable react/no-danger */

const Topbar = props => {
  const { isAuthenticated, onLogout, push: historyPush } = props;

  const handleLogout = () => {
    // History push function is passed to the action to enable
    // redirect to home when logout succeeds.
    onLogout(historyPush);
  };

  return (
    <div className={css.container}>
      <div>
        <NamedLink className={css.home} name="LandingPage">
          <House />
        </NamedLink>
      </div>
      <div className={css.user}>
        {isAuthenticated
          ? <Button className={css.logoutButton} onClick={handleLogout}>Logout</Button>
          : <NamedLink name="LogInPage">Login</NamedLink>}
      </div>
    </div>
  );
};

Topbar.defaultProps = { user: null };

const { bool, func } = PropTypes;

Topbar.propTypes = {
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  // history.push prop from withRouter
  push: func.isRequired,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

const mapDispatchToProps = dispatch => ({ onLogout: historyPush => dispatch(logout(historyPush)) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topbar));
