import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { AuthenticationPageComponent } from './AuthenticationPage';

const noop = () => null;

describe('AuthenticationPageComponent', () => {
  it('matches snapshot', () => {
    const props = {
      history: { push: noop },
      location: { state: { from: '/protected' } },
      tab: 'login',
      isAuthenticated: false,
      authInProgress: false,
      scrollingDisabled: false,
      submitLogin: noop,
      submitSignup: noop,
      intl: fakeIntl,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
