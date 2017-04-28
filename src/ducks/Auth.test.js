import { clearCurrentUser } from './user.duck';
import reducer, {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  NOTHING_IN_PROGRESS,
  LOGIN_IN_PROGRESS,
  LOGOUT_IN_PROGRESS,
  authInfo,
  authInfoSuccess,
  authInfoError,
  login,
  loginRequest,
  loginSuccess,
  loginError,
  callLogin,
  logout,
  logoutRequest,
  logoutSuccess,
  logoutError,
  callLogout,
  watchAuth,
} from './Auth.duck';

describe('Auth duck', () => {
  describe('reducer', () => {
    it('should be logged out by default', () => {
      const state = reducer();
      expect(state.authInfoLoaded).toEqual(false);
      expect(state.isAuthenticated).toEqual(false);
      expect(state.authInfoError).toBeNull();
      expect(state.loginError).toBeNull();
      expect(state.logoutError).toBeNull();
      expect(state.loginInProgress).toEqual(false);
      expect(state.logoutInProgress).toEqual(false);
    });

    it('should login successfully', () => {
      const initialState = reducer();
      const loginRequestState = reducer(initialState, loginRequest());
      expect(loginRequestState.isAuthenticated).toEqual(false);
      expect(loginRequestState.loginError).toBeNull();
      expect(loginRequestState.loginInProgress).toEqual(true);

      const loginSuccessState = reducer(loginRequestState, loginSuccess());
      expect(loginSuccessState.isAuthenticated).toEqual(true);
      expect(loginSuccessState.loginError).toBeNull();
      expect(loginSuccessState.loginInProgress).toEqual(false);
    });

    it('should handle failed login', () => {
      let initialState = reducer();
      const loginRequestState = reducer(initialState, loginRequest());
      expect(loginRequestState.isAuthenticated).toEqual(false);
      expect(loginRequestState.loginError).toBeNull();
      expect(loginRequestState.loginInProgress).toEqual(true);

      const error = new Error('test error');
      const loginErrorState = reducer(loginRequestState, loginError(error));
      expect(loginErrorState.isAuthenticated).toEqual(false);
      expect(loginErrorState.loginError).toEqual(error);
      expect(loginErrorState.loginInProgress).toEqual(false);
    });

    it('should set initial state for unauthenticated users', () => {
      const authInfoLoggedOut = {};
      const initialState = reducer();
      expect(initialState.authInfoLoaded).toEqual(false);
      const state = reducer(initialState, authInfoSuccess(authInfoLoggedOut));
      expect(state.authInfoLoaded).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
      expect(state.authInfoError).toBeNull();
    });

    it('should set initial state for anonymous users', () => {
      const authInfoAnonymous = { grantType: 'client_credentials' };
      const initialState = reducer();
      expect(initialState.authInfoLoaded).toEqual(false);
      const state = reducer(initialState, authInfoSuccess(authInfoAnonymous));
      expect(state.authInfoLoaded).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
      expect(state.authInfoError).toBeNull();
    });

    it('should set initial state for unauthenticated users', () => {
      const authInfoLoggedIn = { grantType: 'refresh_token' };
      const initialState = reducer();
      expect(initialState.authInfoLoaded).toEqual(false);
      const state = reducer(initialState, authInfoSuccess(authInfoLoggedIn));
      expect(state.authInfoLoaded).toEqual(true);
      expect(state.isAuthenticated).toEqual(true);
      expect(state.authInfoError).toBeNull();
    });
  });

  describe('login thunk', () => {
    it('should dispatch success', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const getState = () => ({ Auth: initialState });
      const sdk = { login: jest.fn(() => Promise.resolve({})) };
      const username = 'x.x@example.com';
      const password = 'pass';

      return login(username, password)(dispatch, getState, sdk).then(() => {
        expect(sdk.login.mock.calls).toEqual([[{ username, password }]]);
        expect(dispatch.mock.calls).toEqual([
          [loginRequest()],
          [loginSuccess()],
          [expect.anything()], // fetchCurrentUser
        ]);
      });
    });
    it('should dispatch error', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const getState = () => ({ Auth: initialState });
      const error = new Error('could not login');
      const sdk = { login: jest.fn(() => Promise.reject(error)) };
      const username = 'x.x@example.com';
      const password = 'pass';

      return login(username, password)(dispatch, getState, sdk).then(() => {
        expect(sdk.login.mock.calls).toEqual([[{ username, password }]]);
        expect(dispatch.mock.calls).toEqual([[loginRequest()], [loginError(error)]]);
      });
    });
    it('should reject if another login is in progress', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const loginInProgressState = reducer(initialState, loginRequest());
      const getState = () => ({ Auth: loginInProgressState });
      const sdk = { login: jest.fn(() => Promise.resolve({})) };
      const username = 'x.x@example.com';
      const password = 'pass';

      return login(username, password)(dispatch, getState, sdk).then(
        () => {
          throw new Error('should not succeed');
        },
        e => {
          expect(e.message).toEqual('Login or logout already in progress');
          expect(sdk.login.mock.calls.length).toEqual(0);
          expect(dispatch.mock.calls.length).toEqual(0);
        }
      );
    });
    it('should reject if logout is in progress', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const logoutInProgressState = reducer(initialState, logoutRequest());
      const getState = () => ({ Auth: logoutInProgressState });
      const sdk = { login: jest.fn(() => Promise.resolve({})) };
      const username = 'x.x@example.com';
      const password = 'pass';

      return login(username, password)(dispatch, getState, sdk).then(
        () => {
          throw new Error('should not succeed');
        },
        e => {
          expect(e.message).toEqual('Login or logout already in progress');
          expect(sdk.login.mock.calls.length).toEqual(0);
          expect(dispatch.mock.calls.length).toEqual(0);
        }
      );
    });
  });

  describe('logout thunk', () => {
    it('should dispatch success', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const getState = () => ({ Auth: initialState });
      const sdk = { logout: jest.fn(() => Promise.resolve({})) };

      return logout()(dispatch, getState, sdk).then(() => {
        expect(sdk.logout.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls).toEqual([
          [logoutRequest()],
          [clearCurrentUser()],
          [logoutSuccess()],
        ]);
      });
    });
    it('should dispatch error', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const getState = () => ({ Auth: initialState });
      const error = new Error('could not logout');
      const sdk = { logout: jest.fn(() => Promise.reject(error)) };

      return logout()(dispatch, getState, sdk).then(() => {
        expect(sdk.logout.mock.calls.length).toEqual(1);
        expect(dispatch.mock.calls).toEqual([[logoutRequest()], [logoutError(error)]]);
      });
    });
    it('should reject if another logout is in progress', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const logoutInProgressState = reducer(initialState, logoutRequest());
      const getState = () => ({ Auth: logoutInProgressState });
      const sdk = { logout: jest.fn(() => Promise.resolve({})) };

      return logout()(dispatch, getState, sdk).then(
        () => {
          throw new Error('should not succeed');
        },
        e => {
          expect(e.message).toEqual('Login or logout already in progress');
          expect(sdk.logout.mock.calls.length).toEqual(0);
          expect(dispatch.mock.calls.length).toEqual(0);
        }
      );
    });
    it('should reject if login is in progress', () => {
      const dispatch = jest.fn();
      const initialState = reducer();
      const loginInProgressState = reducer(initialState, loginRequest());
      const getState = () => ({ Auth: loginInProgressState });
      const sdk = { logout: jest.fn(() => Promise.resolve({})) };

      return logout()(dispatch, getState, sdk).then(
        () => {
          throw new Error('should not succeed');
        },
        e => {
          expect(e.message).toEqual('Login or logout already in progress');
          expect(sdk.logout.mock.calls.length).toEqual(0);
          expect(dispatch.mock.calls.length).toEqual(0);
        }
      );
    });
  });
});
