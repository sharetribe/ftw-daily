import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { pickBy } from 'lodash';
import classNames from 'classnames';
import config from '../../config';
import { ensureCurrentUser } from '../../util/data';
import { withFlattenedRoutes, withViewport } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import {
  Button,
  IconEmailAttention,
  InlineTextButton,
  Modal,
  NamedLink,
  TopbarDesktop,
  TopbarMobileMenu,
} from '../../components';
import { TopbarSearchForm } from '../../containers';

import MenuIcon from './MenuIcon';
import LogoIcon from './LogoIcon';
import SearchIcon from './SearchIcon';
import css from './Topbar.css';

const ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS = 'too-many-verification-requests';
const MAX_MOBILE_SCREEN_WIDTH = 768;
const VERIFY_EMAIL_MODAL_WHITELIST = [
  'LoginPage',
  'SignupPage',
  'ContactDetailsPage',
  'EmailVerificationPage',
  'PasswordResetPage',
];

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

const firstApiError = error => {
  if (error && error.data && error.data.errors && error.data.errors.length > 0) {
    return error.data.errors[0];
  }
  return null;
};

const isTooManyVerificationRequestsApiError = error => {
  const apiError = firstApiError(error);
  return apiError && apiError.code === ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS;
};

class TopbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showVerifyEmailReminder: false, hasSeenEmailReminder: false };

    this.onHistoryChanged = this.handleEmailReminder.bind(this);
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMobileSearchOpen = this.handleMobileSearchOpen.bind(this);
    this.handleMobileSearchClose = this.handleMobileSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, currentUserHasListings, currentUserHasOrders, location } = nextProps;
    const user = ensureCurrentUser(currentUser);
    this.handleEmailReminder(user, currentUserHasListings, currentUserHasOrders, location);
  }

  handleEmailReminder(currentUser, currentUserHasListings, currentUserHasOrders, newLocation) {
    // Track if path changes inside Page level component
    const pathChanged = newLocation.pathname !== this.props.location.pathname;
    const emailUnverified = !!currentUser.id && !currentUser.attributes.emailVerified;
    const notRemindedYet = !this.state.showVerifyEmailReminder && !this.state.hasSeenEmailReminder;
    const showOnPathChange = notRemindedYet || pathChanged;

    // Emails are sent when order is initiated
    // Customer is likely to get email soon when she books something
    // Provider email should work - she should get an email when someone books a listing
    const hasOrders = currentUserHasOrders === true;
    const hasListingsOrOrders = currentUserHasListings || hasOrders;

    const whitelistedPaths = VERIFY_EMAIL_MODAL_WHITELIST.map(page =>
      pathByRouteName(page, this.props.flattenedRoutes));
    const isNotWhitelisted = !whitelistedPaths.includes(newLocation.pathname);

    // Show reminder
    if (emailUnverified && isNotWhitelisted && hasListingsOrOrders && showOnPathChange) {
      this.setState({ showVerifyEmailReminder: true });
    }
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
    onLogout().then(() => {
      const path = pathByRouteName('LandingPage', flattenedRoutes);

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      // TODO: show flash message
      console.log('logged out'); // eslint-disable-line
    });
  }

  render() {
    const {
      className,
      rootClassName,
      desktopClassName,
      mobileRootClassName,
      mobileClassName,
      isAuthenticated,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentPage,
      notificationCount,
      viewport,
      intl,
      location,
      onManageDisableScrolling,
      onResendVerificationEmail,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
    } = this.props;

    const { mobilemenu, mobilesearch, address, origin, bounds, country } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
    const isMobileMenuOpen = isMobileLayout && mobilemenu === 'open';
    const isMobileSearchOpen = isMobileLayout && mobilesearch === 'open';

    const mobileMenu = (
      <TopbarMobileMenu
        isAuthenticated={isAuthenticated}
        currentUserHasListings={currentUserHasListings}
        currentUser={currentUser}
        onLogout={this.handleLogout}
        notificationCount={notificationCount}
        currentPage={currentPage}
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

    const user = ensureCurrentUser(currentUser);
    const email = user.id ? <span className={css.email}>{user.attributes.email}</span> : '';

    const resendEmailLink = (
      <InlineTextButton className={css.helperLink} onClick={onResendVerificationEmail}>
        <FormattedMessage id="Topbar.resendEmailLinkText" />
      </InlineTextButton>
    );
    const fixEmailLink = (
      <NamedLink className={css.helperLink} name="ContactDetailsPage">
        <FormattedMessage id="Topbar.fixEmailLinkText" />
      </NamedLink>
    );

    const resendErrorTranslationId = isTooManyVerificationRequestsApiError(
      sendVerificationEmailError
    )
      ? 'Topbar.resendFailedTooManyRequests'
      : 'Topbar.resendFailed';
    const resendErrorMessage = sendVerificationEmailError
      ? <p className={css.error}>
          <FormattedMessage id={resendErrorTranslationId} />
        </p>
      : null;
    const closeButtonMessage = <FormattedMessage id="Topbar.closeVerifyEmailReminder" />;

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={classNames(mobileRootClassName || css.container, mobileClassName)}>
          <Button rootClassName={css.menu} onClick={this.handleMobileMenuOpen}>
            <MenuIcon
              className={css.menuIcon}
              title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
            />
            {notificationDot}
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
            className={desktopClassName}
            currentUserHasListings={currentUserHasListings}
            currentUser={currentUser}
            currentPage={currentPage}
            initialSearchFormValues={initialSearchFormValues}
            intl={intl}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            onLogout={this.handleLogout}
            onSearchSubmit={this.handleSubmit}
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
          containerClassName={css.modalContainer}
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

        <Modal
          id="EmailVerificationReminder"
          containerClassName={css.verifyEmailModal}
          isOpen={this.state.showVerifyEmailReminder}
          onClose={() => {
            this.setState({ showVerifyEmailReminder: false, hasSeenEmailReminder: true });
          }}
          onManageDisableScrolling={onManageDisableScrolling}
          closeButtonMessage={closeButtonMessage}
        >
          <div className={css.verifyEmailContent}>
            <IconEmailAttention className={css.modalIcon} />
            <p className={css.modalTitle}>
              <FormattedMessage id="Topbar.verifyEmailTitle" />
            </p>
            <p className={css.modalMessage}>
              <FormattedMessage id="Topbar.verifyEmailText" />
            </p>
            <p className={css.modalMessage}>
              <FormattedMessage id="Topbar.checkInbox" values={{ email }} />
            </p>
            {resendErrorMessage}

            <div className={css.bottomWrapper}>
              <p className={css.helperText}>
                {sendVerificationEmailInProgress
                  ? <FormattedMessage id="Topbar.sendingEmail" />
                  : <FormattedMessage id="Topbar.resendEmail" values={{ resendEmailLink }} />}
              </p>
              <p className={css.helperText}>
                <FormattedMessage id="Topbar.fixEmail" values={{ fixEmailLink }} />
              </p>
            </div>

          </div>
        </Modal>
      </div>
    );
  }
}

TopbarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  desktopClassName: null,
  mobileRootClassName: null,
  mobileClassName: null,
  notificationCount: 0,
  currentUser: null,
  currentUserHasOrders: null,
  currentPage: null,
  sendVerificationEmailError: null,
};

const { arrayOf, bool, func, instanceOf, number, shape, string } = PropTypes;

TopbarComponent.propTypes = {
  className: string,
  rootClassName: string,
  desktopClassName: string,
  mobileRootClassName: string,
  mobileClassName: string,
  isAuthenticated: bool.isRequired,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onResendVerificationEmail: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),

  // These are passed from Page to keep Topbar rendering aware of location changes
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: arrayOf(propTypes.route).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Topbar = compose(withViewport, withFlattenedRoutes, injectIntl)(TopbarComponent);

Topbar.displayName = 'Topbar';

export default Topbar;
