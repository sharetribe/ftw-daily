import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { AuthenticationPageComponent } from './AuthenticationPage';

describe('AuthenticationPageComponent', () => {
  it('matches snapshot', () => {
    const props = {
      location: { state: { from: '/protected' } },
      tab: 'login',
      isAuthenticated: false,
      authInProgress: false,
      scrollingDisabled: false,
      submitLogin: () => null,
      submitSignup: () => null,
      intl: fakeIntl,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
