import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { createUser, createOwnListing, fakeIntl } from '../../util/test-data';
import { ManageListingCardComponent } from './ManageListingCard';

const noop = () => null;

describe('ManageListingCard', () => {
  it('matches snapshot', () => {
    const listing = { ...createOwnListing('listing1') };
    const tree = renderShallow(
      <ManageListingCardComponent
        flattenedRoutes={[]}
        history={{ push: noop }}
        listing={listing}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
