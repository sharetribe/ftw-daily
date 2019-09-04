import { fetchCurrentUser } from '../../ducks/user.duck';
import { setInitialValues as setInitialValuesForPaymentMethods } from '../../ducks/paymentMethods.duck';
import { storableError } from '../../util/errors';
import * as log from '../../util/log';

// ================ Action types ================ //

export const SETUP_INTENT_REQUEST = 'app/PaymentMethodsPage/SETUP_INTENT_REQUEST';
export const SETUP_INTENT_SUCCESS = 'app/PaymentMethodsPage/SETUP_INTENT_SUCCESS';
export const SETUP_INTENT_ERROR = 'app/PaymentMethodsPage/SETUP_INTENT_ERROR';

export const STRIPE_CUSTOMER_REQUEST = 'app/PaymentMethodsPage/STRIPE_CUSTOMER_REQUEST';
export const STRIPE_CUSTOMER_SUCCESS = 'app/PaymentMethodsPage/STRIPE_CUSTOMER_SUCCESS';
export const STRIPE_CUSTOMER_ERROR = 'app/PaymentMethodsPage/STRIPE_CUSTOMER_ERROR';

// ================ Reducer ================ //

const initialState = {
  setupIntentInProgress: false,
  setupIntentError: null,
  setupIntent: null,
  stripeCustomerFetched: false,
};

export default function payoutMethodsPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SETUP_INTENT_REQUEST:
      return { ...state, setupIntentInProgress: true, setupIntentError: null };
    case SETUP_INTENT_SUCCESS:
      return {
        ...state,
        setupIntentInProgress: false,
        setupIntentError: null,
        setupIntent: payload,
      };
    case SETUP_INTENT_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return { ...state, setupIntentInProgress: false, setupIntentError: null };
    case STRIPE_CUSTOMER_REQUEST:
      return { ...state, stripeCustomerFetched: false };
    case STRIPE_CUSTOMER_SUCCESS:
      return { ...state, stripeCustomerFetched: true };
    case STRIPE_CUSTOMER_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return { ...state, stripeCustomerFetchError: payload };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setupIntentRequest = () => ({ type: SETUP_INTENT_REQUEST });
export const setupIntentSuccess = () => ({ type: SETUP_INTENT_SUCCESS });
export const setupIntentError = e => ({
  type: SETUP_INTENT_ERROR,
  error: true,
  payload: e,
});

export const stripeCustomerRequest = () => ({ type: STRIPE_CUSTOMER_REQUEST });
export const stripeCustomerSuccess = () => ({ type: STRIPE_CUSTOMER_SUCCESS });
export const stripeCustomerError = e => ({
  type: STRIPE_CUSTOMER_ERROR,
  error: true,
  payload: e,
});
// ================ Thunks ================ //

export const createStripeSetupIntent = () => (dispatch, getState, sdk) => {
  dispatch(setupIntentRequest());
  return sdk.stripeSetupIntents
    .create()
    .then(response => {
      const setupIntent = response.data.data;
      dispatch(setupIntentSuccess(setupIntent));
      return setupIntent;
    })
    .catch(e => {
      const error = storableError(e);
      log.error(error, 'create-setup-intent-failed');
      dispatch(setupIntentError(error));
      return { createStripeSetupIntentSuccess: false };
    });
};

export const stripeCustomer = () => (dispatch, getState, sdk) => {
  dispatch(stripeCustomerRequest());

  return dispatch(fetchCurrentUser({ include: ['stripeCustomer.defaultPaymentMethod'] }))
    .then(response => {
      dispatch(stripeCustomerSuccess());
    })
    .catch(e => {
      const error = storableError(e);
      log.error(error, 'fetch-stripe-customer-failed');
      dispatch(stripeCustomerError(error));
    });
};

export const loadData = () => (dispatch, getState, sdk) => {
  dispatch(setInitialValuesForPaymentMethods());

  return dispatch(stripeCustomer());
};
