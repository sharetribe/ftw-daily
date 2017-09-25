import { currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const CHANGE_EMAIL_REQUEST = 'app/ContactDetailsPage/CHANGE_EMAIL_REQUEST';
export const CHANGE_EMAIL_SUCCESS = 'app/ContactDetailsPage/CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_ERROR = 'app/ContactDetailsPage/CHANGE_EMAIL_ERROR';

export const CHANGE_EMAIL_CLEAR = 'app/ContactDetailsPage/CHANGE_EMAIL_CLEAR';

// ================ Reducer ================ //

const initialState = {
  changeEmailError: null,
  changeEmailInProgress: false,
  emailChanged: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_EMAIL_REQUEST:
      return { ...state, changeEmailInProgress: true, changeEmailError: null, emailChanged: false };
    case CHANGE_EMAIL_SUCCESS:
      return { ...state, changeEmailInProgress: false, emailChanged: true };
    case CHANGE_EMAIL_ERROR:
      return { ...state, changeEmailInProgress: false, changeEmailError: payload };

    case CHANGE_EMAIL_CLEAR:
      return {
        ...state,
        changeEmailInProgress: false,
        changeEmailError: null,
        emailChanged: false,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const changeEmailRequest = () => ({ type: CHANGE_EMAIL_REQUEST });
export const changeEmailSuccess = () => ({ type: CHANGE_EMAIL_SUCCESS });
export const changeEmailError = error => ({
  type: CHANGE_EMAIL_ERROR,
  payload: error,
  error: true,
});

export const changeEmailClear = () => ({ type: CHANGE_EMAIL_CLEAR });

// ================ Thunks ================ //

export const changeEmail = params =>
  (dispatch, getState, sdk) => {
    dispatch(changeEmailRequest());
    const { email, currentPassword } = params;

    return sdk.currentUser
      .changeEmail({ email, currentPassword }, { expand: true })
      .then(response => {
        const currentUser = response.data.data;
        dispatch(changeEmailSuccess());
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(changeEmailError(e)));
  };
