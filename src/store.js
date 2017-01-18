import { createStore } from 'redux';
import createReducer from './reducers';

/**
 * configureStore creates a new store with initial state and possible enhancers
 * (like redux-saga or redux-thunk middleware)
 */
export default function configureStore(initialState) {
  return createStore(createReducer(), initialState);
}
