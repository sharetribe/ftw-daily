import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { PageLayout, NamedLink, NamedRedirect } from '../../components';
import { LoginForm, SignUpForm } from '../../containers';
import { login } from '../../ducks/Auth.duck';

import css from './AuthenticationPage.css';

export const AuthenticationPageComponent = props => {
  const {
    location,
    tab,
    isAuthenticated,
    loginError,
    onLoginSubmit,
    onSignUpSubmit,
  } = props;
  const isLogin = tab === 'login';
  const from = location.state && location.state.from ? location.state.from : null;

  const authRedirect = from ? <Redirect to={from} /> : <NamedRedirect name="LandingPage" />;

  // TODO: use FlashMessages for auth errors

  /* eslint-disable no-console */
  if (loginError && console && console.error) {
    console.error(loginError);
  }
  /* eslint-enable no-console */

  return (
    <PageLayout title={`Authentication page: ${tab} tab`}>
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
          ? <LoginForm onSubmit={onLoginSubmit} />
          : <SignUpForm onSubmit={onSignUpSubmit} />}
        {isLogin
          ? <NamedLink name="SignUpPage" to={{ state: from ? { from } : null }}>Sign up</NamedLink>
          : <NamedLink name="LogInPage" to={{ state: from ? { from } : null }}>Log in</NamedLink>}
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
  onLoginSubmit: func.isRequired,
  onSignUpSubmit: func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  loginError: state.Auth.loginError,
});

const mapDispatchToProps = dispatch => ({
  onLoginSubmit: ({ email, password }) => dispatch(login(email, password)),
  onSignUpSubmit: ({ email, password }) => dispatch(login(email, password)),
});

const AuthenticationPage = connect(mapStateToProps, mapDispatchToProps)(
  AuthenticationPageComponent
);

export default AuthenticationPage;
