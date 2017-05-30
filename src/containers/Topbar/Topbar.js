import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { pickBy } from 'lodash';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { FlatButton, MobileMenu, Modal, NamedLink, TopbarDesktop } from '../../components';
import { SearchForm } from '../../containers';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { ensureUser } from '../../util/data';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

import hamburgerIcon from './images/hamburgerIcon.svg';
import searchIcon from './images/searchIcon.svg';
import css from './Topbar.css';

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
    const { address, origin, bounds, country } = selectedPlace || {};
    const searchParams = { address, origin, bounds, country };
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
      currentUserHasListings,
      intl,
      location,
      togglePageClassNames,
    } = this.props;
    const me = ensureUser(currentUser);
    const profile = me.attributes.profile;
    const name = me.id ? `${profile.firstName} ${profile.lastName}` : '';

    const { mobilemenu, mobilesearch, address, origin, bounds, country } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const isMobileMenuOpen = mobilemenu === 'open';
    const isMobileSearchOpen = mobilesearch === 'open';
    const mobileMenu = (
      <MobileMenu
        isAuthenticated={isAuthenticated}
        currentUserHasListings={currentUserHasListings}
        name={name}
        onLogout={this.handleLogout}
      />
    );

    // Only render current search if full place object is available in the URL params
    const locationFieldsPresent = address && origin && bounds && country;
    const initialSearchFormValues = {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds, country },
          }
        : null,
    };

    return (
      <div className={css.root}>
        <div className={css.container}>
          <FlatButton className={css.hamburgerMenu} onClick={this.handleMobileMenuOpen}>
            <img src={hamburgerIcon} alt={intl.formatMessage({ id: 'Topbar.menuIcon' })} />
          </FlatButton>
          <div>
            <NamedLink className={css.home} name="LandingPage">
              Saunatime
            </NamedLink>
          </div>
          <FlatButton className={css.searchMenu} onClick={this.handleMobileSearchOpen}>
            <img src={searchIcon} alt={intl.formatMessage({ id: 'Topbar.searchIcon' })} />
          </FlatButton>
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            currentUserHasListings={currentUserHasListings}
            intl={intl}
            isAuthenticated={isAuthenticated}
            name={name}
          />
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
          <SearchForm
            form="TopbarSearchForm"
            className={css.searchForm}
            onSubmit={this.handleSubmit}
            initialValues={initialSearchFormValues}
          />
        </Modal>
      </div>
    );
  }
}

TopbarComponent.defaultProps = { currentUser: null };

const { arrayOf, bool, func, shape, string } = PropTypes;

TopbarComponent.propTypes = {
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
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

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const { currentUser, currentUserHasListings } = state.user;
  return {
    isAuthenticated,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
  };
};

const mapDispatchToProps = dispatch => ({ onLogout: historyPush => dispatch(logout(historyPush)) });

const Topbar = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFlattenedRoutes,
  injectIntl
)(TopbarComponent);

export default Topbar;
