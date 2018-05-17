import { omitBy, isUndefined } from 'lodash';
import { fetchCurrentUser, createStripeAccount } from '../../ducks/user.duck';
import config from '../../config';

// ================ Action types ================ //

export const SET_INITIAL_STATE = 'app/PayoutPreferencesPage/SET_INITIAL_STATE';
export const SAVE_PAYOUT_DETAILS_REQUEST = 'app/PayoutPreferencesPage/SAVE_PAYOUT_DETAILS_REQUEST';
export const SAVE_PAYOUT_DETAILS_SUCCESS = 'app/PayoutPreferencesPage/SAVE_PAYOUT_DETAILS_SUCCESS';
export const SAVE_PAYOUT_DETAILS_ERROR = 'app/PayoutPreferencesPage/SAVE_PAYOUT_DETAILS_ERROR';

// ================ Reducer ================ //

const initialState = {
  payoutDetailsSaveInProgress: false,
  payoutDetailsSaved: false,
};

export default function payoutPreferencesPageReducer(state = initialState, action = {}) {
  const { type } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return initialState;

    case SAVE_PAYOUT_DETAILS_REQUEST:
      return { ...state, payoutDetailsSaveInProgress: true };
    case SAVE_PAYOUT_DETAILS_ERROR:
      return { ...state, payoutDetailsSaveInProgress: false };
    case SAVE_PAYOUT_DETAILS_SUCCESS:
      return { ...state, payoutDetailsSaveInProgress: false, payoutDetailsSaved: true };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const savePayoutDetailsRequest = () => ({
  type: SAVE_PAYOUT_DETAILS_REQUEST,
});
export const savePayoutDetailsError = () => ({
  type: SAVE_PAYOUT_DETAILS_ERROR,
});
export const savePayoutDetailsSuccess = () => ({
  type: SAVE_PAYOUT_DETAILS_SUCCESS,
});

// ================ Thunks ================ //

export const savePayoutDetails = values => (dispatch, getState, sdk) => {
  if (typeof window === 'undefined' || !window.Stripe) {
    throw new Error('Stripe must be loaded for submitting PayoutPreferences');
  }

  const stripe = window.Stripe(config.stripe.publishableKey);

  dispatch(savePayoutDetailsRequest());
  const {
    firstName,
    lastName,
    birthDate,
    country,
    streetAddress,
    postalCode,
    city,
    bankAccountToken,
  } = values;

  const address = {
    city,
    line1: streetAddress,
    postal_code: postalCode,
  };

  // Params for Stripe SDK
  const params = {
    legal_entity: {
      first_name: firstName,
      last_name: lastName,
      address: omitBy(address, isUndefined),
      dob: birthDate,
    },
    tos_shown_and_accepted: true,
  };

  return stripe
    .createToken('account', params)
    .then(response => {
      const accountToken = response.token.id;
      return dispatch(createStripeAccount({ accountToken, bankAccountToken, country }));
    })
    .then(() => dispatch(savePayoutDetailsSuccess()))
    .catch(e => dispatch(savePayoutDetailsError()));
};

export const loadData = () => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState());

  return dispatch(fetchCurrentUser());
};
