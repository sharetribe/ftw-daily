/**
 * This file contains Action constants, Action creators, and reducer of a page
 * container. We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import { unionWith, isEqual } from 'lodash';
import { call, take, put } from 'redux-saga/effects';
import { createRequestTypes } from '../../util/sagaHelpers';

// ================ Action types ================ //

export const ADD_FILTER = 'app/SearchPage/ADD_FILTER';

// async actions use request - success / failure pattern
export const LOAD_LISTINGS = createRequestTypes('app/SearchPage/LOAD_LISTINGS');

// ================ Reducer ================ //

export const initialState = {
  filters: [],
  initialListingsLoaded: false,
  listings: [],
  loadingListings: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FILTER: {
      const stateFilters = state.filters || [];
      return { ...state, ...{ filters: unionWith(stateFilters, [payload], isEqual) } };
    }
    case LOAD_LISTINGS.REQUEST:
    case LOAD_LISTINGS.SUCCESS:
    case LOAD_LISTINGS.FAILURE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const addFilter = (key, value) => ({ type: ADD_FILTER, payload: { [key]: value } });

// async actions use request - success - failure pattern
const action = (type, payload = {}) => ({ type, ...payload });

export const loadListings = {
  request: () =>
    action(LOAD_LISTINGS.REQUEST, {
      payload: { loadingListings: true, initialListingsLoaded: false },
    }),
  success: listings =>
    action(LOAD_LISTINGS.SUCCESS, {
      payload: { loadingListings: false, initialListingsLoaded: true, listings },
    }),
  failure: error =>
    action(LOAD_LISTINGS.FAILURE, {
      payload: { loadingListings: false, loadListingError: error, error: true },
    }),
};

// ================ Worker sagas ================ //

export function* callFetchListings(sdk) {
  const { response, error } = yield call(sdk.fetchListings);
  if (response) {
    yield put(loadListings.success(response));
  } else {
    yield put(loadListings.failure(error));
  }
}

// ================ Watcher sagas ================ //

export function* watchLoadListings(sdk) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(LOAD_LISTINGS.REQUEST);
    yield call(callFetchListings, sdk);
  }
}
