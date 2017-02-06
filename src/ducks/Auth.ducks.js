/* eslint-disable no-constant-condition */
/**
 * Authentication duck.
 */
import { call, put, take, cancel, fork } from 'redux-saga/effects';

// ================ Action types ================ //

export const LOGIN_REQUEST = 'app/Auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'app/Auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'app/Auth/LOGIN_ERROR';

export const LOGOUT_REQUEST = 'app/Auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'app/Auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'app/Auth/LOGOUT_ERROR';

// ================ Reducer ================ //

export const NOTHING_IN_PROGRESS = 'NOTHING_IN_PROGRESS';
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGOUT_IN_PROGRESS = 'LOGOUT_IN_PROGRESS';

const initialState = {
  isAuthenticated: false,
  user: null,
  inProgressState: NOTHING_IN_PROGRESS,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, inProgressState: LOGIN_IN_PROGRESS, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        inProgressState: NOTHING_IN_PROGRESS,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_ERROR:
      return { ...state, inProgressState: NOTHING_IN_PROGRESS, error: payload };
    case LOGOUT_REQUEST:
      return { ...state, inProgressState: LOGOUT_IN_PROGRESS, error: null };
    case LOGOUT_SUCCESS:
      return { ...state, inProgressState: NOTHING_IN_PROGRESS, isAuthenticated: false, user: null };
    case LOGOUT_ERROR:
      return { ...state, inProgressState: NOTHING_IN_PROGRESS, error: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const login = (email, password) => ({ type: LOGIN_REQUEST, payload: { email, password } });
export const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
export const loginError = error => ({ type: LOGIN_ERROR, payload: error, error: true });

export const logout = router => ({ type: LOGOUT_REQUEST, payload: { router } });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutError = error => ({ type: LOGOUT_ERROR, payload: error, error: true });

// ================ Worker sagas ================ //

export function* callLogin(action, sdk) {
  const { payload } = action;
  const { email, password } = payload;
  try {
    yield call(sdk.login, email, password);
    yield put(loginSuccess(payload));
  } catch (e) {
    yield put(loginError(e));
  }
}

export function* callLogout(action, sdk) {
  const { payload } = action;
  const { router } = payload;
  try {
    yield call(sdk.logout);
    yield put(logoutSuccess());
    yield call(router.transitionTo, '/');
  } catch (e) {
    yield put(logoutError(e));
  }
}

// ================ Watcher sagas ================ //

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
