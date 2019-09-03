import pick from 'lodash/pick';
import { storableError } from '../util/errors';
import * as log from '../util/log';

// ================ Action types ================ //

export const SET_INITIAL_VALUES = 'app/paymentMethods/SET_INITIAL_VALUES';

export const CREATE_STRIPE_CUSTOMER_REQUEST = 'app/paymentMethods/CREATE_STRIPE_CUSTOMER_REQUEST';
export const CREATE_STRIPE_CUSTOMER_SUCCESS = 'app/paymentMethods/CREATE_STRIPE_CUSTOMER_SUCCESS';
export const CREATE_STRIPE_CUSTOMER_ERROR = 'app/paymentMethods/CREATE_STRIPE_CUSTOMER_ERROR';

export const ADD_PAYMENT_METHOD_REQUEST = 'app/paymentMethods/ADD_PAYMENT_METHOD_REQUEST';
export const ADD_PAYMENT_METHOD_SUCCESS = 'app/paymentMethods/ADD_PAYMENT_METHOD_SUCCESS';
export const ADD_PAYMENT_METHOD_ERROR = 'app/paymentMethods/ADD_PAYMENT_METHOD_ERROR';

export const DELETE_PAYMENT_METHOD_REQUEST = 'app/paymentMethods/DELETE_PAYMENT_METHOD_REQUEST';
export const DELETE_PAYMENT_METHOD_SUCCESS = 'app/paymentMethods/DELETE_PAYMENT_METHOD_SUCCESS';
export const DELETE_PAYMENT_METHOD_ERROR = 'app/paymentMethods/DELETE_PAYMENT_METHOD_ERROR';

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
    case SET_INITIAL_VALUES:
      return { ...initialState, ...payload };
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

export const setInitialValues = initialValues => ({
  type: SET_INITIAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

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

export const createStripeCustomer = stripePaymentMethodId => (dispatch, getState, sdk) => {
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

export const addPaymentMethod = stripePaymentMethodId => (dispatch, getState, sdk) => {
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

export const updatePaymentMethod = stripePaymentMethodId => (dispatch, getState, sdk) => {
  return dispatch(deletePaymentMethod())
    .then(() => {
      return dispatch(addPaymentMethod(stripePaymentMethodId));
    })
    .catch(e => {
      log.error(storableError(e), 'updating-payment-method-failed');
    });
};

// This function helps to choose correct thunk function
export const savePaymentMethod = (stripeCustomer, stripePaymentMethodId) => (
  dispatch,
  getState,
  sdk
) => {
  const hasAlreadyDefaultPaymentMethod =
    stripeCustomer && stripeCustomer.defaultPaymentMethod && stripeCustomer.defaultPaymentMethod.id;

  const savePromise =
    !stripeCustomer || !stripeCustomer.id
      ? dispatch(createStripeCustomer(stripePaymentMethodId))
      : hasAlreadyDefaultPaymentMethod
      ? dispatch(updatePaymentMethod(stripePaymentMethodId))
      : dispatch(addPaymentMethod(stripePaymentMethodId));

  return savePromise
    .then(response => {
      const {
        createStripeCustomerError,
        addPaymentMethodError,
        deletePaymentMethodError,
      } = getState().paymentMethods;

      // If there are any errors, return those errors
      if (createStripeCustomerError || addPaymentMethodError || deletePaymentMethodError) {
        return {
          errors: { createStripeCustomerError, addPaymentMethodError, deletePaymentMethodError },
        };
      }
      return response;
    })
    .catch(e => {
      // errors are already catched in other thunk functions.
    });
};
