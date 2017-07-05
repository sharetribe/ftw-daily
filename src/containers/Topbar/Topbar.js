import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { pickBy } from 'lodash';
import classNames from 'classnames';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';
import { Button, Modal, NamedLink, TopbarDesktop, TopbarMobileMenu } from '../../components';
import { TopbarSearchForm } from '../../containers';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { ensureUser } from '../../util/data';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';

import MenuIcon from './MenuIcon';
import LogoIcon from './LogoIcon';
import SearchIcon from './SearchIcon';
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
    const { search, selectedPlace } = values.location;
    const { flattenedRoutes, history } = this.props;
    const { origin, bounds, country } = selectedPlace;
    const searchParams = { address: search, origin, bounds, country };
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
      className,
      rootClassName,
      mobileRootClassName,
      isAuthenticated,
      authInProgress,
      currentUser,
      currentUserHasListings,
      intl,
      location,
      onManageDisableScrolling,
    } = this.props;
    const me = ensureUser(currentUser);
    const profile = me.attributes.profile;

    const { mobilemenu, mobilesearch, address, origin, bounds, country } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const isMobileMenuOpen = mobilemenu === 'open';
    const isMobileSearchOpen = mobilesearch === 'open';
    const mobileMenu = (
      <TopbarMobileMenu
        isAuthenticated={isAuthenticated}
        currentUserHasListings={currentUserHasListings}
        firstName={profile.firstName}
        lastName={profile.lastName}
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

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={classNames(mobileRootClassName || css.container)}>
          <Button rootClassName={css.menu} onClick={this.handleMobileMenuOpen}>
            <MenuIcon
              className={css.menuIcon}
              title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
            />
          </Button>
          <NamedLink className={css.home} name="LandingPage">
            <LogoIcon title={intl.formatMessage({ id: 'Topbar.logoIcon' })} />
          </NamedLink>
          <Button rootClassName={css.searchMenu} onClick={this.handleMobileSearchOpen}>
            <SearchIcon
              className={css.searchMenuIcon}
              title={intl.formatMessage({ id: 'Topbar.searchIcon' })}
            />
          </Button>
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            currentUserHasListings={currentUserHasListings}
            intl={intl}
            isAuthenticated={isAuthenticated}
            onLogout={this.handleLogout}
            firstName={profile.firstName}
            lastName={profile.lastName}
            onSearchSubmit={this.handleSubmit}
            initialSearchFormValues={initialSearchFormValues}
          />
        </div>
        <Modal
          id="TopbarMobileMenu"
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          id="TopbarMobileSearch"
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.searchContainer}>
            <TopbarSearchForm
              form="TopbarSearchForm"
              onSubmit={this.handleSubmit}
              initialValues={initialSearchFormValues}
              isMobile
            />
            <p className={css.mobileHelp}>
              <FormattedMessage id="Topbar.mobileSearchHelp" />
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

TopbarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  mobileRootClassName: null,
  currentUser: null,
};

const { arrayOf, bool, func, shape, string } = PropTypes;

TopbarComponent.propTypes = {
  className: string,
  rootClassName: string,
  mobileRootClassName: string,
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,

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

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onLogout: historyPush => dispatch(logout(historyPush)),
});

const Topbar = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFlattenedRoutes,
  injectIntl
)(TopbarComponent);

Topbar.displayName = 'Topbar';

export default Topbar;
