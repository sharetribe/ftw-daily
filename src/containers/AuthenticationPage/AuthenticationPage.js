import React, { Component, PropTypes } from 'react';
import { Link, Redirect } from 'react-router';
import { PageLayout } from '../../components';
import { LoginForm, SignUpForm } from '../../containers';
import { fakeAuth } from '../../Routes';

class AuthenticationPage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleLogIn(values) {
    // eslint-disable-next-line no-console
    console.log('log in with values:', values);
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  handleSignUp(values) {
    // eslint-disable-next-line no-console
    console.log('sign up with values:', values);
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const from = this.props.location.state && this.props.location.state.from
      ? this.props.location.state.from
      : null;
    const { redirectToReferrer } = this.state;

    const toLogin = <Link to={{ pathname: '/login', state: { from: from || '/' } }}>Log in</Link>;
    const toSignup = (
      <Link to={{ pathname: '/signup', state: { from: from || '/' } }}>Sign up</Link>
    );
    const alternativeMethod = this.props.tab === 'login' ? toSignup : toLogin;

    const form = this.props.tab === 'login'
      ? <LoginForm onSubmit={this.handleLogIn} />
      : <SignUpForm onSubmit={this.handleSignUp} />;

    const fromLoginMsg = from && from.pathname
      ? <p>
          You must log in to view the page at
          <code>{from.pathname}</code>
        </p>
      : null;

    return (
      <PageLayout title={`Authentication page: ${this.props.tab} tab`}>
        {redirectToReferrer ? <Redirect to={from || '/'} /> : null}
        {fromLoginMsg}
        {form}
        {alternativeMethod}
      </PageLayout>
    );
  }
}

AuthenticationPage.defaultProps = { location: {}, tab: 'signup' };

const { any, oneOf, shape } = PropTypes;

AuthenticationPage.propTypes = {
  location: shape({ state: shape({ from: any }) }),
  tab: oneOf(['login', 'signup']),
};

export default AuthenticationPage;
