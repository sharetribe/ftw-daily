import pick from 'lodash/pick';
import {
  createStripeAccount,
  updateStripeAccount,
  fetchStripeAccount,
} from '../../ducks/stripeConnectAccount.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SET_INITIAL_VALUES = 'app/StripePayoutPage/SET_INITIAL_VALUES';
export const SAVE_PAYOUT_DETAILS_REQUEST = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_REQUEST';
export const SAVE_PAYOUT_DETAILS_SUCCESS = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_SUCCESS';
export const SAVE_PAYOUT_DETAILS_ERROR = 'app/StripePayoutPage/SAVE_PAYOUT_DETAILS_ERROR';

// ================ Reducer ================ //

const initialState = {
  payoutDetailsSaveInProgress: false,
  payoutDetailsSaved: false,
  fromReturnURL: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_VALUES:
      return { ...initialState, ...payload };

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

export const setInitialValues = initialValues => ({
  type: SET_INITIAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
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

export const savePayoutDetails = (values, isUpdateCall) => (dispatch, getState, sdk) => {
  const upsertThunk = isUpdateCall ? updateStripeAccount : createStripeAccount;
  dispatch(savePayoutDetailsRequest());

  return dispatch(upsertThunk(values, { expand: true }))
    .then(response => {
      dispatch(savePayoutDetailsSuccess());
      return response;
    })
    .catch(() => dispatch(savePayoutDetailsError()));
};

export const loadData = () => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialValues());

  return dispatch(fetchCurrentUser()).then(response => {
    const currentUser = getState().user.currentUser;
    if (currentUser && currentUser.stripeAccount) {
      dispatch(fetchStripeAccount());
    }
    return response;
  });
};
