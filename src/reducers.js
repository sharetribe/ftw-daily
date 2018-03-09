import { combineReducers } from 'redux';
import { USER_LOGOUT } from './ducks/Auth.duck';
import * as globalReducers from './ducks';
import * as pageReducers from './containers/reducers';

/**
 * Function _createReducer_ combines global reducers (reducers that are used in
 * multiple pages) and reducers that are handling actions happening inside one page container.
 * Since we combineReducers, pageReducers will get page specific key (e.g. SearchPage)
 * which is page specific.
 * Future: this structure could take in asyncReducers, which are changed when you navigate pages.
 */
const appReducer = combineReducers({ ...globalReducers, ...pageReducers });

const createReducer = () => {
  return (state, action) => {
    const appState = action.type === USER_LOGOUT ? undefined : state;

    // Clear sessionStorage when logging out.
    if (action.type === USER_LOGOUT && typeof window !== 'undefined' && !!window.sessionStorage) {
      window.sessionStorage.clear();
    }

    return appReducer(appState, action);
  };
};

export default createReducer;
