import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingPageComponent } from './EditListingPage';

const noop = () => null;

describe('EditListingPageComponent', () => {
  it('matches snapshot', () => {
    const getListing = () => null;
    const tree = renderShallow(
      <EditListingPageComponent
        currentUserHasListings={false}
        isAuthenticated={false}
        authInProgress={false}
        fetchInProgress={false}
        flattenedRoutes={[]}
        location={{ search: '' }}
        history={{ push: noop }}
        getListing={getListing}
        images={[]}
        intl={fakeIntl}
        onLogout={noop}
        onManageDisableScrolling={noop}
        onCreateListing={noop}
        onCreateListingDraft={noop}
        onUpdateListingDraft={noop}
        onImageUpload={noop}
        onManageDisableScrolling={noop}
        onPayoutDetailsSubmit={noop}
        onUpdateImageOrder={noop}
        page={{ imageOrder: [], images: {} }}
        scrollingDisabled={false}
        tab="description"
        type="new"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
