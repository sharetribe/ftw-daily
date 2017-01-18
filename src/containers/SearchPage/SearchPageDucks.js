/**
 * This file contains Action constants, Action creators, and reducer of a page
 * container. We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import unionBy from 'lodash/unionBy';

// Actions
const ADD_FILTER = 'ADD_FILTER';

// Reducer
export default function reducer(state = {}, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADD_FILTER:
      {
        const stateFilters = state.filters || [];
        return Object.assign({}, state, { filters: unionBy(stateFilters, [ payload ]) });
      }
    default:
      return state;
  }
}

// Action Creators
export const addFilter = (key, value) => ({ type: ADD_FILTER, payload: { [key]: value } });
