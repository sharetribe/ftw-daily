/**
 * This file contains Action constants, Action creators, and reducer of a page
 * container. We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import { unionWith, isEqual } from 'lodash';

// Actions
export const ADD_FILTER = 'app/SearchPage/ADD_FILTER';

// Reducer
export default function reducer(state = {}, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADD_FILTER: {
      const stateFilters = state.filters || [];
      return { ...state, ...{ filters: unionWith(stateFilters, [ payload ], isEqual) } };
    }
    default:
      return state;
  }
}

// Action Creators
export const addFilter = (key, value) => ({ type: ADD_FILTER, payload: { [key]: value } });
