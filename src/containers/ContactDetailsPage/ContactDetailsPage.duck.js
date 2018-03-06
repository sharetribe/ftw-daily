import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SAVE_CONTACT_DETAILS_REQUEST = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_REQUEST';
export const SAVE_CONTACT_DETAILS_SUCCESS = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_SUCCESS';
export const SAVE_CONTACT_DETAILS_ERROR = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_ERROR';

export const SAVE_CONTACT_DETAILS_CLEAR = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_CLEAR';

// ================ Reducer ================ //

const initialState = {
  saveContactDetailsError: null,
  saveContactDetailsInProgress: false,
  contactDetailsChanged: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_CONTACT_DETAILS_REQUEST:
      return {
        ...state,
        saveContactDetailsInProgress: true,
        saveContactDetailsError: null,
        contactDetailsChanged: false,
      };
    case SAVE_CONTACT_DETAILS_SUCCESS:
      return { ...state, saveContactDetailsInProgress: false, contactDetailsChanged: true };
    case SAVE_CONTACT_DETAILS_ERROR:
      return { ...state, saveContactDetailsInProgress: false, saveContactDetailsError: payload };

    case SAVE_CONTACT_DETAILS_CLEAR:
      return {
        ...state,
        saveContactDetailsInProgress: false,
        saveContactDetailsError: null,
        contactDetailsChanged: false,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const saveContactDetailsRequest = () => ({ type: SAVE_CONTACT_DETAILS_REQUEST });
export const saveContactDetailsSuccess = () => ({ type: SAVE_CONTACT_DETAILS_SUCCESS });
export const saveContactDetailsError = error => ({
  type: SAVE_CONTACT_DETAILS_ERROR,
  payload: error,
  error: true,
});

export const saveContactDetailsClear = () => ({ type: SAVE_CONTACT_DETAILS_CLEAR });

// ================ Thunks ================ //

export const saveContactDetails = params => (dispatch, getState, sdk) => {
  dispatch(saveContactDetailsRequest());
  const { email, currentPassword } = params;

  return sdk.currentUser
    .changeEmail({ email, currentPassword }, { expand: true })
    .then(response => {
      const currentUser = response.data.data;
      dispatch(saveContactDetailsSuccess());
      dispatch(currentUserShowSuccess(currentUser));
    })
    .catch(e => dispatch(saveContactDetailsError(storableError(e))));
};
