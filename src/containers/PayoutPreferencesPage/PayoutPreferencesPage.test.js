import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { PayoutPreferencesPageComponent } from './PayoutPreferencesPage';

const noop = () => null;

describe('PayoutPreferencesPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <PayoutPreferencesPageComponent
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
