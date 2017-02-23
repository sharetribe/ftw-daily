/* eslint-disable no-constant-condition */
/**
 * Authentication duck.
 */
import { call, put, take, cancel, fork, takeLatest } from 'redux-saga/effects';

const authenticated = authInfo => authInfo.grantType === 'refresh_token';

// ================ Action types ================ //

export const AUTH_INFO_REQUEST = 'app/Auth/AUTH_INFO_REQUEST';
export const AUTH_INFO_SUCCESS = 'app/Auth/AUTH_INFO_SUCCESS';
export const AUTH_INFO_ERROR = 'app/Auth/AUTH_INFO_ERROR';

export const LOGIN_REQUEST = 'app/Auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'app/Auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'app/Auth/LOGIN_ERROR';

export const LOGOUT_REQUEST = 'app/Auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'app/Auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'app/Auth/LOGOUT_ERROR';

// ================ Reducer ================ //

const initialState = { authInfoLoaded: false, isAuthenticated: false, error: null };

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_INFO_REQUEST:
      return { ...state, error: null };
    case AUTH_INFO_SUCCESS:
      return { ...state, authInfoLoaded: true, isAuthenticated: authenticated(payload) };
    case AUTH_INFO_ERROR:
      return { ...state, error: payload };

    case LOGIN_REQUEST:
      return { ...state, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case LOGIN_ERROR:
      return { ...state, error: payload };

    case LOGOUT_REQUEST:
      return { ...state, error: null };
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    case LOGOUT_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const authInfo = () => ({ type: AUTH_INFO_REQUEST });
export const authInfoSuccess = info => ({ type: AUTH_INFO_SUCCESS, payload: info });
export const authInfoError = error => ({ type: AUTH_INFO_ERROR, payload: error, error: true });

export const login = (username, password) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginError = error => ({ type: LOGIN_ERROR, payload: error, error: true });

export const logout = historyPush => ({ type: LOGOUT_REQUEST, payload: { historyPush } });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutError = error => ({ type: LOGOUT_ERROR, payload: error, error: true });

// ================ Worker sagas ================ //

export function* callAuthInfo(sdk) {
  try {
    const info = yield call(sdk.authInfo);
    yield put(authInfoSuccess(info));
  } catch (e) {
    yield put(authInfoError(e));
  }
}

export function* callLogin(action, sdk) {
  const { payload } = action;
  const { username, password } = payload;
  try {
    yield call(sdk.login, { username, password });
    yield put(loginSuccess());
  } catch (e) {
    yield put(loginError(e));
  }
}

export function* callLogout(action, sdk) {
  const { payload } = action;
  const { historyPush } = payload;
  try {
    yield call(sdk.logout);
    yield put(logoutSuccess());
    yield call(historyPush, '/');
  } catch (e) {
    yield put(logoutError(e));
  }
}

// ================ Watcher sagas ================ //

export function* watchAuthInfo(sdk) {
  yield takeLatest(AUTH_INFO_REQUEST, callAuthInfo, sdk);
}

export function* watchAuth(sdk) {
  let task;

  while (true) {
    // Take either login or logout action
    const action = yield take([LOGIN_REQUEST, LOGOUT_REQUEST]);

    // Previous task should be cancelled if a new login or logout
    // action is received
    if (task) {
      yield cancel(task);
    }

    // Fork the correct worker and continue waiting for actions
    if (action.type === LOGIN_REQUEST) {
      task = yield fork(callLogin, action, sdk);
    } else if (action.type === LOGOUT_REQUEST) {
      task = yield fork(callLogout, action, sdk);
    }
  }
}
