import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPageComponent } from './EditListingPage';

const noop = () => null;

describe('EditListingPageComponent', () => {
  it('matches snapshot', () => {
    const getOwnListing = () => null;
    const tree = renderShallow(
      <EditListingPageComponent
        params={{ id: 'id', slug: 'slug', type: 'new', tab: 'description' }}
        currentUserHasListings={false}
        isAuthenticated={false}
        authInProgress={false}
        fetchInProgress={false}
        location={{ search: '' }}
        history={{ push: noop }}
        getOwnListing={getOwnListing}
        images={[]}
        intl={fakeIntl}
        onGetStripeConnectAccountLink={noop}
        onPayoutDetailsFormSubmit={noop}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onFetchBookings={noop}
        onFetchAvailabilityExceptions={noop}
        onCreateAvailabilityException={noop}
        onDeleteAvailabilityException={noop}
        onCreateListing={noop}
        onCreateListingDraft={noop}
        onPublishListingDraft={noop}
        onUpdateListing={noop}
        onImageUpload={noop}
        onRemoveListingImage={noop}
        onPayoutDetailsFormChange={noop}
        onPayoutDetailsSubmit={noop}
        onUpdateImageOrder={noop}
        onChange={noop}
        page={{ imageOrder: [], images: {} }}
        scrollingDisabled={false}
        tab="description"
        type="new"
        sendVerificationEmailInProgress={false}
        onResendVerificationEmail={noop}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
