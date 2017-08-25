import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { PageLayout, NamedRedirect, TabNavHorizontal, Topbar } from '../../components';
import { LoginForm, SignupForm } from '../../containers';
import { login, logout, authenticationInProgress, signup } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

import css from './AuthenticationPage.css';

const ERROR_CODE_EMAIL_TAKEN = 'email-taken';

const firstApiError = error => {
  if (error && error.data && error.data.errors && error.data.errors.length > 0) {
    return error.data.errors[0];
  }
  return null;
};

const isEmailTakenApiError = error => {
  const apiError = firstApiError(error);
  return apiError && apiError.code === ERROR_CODE_EMAIL_TAKEN;
};

export const AuthenticationPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    history,
    intl,
    isAuthenticated,
    location,
    loginError,
    logoutError,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
    scrollingDisabled,
    signupError,
    submitLogin,
    submitSignup,
    tab,
  } = props;
  const isLogin = tab === 'login';
  const from = location.state && location.state.from ? location.state.from : null;

  // Already authenticated, redirect away from auth page
  if (isAuthenticated && from) {
    return <Redirect to={from} />;
  } else if (isAuthenticated) {
    return <NamedRedirect name="LandingPage" />;
  }

  const title = intl.formatMessage({
    id: isLogin ? 'AuthenticationPage.loginPageTitle' : 'AuthenticationPage.signupPageTitle',
  });

  /* eslint-disable no-console */
  if (loginError && console && console.error) {
    console.error(loginError);
  }
  if (signupError && console && console.error) {
    console.error(signupError);
  }
  /* eslint-enable no-console */

  const loginErrorMessage = (
    <div className={css.error}>
      <FormattedMessage id="AuthenticationPage.loginFailed" />
    </div>
  );

  const signupErrorMessage = (
    <div className={css.error}>
      {isEmailTakenApiError(signupError)
        ? <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        : <FormattedMessage id="AuthenticationPage.signupFailed" />}
    </div>
  );

  // eslint-disable-next-line no-confusing-arrow
  const errorMessage = (error, message) => error ? message : null;
  const loginOrSignupError = isLogin
    ? errorMessage(loginError, loginErrorMessage)
    : errorMessage(signupError, signupErrorMessage);

  const fromState = { state: from ? { from } : null };

  const tabs = [
    {
      text: (
        <h1 className={css.tab}><FormattedMessage id="AuthenticationPage.signupLinkText" /></h1>
      ),
      selected: !isLogin,
      linkProps: {
        name: 'SignupPage',
        to: fromState,
      },
    },
    {
      text: <h1 className={css.tab}><FormattedMessage id="AuthenticationPage.loginLinkText" /></h1>,
      selected: isLogin,
      linkProps: {
        name: 'LoginPage',
        to: fromState,
      },
    },
  ];

  return (
    <PageLayout
      authInfoError={authInfoError}
      logoutError={logoutError}
      title={title}
      scrollingDisabled={scrollingDisabled}
    >
      <Topbar
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
      />
      <div className={css.root}>
        <div className={css.content}>
          <TabNavHorizontal className={css.tabs} tabs={tabs} />
          {loginOrSignupError}
          {isLogin
            ? <LoginForm className={css.form} onSubmit={submitLogin} inProgress={authInProgress} />
            : <SignupForm
                className={css.form}
                onSubmit={submitSignup}
                inProgress={authInProgress}
              />}
        </div>
      </div>
    </PageLayout>
  );
};

AuthenticationPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  loginError: null,
  logoutError: null,
  notificationCount: 0,
  signupError: null,
  tab: 'signup',
};

const { bool, func, instanceOf, number, object, oneOf, shape } = PropTypes;

AuthenticationPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  loginError: instanceOf(Error),
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  signupError: instanceOf(Error),
  submitLogin: func.isRequired,
  submitSignup: func.isRequired,
  tab: oneOf(['login', 'signup']),

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { authInfoError, isAuthenticated, loginError, logoutError, signupError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    isAuthenticated,
    loginError,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    signupError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  submitLogin: ({ email, password }) => dispatch(login(email, password)),
  submitSignup: params => dispatch(signup(params)),
});

const AuthenticationPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl
)(AuthenticationPageComponent);

export default AuthenticationPage;
