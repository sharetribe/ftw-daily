// ================ Action types ================ //

export const SEND_VERIFICATION_EMAIL_REQUEST = 'app/AuthenticationPage/SEND_VERIFICATION_EMAIL_REQUEST';
export const SEND_VERIFICATION_EMAIL_SUCCESS = 'app/AuthenticationPage/SEND_VERIFICATION_EMAIL_SUCCESS';
export const SEND_VERIFICATION_EMAIL_ERROR = 'app/AuthenticationPage/SEND_VERIFICATION_EMAIL_ERROR';

// ================ Reducer ================ //

const initialState = {
  sendVerificationEmailInProgress: false,
  sendVerificationEmailError: null,
};

export default function authenticationPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SEND_VERIFICATION_EMAIL_REQUEST:
      return {
        ...state,
        sendVerificationEmailInProgress: true,
        sendVerificationEmailError: null,
      };
    case SEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        sendVerificationEmailInProgress: false,
      };
    case SEND_VERIFICATION_EMAIL_ERROR:
      return {
        ...state,
        sendVerificationEmailInProgress: false,
        sendVerificationEmailError: payload,
      };
    default:
      return state;
  }
}

// ================ Selectors ================ //

export const verificationSendingInProgress = state => {
  return state.AuthenticationPage.sendVerificationEmailInProgress;
};

// ================ Action creators ================ //

export const sendVerificationEmailRequest = () => ({
  type: SEND_VERIFICATION_EMAIL_REQUEST,
});

export const sendVerificationEmailSuccess = () => ({
  type: SEND_VERIFICATION_EMAIL_SUCCESS,
});

export const sendVerificationEmailError = e => ({
  type: SEND_VERIFICATION_EMAIL_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const sendVerificationEmail = () =>
  (dispatch, getState, sdk) => {
    if (verificationSendingInProgress(getState())) {
      return Promise.reject(new Error('Verification email sending already in progress'));
    }
    dispatch(sendVerificationEmailRequest());
    return sdk.currentUser
      .sendVerificationEmail()
      .then(() => dispatch(sendVerificationEmailSuccess()))
      .catch(e => dispatch(sendVerificationEmailError(e)));
  };
