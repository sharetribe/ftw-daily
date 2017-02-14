import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PageLayout, NamedLink } from '../../components';
import { LoginForm, SignUpForm } from '../../containers';
import { login } from '../../ducks/Auth.ducks';

export const AuthenticationPageComponent = props => {
  const { location, tab, isAuthenticated, onLoginSubmit, onSignUpSubmit } = props;
  const isLogin = tab === 'login';
  const from = location.state && location.state.from ? location.state.from : null;
  const pathname = from ? from.pathname : null;
  const linkParams = { state: { from: from || '/' } };

  return (
    <PageLayout title={`Authentication page: ${tab} tab`}>
      {isAuthenticated ? <Redirect to={from || '/'} /> : null}
      {pathname
        ? <p>
            You must log in to view the page at
            <code>{pathname}</code>
          </p>
        : null}
      {isLogin ? <LoginForm onSubmit={onLoginSubmit} /> : <SignUpForm onSubmit={onSignUpSubmit} />}
      {isLogin
        ? <NamedLink name="SignUpPage" params={linkParams}>Sign up</NamedLink>
        : <NamedLink name="LogInPage" params={linkParams}>Log in</NamedLink>}
    </PageLayout>
  );
};

AuthenticationPageComponent.defaultProps = { location: {}, tab: 'signup' };

const { any, oneOf, shape, bool, func } = PropTypes;

AuthenticationPageComponent.propTypes = {
  location: shape({ state: shape({ from: any }) }),
  tab: oneOf(['login', 'signup']),
  isAuthenticated: bool.isRequired,
  onLoginSubmit: func.isRequired,
  onSignUpSubmit: func.isRequired,
};

const mapStateToProps = state => ({ isAuthenticated: state.Auth.isAuthenticated });

const mapDispatchToProps = dispatch => ({
  onLoginSubmit: ({ email, password }) => dispatch(login(email, password)),
  onSignUpSubmit: ({ email, password }) => dispatch(login(email, password)),
});

const AuthenticationPage = connect(mapStateToProps, mapDispatchToProps)(
  AuthenticationPageComponent,
);

export default AuthenticationPage;
