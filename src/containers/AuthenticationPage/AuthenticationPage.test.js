import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { AuthenticationPageComponent } from './AuthenticationPage';

describe('AuthenticationPageComponent', () => {
  it('matches snapshot', () => {
    const props = {
      tab: 'login',
      location: { state: { from: '/protected' } },
      isAuthenticated: false,
      authInProgress: false,
      onLoginSubmit: () => null,
      onSignUpSubmit: () => null,
      intl: fakeIntl,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
