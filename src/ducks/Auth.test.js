import { storableError } from '../util/errors';
import { clearCurrentUser, currentUserShowRequest, currentUserShowSuccess } from './user.duck';
import reducer, {
  authenticationInProgress,
  authInfoSuccess,
  login,
  loginRequest,
  loginSuccess,
  loginError,
  logout,
  logoutRequest,
  logoutSuccess,
  logoutError,
  signup,
  signupRequest,
  signupSuccess,
  signupError,
  userLogout,
} from './Auth.duck';
import * as log from '../util/log';

// Create a dispatch function that correctly calls the thunk functions
// with itself
const createFakeDispatch = (getState, sdk) => {
  const dispatch = jest.fn(actionOrFn => {
    if (typeof actionOrFn === 'function') {
      return actionOrFn(dispatch, getState, sdk);
    }
    return actionOrFn;
  });
  return dispatch;
};

// Get the dispatched actions from the fake dispatch function
const dispatchedActions = fakeDispatch => {
  return fakeDispatch.mock.calls.reduce((actions, args) => {
    if (Array.isArray(args) && args.length === 1) {
      const action = args[0];
      return typeof action === 'object' ? actions.concat([action]) : actions;
    } else {
      console.error('fake dispatch invalid call args:', args);
      throw new Error('Fake dispatch function should only be called with a single argument');
    }
  }, []);
};

