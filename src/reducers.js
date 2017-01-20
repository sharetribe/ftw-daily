import { combineReducers } from 'redux';
import * as globalReducers from './ducks';
import * as pageReducers from './containers/reducers';

/**
 * Function _createReducer_ combines global reducers (reducers that are used in
 * multiple pages) and reducers that are handling actions happening inside one page container.
 * Since we combineReducers, pageReducers will get page specific key (e.g. SearchPage)
 * which is page specific.
 * Future: this structure could take in asyncReducers, which are changed when you navigate pages.
 */
const createReducer = function createReducer() {
  return combineReducers({ ...globalReducers, ...pageReducers });
};

export default createReducer;
