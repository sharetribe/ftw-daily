import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pickBy } from 'lodash';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { FlatButton, MobileMenu, Modal, NamedLink } from '../../components';
import { SearchForm } from '../../containers';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { ensureUser } from '../../util/data';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

import css from './Topbar.css';

/* eslint-disable react/no-danger */
const House = () => <span dangerouslySetInnerHTML={{ __html: '&#127968;' }} />;
const Burger = () => <span dangerouslySetInnerHTML={{ __html: '&#9776;' }} />;
const Search = () => <span dangerouslySetInnerHTML={{ __html: '&#128269;' }} />;
/* eslint-enable react/no-danger */

const redirectToURLWithModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const searchString = `?${stringify({ [modalStateParam]: 'open', ...parse(search) })}`;
  history.push(`${pathname}${searchString}`, state);
};

const redirectToURLWithoutModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const queryParams = pickBy(parse(search), (v, k) => {
    return k !== modalStateParam;
  });
  const stringified = stringify(queryParams);
  const searchString = stringified ? `?${stringified}` : '';
  history.push(`${pathname}${searchString}`, state);
};

class TopbarComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMobileSearchOpen = this.handleMobileSearchOpen.bind(this);
    this.handleMobileSearchClose = this.handleMobileSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMobileMenuOpen() {
    redirectToURLWithModalState(this.props, 'mobilemenu');
  }

  handleMobileMenuClose() {
    redirectToURLWithoutModalState(this.props, 'mobilemenu');
  }

  handleMobileSearchOpen() {
    redirectToURLWithModalState(this.props, 'mobilesearch');
  }

  handleMobileSearchClose() {
    redirectToURLWithoutModalState(this.props, 'mobilesearch');
  }

  handleSubmit(values) {
    const selectedPlace = values && values.location ? values.location.selectedPlace : null;
    const { flattenedRoutes, history } = this.props;
    const { address, origin, bounds } = selectedPlace || {};
    const searchParams = { address, origin, bounds };
    history.push(createResourceLocatorString('SearchPage', flattenedRoutes, {}, searchParams));
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
    const {
      isAuthenticated,
      authInProgress,
      currentUser,
      location,
      togglePageClassNames,
    } = this.props;
    const me = ensureUser(currentUser);
    const profile = me.attributes.profile;
    const name = me.id ? `${profile.firstName} ${profile.lastName}` : '';
    const { mobilemenu, mobilesearch } = parse(location.search);
    const isMobileMenuOpen = mobilemenu === 'open';
    const isMobileSearchOpen = mobilesearch === 'open';
    const mobileMenu = (
      <MobileMenu isAuthenticated={isAuthenticated} name={name} onLogout={this.handleLogout} />
    );

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
          <FlatButton className={css.searchMenu} onClick={this.handleMobileSearchOpen}>
            <Search />
          </FlatButton>
        </div>
        <Modal
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          togglePageClassNames={togglePageClassNames}
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          togglePageClassNames={togglePageClassNames}
        >
          <SearchForm className={css.searchForm} onSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

const { arrayOf, bool, func, shape, string } = PropTypes;

TopbarComponent.propTypes = {
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
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
  const { currentUser } = state.user;
  return {
    isAuthenticated,
    authInProgress: authenticationInProgress(state),
    currentUser,
  };
};

const mapDispatchToProps = dispatch => ({ onLogout: historyPush => dispatch(logout(historyPush)) });

const Topbar = compose(connect(mapStateToProps, mapDispatchToProps), withFlattenedRoutes)(
  TopbarComponent
);

export default Topbar;
