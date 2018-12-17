import pick from 'lodash/pick';
import config from '../../config';
import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { TRANSITION_REQUEST, TRANSITION_REQUEST_AFTER_ENQUIRY } from '../../util/types';
import * as log from '../../util/log';
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
  bookingData: null,
  bookingDates: null,
  speculateTransactionInProgress: false,
  speculateTransactionError: null,
  speculatedTransaction: null,
  enquiredTransaction: null,
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

export const initiateOrder = (orderParams, initialMessage) => (dispatch, getState, sdk) => {
  dispatch(initiateOrderRequest());
  const bodyParams = {
    transition: TRANSITION_REQUEST,
    processAlias: config.bookingProcessAlias,
    params: orderParams,
  };
  return sdk.transactions
    .initiate(bodyParams)
    .then(response => {
      const orderId = response.data.data.id;
      dispatch(initiateOrderSuccess(orderId));
      dispatch(fetchCurrentUserHasOrdersSuccess(true));

      if (initialMessage) {
        return sdk.messages
          .send({ transactionId: orderId, content: initialMessage })
          .then(() => {
            return { orderId, initialMessageSuccess: true };
          })
          .catch(e => {
            log.error(e, 'initial-message-send-failed', { txId: orderId });
            return { orderId, initialMessageSuccess: false };
          });
      } else {
        return Promise.resolve({ orderId, initialMessageSuccess: true });
      }
    })
    .catch(e => {
      dispatch(initiateOrderError(storableError(e)));
      log.error(e, 'initiate-order-failed', {
        listingId: orderParams.listingId.uuid,
        bookingStart: orderParams.bookingStart,
        bookingEnd: orderParams.bookingEnd,
      });
      throw e;
    });
};

/**
 * Initiate an order after an enquiry. Transitions previously created transaction.
 */
export const initiateOrderAfterEnquiry = (transactionId, orderParams) => (
  dispatch,
  getState,
  sdk
) => {
  dispatch(initiateOrderRequest());

  const bodyParams = {
    id: transactionId,
    transition: TRANSITION_REQUEST_AFTER_ENQUIRY,
    params: orderParams,
  };

  return sdk.transactions
    .transition(bodyParams)
    .then(response => {
      const orderId = response.data.data.id;
      dispatch(initiateOrderSuccess(orderId));
      dispatch(fetchCurrentUserHasOrdersSuccess(true));
      // set initialMessageSuccess to true to unify promise handling with initiateOrder
      return Promise.resolve({ orderId, initialMessageSuccess: true });
    })
    .catch(e => {
      dispatch(initiateOrderError(storableError(e)));
      log.error(e, 'initiate-order-failed', {
        transactionId: transactionId.uuid,
        listingId: orderParams.listingId.uuid,
        bookingStart: orderParams.bookingStart,
        bookingEnd: orderParams.bookingEnd,
      });
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
export const speculateTransaction = params => (dispatch, getState, sdk) => {
  dispatch(speculateTransactionRequest());
  const bodyParams = {
    transition: TRANSITION_REQUEST,
    processAlias: config.bookingProcessAlias,
    params: {
      ...params,
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
      const entities = denormalisedResponseEntities(response);
      if (entities.length !== 1) {
        throw new Error('Expected a resource in the sdk.transactions.initiateSpeculative response');
      }
      const tx = entities[0];
      dispatch(speculateTransactionSuccess(tx));
    })
    .catch(e => {
      const { listingId, bookingStart, bookingEnd } = params;
      log.error(e, 'speculate-transaction-failed', {
        listingId: listingId.uuid,
        bookingStart,
        bookingEnd,
      });
      return dispatch(speculateTransactionError(storableError(e)));
    });
};
