import { pick } from 'lodash';

// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/CheckoutPage/SET_INITIAL_VALUES';

export const INITIATE_ORDER_REQUEST = 'app/CheckoutPage/INITIATE_ORDER_REQUEST';
export const INITIATE_ORDER_SUCCESS = 'app/CheckoutPage/INITIATE_ORDER_SUCCESS';
export const INITIATE_ORDER_ERROR = 'app/CheckoutPage/INITIATE_ORDER_ERROR';

// ================ Reducer ================ //

const initialState = {
  bookingDates: null,
  initiateOrderError: null,
  listing: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITAL_VALUES:
      return { ...state, ...payload };
    case INITIATE_ORDER_REQUEST:
      return { ...state, initiateOrderError: null };
    case INITIATE_ORDER_SUCCESS:
      return state;
    case INITIATE_ORDER_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, initiateOrderError: payload };
    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const setInitialValues = initialValues => ({
  type: SET_INITAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const initiateOrderRequest = () => ({ type: INITIATE_ORDER_REQUEST });

const initiateOrderSuccess = orderId => ({
  type: INITIATE_ORDER_SUCCESS,
  payload: orderId,
});

const initiateOrderError = e => ({
  type: INITIATE_ORDER_ERROR,
  error: true,
  payload: e,
});

export const initiateOrder = params =>
  (dispatch, getState, sdk) => {
    dispatch(initiateOrderRequest());
    const bodyParams = {
      transition: 'transition/preauthorize',
      params,
    };
    return sdk.transactions
      .initiate(bodyParams)
      .then(response => {
        const orderId = response.data.data.id;
        dispatch(initiateOrderSuccess(orderId));
        return orderId;
      })
      .catch(e => {
        dispatch(initiateOrderError(e));
        throw e;
      });
  };
