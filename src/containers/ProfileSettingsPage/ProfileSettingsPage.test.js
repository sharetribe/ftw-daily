import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { ProfileSettingsPageComponent } from './ProfileSettingsPage';

const noop = () => null;

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ProfileSettingsPageComponent
        authInProgress={false}
        currentUserHasListings={false}
        history={{ push: noop }}
        isAuthenticated={false}
        location={{ search: '' }}
        onChange={noop}
        onImageUpload={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onUpdateProfile={noop}
        params={{ displayName: 'my-shop' }}
        scrollingDisabled={false}
        updateInProgress={false}
        uploadInProgress={false}
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
