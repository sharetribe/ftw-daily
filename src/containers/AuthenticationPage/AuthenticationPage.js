import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { PageLayout, NamedRedirect, NamedLink } from '../../components';
import { LoginForm, SignupForm } from '../../containers';
import { login, authenticationInProgress, signup } from '../../ducks/Auth.duck';

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
    location,
    tab,
    isAuthenticated,
    loginError,
    signupError,
    authInProgress,
    submitLogin,
    submitSignup,
    intl,
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
    <div style={{ color: 'red' }}>
      <FormattedMessage id="AuthenticationPage.loginFailed" />
    </div>
  );

  const signupErrorMessage = (
    <div style={{ color: 'red' }}>
      {isEmailTakenApiError(signupError)
        ? <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        : <FormattedMessage id="AuthenticationPage.signupFailed" />}
    </div>
  );

  const loginLinkClasses = classNames(css.tab, isLogin ? css.activeTab : null);
  const signupLinkClasses = classNames(css.tab, !isLogin ? css.activeTab : null);
  const fromState = { state: from ? { from } : null };

  return (
    <PageLayout title={title}>
      <div className={css.root}>
        <nav className={css.tabs}>
          <NamedLink className={signupLinkClasses} name="SignupPage" to={fromState}>
            <FormattedMessage id="AuthenticationPage.signupLinkText" />
          </NamedLink>
          <NamedLink className={loginLinkClasses} name="LoginPage" to={fromState}>
            <FormattedMessage id="AuthenticationPage.loginLinkText" />
          </NamedLink>
        </nav>
        {loginError ? loginErrorMessage : null}
        {signupError ? signupErrorMessage : null}
        {isLogin
          ? <LoginForm onSubmit={submitLogin} inProgress={authInProgress} />
          : <SignupForm onSubmit={submitSignup} inProgress={authInProgress} />}
      </div>
    </PageLayout>
  );
};

AuthenticationPageComponent.defaultProps = {
  tab: 'signup',
  loginError: null,
  signupError: null,
};

const { object, oneOf, shape, bool, func, instanceOf } = PropTypes;

AuthenticationPageComponent.propTypes = {
  location: shape({ state: object }).isRequired,
  tab: oneOf(['login', 'signup']),

  isAuthenticated: bool.isRequired,
  loginError: instanceOf(Error),
  signupError: instanceOf(Error),
  authInProgress: bool.isRequired,

  submitLogin: func.isRequired,
  submitSignup: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated, loginError, signupError } = state.Auth;
  return {
    isAuthenticated,
    loginError,
    signupError,
    authInProgress: authenticationInProgress(state),
  };
};

const mapDispatchToProps = dispatch => ({
  submitLogin: ({ email, password }) => dispatch(login(email, password)),
  submitSignup: params => dispatch(signup(params)),
});

const AuthenticationPage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  AuthenticationPageComponent
);

export default AuthenticationPage;
