import { storableError } from '../util/errors';
import * as log from '../util/log';

// ================ Action types ================ //

export const CREATE_STRIPE_CUSTOMER_REQUEST = 'app/stripe/CREATE_STRIPE_CUSTOMER_REQUEST';
export const CREATE_STRIPE_CUSTOMER_SUCCESS = 'app/stripe/CREATE_STRIPE_CUSTOMER_SUCCESS';
export const CREATE_STRIPE_CUSTOMER_ERROR = 'app/stripe/CREATE_STRIPE_CUSTOMER_ERROR';

export const ADD_PAYMENT_METHOD_REQUEST = 'app/stripe/ADD_PAYMENT_METHOD_REQUEST';
export const ADD_PAYMENT_METHOD_SUCCESS = 'app/stripe/ADD_PAYMENT_METHOD_SUCCESS';
export const ADD_PAYMENT_METHOD_ERROR = 'app/stripe/ADD_PAYMENT_METHOD_ERROR';

export const DELETE_PAYMENT_METHOD_REQUEST = 'app/stripe/DELETE_PAYMENT_METHOD_REQUEST';
export const DELETE_PAYMENT_METHOD_SUCCESS = 'app/stripe/DELETE_PAYMENT_METHOD_SUCCESS';
export const DELETE_PAYMENT_METHOD_ERROR = 'app/stripe/DELETE_PAYMENT_METHOD_ERROR';

// ================ Reducer ================ //

const initialState = {
  addPaymentMethodInProgress: null,
  addPaymentMethodError: null,
  deletePaymentMethodInProgress: null,
  deletePaymentMethodError: null,
  createStripeCustomerInProgress: null,
  createStripeCustomerError: null,
  stripeCustomer: null,
};

export default function payoutMethodsPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_STRIPE_CUSTOMER_REQUEST:
      return { ...state, createStripeCustomerError: null, createStripeCustomerInProgress: true };
    case CREATE_STRIPE_CUSTOMER_SUCCESS:
      return {
        ...state,
        createStripeCustomerInProgress: false,
        stripeCustomer: payload,
      };
    case CREATE_STRIPE_CUSTOMER_ERROR:
      console.error(payload);
      return {
        ...state,
        createStripeCustomerError: payload,
        createStripeCustomerInProgress: false,
      };
    case ADD_PAYMENT_METHOD_REQUEST:
      return { ...state, addPaymentMethodError: null, addPaymentMethodInProgress: true };
    case ADD_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        addPaymentMethodInProgress: false,
        stripeCustomer: payload,
      };
    case ADD_PAYMENT_METHOD_ERROR:
      console.error(payload);
      return {
        ...state,
        addPaymentMethodError: payload,
        addPaymentMethodInProgress: false,
      };

    case DELETE_PAYMENT_METHOD_REQUEST:
      return { ...state, deletePaymentMethodError: null, deletePaymentMethodInProgress: true };
    case DELETE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        deletePaymentMethodInProgress: false,
      };
    case DELETE_PAYMENT_METHOD_ERROR:
      console.error(payload);
      return {
        ...state,
        deletePaymentMethodError: payload,
        deletePaymentMethodInProgress: false,
      };
    default:
      return state;
  }
}

// ================ Action creators ================ //

export const stripeCustomerCreateRequest = () => ({ type: CREATE_STRIPE_CUSTOMER_REQUEST });

export const stripeCustomerCreateSuccess = stripeCustomer => ({
  type: CREATE_STRIPE_CUSTOMER_SUCCESS,
  payload: stripeCustomer,
});

export const stripeCustomerCreateError = e => ({
  type: CREATE_STRIPE_CUSTOMER_ERROR,
  payload: e,
  error: true,
});

export const addPaymentMethodRequest = () => ({ type: ADD_PAYMENT_METHOD_REQUEST });

export const addPaymentMethodSuccess = stripeCustomer => ({
  type: ADD_PAYMENT_METHOD_SUCCESS,
  payload: stripeCustomer,
});

export const addPaymentMethodError = e => ({
  type: ADD_PAYMENT_METHOD_ERROR,
  payload: e,
  error: true,
});

export const deletePaymentMethodRequest = () => ({ type: DELETE_PAYMENT_METHOD_REQUEST });

export const deletePaymentMethodSuccess = stripeCustomer => ({
  type: DELETE_PAYMENT_METHOD_SUCCESS,
  payload: stripeCustomer,
});

export const deletePaymentMethodError = e => ({
  type: DELETE_PAYMENT_METHOD_ERROR,
  payload: e,
  error: true,
});

// ================ Thunks ================ //

export const createStripeCustomer = paymentMethod => (dispatch, getState, sdk) => {
  const stripePaymentMethodId = paymentMethod;
  dispatch(stripeCustomerCreateRequest());
  return sdk.stripeCustomer
    .create({ stripePaymentMethodId }, { expand: true, include: ['defaultPaymentMethod'] })
    .then(response => {
      const stripeCustomer = response.data.data;
      dispatch(stripeCustomerCreateSuccess(stripeCustomer));
      return stripeCustomer;
    })
    .catch(e => {
      log.error(storableError(e), 'create-stripe-user-failed');
      dispatch(stripeCustomerCreateError(storableError(e)));
    });
};

export const addPaymentMethod = paymentMethod => (dispatch, getState, sdk) => {
  const stripePaymentMethodId = paymentMethod;

  dispatch(addPaymentMethodRequest());
  return sdk.stripeCustomer
    .addPaymentMethod({ stripePaymentMethodId }, { expand: true })
    .then(response => {
      const stripeCustomer = response.data.data;
      dispatch(addPaymentMethodSuccess(stripeCustomer));
      return stripeCustomer;
    })
    .catch(e => {
      log.error(storableError(e), 'add-payment-method-failed');
      dispatch(addPaymentMethodError(storableError(e)));
    });
};

export const deletePaymentMethod = () => (dispatch, getState, sdk) => {
  dispatch(deletePaymentMethodRequest());
  return sdk.stripeCustomer
    .deletePaymentMethod({}, { expand: true })
    .then(response => {
      const stripeCustomer = response.data.data;
      dispatch(deletePaymentMethodSuccess(stripeCustomer));
      return stripeCustomer;
    })
    .catch(e => {
      log.error(storableError(e), 'add-payment-method-failed');
      dispatch(deletePaymentMethodError(storableError(e)));
    });
};

export const updatePaymentMethod = params => (dispatch, getState, sdk) => {
  return dispatch(deletePaymentMethod())
    .then(() => {
      return dispatch(addPaymentMethod(params));
    })
    .catch(e => {
      log.error(storableError(e), 'updating-payment-method-failed');
    });
};
