import { pick } from 'lodash';
import { updatedEntities, denormalisedEntities } from '../../util/data';
import * as propTypes from '../../util/propTypes';
import { fetchCurrentUserHasOrdersSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/CheckoutPage/SET_INITIAL_VALUES';

export const INITIATE_ORDER_REQUEST = 'app/CheckoutPage/INITIATE_ORDER_REQUEST';
export const INITIATE_ORDER_SUCCESS = 'app/CheckoutPage/INITIATE_ORDER_SUCCESS';
export const INITIATE_ORDER_ERROR = 'app/CheckoutPage/INITIATE_ORDER_ERROR';

export const SPECULATE_TRANSACTION_REQUEST = 'app/ListingPage/SPECULATE_TRANSACTION_REQUEST';
export const SPECULATE_TRANSACTION_SUCCESS = 'app/ListingPage/SPECULATE_TRANSACTION_SUCCESS';
export const SPECULATE_TRANSACTION_ERROR = 'app/ListingPage/SPECULATE_TRANSACTION_ERROR';

// ================ Reducer ================ //

const initialState = {
  listing: null,
  bookingDates: null,
  speculateTransactionInProgress: false,
  speculateTransactionError: null,
  speculatedTransaction: null,
  initiateOrderError: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITAL_VALUES:
      return { ...initialState, ...payload };

    case SPECULATE_TRANSACTION_REQUEST:
      return {
        ...state,
        speculateTransactionInProgress: true,
        speculateTransactionError: null,
        speculatedTransaction: null,
      };
    case SPECULATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        speculateTransactionInProgress: false,
        speculatedTransaction: payload.transaction,
      };
    case SPECULATE_TRANSACTION_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return {
        ...state,
        speculateTransactionInProgress: false,
        speculateTransactionError: payload,
      };

    case INITIATE_ORDER_REQUEST:
      return { ...state, initiateOrderError: null };
    case INITIATE_ORDER_SUCCESS:
      return state;
    case INITIATE_ORDER_ERROR:
      console.error(payload); // eslint-disable-line no-console
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

export const speculateTransactionRequest = () => ({ type: SPECULATE_TRANSACTION_REQUEST });

export const speculateTransactionSuccess = transaction => ({
  type: SPECULATE_TRANSACTION_SUCCESS,
  payload: { transaction },
});

export const speculateTransactionError = e => ({
  type: SPECULATE_TRANSACTION_ERROR,
  error: true,
  payload: e,
});

/* ================ Thunks ================ */

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
        dispatch(fetchCurrentUserHasOrdersSuccess(true));
        return orderId;
      })
      .catch(e => {
        dispatch(initiateOrderError(e));
        throw e;
      });
  };

/**
 * Initiate the speculative transaction with the given booking details
 *
 * The API allows us to do speculative transaction initiation and
 * transitions. This way we can create a test transaction and get the
 * actual pricing information as if the transaction had been started,
 * without affecting the actual data.
 *
 * We store this speculative transaction in the page store and use the
 * pricing info for the booking breakdown to get a proper estimate for
 * the price with the chosen information.
 */
export const speculateTransaction = (listingId, bookingStart, bookingEnd) =>
  (dispatch, getState, sdk) => {
    dispatch(speculateTransactionRequest());
    const bodyParams = {
      transition: propTypes.TX_TRANSITION_PREAUTHORIZE,
      params: {
        listingId,
        bookingStart,
        bookingEnd,
        cardToken: 'CheckoutPage_speculative_card_token',
      },
    };
    const queryParams = {
      include: ['booking', 'provider'],
      expand: true,
    };
    return sdk.transactions
      .initiateSpeculative(bodyParams, queryParams)
      .then(response => {
        const transactionId = response.data.data.id;
        const entities = updatedEntities({}, response.data);
        const denormalised = denormalisedEntities(entities, 'transaction', [transactionId]);
        const tx = denormalised[0];
        dispatch(speculateTransactionSuccess(tx));
      })
      .catch(e => dispatch(speculateTransactionError(e)));
  };