describe('Auth duck', () => {
  describe('reducer', () => {
    it('should be logged out with no errors by default', () => {
      const state = reducer();
      expect(state.isAuthenticated).toEqual(false);
      expect(state.authInfoLoaded).toEqual(false);
      expect(state.loginError).toBeNull();
      expect(state.logoutError).toBeNull();
      expect(state.signupError).toBeNull();
      expect(state.loginInProgress).toEqual(false);
      expect(state.logoutInProgress).toEqual(false);
      expect(state.signupInProgress).toEqual(false);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);
    });

    it('should login successfully', () => {
      const initialState = reducer();
      const loginRequestState = reducer(initialState, loginRequest());
      expect(loginRequestState.isAuthenticated).toEqual(false);
      expect(loginRequestState.loginError).toBeNull();
      expect(loginRequestState.loginInProgress).toEqual(true);
      expect(authenticationInProgress({ Auth: loginRequestState })).toEqual(true);

      const loginSuccessState = reducer(loginRequestState, loginSuccess());
      expect(loginSuccessState.isAuthenticated).toEqual(true);
      expect(loginSuccessState.loginError).toBeNull();
      expect(loginSuccessState.loginInProgress).toEqual(false);
    });

    it('should handle failed login', () => {
      let state = reducer();
      state = reducer(state, loginRequest());
      expect(state.isAuthenticated).toEqual(false);
      expect(state.loginError).toBeNull();
      expect(state.loginInProgress).toEqual(true);
      expect(authenticationInProgress({ Auth: state })).toEqual(true);

      const error = new Error('test error');
      state = reducer(state, loginError(error));
      expect(state.isAuthenticated).toEqual(false);
      expect(state.loginError).toEqual(error);
      expect(state.loginInProgress).toEqual(false);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);
    });

    it('should login and logout properly', () => {
      let state = reducer();
      expect(state.isAuthenticated).toEqual(false);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);

      // request login
      state = reducer(state, loginRequest());
      expect(authenticationInProgress({ Auth: state })).toEqual(true);

      // login successful
      state = reducer(state, loginSuccess());
      expect(state.isAuthenticated).toEqual(true);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);

      // request logout
      state = reducer(state, logoutRequest());
      expect(state.isAuthenticated).toEqual(true);
      expect(authenticationInProgress({ Auth: state })).toEqual(true);

      // logout successful
      state = reducer(state, logoutSuccess());
      expect(state.isAuthenticated).toEqual(false);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);
    });

    it('should signup successfully', () => {
      let state = reducer();

      // request signup
      state = reducer(state, signupRequest());
      expect(state.signupInProgress).toEqual(true);
      expect(authenticationInProgress({ Auth: state })).toEqual(true);

      // signup successful
      state = reducer(state, signupSuccess());
      expect(state.signupInProgress).toEqual(false);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);
    });

    it('should clear signup error when logging in', () => {
      let state = reducer();

      // request signup
      state = reducer(state, signupRequest());
      expect(state.signupInProgress).toEqual(true);
      expect(authenticationInProgress({ Auth: state })).toEqual(true);

      // signup error
      const error = new Error('test signup error');
      state = reducer(state, signupError(error));
      expect(state.signupInProgress).toEqual(false);
      expect(authenticationInProgress({ Auth: state })).toEqual(false);
      expect(state.signupError).toEqual(error);
      expect(state.isAuthenticated).toEqual(false);

      // login request
      state = reducer(state, loginRequest());
      expect(authenticationInProgress({ Auth: state })).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);

      // login successful
      state = reducer(state, loginSuccess());
      expect(authenticationInProgress({ Auth: state })).toEqual(false);
      expect(state.isAuthenticated).toEqual(true);
      expect(state.signupError).toBeNull();
    });

    it('should set initial state for unauthenticated users', () => {
      const authInfoLoggedOut = {};
      const initialState = reducer();
      expect(initialState.authInfoLoaded).toEqual(false);
      const state = reducer(initialState, authInfoSuccess(authInfoLoggedOut));
      expect(state.authInfoLoaded).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
    });

    it('should set initial state for anonymous users', () => {
      const authInfoAnonymous = { isAnonymous: true };
      const initialState = reducer();
      expect(initialState.authInfoLoaded).toEqual(false);
      const state = reducer(initialState, authInfoSuccess(authInfoAnonymous));
      expect(state.authInfoLoaded).toEqual(true);
      expect(state.isAuthenticated).toEqual(false);
    });

    it('should set initial state for authenticated users', () => {
      const authInfoLoggedIn = { isAnonymous: false };
      const initialState = reducer();
      expect(initialState.authInfoLoaded).toEqual(false);
      const state = reducer(initialState, authInfoSuccess(authInfoLoggedIn));
      expect(state.authInfoLoaded).toEqual(true);
      expect(state.isAuthenticated).toEqual(true);
    });
  });

  describe('login thunk', () => {
    it('should dispatch success and fetch current user', () => {
      const initialState = reducer();
      const getState = () => ({ Auth: initialState });
      const sdk = { login: jest.fn(() => Promise.resolve({})) };
      const dispatch = createFakeDispatch(getState, sdk);
      const username = 'x.x@example.com';
      const password = 'pass';

      return login(username, password)(dispatch, getState, sdk).then(() => {
        expect(sdk.login.mock.calls).toEqual([[{ username, password }]]);
        expect(dispatchedActions(dispatch)).toEqual([
          loginRequest(),
          loginSuccess(),
          currentUserShowRequest(),

          // Test restriction: Since the getState mock always returns
          // the initial state, user isn't marked as logged in and
          // current user is still null.
          currentUserShowSuccess(null),
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
        expect(dispatch.mock.calls).toEqual([[loginRequest()], [loginError(storableError(error))]]);
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
          [logoutSuccess()],
          [clearCurrentUser()],
          [userLogout()],
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
        expect(dispatch.mock.calls).toEqual([
          [logoutRequest()],
          [logoutError(storableError(error))],
        ]);
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

  describe('signup thunk', () => {
    it('should dispatch success and login', () => {
      const sdk = {
        currentUser: {
          create: jest.fn(() => Promise.resolve({})),
        },
        login: jest.fn(() => Promise.resolve({})),
      };
      const getState = () => ({ Auth: state });
      const dispatch = createFakeDispatch(getState, sdk);
      const state = reducer();
      const email = 'pekka@example.com';
      const password = 'some pass';
      const params = {
        email,
        password,
        firstName: 'Pekka',
        lastName: 'Pohjola',
        phoneNumber: '+123 555 1234567',
      };
      const { phoneNumber, ...rest } = params;

      return signup(params)(dispatch, getState, sdk).then(() => {
        expect(sdk.currentUser.create.mock.calls).toEqual([
          [{ ...rest, protectedData: { phoneNumber } }],
        ]);
        expect(sdk.login.mock.calls).toEqual([[{ username: email, password }]]);
        expect(dispatchedActions(dispatch)).toEqual([
          signupRequest(),
          signupSuccess(),
          loginRequest(),
          loginSuccess(),
          currentUserShowRequest(),

          // Test restriction: Since the getState mock always returns
          // the initial state, user isn't marked as logged in and
          // current user is still null.
          currentUserShowSuccess(null),
        ]);
      });
    });
    it('should dispatch error', () => {
      const error = new Error('test signup error');
      const sdk = {
        currentUser: {
          create: jest.fn(() => Promise.reject(error)),
        },
      };
      const getState = () => ({ Auth: state });
      const dispatch = createFakeDispatch(getState, sdk);
      const state = reducer();
      const email = 'pekka@example.com';
      const password = 'some pass';
      const params = {
        email,
        password,
        firstName: 'Pekka',
        lastName: 'Pohjola',
        phoneNumber: '+123 555 1234567',
      };
      const { phoneNumber, ...rest } = params;

      // disable error logging
      log.error = jest.fn();

      return signup(params)(dispatch, getState, sdk).then(() => {
        expect(sdk.currentUser.create.mock.calls).toEqual([
          [{ ...rest, protectedData: { phoneNumber } }],
        ]);
        expect(dispatchedActions(dispatch)).toEqual([
          signupRequest(),
          signupError(storableError(error)),
        ]);
      });
    });
  });
});
