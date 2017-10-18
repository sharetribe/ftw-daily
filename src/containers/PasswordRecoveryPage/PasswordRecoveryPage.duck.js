import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const RECOVERY_REQUEST = 'app/PasswordRecoveryPage/RECOVERY_REQUEST';
export const RECOVERY_SUCCESS = 'app/PasswordRecoveryPage/RECOVERY_SUCCESS';
export const RECOVERY_ERROR = 'app/PasswordRecoveryPage/RECOVERY_ERROR';
export const RETYPE_EMAIL = 'app/PasswordRecoveryPage/RETYPE_EMAIL';
export const CLEAR_RECOVERY_ERROR = 'app/PasswordRecoveryPage/CLEAR_RECOVERY_ERROR';

// ================ Reducer ================ //

const initialState = {
  initialEmail: null,
  submittedEmail: null,
  recoveryError: null,
  recoveryInProgress: false,
  passwordRequested: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case RECOVERY_REQUEST:
      return {
        ...state,
        submittedEmail: null,
        recoveryInProgress: true,
        recoveryError: null,
      };
    case RECOVERY_SUCCESS:
      return {
        ...state,
        submittedEmail: payload.email,
        initialEmail: payload.email,
        recoveryInProgress: false,
        passwordRequested: true,
      };
    case RECOVERY_ERROR:
      return {
        ...state,
        recoveryInProgress: false,
        recoveryError: payload.error,
        initialEmail: payload.email,
      };
    case RETYPE_EMAIL:
      return {
        ...state,
        initialEmail: state.submittedEmail,
        submittedEmail: null,
        passwordRequested: false,
      };
    case CLEAR_RECOVERY_ERROR:
      return { ...state, recoveryError: null };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const passwordRecoveryRequest = () => ({ type: RECOVERY_REQUEST });
export const passwordRecoverySuccess = email => ({ type: RECOVERY_SUCCESS, payload: { email } });
export const passwordRecoveryError = (error, email) => ({
  type: RECOVERY_ERROR,
  payload: { error, email },
  error: true,
});
export const retypePasswordRecoveryEmail = () => ({ type: RETYPE_EMAIL });
export const clearPasswordRecoveryError = () => ({ type: CLEAR_RECOVERY_ERROR });

// ================ Thunks ================ //

export const recoverPassword = email => (dispatch, getState, sdk) => {
  dispatch(passwordRecoveryRequest());

  return sdk.passwordReset
    .request({ email })
    .then(() => dispatch(passwordRecoverySuccess(email)))
    .catch(e => dispatch(passwordRecoveryError(storableError(e), email)));
};
