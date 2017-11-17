import { types } from '../../util/sdkLoader';
import { storableError } from '../../util/errors';
import * as propTypes from '../../util/propTypes';
import * as log from '../../util/log';
import { updatedEntities, denormalisedEntities } from '../../util/data';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUserNotifications } from '../../ducks/user.duck';

// ================ Action types ================ //

export const FETCH_SALE_REQUEST = 'app/SalePagePage/FETCH_SALE_REQUEST';
export const FETCH_SALE_SUCCESS = 'app/SalePage/FETCH_SALE_SUCCESS';
export const FETCH_SALE_ERROR = 'app/SalePage/FETCH_SALE_ERROR';

export const ACCEPT_SALE_REQUEST = 'app/SalePage/ACCEPT_SALE_REQUEST';
export const ACCEPT_SALE_SUCCESS = 'app/SalePage/ACCEPT_SALE_SUCCESS';
export const ACCEPT_SALE_ERROR = 'app/SalePage/ACCEPT_SALE_ERROR';

export const DECLINE_SALE_REQUEST = 'app/SalePage/DECLINE_SALE_REQUEST';
export const DECLINE_SALE_SUCCESS = 'app/SalePage/DECLINE_SALE_SUCCESS';
export const DECLINE_SALE_ERROR = 'app/SalePage/DECLINE_SALE_ERROR';

export const FETCH_MESSAGES_REQUEST = 'app/SalePage/FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'app/SalePage/FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'app/SalePage/FETCH_MESSAGES_ERROR';

export const SEND_MESSAGE_REQUEST = 'app/SalePage/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'app/SalePage/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'app/SalePage/SEND_MESSAGE_ERROR';
export const CLEAR_SEND_MESSAGE_ERROR = 'app/SalePage/CLEAR_SEND_MESSAGE_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchSaleInProgress: false,
  fetchSaleError: null,
  transactionRef: null,
  acceptInProgress: false,
  declineInProgress: false,
  acceptSaleError: null,
  declineSaleError: null,
  fetchMessagesInProgress: false,
  fetchMessagesError: null,
  messages: [],
  sendMessageInProgress: false,
  sendMessageError: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SALE_REQUEST:
      return { ...state, fetchSaleInProgress: true, fetchSaleError: null };
    case FETCH_SALE_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchSaleInProgress: false, transactionRef };
    }
    case FETCH_SALE_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchSaleInProgress: false, fetchSaleError: payload };

    case ACCEPT_SALE_REQUEST:
      return { ...state, acceptInProgress: true, acceptSaleError: null, declineSaleError: null };
    case ACCEPT_SALE_SUCCESS:
      return { ...state, acceptInProgress: false };
    case ACCEPT_SALE_ERROR:
      return { ...state, acceptInProgress: false, acceptSaleError: payload };

    case DECLINE_SALE_REQUEST:
      return { ...state, declineInProgress: true, declineSaleError: null, acceptSaleError: null };
    case DECLINE_SALE_SUCCESS:
      return { ...state, declineInProgress: false };
    case DECLINE_SALE_ERROR:
      return { ...state, declineInProgress: false, declineSaleError: payload };

    case FETCH_MESSAGES_REQUEST:
      return { ...state, fetchMessagesInProgress: true, fetchMessagesError: null };
    case FETCH_MESSAGES_SUCCESS:
      return { ...state, fetchMessagesInProgress: false, messages: payload };
    case FETCH_MESSAGES_ERROR:
      return { ...state, fetchMessagesInProgress: false, fetchMessagesError: payload };

    case SEND_MESSAGE_REQUEST:
      return { ...state, sendMessageInProgress: true, sendMessageError: null };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendMessageInProgress: false };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageInProgress: false, sendMessageError: payload };
    case CLEAR_SEND_MESSAGE_ERROR:
      return { ...state, sendMessageError: null };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const acceptOrDeclineInProgress = state => {
  return state.SalePage.acceptInProgress || state.SalePage.declineInProgress;
};

// ================ Action creators ================ //

const fetchSaleRequest = () => ({ type: FETCH_SALE_REQUEST });
const fetchSaleSuccess = response => ({ type: FETCH_SALE_SUCCESS, payload: response });
const fetchSaleError = e => ({ type: FETCH_SALE_ERROR, error: true, payload: e });

const acceptSaleRequest = () => ({ type: ACCEPT_SALE_REQUEST });
const acceptSaleSuccess = () => ({ type: ACCEPT_SALE_SUCCESS });
const acceptSaleError = e => ({ type: ACCEPT_SALE_ERROR, error: true, payload: e });

