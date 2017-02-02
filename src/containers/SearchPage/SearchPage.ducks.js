/**
 * This file contains Action constants, Action creators, and reducer of a page
 * container. We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import { unionWith, isEqual } from 'lodash';
import { delay } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import { fakeListings } from './fakeData';

// ================ Action types ================ //

export const ADD_FILTER = 'app/SearchPage/ADD_FILTER';
export const LOAD_LISTINGS = 'app/SearchPage/LOAD_LISTINGS';
export const LOAD_LISTINGS_SUCCESS = 'app/SearchPage/LOAD_LISTINGS_SUCCESS';
export const LOAD_LISTINGS_FAILURE = 'app/SearchPage/LOAD_LISTINGS_FAILURE';

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
    case LOAD_LISTINGS:
      return { ...state, loadingListings: true, initialListingsLoaded: false };
    case LOAD_LISTINGS_SUCCESS:
      return { ...state, loadingListings: false, initialListingsLoaded: true, listings: payload };
    case LOAD_LISTINGS_FAILURE:
      return { ...state, loadingListings: false, loadListingError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const addFilter = (key, value) => ({ type: ADD_FILTER, payload: { [key]: value } });
export const loadListings = () => ({ type: LOAD_LISTINGS, payload: {} });
export const loadListingsSuccess = listings => ({ type: LOAD_LISTINGS_SUCCESS, payload: listings });
export const loadListingsFailure = error => ({
  type: LOAD_LISTINGS_FAILURE,
  payload: error,
  error: true,
});

// ================ Worker sagas ================ //

export function fetchListings() {
  const randomTime = Math.random() * 2000;
  const fakeResponseTime = 1000 + randomTime;
  return delay(fakeResponseTime, { response: fakeListings });
}

export function* callFetchListings() {
  const { response, error } = yield call(fetchListings);
  if (response) {
    yield put(loadListingsSuccess(response));
  } else {
    yield put(loadListingsFailure(error));
  }
}

// ================ Watcher sagas ================ //

export function* watchLoadListings() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(LOAD_LISTINGS);
    yield call(callFetchListings);
  }
}
