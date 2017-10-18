import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const CHANGE_PASSWORD_REQUEST = 'app/PasswordChangePage/CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'app/PasswordChangePage/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'app/PasswordChangePage/CHANGE_PASSWORD_ERROR';

export const CHANGE_PASSWORD_CLEAR = 'app/PasswordChangePage/CHANGE_PASSWORD_CLEAR';

// ================ Reducer ================ //

const initialState = {
  changePasswordError: null,
  changePasswordInProgress: false,
  passwordChanged: false,
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
