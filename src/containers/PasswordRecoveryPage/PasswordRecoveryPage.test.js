import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { PasswordRecoveryPageComponent } from './PasswordRecoveryPage';

const noop = () => null;

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <PasswordRecoveryPageComponent
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
        recoveryInProgress={false}
        onSubmitEmail={noop}
        onRetypeEmail={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
