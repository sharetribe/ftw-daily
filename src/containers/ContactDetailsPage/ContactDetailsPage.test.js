import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { ContactDetailsPageComponent } from './ContactDetailsPage';

const noop = () => null;

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ContactDetailsPageComponent
        params={{ displayName: 'my-shop' }}
        history={{ push: noop }}
        location={{ search: '' }}
        scrollingDisabled={false}
        authInProgress={false}
        currentUserHasListings={false}
        isAuthenticated={false}
        onChange={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
        onSubmitContactDetails={noop}
        saveContactDetailsInProgress={false}
        contactDetailsChanged={false}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
