import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { Button, FlatButton, Modal, NamedLink } from '../../components';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

import css from './Topbar.css';

/* eslint-disable react/no-danger */
const House = () => <span dangerouslySetInnerHTML={{ __html: '&#127968;' }} />;
const Burger = () => <span dangerouslySetInnerHTML={{ __html: '&#9776;' }} />;
/* eslint-enable react/no-danger */

class TopbarComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMobileMenuOpen() {
    const { history, location } = this.props;
    const { pathname, search, state } = location;
    const searchString = `?${stringify({ mobilemenu: 'open', ...parse(search) })}`;

    history.push(`${pathname}${searchString}`, state);
  }

  handleMobileMenuClose() {
    const { history, location } = this.props;
    const { pathname, search, state } = location;
    const { mobilemenu, ...queryParams } = parse(search); // eslint-disable-line no-unused-vars
    const stringified = stringify(queryParams);
    const searchString = stringified ? `?${stringified}` : '';

    history.push(`${pathname}${searchString}`, state);
  }

  handleLogout() {
    const { onLogout, history, flattenedRoutes } = this.props;
    const path = pathByRouteName('LandingPage', flattenedRoutes);
    history.push(path);
    onLogout().then(() => {
      // TODO: show flash message
      console.log('logged out'); // eslint-disable-line
    });
  }

  render() {
    const { isAuthenticated, authInProgress, location, togglePageClassNames } = this.props;
    const { mobilemenu } = parse(location.search);
    const isMobileMenuOpen = mobilemenu === 'open';

    const authAction = isAuthenticated
      ? <Button className={css.logoutButton} onClick={this.handleLogout}>Logout</Button>
      : <NamedLink name="LogInPage">Login</NamedLink>;

    return (
      <div className={css.root}>
        <div className={css.container}>
          <FlatButton className={css.hamburgerMenu} onClick={this.handleMobileMenuOpen}>
            <Burger />
          </FlatButton>
          <div>
            <NamedLink className={css.home} name="LandingPage">
              <House />
            </NamedLink>
          </div>
          <div className={css.user}>
            {authInProgress ? null : authAction}
          </div>
        </div>
        <Modal
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          togglePageClassNames={togglePageClassNames}
        >
          <div className={css.mobileMenuContent}>
            <NamedLink name="InboxBasePage">
              <FormattedMessage id="Topbar.inboxLink" defaultMessage="Inbox" />
            </NamedLink>
          </div>
        </Modal>
      </div>
    );
  }
}

const { arrayOf, bool, func, shape, string } = PropTypes;

TopbarComponent.propTypes = {
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  onLogout: func.isRequired,
  togglePageClassNames: func.isRequired,

  // These are passed from PageLayout to keep Topbar rendering aware of location changes
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  return {
    isAuthenticated,
    authInProgress: authenticationInProgress(state),
  };
};

const mapDispatchToProps = dispatch => ({ onLogout: historyPush => dispatch(logout(historyPush)) });

const Topbar = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFlattenedRoutes
)(TopbarComponent);

export default Topbar;
