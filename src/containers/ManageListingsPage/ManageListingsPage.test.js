import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { ManageListingsPageComponent } from './ManageListingsPage';

const noop = () => null;

describe('ContactDetailsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <ManageListingsPageComponent
        params={{ displayName: 'my-shop' }}
        history={{ push: noop }}
        location={{ search: '' }}
        scrollingDisabled={false}
        authInProgress={false}
        queryInProgress={false}
        currentUserHasListings={false}
        isAuthenticated={false}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onCloseListing={noop}
        onOpenListing={noop}
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
