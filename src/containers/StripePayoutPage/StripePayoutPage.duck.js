import {
  createStripeAccount,
} from '../../ducks/stripeConnectAccount.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SET_INITIAL_STATE = 'app/StripePayoutPage/SET_INITIAL_STATE';
export const SAVE_PAYOUT_DETAILS_REQUEST = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_REQUEST';
export const SAVE_PAYOUT_DETAILS_SUCCESS = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_SUCCESS';
export const SAVE_PAYOUT_DETAILS_ERROR = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_ERROR';

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
  dispatch(savePayoutDetailsRequest());

  return dispatch(createStripeAccount(values))
    .then(() => dispatch(savePayoutDetailsSuccess()))
    .catch(() => dispatch(savePayoutDetailsError()));
};

export const loadData = () => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState());

  return dispatch(fetchCurrentUser());
};
