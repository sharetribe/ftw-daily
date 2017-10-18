import { storableError } from '../../util/errors';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SHOW_LISTING_REQUEST = 'app/ListingPage/SHOW_LISTING_REQUEST';
export const SHOW_LISTING_ERROR = 'app/ListingPage/SHOW_LISTING_ERROR';

// ================ Reducer ================ //

const initialState = {
  id: null,
  showListingError: null,
};

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_LISTING_REQUEST:
      return { ...state, id: payload.id, showListingError: null };
    case SHOW_LISTING_ERROR:
      return { ...state, showListingError: payload };
    default:
      return state;
  }
};

export default listingPageReducer;

// ================ Action creators ================ //

export const showListingRequest = id => ({
  type: SHOW_LISTING_REQUEST,
  payload: { id },
});

export const showListingError = e => ({
  type: SHOW_LISTING_ERROR,
  error: true,
  payload: e,
});

export const showListing = listingId => (dispatch, getState, sdk) => {
  dispatch(showListingRequest(listingId));
  dispatch(fetchCurrentUser());
  return sdk.listings
    .show({ id: listingId, include: ['author', 'author.profileImage', 'images'] })
    .then(data => {
      dispatch(addMarketplaceEntities(data));
      return data;
    })
    .catch(e => {
      dispatch(showListingError(storableError(e)));
    });
};
