import pick from 'lodash/pick';
import config from '../../config';
import { denormalisedResponseEntities } from '../../util/data';
import { daysBetween } from '../../util/dates';
import { storableError } from '../../util/errors';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  TRANSITION_REQUEST_PAYMENT,
  TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
  TRANSITION_CONFIRM_PAYMENT,
  TRANSITION_INITIATE_GHOST_BOOKING
} from '../../util/transaction';
import * as log from '../../util/log';
import { fetchCurrentUserHasOrdersSuccess, fetchCurrentUser } from '../../ducks/user.duck';

const { Money } = sdkTypes;


// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/CheckoutPage/SET_INITIAL_VALUES';

export const INITIATE_ORDER_REQUEST = 'app/CheckoutPage/INITIATE_ORDER_REQUEST';
export const INITIATE_ORDER_SUCCESS = 'app/CheckoutPage/INITIATE_ORDER_SUCCESS';
export const INITIATE_ORDER_ERROR = 'app/CheckoutPage/INITIATE_ORDER_ERROR';

export const CONFIRM_PAYMENT_REQUEST = 'app/CheckoutPage/CONFIRM_PAYMENT_REQUEST';
export const CONFIRM_PAYMENT_SUCCESS = 'app/CheckoutPage/CONFIRM_PAYMENT_SUCCESS';
export const CONFIRM_PAYMENT_ERROR = 'app/CheckoutPage/CONFIRM_PAYMENT_ERROR';

export const SPECULATE_TRANSACTION_REQUEST = 'app/ListingPage/SPECULATE_TRANSACTION_REQUEST';
export const SPECULATE_TRANSACTION_SUCCESS = 'app/ListingPage/SPECULATE_TRANSACTION_SUCCESS';
export const SPECULATE_TRANSACTION_ERROR = 'app/ListingPage/SPECULATE_TRANSACTION_ERROR';

export const STRIPE_CUSTOMER_REQUEST = 'app/CheckoutPage/STRIPE_CUSTOMER_REQUEST';
export const STRIPE_CUSTOMER_SUCCESS = 'app/CheckoutPage/STRIPE_CUSTOMER_SUCCESS';
export const STRIPE_CUSTOMER_ERROR = 'app/CheckoutPage/STRIPE_CUSTOMER_ERROR';

// ================ Reducer ================ //

