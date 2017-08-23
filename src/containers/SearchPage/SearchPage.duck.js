import { unionWith } from 'lodash';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

// ================ Action types ================ //

export const SEARCH_LISTINGS_REQUEST = 'app/SearchPage/SEARCH_LISTINGS_REQUEST';
export const SEARCH_LISTINGS_SUCCESS = 'app/SearchPage/SEARCH_LISTINGS_SUCCESS';
export const SEARCH_LISTINGS_ERROR = 'app/SearchPage/SEARCH_LISTINGS_ERROR';

export const SEARCH_MAP_LISTINGS_REQUEST = 'app/SearchPage/SEARCH_MAP_LISTINGS_REQUEST';
export const SEARCH_MAP_LISTINGS_SUCCESS = 'app/SearchPage/SEARCH_MAP_LISTINGS_SUCCESS';
export const SEARCH_MAP_LISTINGS_ERROR = 'app/SearchPage/SEARCH_MAP_LISTINGS_ERROR';

// ================ Reducer ================ //

const initialState = {
  pagination: null,
  searchParams: null,
  searchInProgress: false,
  searchListingsError: null,
  currentPageResultIds: [],
  searchMapListingIds: [],
  searchMapListingsError: null,
};

const resultIds = data => data.data.map(l => l.id);

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_LISTINGS_REQUEST:
      return {
        ...state,
        searchParams: payload.searchParams,
        searchInProgress: true,
        searchMapListingIds: [],
        searchListingsError: null,
      };
    case SEARCH_LISTINGS_SUCCESS:
      return {
        ...state,
        currentPageResultIds: resultIds(payload.data),
        pagination: payload.data.meta,
        searchInProgress: false,
      };
    case SEARCH_LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, searchInProgress: false, searchListingsError: payload };

    case SEARCH_MAP_LISTINGS_REQUEST:
      return {
        ...state,
        searchMapListingsError: null,
      };
    case SEARCH_MAP_LISTINGS_SUCCESS: {
      const searchMapListingIds = unionWith(
        state.searchMapListingIds,
        resultIds(payload.data),
        (id1, id2) => id1.uuid === id2.uuid
      );
      return {
        ...state,
        searchMapListingIds,
      };
    }
    case SEARCH_MAP_LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, searchMapListingsError: payload };

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

export const searchMapListingsRequest = () => ({ type: SEARCH_MAP_LISTINGS_REQUEST });

export const searchMapListingsSuccess = response => ({
  type: SEARCH_MAP_LISTINGS_SUCCESS,
  payload: { data: response.data },
});

export const searchMapListingsError = e => ({
  type: SEARCH_MAP_LISTINGS_ERROR,
  error: true,
  payload: e,
});

export const searchListings = searchParams =>
  (dispatch, getState, sdk) => {
    dispatch(searchListingsRequest(searchParams));

    const { origin, include = [], page, perPage } = searchParams;

    // TODO: API can't handle camelCase request parameter yet.
    const searchOrQuery = origin
      ? sdk.listings.search({ ...searchParams, per_page: perPage })
      : sdk.listings.query({ include, page, per_page: perPage });

    return searchOrQuery
      .then(response => {
        dispatch(addMarketplaceEntities(response));
        dispatch(searchListingsSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(searchListingsError(e));
        throw e;
      });
  };

export const searchMapListings = searchParams =>
  (dispatch, getState, sdk) => {
    dispatch(searchMapListingsRequest(searchParams));

    const { origin, include = [], page = 1, perPage } = searchParams;

    // TODO: API can't handle camelCase request parameter yet.
    const searchOrQuery = origin
      ? sdk.listings.search({ ...searchParams, page, per_page: perPage })
      : sdk.listings.query({ include, page, per_page: perPage });

    return searchOrQuery
      .then(response => {
        dispatch(addMarketplaceEntities(response));
        dispatch(searchMapListingsSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(searchMapListingsError(e));
        throw e;
      });
  };
