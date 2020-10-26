import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from '../../util/reactIntl';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  createUser,
  createCurrentUser,
  createListing,
  createOwnListing,
  fakeIntl,
} from '../../util/test-data';
import { storableError } from '../../util/errors';
import { renderShallow } from '../../util/test-helpers';
import {
  LINE_ITEM_NIGHT,
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_PUBLISHED,
  LISTING_STATE_CLOSED,
} from '../../util/types';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { showListingRequest, showListingError, showListing } from './ListingPage.duck';

// routeConfiguration needs to be imported before tests for ListingPageComponent can be made.
// Otherwise, ListingPage itself is not initialized correctly when routeConfiguration is imported
// (loadData call fails).
import routeConfiguration from '../../routeConfiguration';
import { ListingPageComponent } from './ListingPage';
import ActionBarMaybe from './ActionBarMaybe';

const { UUID } = sdkTypes;
const noop = () => null;

const filterConfig = [
  {
    id: 'category',
    label: 'Category',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamName: 'pub_category',
    config: {
      options: [{ key: 'cat1', label: 'Cat 1' }, { key: 'cat2', label: 'Cat 2' }],
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamName: 'pub_amenities',
    config: {
      mode: 'has_all',
      options: [
        {
          key: 'feat1',
          label: 'Feat 1',
        },
        {
          key: 'feat2',
          label: 'Feat 2',
        },
        {
          key: 'feat3',
          label: 'Feat 3',
        },
      ],
    },
  },
];
describe('ListingPage', () => {
  it('matches snapshot', () => {
    const currentUser = createCurrentUser('user-2');
    const id = 'listing1';
    const slug = 'listing1-title';
    const listing1 = createListing(id, {}, { author: createUser('user-1') });
    const listing1Own = createOwnListing(id, {}, { author: createCurrentUser('user-1') });
    const getListing = () => listing1;
    const getOwnListing = () => listing1Own;

    const props = {
      unitType: LINE_ITEM_NIGHT,
      location: {
        pathname: `/l/${slug}/${id}`,
        search: '',
        hash: '',
      },
      history: {
        push: () => console.log('HistoryPush called'),
      },
      params: { id, slug },
      currentUser,
      getListing,
      getOwnListing,
      intl: fakeIntl,
      authInProgress: false,
      currentUserHasListings: false,
      isAuthenticated: false,
      onLogout: noop,
      onLoadListing: noop,
      onManageDisableScrolling: noop,
      scrollingDisabled: false,
      callSetInitialValues: noop,
      sendVerificationEmailInProgress: false,
      onResendVerificationEmail: noop,
      onInitializeCardPaymentData: noop,
      sendEnquiryInProgress: false,
      onSendEnquiry: noop,
      filterConfig,
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
        expect(show.mock.calls).toEqual([
          [
            {
              id,
              include: ['author', 'author.profileImage', 'images'],
              'fields.image': [
                // Listing page
                'variants.landscape-crop',
                'variants.landscape-crop2x',
                'variants.landscape-crop4x',
                'variants.landscape-crop6x',

                // Social media
                'variants.facebook',
                'variants.twitter',

                // Image carousel
                'variants.scaled-small',
                'variants.scaled-medium',
                'variants.scaled-large',
                'variants.scaled-xlarge',

                // Avatars
                'variants.square-small',
                'variants.square-small2x',
              ],
            },
          ],
        ]);
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

      return showListing(id)(dispatch, null, sdk).then(data => {
        expect(show.mock.calls).toEqual([
          [
            {
              id,
              include: ['author', 'author.profileImage', 'images'],
              'fields.image': [
                // Listing page
                'variants.landscape-crop',
                'variants.landscape-crop2x',
                'variants.landscape-crop4x',
                'variants.landscape-crop6x',

                // Social media
                'variants.facebook',
                'variants.twitter',

                // Image carousel
                'variants.scaled-small',
                'variants.scaled-medium',
                'variants.scaled-large',
                'variants.scaled-xlarge',

                // Avatars
                'variants.square-small',
                'variants.square-small2x',
              ],
            },
          ],
        ]);
        expect(dispatch.mock.calls).toEqual([
          [showListingRequest(id)],
          [expect.anything()], // fetchCurrentUser() call
          [showListingError(storableError(error))],
        ]);
      });
    });
  });

  describe('ActionBarMaybe', () => {
    it('shows users own listing status', () => {
      const listing = createListing('listing-published', {
        state: LISTING_STATE_PUBLISHED,
      });
      const actionBar = shallow(<ActionBarMaybe isOwnListing listing={listing} editParams={{}} />);
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(2);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.ownListing');
      expect(formattedMessages.at(1).props().id).toEqual('ListingPage.editListing');
    });
    it('shows users own pending listing status', () => {
      const listing = createListing('listing-published', {
        state: LISTING_STATE_PENDING_APPROVAL,
      });
      const actionBar = shallow(<ActionBarMaybe isOwnListing listing={listing} editParams={{}} />);
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(2);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.ownListingPendingApproval');
      expect(formattedMessages.at(1).props().id).toEqual('ListingPage.editListing');
    });
    it('shows users own closed listing status', () => {
      const listing = createListing('listing-closed', {
        state: LISTING_STATE_CLOSED,
      });
      const actionBar = shallow(<ActionBarMaybe isOwnListing listing={listing} editParams={{}} />);
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(2);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.ownClosedListing');
      expect(formattedMessages.at(1).props().id).toEqual('ListingPage.editListing');
    });
    it('shows closed listing status', () => {
      const listing = createListing('listing-closed', {
        state: LISTING_STATE_CLOSED,
      });
      const actionBar = shallow(
        <ActionBarMaybe isOwnListing={false} listing={listing} editParams={{}} />
      );
      const formattedMessages = actionBar.find(FormattedMessage);
      expect(formattedMessages.length).toEqual(1);
      expect(formattedMessages.at(0).props().id).toEqual('ListingPage.closedListing');
    });
    it("is missing if listing is not closed or user's own", () => {
      const listing = createListing('listing-published', {
        state: LISTING_STATE_PUBLISHED,
      });
      const actionBar = shallow(
        <ActionBarMaybe isOwnListing={false} listing={listing} editParams={{}} />
      );
      expect(actionBar.getElement()).toBeNull();
    });
  });
});
