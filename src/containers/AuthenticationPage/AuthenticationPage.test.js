import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { AuthenticationPageComponent } from './AuthenticationPage';

describe('AuthenticationPageComponent', () => {
  it('matches snapshot', () => {
    const props = {
      location: { state: { from: '/protected' } },
      isAuthenticated: false,
      onLoginSubmit: () => null,
      onSignUpSubmit: () => null,
    };
    const tree = renderShallow(<AuthenticationPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
