/* eslint-disable no-constant-condition */
import { call, put, take, fork } from 'redux-saga/effects';
import { updatedEntities, denormalisedEntities } from '../util/data';

const requestAction = actionType => params => ({ type: actionType, payload: { params } });

const successAction = actionType => data => ({ type: actionType, payload: data });

const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

// ================ Action types ================ //

export const SHOW_LISTINGS_REQUEST = 'app/sdk/SHOW_LISTINGS_REQUEST';
export const SHOW_LISTINGS_SUCCESS = 'app/sdk/SHOW_LISTINGS_SUCCESS';
export const SHOW_LISTINGS_ERROR = 'app/sdk/SHOW_LISTINGS_ERROR';

export const QUERY_LISTINGS_REQUEST = 'app/sdk/QUERY_LISTINGS_REQUEST';
export const QUERY_LISTINGS_SUCCESS = 'app/sdk/QUERY_LISTINGS_SUCCESS';
export const QUERY_LISTINGS_ERROR = 'app/sdk/QUERY_LISTINGS_ERROR';

export const SEARCH_LISTINGS_REQUEST = 'app/sdk/SEARCH_LISTINGS_REQUEST';
export const SEARCH_LISTINGS_SUCCESS = 'app/sdk/SEARCH_LISTINGS_SUCCESS';
export const SEARCH_LISTINGS_ERROR = 'app/sdk/SEARCH_LISTINGS_ERROR';

export const SHOW_MARKETPLACE_REQUEST = 'app/sdk/SHOW_MARKETPLACE_REQUEST';
export const SHOW_MARKETPLACE_SUCCESS = 'app/sdk/SHOW_MARKETPLACE_SUCCESS';
export const SHOW_MARKETPLACE_ERROR = 'app/sdk/SHOW_MARKETPLACE_ERROR';

export const SHOW_USERS_REQUEST = 'app/sdk/SHOW_USERS_REQUEST';
export const SHOW_USERS_SUCCESS = 'app/sdk/SHOW_USERS_SUCCESS';
export const SHOW_USERS_ERROR = 'app/sdk/SHOW_USERS_ERROR';

export const ADD_ENTITIES = 'app/sdk/ADD_ENTITIES';

// ================ Reducer ================ //

const initialState = {
  // Error instance placeholders for each endpoint
  showListingsError: null,
  queryListingsError: null,
  searchListingsError: null,
  showMarketplaceError: null,
  showUsersError: null,
  // Database of all the fetched entities.
  entities: {},
  searchPageResults: [],
};

const merge = (state, apiResponse) => {
  return {
    ...state,
    entities: updatedEntities(state.entities, apiResponse.data),
  };
};

const searchResults = payload => payload.data.data.map(listing => listing.id);

export default function sdkReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_LISTINGS_REQUEST:
      return { ...state, showListingsError: null };
    case SHOW_LISTINGS_SUCCESS:
      return merge(state, payload);
    case SHOW_LISTINGS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, showListingsError: payload };

    case QUERY_LISTINGS_REQUEST:
      return { ...state, queryListingsError: null };
    case QUERY_LISTINGS_SUCCESS:
      return merge(state, payload);
    case QUERY_LISTINGS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, queryListingsError: payload };

    case SEARCH_LISTINGS_REQUEST:
      return { ...state, searchListingsError: null };
    case SEARCH_LISTINGS_SUCCESS:
      return { ...merge(state, payload), searchPageResults: searchResults(payload) };
    case SEARCH_LISTINGS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, searchListingsError: payload };

    case SHOW_MARKETPLACE_REQUEST:
      return { ...state, showMarketplaceError: null };
    case SHOW_MARKETPLACE_SUCCESS:
      return merge(state, payload);
    case SHOW_MARKETPLACE_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, showMarketplaceError: payload };

    case SHOW_USERS_REQUEST:
      return { ...state, showUsersError: null };
    case SHOW_USERS_SUCCESS:
      return merge(state, payload);
    case SHOW_USERS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, showUsersError: payload };

    case ADD_ENTITIES:
      return merge(state, payload);

    default:
      return state;
  }
}

// ================ Selectors ================ //