const declineSaleRequest = () => ({ type: DECLINE_SALE_REQUEST });
const declineSaleSuccess = () => ({ type: DECLINE_SALE_SUCCESS });
const declineSaleError = e => ({ type: DECLINE_SALE_ERROR, error: true, payload: e });

const fetchMessagesRequest = () => ({ type: FETCH_MESSAGES_REQUEST });
const fetchMessagesSuccess = messages => ({ type: FETCH_MESSAGES_SUCCESS, payload: messages });
const fetchMessagesError = e => ({ type: FETCH_MESSAGES_ERROR, error: true, payload: e });

const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });
const clearSendMessageError = () => ({ type: CLEAR_SEND_MESSAGE_ERROR });

// ================ Thunks ================ //

const listingRelationship = txResponse => {
  return txResponse.data.data.relationships.listing.data;
};

export const fetchSale = id => (dispatch, getState, sdk) => {
  dispatch(fetchSaleRequest());
  let txResponse = null;

  return sdk.transactions
    .show(
      {
        id,
        include: [
          'customer',
          'customer.profileImage',
          'provider',
          'provider.profileImage',
          'listing',
          'booking',
        ],
      },
      { expand: true }
    )
    .then(response => {
      txResponse = response;
      const listingId = listingRelationship(response).id;
      return sdk.listings.show({
        id: listingId,
        include: ['author', 'author.profileImage', 'images'],
      });
    })
    .then(response => {
      dispatch(addMarketplaceEntities(txResponse));
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchSaleSuccess(txResponse));
      return response;
    })
    .catch(e => {
      dispatch(fetchSaleError(storableError(e)));
      throw e;
    });
};

export const acceptSale = id => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(acceptSaleRequest());

  return sdk.transactions
    .transition({ id, transition: propTypes.TX_TRANSITION_ACCEPT, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(acceptSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(acceptSaleError(storableError(e)));
      log.error(e, 'accept-sale-failed', {
        txId: id,
        transition: propTypes.TX_TRANSITION_ACCEPT,
      });
      throw e;
    });
};

export const declineSale = id => (dispatch, getState, sdk) => {
  if (acceptOrDeclineInProgress(getState())) {
    return Promise.reject(new Error('Accept or decline already in progress'));
  }
  dispatch(declineSaleRequest());

  return sdk.transactions
    .transition({ id, transition: propTypes.TX_TRANSITION_DECLINE, params: {} }, { expand: true })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(declineSaleSuccess());
      dispatch(fetchCurrentUserNotifications());
      return response;
    })
    .catch(e => {
      dispatch(declineSaleError(storableError(e)));
      log.error(e, 'redect-sale-failed', {
        txId: id,
        transition: propTypes.TX_TRANSITION_DECLINE,
      });
      throw e;
    });
};

export const fetchMessages = txId => (dispatch, getState, sdk) => {
  dispatch(fetchMessagesRequest());

  return sdk.messages
    .query({ transaction_id: txId, include: ['sender', 'sender.profileImage'] })
    .then(response => {
      const entities = updatedEntities({}, response.data);
      const messageIds = response.data.data.map(d => d.id);
      const denormalized = denormalisedEntities(entities, 'message', messageIds);

      // Messages come latest first, so we need to reverse the order
      denormalized.reverse();

      dispatch(fetchMessagesSuccess(denormalized));
    })
    .catch(e => {
      dispatch(fetchMessagesError(storableError(e)));
      throw e;
    });
};

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params => dispatch => {
  const saleId = new types.UUID(params.id);

  // Clear the send error since the message form is emptied as well.
  dispatch(clearSendMessageError());

  // Sale (i.e. transaction entity in API, but from buyers perspective) contains sale details
  return Promise.all([dispatch(fetchSale(saleId)), dispatch(fetchMessages(saleId))]);
};

export const sendMessage = (saleId, message) => (dispatch, getState, sdk) => {
  dispatch(sendMessageRequest());

  return sdk.messages
    .send({ transactionId: saleId, content: message })
    .then(response => {
      const messageId = response.data.data.id;
      return dispatch(fetchMessages(saleId))
        .then(() => {
          dispatch(sendMessageSuccess());
          return messageId;
        })
        .catch(() => dispatch(sendMessageSuccess()));
    })
    .catch(e => {
      dispatch(sendMessageError(storableError(e)));
      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};
