/**
 * This file contains Action constants, Action creators, and reducer of a page
 * container. We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import { unionWith, isEqual } from 'lodash';
import { call, put, takeEvery } from 'redux-saga/effects';
import { types } from 'sharetribe-sdk';
import { createRequestTypes } from '../../util/sagaHelpers';

const { LatLng } = types;

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
      return { ...state, loadingListings: true, initialListingsLoaded: false };
    case LOAD_LISTINGS.SUCCESS:
      return { ...state, loadingListings: false, initialListingsLoaded: true, listings: payload };
    case LOAD_LISTINGS.FAILURE:
      return { ...state, loadingListings: false, error: true, loadListingError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const addFilter = (key, value) => ({ type: ADD_FILTER, payload: { [key]: value } });

// async actions use request - success / failure pattern
export const loadListings = {
  request: () => ({ type: LOAD_LISTINGS.REQUEST, payload: {} }),
  success: listings => ({ type: LOAD_LISTINGS.SUCCESS, payload: listings }),
  failure: error => ({ type: LOAD_LISTINGS.FAILURE, payload: error }),
};

// ================ Worker sagas ================ //

/**
   Take `included` values from the JSON API response
   and transforms it to a map which provide easy and fast lookup.
   Example:
   ```
   const included = [
     { id: new UUID(123), type: 'user', attributes: { name: "John" }},
     { id: new UUID(234), type: 'user', attributes: { name: "Jane" }},
   ];
   const map = lookupMap(included)
   #=> returns
   # {
   #   user: {
   #     123: { id: 123, type: 'user', attributes: { name: "John" }},
   #     234: { id: 234, type: 'user', attributes: { name: "Jane" }},
   #   }
   # }
   map.user.123
   #=> returns
   # { id: 123, type: 'user', attributes: { name: "John" }},
   ```
  */
const lookupMap = included => included.reduce(
  (memo, resource) => {
    const { type, id } = resource;

    // eslint-disable-next-line no-param-reassign
    memo[type] = memo[type] || {};
    // eslint-disable-next-line no-param-reassign
    memo[type][id.uuid] = resource;

    return memo;
  },
  {},
);

// Format the data as ListingCard component expects it and
// add some fake data
// TODO Remove this and think about the real implementation
const formatListingData = response => {
  const includedMap = lookupMap(response.data.included);
  const data = response.data.data;

  return data.map(({ id, attributes, relationships }) => {
    const author = includedMap.user[relationships.author.data.id.uuid];
    const { firstName, lastName } = author.attributes.profile;

    return {
      id: id.uuid,
      title: attributes.title,
      description: attributes.description,
      location: attributes.address,
      price: '55\u20AC / day',
      author: {
        name: `${firstName} ${lastName}`,
        avatar: 'http://placehold.it/44x44',
        review: { rating: '4' },
      },
    };
  });
};

export function* callFetchListings(sdk) {
  try {
    const response = yield call(sdk.listings.search, {
      origin: new LatLng(40, 70),
      include: ['author'],
    });
    yield put(loadListings.success(formatListingData(response)));
  } catch (error) {
    yield put(loadListings.failure(error));
  }
}

// ================ Watcher sagas ================ //

export function* watchLoadListings(sdk) {
  // eslint-disable-next-line no-constant-condition
  yield takeEvery(LOAD_LISTINGS.REQUEST, callFetchListings, sdk);
}