/**
 * Get the denormalised listing entities with the given IDs
 *
 * @param {Object} data the state part of the Redux store for this SDK reducer
 * @param {Array<UUID>} listingIds listing IDs to select from the store
 */
export const getListingsById = (data, listingIds) => {
  try {
    return denormalisedEntities(data.entities, 'listing', listingIds);
  } catch (e) {
    return [];
  }
};

/**
 * Get the denormalised entities from the given entity references.
 *
 * @param {Object} marketplaceData the state part of the Redux store
 * for this reducer
 *
 * @param {Array<{ id, type }} entityRefs References to entities that
 * we want to query from the data. Currently we expect that all the
 * entities have the same type.
 *
 * @return {Array<Object>} denormalised entities
 */
export const getEntities = (marketplaceData, entityRefs) => {
  const type = entityRefs.length > 0 ? entityRefs[0].type : null;
  const ids = entityRefs.map(ref => ref.id);
  try {
    return denormalisedEntities(marketplaceData.entities, type, ids);
  } catch (e) {
    return [];
  }
};

// ================ Action creators ================ //

// All the action creators that don't have the {Success, Error} suffix
// take the params object that the corresponding SDK endpoint method
// expects.

// SDK method: listings.show
export const showListings = requestAction(SHOW_LISTINGS_REQUEST);
export const showListingsSuccess = successAction(SHOW_LISTINGS_SUCCESS);
export const showListingsError = errorAction(SHOW_LISTINGS_ERROR);

// SDK method: listings.query
export const queryListings = requestAction(QUERY_LISTINGS_REQUEST);
export const queryListingsSuccess = successAction(QUERY_LISTINGS_SUCCESS);
export const queryListingsError = errorAction(QUERY_LISTINGS_ERROR);

// SDK method: listings.search
export const searchListings = requestAction(SEARCH_LISTINGS_REQUEST);
export const searchListingsSuccess = successAction(SEARCH_LISTINGS_SUCCESS);
export const searchListingsError = errorAction(SEARCH_LISTINGS_ERROR);

// SDK method: marketplace.show
export const showMarketplace = requestAction(SHOW_MARKETPLACE_REQUEST);
export const showMarketplaceSuccess = successAction(SHOW_MARKETPLACE_SUCCESS);
export const showMarketplaceError = errorAction(SHOW_MARKETPLACE_ERROR);

// SDK method: users.show
export const showUsers = requestAction(SHOW_USERS_REQUEST);
export const showUsersSuccess = successAction(SHOW_USERS_SUCCESS);
export const showUsersError = errorAction(SHOW_USERS_ERROR);

export const addEntities = apiResponse => ({
  type: ADD_ENTITIES,
  payload: apiResponse,
});

// ================ Worker sagas ================ //

function* callEndpoint(sdkMethod, success, error, action) {
  const params = action.payload.params;
  try {
    const response = yield call(sdkMethod, params);
    yield put(success(response));
  } catch (e) {
    yield put(error(e));
  }
}

// ================ Watcher sagas ================ //

// TODO: Think about structuring this file to avoid repetition without
// too much metaprogramming that makes the code harder to understand.
const endpoints = {
  [SHOW_LISTINGS_REQUEST]: {
    method: sdk => sdk.listings.show,
    success: showListingsSuccess,
    error: showListingsError,
  },
  [QUERY_LISTINGS_REQUEST]: {
    method: sdk => sdk.listings.query,
    success: queryListingsSuccess,
    error: queryListingsError,
  },
  [SEARCH_LISTINGS_REQUEST]: {
    method: sdk => sdk.listings.search,
    success: searchListingsSuccess,
    error: searchListingsError,
  },
  [SHOW_MARKETPLACE_REQUEST]: {
    method: sdk => sdk.marketplace.show,
    success: showMarketplaceSuccess,
    error: showMarketplaceError,
  },
  [SHOW_USERS_REQUEST]: {
    method: sdk => sdk.users.show,
    success: showUsersSuccess,
    error: showUsersError,
  },
};

export function* watchSdk(sdk) {
  const requestTypes = Object.keys(endpoints);
  while (true) {
    const action = yield take(requestTypes);
    const { method, success, error } = endpoints[action.type];
    yield fork(callEndpoint, method(sdk), success, error, action);
  }
}
