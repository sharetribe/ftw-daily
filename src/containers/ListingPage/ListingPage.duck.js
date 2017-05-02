import { showListingsSuccess } from '../../ducks/marketplaceData.duck';
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
      return { id: payload.id, showListingError: null };
    case SHOW_LISTING_ERROR:
      return { showListingError: payload };
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

export const showListing = listingId =>
  (dispatch, getState, sdk) => {
    dispatch(showListingRequest(listingId));
    dispatch(fetchCurrentUser());
    return sdk.listings
      .show({ id: listingId, include: ['author', 'images'] })
      .then(data => {
        dispatch(showListingsSuccess(data));
        return data;
      })
      .catch(e => {
        dispatch(showListingError(e));
        throw e;
      });
  };
