import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../ducks/Auth.ducks';
import { NamedLink } from '../../components';

import css from './Topbar.css';

/* eslint-disable react/no-danger */
const House = () => <span dangerouslySetInnerHTML={{ __html: '&#127968;' }} />;
/* eslint-enable react/no-danger */

const Topbar = props => {
  const { isAuthenticated, onLogout, user, push: historyPush } = props;
  const hamburger = { dangerouslySetInnerHTML: { __html: '&#127828;' } };

  const handleChange = e => {
    const value = e.target.value;
    historyPush(value);
  };

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
        <select value="default" className={css.navDropDown} onChange={handleChange}>
          <option value="default" {...hamburger} />
          <option value="/s">Search</option>
          <option value="/l/Bike-Pelago/12345">Listing page</option>
          <option value="/u/Bikerrs">Profile</option>
          <option value="/u/Bikerrs/edit">Edit profile</option>
          <option value="/checkout/lid1234">Checkout</option>
          <option value="/inbox">Inbox</option>
          <option value="/orders">Orders</option>
          <option value="/sales">Sales</option>
          <option value="/password/forgotten">Request password</option>
          <option value="/password/change">Change password</option>
          <option value="/listings">Manage listings</option>
          <option value="/account">Account settings</option>
          <option value="/account/contact-details">Contact details</option>
          <option value="/account/payout-preferences">Payout preferences</option>
          <option value="/account/security">Security</option>
        </select>
      </div>
      <div className={css.user}>
        {isAuthenticated
          ? <div>
              Logged in as{' '}
              {user.email}
              <button className={css.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
          : <NamedLink name="LogInPage">Login</NamedLink>}
      </div>
    </div>
  );
};

Topbar.defaultProps = { user: null };

const { bool, object, func } = PropTypes;

Topbar.propTypes = {
  isAuthenticated: bool.isRequired,
  user: object,
  onLogout: func.isRequired,
  // history.push prop from withRouter
  push: func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

const mapDispatchToProps = dispatch => ({ onLogout: historyPush => dispatch(logout(historyPush)) });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topbar));
