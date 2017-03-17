import React from 'react';
import { types } from '../../util/sdkLoader';
import { createListing } from '../../util/test-data';
import { fakeIntl, renderShallow } from '../../util/test-helpers';
import { ListingPageComponent } from './ListingPage';
import { showListingsSuccess } from '../../ducks/sdk.duck';
import { showListingRequest, showListingError, showListing } from './ListingPage.duck';

const { UUID } = types;

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const marketplaceData = { entities: { listing: { listing1: createListing('listing1') } } };
    const tree = renderShallow(
      <ListingPageComponent
        params={{ slug: 'listing1-title', id: 'listing1' }}
        marketplaceData={marketplaceData}
        intl={fakeIntl}
        onLoadListing={l => l}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Duck', () => {
    it('showListing() success', () => {
      const id = new UUID('00000000-0000-0000-0000-000000000000');
      const dispatch = jest.fn(action => action);
      const response = { status: 200 };
      const show = jest.fn(() => Promise.resolve(response));
      const sdk = { listings: { show } };

      return showListing(id)(dispatch, null, sdk).then(data => {
        expect(data).toEqual(response);
        expect(show.mock.calls).toEqual([[{ id, include: ['author', 'images'] }]]);
        expect(dispatch.mock.calls).toEqual([
          [showListingRequest(id)],
          [showListingsSuccess(data)],
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
          expect(dispatch.mock.calls).toEqual([[showListingRequest(id)], [showListingError(e)]]);
        }
      );
    });
  });
});
