import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { PasswordForgottenPageComponent } from './PasswordForgottenPage';

const noop = () => null;

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <PasswordForgottenPageComponent
        params={{ displayName: 'my-shop' }}
        history={{ push: noop }}
        location={{ search: '' }}
        scrollingDisabled={false}
        authInProgress={false}
        currentUserHasListings={false}
        isAuthenticated={false}
        onLogout={noop}
        onManageDisableScrolling={noop}
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
