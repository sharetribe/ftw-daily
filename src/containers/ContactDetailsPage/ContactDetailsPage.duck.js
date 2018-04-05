import merge from 'lodash/merge';
import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SAVE_CONTACT_DETAILS_REQUEST = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_REQUEST';
export const SAVE_CONTACT_DETAILS_SUCCESS = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_SUCCESS';
export const SAVE_EMAIL_ERROR = 'app/ContactDetailsPage/SAVE_EMAIL_ERROR';
export const SAVE_PHONE_NUMBER_ERROR = 'app/ContactDetailsPage/SAVE_PHONE_NUMBER_ERROR';

export const SAVE_CONTACT_DETAILS_CLEAR = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_CLEAR';

// ================ Reducer ================ //

const initialState = {
  saveEmailError: null,
  savePhoneNumberError: null,
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
    case SAVE_EMAIL_ERROR:
      return { ...state, saveContactDetailsInProgress: false, saveEmailError: payload };
    case SAVE_PHONE_NUMBER_ERROR:
      return { ...state, saveContactDetailsInProgress: false, savePhoneNumberError: payload };

    case SAVE_CONTACT_DETAILS_CLEAR:
      return {
        ...state,
        saveContactDetailsInProgress: false,
        saveEmailError: null,
        savePhoneNumberError: null,
        contactDetailsChanged: false,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const saveContactDetailsRequest = () => ({ type: SAVE_CONTACT_DETAILS_REQUEST });
export const saveContactDetailsSuccess = () => ({ type: SAVE_CONTACT_DETAILS_SUCCESS });
export const saveEmailError = error => ({
  type: SAVE_EMAIL_ERROR,
  payload: error,
  error: true,
});
export const savePhoneNumberError = error => ({
  type: SAVE_PHONE_NUMBER_ERROR,
  payload: error,
  error: true,
});

export const saveContactDetailsClear = () => ({ type: SAVE_CONTACT_DETAILS_CLEAR });

// ================ Thunks ================ //

/**
 * Make a phone number update request to the API and return the current user.
 */
const requestSavePhoneNumber = params => (dispatch, getState, sdk) => {
  const phoneNumber = params.phoneNumber;

  return sdk.currentUser
    .updateProfile({ protectedData: { phoneNumber } }, { expand: true })
    .then(response => {
      // return user
      return response.data.data;
    })
    .catch(e => {
      dispatch(savePhoneNumberError(storableError(e)));
      // pass the same error so that the SAVE_CONTACT_DETAILS_SUCCESS
      // action will not be fired
      throw e;
    });
};

/**
 * Make a email update request to the API and return the current user.
 */
const requestSaveEmail = params => (dispatch, getState, sdk) => {
  const { email, currentPassword } = params;

  return sdk.currentUser
    .changeEmail({ email, currentPassword }, { expand: true })
    .then(response => {
      // return user
      return response.data.data;
    })
    .catch(e => {
      dispatch(saveEmailError(storableError(e)));
      // pass the same error so that the SAVE_CONTACT_DETAILS_SUCCESS
      // action will not be fired
      throw e;
    });
};

/**
 * Save email and update the current user.
 */
export const saveEmail = params => (dispatch, getState, sdk) => {
  dispatch(saveContactDetailsRequest());

  return (
    dispatch(requestSaveEmail(params))
      .then(user => {
        dispatch(currentUserShowSuccess(user));
        dispatch(saveContactDetailsSuccess());
      })
      // error action dispatched in requestSaveEmail
      .catch(e => null)
  );
};

/**
 * Save phone number and update the current user.
 */
export const savePhoneNumber = params => (dispatch, getState, sdk) => {
  dispatch(saveContactDetailsRequest());

  return (
    dispatch(requestSavePhoneNumber(params))
      .then(user => {
        dispatch(currentUserShowSuccess(user));
        dispatch(saveContactDetailsSuccess());
      })
      // error action dispatched in requestSavePhoneNumber
      .catch(e => null)
  );
};

/**
 * Save email and phone number and update the current user.
 */
export const saveContactDetails = params => (dispatch, getState, sdk) => {
  dispatch(saveContactDetailsRequest());
  const { email, phoneNumber, currentPassword } = params;

  // order of promises: 1. email, 2. phone number
  const promises = [
    dispatch(requestSaveEmail({ email, currentPassword })),
    dispatch(requestSavePhoneNumber({ phoneNumber })),
  ];

  return Promise.all(promises)
    .then(values => {
      // Array of two user objects is resolved
      // the first one is from the email update
      // the second one is from the phone number update

      const saveEmailUser = values[0];
      const savePhoneNumberUser = values[1];

      // merge the protected data from the user object returned
      // by the phone update operation
      const protectedData = savePhoneNumberUser.attributes.profile.protectedData;
      const phoneNumberMergeSource = { attributes: { profile: { protectedData } } };

      const currentUser = merge(saveEmailUser, phoneNumberMergeSource);
      dispatch(currentUserShowSuccess(currentUser));
      dispatch(saveContactDetailsSuccess());
    })
    .catch(e => null);
};