const initialState = {
  listing: null,
  bookingData: null,
  bookingDates: null,
  speculateTransactionInProgress: false,
  speculateTransactionError: null,
  speculatedTransaction: null,
  transaction: null,
  initiateOrderError: null,
  confirmPaymentError: null,
  stripeCustomerFetched: false,
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
      return { ...state, transaction: payload };
    case INITIATE_ORDER_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return { ...state, initiateOrderError: payload };

    case CONFIRM_PAYMENT_REQUEST:
      return { ...state, confirmPaymentError: null };
    case CONFIRM_PAYMENT_SUCCESS:
      return state;
    case CONFIRM_PAYMENT_ERROR:
      console.error(payload); // eslint-disable-line no-console
      return { ...state, confirmPaymentError: payload };

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

// ================ Selectors ================ //
const getLinkedTransactionId = state => {
  const pageState = state.CheckoutPage;
  const transaction = pageState.speculateTransactionInProgress
    ? pageState.speculatedTransaction
    : pageState.transaction;

  if (!transaction || !transaction.attributes || !transaction.attributes.protectedData) return null;

  return transaction.attributes.protectedData.linkedProcessId;
};

// ================ Action creators ================ //

export const setInitialValues = initialValues => ({
  type: SET_INITAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const initiateOrderRequest = () => ({ type: INITIATE_ORDER_REQUEST });

const initiateOrderSuccess = order => ({
  type: INITIATE_ORDER_SUCCESS,
  payload: order,
});

const initiateOrderError = e => ({
  type: INITIATE_ORDER_ERROR,
  error: true,
  payload: e,
});

const confirmPaymentRequest = () => ({ type: CONFIRM_PAYMENT_REQUEST });

const confirmPaymentSuccess = orderId => ({
  type: CONFIRM_PAYMENT_SUCCESS,
  payload: orderId,
});

const confirmPaymentError = e => ({
  type: CONFIRM_PAYMENT_ERROR,
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

export const stripeCustomerRequest = () => ({ type: STRIPE_CUSTOMER_REQUEST });
export const stripeCustomerSuccess = () => ({ type: STRIPE_CUSTOMER_SUCCESS });
export const stripeCustomerError = e => ({
  type: STRIPE_CUSTOMER_ERROR,
  error: true,
  payload: e,
});

/* ================ Thunks ================ */


export const confirmPayment = orderParams => (dispatch, getState, sdk) => {
  dispatch(confirmPaymentRequest());

  const bodyParams = {
    id: orderParams.transactionId,
    transition: TRANSITION_CONFIRM_PAYMENT,
    params: {},
  };

  return sdk.transactions
    .transition(bodyParams)
    .then(response => {
      const order = response.data.data;
      dispatch(confirmPaymentSuccess(order.id));
      return order;
    })
    .catch(e => {
      dispatch(confirmPaymentError(storableError(e)));
      const transactionIdMaybe = orderParams.transactionId
        ? { transactionId: orderParams.transactionId.uuid }
        : {};
      log.error(e, 'initiate-order-failed', {
        ...transactionIdMaybe,
      });
      throw e;
    });
};

// Divide amounts by 2
const formatLineItems = orderParams => {
  const lineItems = orderParams.lineItems.map(i => {
    i.unitPrice = new Money(i.unitPrice.amount / 2, i.unitPrice.currency)
    return i
  });

  return lineItems;
}

export const initiateOrder = (orderParams, transactionId) => async (dispatch, getState, sdk) => {
  dispatch(initiateOrderRequest());
  const bodyParams = transactionId
    ? {
        id: transactionId,
        transition: TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
        params: orderParams,
      }
    : {
        processAlias: config.bookingProcessAliases[0],
        transition: TRANSITION_REQUEST_PAYMENT,
        params: orderParams,
      };
  const queryParams = {
    include: ['booking', 'provider'],
    expand: true,
  };

  const createOrder = transactionId ? sdk.transactions.transition : sdk.transactions.initiate;

  // Initiate second transaction if more than 14 days to check-in
  const splitPayment = shouldSplitPayment(orderParams.bookingStart);
  if (splitPayment) {

    // Split price in 2
    bodyParams.params = {
      ...bodyParams.params,
      lineItems: formatLineItems(orderParams),
    }

    const txSecondPayment = await initiateSecondPayment(orderParams, sdk);

    // Link processes by adding the id of process #2 to process #1
    bodyParams.params = {
      ...bodyParams.params,
      protectedData: {
        linkedProcessId: txSecondPayment.id.uuid
      }
    }
  }

  return createOrder(bodyParams, queryParams)
    .then(response => {
      const entities = denormalisedResponseEntities(response);
      const order = entities[0];
      dispatch(initiateOrderSuccess(order));
      dispatch(fetchCurrentUserHasOrdersSuccess(true));
      return order;
    })
    .catch(e => {
      dispatch(initiateOrderError(storableError(e)));
      const transactionIdMaybe = transactionId ? { transactionId: transactionId.uuid } : {};
      log.error(e, 'initiate-order-failed', {
        ...transactionIdMaybe,
        listingId: orderParams.listingId.uuid,
        bookingStart: orderParams.bookingStart,
        bookingEnd: orderParams.bookingEnd,
      });
      throw e;
    });

};

const shouldSplitPayment = bookingStart => {
  const daysUntilStart = daysBetween(new Date(), bookingStart);
  return daysUntilStart >= config.splitPaymentCapDays;
}

const initiateSecondPayment = (orderParams, sdk) => {
  const bodyParams = {
    processAlias: config.bookingProcessAliases[1],
    transition: TRANSITION_INITIATE_GHOST_BOOKING,
    params: orderParams,
  };

  const queryParams = {
    include: ['booking', 'provider'],
    expand: true,
  };

  return sdk.transactions
    .initiate(bodyParams, queryParams)
    .then(response => {
      const entities = denormalisedResponseEntities(response);
      const tx = entities[0];
      return tx;
    })
    .catch(e => {
      throw e
    });
};

export const sendMessage = params => (dispatch, getState, sdk) => {
  const message = params.message;
  const orderId = params.id;

  if (message) {
    return sdk.messages
      .send({ transactionId: orderId, content: message })
      .then(() => {
        return { orderId, messageSuccess: true };
      })
      .catch(e => {
        log.error(e, 'initial-message-send-failed', { txId: orderId });
        return { orderId, messageSuccess: false };
      });
  } else {
    return Promise.resolve({ orderId, messageSuccess: true });
  }
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

const initSpeculativeTransaction = (processAlias, params, sdk) => {
  const transition = processAlias === config.bookingProcessAliases[0]
    ? TRANSITION_REQUEST_PAYMENT
    : TRANSITION_INITIATE_GHOST_BOOKING

  const bodyParams = {
    transition,
    processAlias,
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
      return tx;
    });
};

export const speculateTransaction = params => (dispatch, getState, sdk) => {
  dispatch(speculateTransactionRequest());
  const { listingId, bookingStart, bookingEnd } = params;
  const aliasDueNow = config.bookingProcessAliases[0];
  const aliasDueLater = config.bookingProcessAliases[1];
  const splitPayment = shouldSplitPayment(bookingStart);

  if (!splitPayment) {
    return initSpeculativeTransaction(aliasDueNow, params, sdk).then(txNow => {
      dispatch(speculateTransactionSuccess(txNow));
    }).catch(e => {
      log.error(e, 'speculate-transaction-failed', {
        listingId: listingId.uuid,
        bookingStart,
        bookingEnd,
      });
      dispatch(speculateTransactionError(storableError(e)));
    });
  }

  const processDueLater = initSpeculativeTransaction(aliasDueLater, params, sdk);

  // Create due now process and link to due later process
  processDueLater.then(txLater => {
    params.protectedData = {
      linkedProcessId: txLater.id.uuid
    }

    initSpeculativeTransaction(aliasDueNow, params, sdk).then(txNow => {
      dispatch(speculateTransactionSuccess(txNow));
    });
  }).catch(e => {
    log.error(e, 'speculate-transaction-failed', {
      listingId: listingId.uuid,
      bookingStart,
      bookingEnd,
    });
    dispatch(speculateTransactionError(storableError(e)));
  });
};

// StripeCustomer is a relantionship to currentUser
// We need to fetch currentUser with correct params to include relationship
export const stripeCustomer = () => (dispatch, getState, sdk) => {
  dispatch(stripeCustomerRequest());

  return dispatch(fetchCurrentUser({ include: ['stripeCustomer.defaultPaymentMethod'] }))
    .then(response => {
      dispatch(stripeCustomerSuccess());
    })
    .catch(e => {
      dispatch(stripeCustomerError(storableError(e)));
    });
};
