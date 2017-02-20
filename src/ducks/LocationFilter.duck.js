/**
 * This file contains Action types, Action creators, and reducer of global
 * LocationFilter. Global actions can be used in multiple pages.
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

// Actions
export const CHANGE_LOCATION = 'app/LocationFilter/CHANGE_LOCATION';

// Reducer
export default function reducer(state = '', action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LOCATION: {
      return payload;
    }
    default:
      return state;
  }
}

// Action types
export const changeLocationFilter = location => ({ type: CHANGE_LOCATION, payload: location });
