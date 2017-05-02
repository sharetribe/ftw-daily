/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

/**
 * Create a new store with the given initial state. Adds Redux
 * middleware and enhancers.
 */
export default function configureStore(sdk, initialState = {}) {
  const middlewares = [thunk.withExtraArgument(sdk)];

  // Enable Redux Devtools in client side dev mode.
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(createReducer(), initialState, enhancer);

  return store;
}
