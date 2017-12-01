import { types } from '../../util/sdkLoader';
import { storableError } from '../../util/errors';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { updatedEntities, denormalisedEntities } from '../../util/data';
import { fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SHOW_LISTING_REQUEST = 'app/ListingPage/SHOW_LISTING_REQUEST';
export const SHOW_LISTING_ERROR = 'app/ListingPage/SHOW_LISTING_ERROR';

export const FETCH_REVIEWS_REQUEST = 'app/ListingPage/FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'app/ListingPage/FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_ERROR = 'app/ListingPage/FETCH_REVIEWS_ERROR';

// ================ Reducer ================ //

const initialState = {
  id: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
};

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_LISTING_REQUEST:
      return { ...state, id: payload.id, showListingError: null };
    case SHOW_LISTING_ERROR:
      return { ...state, showListingError: payload };
    case FETCH_REVIEWS_REQUEST:
      return { ...state, fetchReviewsError: null };
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, reviews: payload };
    case FETCH_REVIEWS_ERROR:
      return { ...state, fetchReviewsError: payload };
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

export const fetchReviewsRequest = () => ({ type: FETCH_REVIEWS_REQUEST });
export const fetchReviewsSuccess = reviews => ({ type: FETCH_REVIEWS_SUCCESS, payload: reviews });
export const fetchReviewsError = error => ({ type: FETCH_REVIEWS_ERROR, payload: error });

// ================ Thunks ================ //

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

export const fetchReviews = listingId => (dispatch, getState, sdk) => {
  return sdk.reviews
    .query({ listing_id: listingId, include: ['author', 'author.profileImage'] })
    .then(response => {
      const entities = updatedEntities({}, response.data);
      const reviewIds = response.data.data.map(d => d.id);
      const denormalized = denormalisedEntities(entities, 'review', reviewIds);
      dispatch(fetchReviewsSuccess(denormalized));
    })
    .catch(e => {
      dispatch(fetchReviewsError(e));
    });
};

export const loadData = params => dispatch => {
  const listingId = new types.UUID(params.id);

  return Promise.all([dispatch(showListing(listingId)), dispatch(fetchReviews(listingId))]);
};
