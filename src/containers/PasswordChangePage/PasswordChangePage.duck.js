import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const CHANGE_PASSWORD_REQUEST = 'app/PasswordChangePage/CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'app/PasswordChangePage/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'app/PasswordChangePage/CHANGE_PASSWORD_ERROR';

export const CHANGE_PASSWORD_CLEAR = 'app/PasswordChangePage/CHANGE_PASSWORD_CLEAR';

export const RESET_PASSWORD_REQUEST = 'app/PasswordChangePage/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'app/PasswordChangePage/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'app/PasswordChangePage/RESET_PASSWORD_ERROR';

// ================ Reducer ================ //

const initialState = {
  changePasswordError: null,
  changePasswordInProgress: false,
  passwordChanged: false,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordInProgress: true,
        changePasswordError: null,
        passwordChanged: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, changePasswordInProgress: false, passwordChanged: true };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, changePasswordInProgress: false, changePasswordError: payload };

    case CHANGE_PASSWORD_CLEAR:
      return { ...initialState };

    case RESET_PASSWORD_REQUEST:
      return { ...state, resetPasswordInProgress: true, resetPasswordError: null };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordInProgress: false };
    case RESET_PASSWORD_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return { ...state, resetPasswordInProgress: false, resetPasswordError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST });
export const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS });
export const changePasswordError = error => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: error,
  error: true,
});

export const changePasswordClear = () => ({ type: CHANGE_PASSWORD_CLEAR });

export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });

export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });

export const resetPasswordError = e => ({
  type: RESET_PASSWORD_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const changePassword = params => (dispatch, getState, sdk) => {
  dispatch(changePasswordRequest());
  const { newPassword, currentPassword } = params;

  return sdk.currentUser
    .changePassword({ newPassword, currentPassword })
    .then(() => dispatch(changePasswordSuccess()))
    .catch(e => {
      dispatch(changePasswordError(storableError(storableError(e))));
      // This is thrown so that form can be cleared
      // after a timeout on changePassword submit handler
      throw e;
    });
};

export const resetPassword = email => (dispatch, getState, sdk) => {
  dispatch(resetPasswordRequest());
  return sdk.passwordReset
    .request({ email })
    .then(() => dispatch(resetPasswordSuccess()))
    .catch(e => dispatch(resetPasswordError(storableError(e))));
};
