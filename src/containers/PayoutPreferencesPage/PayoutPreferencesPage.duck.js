import { omitBy, isUndefined } from 'lodash';
import { fetchCurrentUser, createStripeAccount } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SET_INITIAL_STATE = 'app/PayoutPreferencesPage/SET_INITIAL_STATE';
export const SAVE_PAYOUT_DETAILS_SUCCESS = 'app/PayoutPreferencesPage/SAVE_PAYOUT_DETAILS_SUCCESS';

// ================ Reducer ================ //

const initialState = {
  payoutDetailsSaved: false,
};

export default function payoutPreferencesPageReducer(state = initialState, action = {}) {
  const { type } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return initialState;
    case SAVE_PAYOUT_DETAILS_SUCCESS:
      return { ...state, payoutDetailsSaved: true };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const savePayoutDetailsSuccess = () => ({
  type: SAVE_PAYOUT_DETAILS_SUCCESS,
});

// ================ Thunks ================ //

export const savePayoutDetails = values => (dispatch, getState, sdk) => {
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
    country,
    city,
    addressLine: streetAddress,
    postalCode,
  };
  const params = {
    firstName,
    lastName,
    birthDate,
    bankAccountToken,
    address: omitBy(address, isUndefined),
  };
  return dispatch(createStripeAccount(params)).then(() => dispatch(savePayoutDetailsSuccess()));
};

export const loadData = () => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState());

  return dispatch(fetchCurrentUser());
};
