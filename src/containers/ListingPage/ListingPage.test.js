import React from 'react';
import { types } from '../../util/sdkLoader';
import { createUser, createCurrentUser, createListing, fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { ListingPageComponent } from './ListingPage';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { showListingRequest, showListingError, showListing } from './ListingPage.duck';

const { UUID } = types;
const noop = () => null;

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const currentUser = createCurrentUser('user-2');
    const listing1 = createListing('listing1', createUser('user-1'));
    const getListing = () => listing1;
    const props = {
      flattenedRoutes: [],
      location: { search: '' },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      params: { slug: 'listing1-title', id: 'listing1' },
      currentUser,
      getListing: getListing,
      intl: fakeIntl,
      authInProgress: false,
      currentUserHasListings: false,
      isAuthenticated: false,
      onLogout: noop,
      onLoadListing: noop,
      onManageDisableScrolling: noop,
      scrollingDisabled: false,
      useInitialValues: noop,
    };

    const tree = renderShallow(<ListingPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });

  describe('Duck', () => {
    it('showListing() success', () => {
      const id = new UUID('00000000-0000-0000-0000-000000000000');
      const dispatch = jest.fn(action => action);
      const response = { status: 200 };
      const show = jest.fn(() => Promise.resolve(response));
      const sdk = { listings: { show }, currentUser: { show } };

      return showListing(id)(dispatch, null, sdk).then(data => {
        expect(data).toEqual(response);
        expect(show.mock.calls).toEqual([[{ id, include: ['author', 'images'] }]]);
        expect(dispatch.mock.calls).toEqual([
          [showListingRequest(id)],
          [expect.anything()], // fetchCurrentUser() call
          [addMarketplaceEntities(data)],
        ]);
      });
    });

    it('showListing() error', () => {
      const id = new UUID('00000000-0000-0000-0000-000000000000');
      const dispatch = jest.fn(action => action);
      const error = new Error('fail');
      const show = jest.fn(() => Promise.reject(error));
      const sdk = { listings: { show } };

      // Calling sdk.listings.show is expected to fail now

      return showListing(id)(dispatch, null, sdk).then(
        () => {
          throw new Error('sdk.listings.show was supposed to fail!');
        },
        e => {
          expect(e).toEqual(error);
          expect(show.mock.calls).toEqual([[{ id, include: ['author', 'images'] }]]);
          expect(dispatch.mock.calls).toEqual([
            [showListingRequest(id)],
            [expect.anything()], // fetchCurrentUser() call
            [showListingError(e)],
          ]);
        }
      );
    });
  });
});
