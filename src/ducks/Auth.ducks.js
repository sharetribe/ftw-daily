/**
 * Authentication duck.
 */
import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

// ================ Action types ================ //

export const LOGIN = 'app/Auth/LOGIN';
export const LOGIN_SUCCESS = 'app/Auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'app/Auth/LOGIN_FAILURE';
export const LOGOUT = 'app/Auth/LOGOUT';
export const LOGOUT_SUCCESS = 'app/Auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'app/Auth/LOGOUT_FAILURE';

// ================ Reducer ================ //

const initialState = {
  loginInProgress: false,
  logoutInProgress: false,
  loginError: null,
  logoutError: null,
  isAuthenticated: false,
  user: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return { ...state, loginInProgress: true };
    case LOGIN_SUCCESS:
      return { ...state, loginInProgress: false, isAuthenticated: true, user: payload };
    case LOGIN_FAILURE:
      return { ...state, loginInProgress: false, loginError: payload };
    case LOGOUT:
      return { ...state, logoutInProgress: true };
    case LOGOUT_SUCCESS:
      return { ...state, logoutInProgress: false, isAuthenticated: false, user: null };
    case LOGOUT_FAILURE:
      return { ...state, logoutInProgress: false, logoutError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const login = (email, password) => ({ type: LOGIN, payload: { email, password } });
export const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error, error: true });

export const logout = () => ({ type: LOGOUT });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailure = error => ({ type: LOGOUT_FAILURE, payload: error, error: true });

// ================ Worker sagas ================ //

function* callLogin(action) {
  const { payload } = action;
  yield call(delay, 1000);
  yield put(loginSuccess(payload));
}

function* callLogout() {
  yield call(delay, 1000);
  yield put(logoutSuccess());
}

// ================ Watcher sagas ================ //

export function* watchLogin() {
  yield takeEvery(LOGIN, callLogin);
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, callLogout);
}
