import { storableError } from '../../util/errors';
// import { deleteUserAccount } from '../../util/api';
import { deleteUserAccount } from '../../util/api';

// ================ Action types ================ //

export const DELETE_ACCOUNT_REQUEST =
  'app/DeleteAccountPage/DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS =
  'app/DeleteAccountPage/DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_ERROR =
  'app/DeleteAccountPage/DELETE_ACCOUNT_ERROR';
export const DELETE_ACCOUNT_CLEANUP =
  'app/DeleteAccountPage/DELETE_ACCOUNT_CLEANUP';

export const DELETE_ACCOUNT_CLEAR =
  'app/DeleteAccountPage/DELETE_ACCOUNT_CLEAR';

export const RESET_PASSWORD_REQUEST =
  'app/DeleteAccountPage/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS =
  'app/DeleteAccountPage/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR =
  'app/DeleteAccountPage/RESET_PASSWORD_ERROR';

// ================ Reducer ================ //

const initialState = {
  deleteAccountError: null,
  deleteAccountInProgress: false,
  accountDeleted: false,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        deleteAccountInProgress: true,
        deleteAccountError: null,
        accountDeleted: false,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, deleteAccountInProgress: false, accountDeleted: true };
    case DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        deleteAccountInProgress: false,
        deleteAccountError: payload,
      };

    case DELETE_ACCOUNT_CLEAR:
      return { ...initialState };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordInProgress: true,
        resetPasswordError: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordInProgress: false };
    case RESET_PASSWORD_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return {
        ...state,
        resetPasswordInProgress: false,
        resetPasswordError: payload,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const deleteAccountRequest = () => ({ type: DELETE_ACCOUNT_REQUEST });
export const deleteAccountSuccess = () => ({ type: DELETE_ACCOUNT_SUCCESS });
export const deleteAccountError = error => ({
  type: DELETE_ACCOUNT_ERROR,
  payload: error,
  error: true,
});

export const deleteAccountClear = () => ({ type: DELETE_ACCOUNT_CLEAR });

export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });

export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });

export const resetPasswordError = e => ({
  type: RESET_PASSWORD_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const deleteAccount = params => (dispatch, getState, sdk) => {
  dispatch(deleteAccountRequest());
  const { currentPassword } = params;

  return deleteUserAccount({ currentPassword })
    .then(() => {
      dispatch(deleteAccountSuccess());
      return;
    })
    .catch(e => {
      dispatch(deleteAccountError(storableError(storableError(e))));
      // This is thrown so that form can be cleared
      // after a timeout on deleteAccount submit handler
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