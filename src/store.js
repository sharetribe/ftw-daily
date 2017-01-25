/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import createReducer from './reducers';

/**
 * configureStore creates a new store with initial state and possible enhancers
 * (like redux-saga or redux-thunk middleware)
 */
export default function configureStore(initialState) {
  const useReduxDevTools = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__;

  if (useReduxDevTools) {
    return createStore(createReducer(), initialState, window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  return createStore(createReducer(), initialState);
}
