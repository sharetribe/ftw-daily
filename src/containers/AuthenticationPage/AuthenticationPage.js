import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { PageLayout, NamedRedirect } from '../../components';
import { LoginForm, SignUpForm } from '../../containers';
import { login, loginOrLogoutInProgress } from '../../ducks/Auth.duck';

import css from './AuthenticationPage.css';

export const AuthenticationPageComponent = props => {
  const {
    location,
    tab,
    isAuthenticated,
    loginError,
    authInProgress,
    onLoginSubmit,
    onSignUpSubmit,
    intl,
  } = props;
  const isLogin = tab === 'login';
  const from = location.state && location.state.from ? location.state.from : null;

  const authRedirect = from ? <Redirect to={from} /> : <NamedRedirect name="LandingPage" />;

  /* eslint-disable no-console */
  if (loginError && console && console.error) {
    // TODO: use FlashMessages for auth errors
    console.error(loginError);
  }
  /* eslint-enable no-console */

  const loginTitle = intl.formatMessage({
    id: 'AuthenticationPage.loginPageTitle',
  });
  const signupTitle = intl.formatMessage({
    id: 'AuthenticationPage.signupPageTitle',
  });
  const title = isLogin ? loginTitle : signupTitle;

  return (
    <PageLayout title={title}>
      <div className={css.root}>
        {isAuthenticated ? authRedirect : null}
        {loginError
          ? <div style={{ color: 'red' }}>
              <FormattedMessage id="AuthenticationPage.loginFailed" />
            </div>
          : null}
        {from
          ? <p>
              <FormattedMessage id="AuthenticationPage.loginRequiredFor" />
              <code>{from}</code>
            </p>
          : null}
        {isLogin
          ? <LoginForm onSubmit={onLoginSubmit} inProgress={authInProgress} />
          : <SignUpForm onSubmit={onSignUpSubmit} />}
        {/* {isLogin
          ? <NamedLink name="SignUpPage" to={{ state: from ? { from } : null }}>Sign up</NamedLink>
          : <NamedLink name="LogInPage" to={{ state: from ? { from } : null }}>Log in</NamedLink>} */}
      </div>
    </PageLayout>
  );
};

AuthenticationPageComponent.defaultProps = {
  tab: 'signup',
  authInfoError: null,
  loginError: null,
  logoutError: null,
};

const { object, oneOf, shape, bool, func, instanceOf } = PropTypes;

AuthenticationPageComponent.propTypes = {
  location: shape({ state: object }).isRequired,
  tab: oneOf(['login', 'signup']),
  isAuthenticated: bool.isRequired,
  loginError: instanceOf(Error),
  authInProgress: bool.isRequired,
  onLoginSubmit: func.isRequired,
  onSignUpSubmit: func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated, loginError } = state.Auth;
  return {
    isAuthenticated,
    loginError,
    authInProgress: loginOrLogoutInProgress(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onLoginSubmit: ({ email, password }) => dispatch(login(email, password)),
  onSignUpSubmit: () => {
    console.log('signup submit'); // eslint-disable-line
  },
});

const AuthenticationPage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  AuthenticationPageComponent
);

export default AuthenticationPage;
