import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import { types } from '../../util/sdkLoader';
import { createUser, createCurrentUser, createListing, fakeIntl } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { ListingPageComponent, ActionBar } from './ListingPage';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { showListingRequest, showListingError, showListing } from './ListingPage.duck';

const { UUID } = types;
const noop = () => null;

describe('ListingPage', () => {
  it('matches snapshot', () => {
    const currentUser = createCurrentUser('user-2');
    const listing1 = createListing('listing1', {}, { author: createUser('user-1') });
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
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
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

  describe('ActionBar', () => {
    it('shows users own listing status', () => {
      const actionBar = shallow(<ActionBar isOwnListing isClosed={false} editParams={{}} />);
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(2);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.ownListing');
      expect(formattedMessages.at(1).props().id).toEqual('ListingPage.editListing');
    });
    it('shows users own closed listing status', () => {
      const actionBar = shallow(<ActionBar isOwnListing isClosed editParams={{}} />);
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(2);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.ownClosedListing');
      expect(formattedMessages.at(1).props().id).toEqual('ListingPage.editListing');
    });
    it('shows closed listing status', () => {
      const actionBar = shallow(<ActionBar isOwnListing={false} isClosed editParams={{}} />);
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(1);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.closedListing');
    });
    it("is missing if listing is not closed or user's own", () => {
      const actionBar = shallow(
        <ActionBar isOwnListing={false} isClosed={false} editParams={{}} />
      );
      expect(actionBar.equals(null)).toEqual(true);
    });
  });
});
