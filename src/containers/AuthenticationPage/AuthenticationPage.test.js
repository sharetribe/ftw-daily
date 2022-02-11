import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { AuthenticationPageComponent } from './AuthenticationPage';

const noop = () => null;

describe('AuthenticationPageComponent', () => {
  // We need to overwrite social login client ids before running the test
  // to make sure it's same in local environment and in CI
  beforeEach(() => {
    process.env = Object.assign(process.env, { REACT_APP_FACEBOOK_APP_ID: '' });
    process.env = Object.assign(process.env, { REACT_APP_GOOGLE_CLIENT_ID: '' });
  });

  it('matches snapshot', () => {
    const props = {
      history: { push: noop },
      location: { state: { from: '/protected' } },
      tab: 'login',
      isAuthenticated: false,
      authInProgress: false,
      scrollingDisabled: false,
      currentUserHasListings: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      submitLogin: noop,
      submitSignup: noop,
      intl: fakeIntl,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('AuthenticationPageComponent with Facebook login', () => {
  // We need to overwrite social login client ids before running the test
  // to make sure it's same in local environment and in CI
  beforeEach(() => {
    process.env = Object.assign(process.env, { REACT_APP_FACEBOOK_APP_ID: 'test' });
    process.env = Object.assign(process.env, { REACT_APP_GOOGLE_CLIENT_ID: '' });
  });

  it('matches snapshot', () => {
    const props = {
      history: { push: noop },
      location: { state: { from: '/protected' } },
      tab: 'login',
      isAuthenticated: false,
      authInProgress: false,
      scrollingDisabled: false,
      currentUserHasListings: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      submitLogin: noop,
      submitSignup: noop,
      intl: fakeIntl,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('AuthenticationPageComponent with Google login', () => {
  // We need to overwrite social login client ids before running the test
  // to make sure it's same in local environment and in CI
  beforeEach(() => {
    process.env = Object.assign(process.env, { REACT_APP_FACEBOOK_APP_ID: '' });
    process.env = Object.assign(process.env, { REACT_APP_GOOGLE_CLIENT_ID: 'test' });
  });

  it('matches snapshot', () => {
    const props = {
      history: { push: noop },
      location: { state: { from: '/protected' } },
      tab: 'login',
      isAuthenticated: false,
      authInProgress: false,
      scrollingDisabled: false,
      currentUserHasListings: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      submitLogin: noop,
      submitSignup: noop,
      intl: fakeIntl,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('AuthenticationPageComponent with Google and Facebook login', () => {
  // We need to overwrite social login client ids before running the test
  // to make sure it's same in local environment and in CI
  beforeEach(() => {
    process.env = Object.assign(process.env, { REACT_APP_FACEBOOK_APP_ID: 'test' });
    process.env = Object.assign(process.env, { REACT_APP_GOOGLE_CLIENT_ID: 'test' });
  });

  it('matches snapshot', () => {
    const props = {
      history: { push: noop },
      location: { state: { from: '/protected' } },
      tab: 'login',
      isAuthenticated: false,
      authInProgress: false,
      scrollingDisabled: false,
      currentUserHasListings: false,
      onLogout: noop,
      onManageDisableScrolling: noop,
      submitLogin: noop,
      submitSignup: noop,
      intl: fakeIntl,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
