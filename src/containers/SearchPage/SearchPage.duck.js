import { showListingsSuccess } from '../../ducks/sdk.duck';

// ================ Action types ================ //

export const SEARCH_LISTINGS_REQUEST = 'app/SearchPage/SEARCH_LISTINGS_REQUEST';
export const SEARCH_LISTINGS_SUCCESS = 'app/SearchPage/SEARCH_LISTINGS_SUCCESS';
export const SEARCH_LISTINGS_ERROR = 'app/SearchPage/SEARCH_LISTINGS_ERROR';

// ================ Reducer ================ //

const initialState = {
  searchParams: null,
  searchListingsError: null,
  currentPageResultIds: [],
};

const resultIds = data => data.data.map(l => l.id);

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_LISTINGS_REQUEST:
      return { ...state, searchParams: payload.searchParams, searchListingsError: null };
    case SEARCH_LISTINGS_SUCCESS:
      return { ...state, currentPageResultIds: resultIds(payload.data) };
    case SEARCH_LISTINGS_ERROR:
      return { ...state, searchListingsError: payload };
    default:
      return state;
  }
};

export default listingPageReducer;

// ================ Action creators ================ //

export const searchListingsRequest = searchParams => ({
  type: SEARCH_LISTINGS_REQUEST,
  payload: { searchParams },
});

export const searchListingsSuccess = response => ({
  type: SEARCH_LISTINGS_SUCCESS,
  payload: { data: response.data },
});

export const searchListingsError = e => ({
  type: SEARCH_LISTINGS_ERROR,
  error: true,
  payload: e,
});

export const searchListings = searchParams =>
  (dispatch, getState, sdk) => {
    dispatch(searchListingsRequest(searchParams));
    return sdk.listings
      .search(searchParams)
      .then(response => {
        dispatch(searchListingsSuccess(response));
        dispatch(showListingsSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(searchListingsError(e));
        throw e;
      });
  };
