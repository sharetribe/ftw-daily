import { pick } from 'lodash';
import { types } from '../../util/sdkLoader';
import { storableError } from '../../util/errors';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { updatedEntities, denormalisedEntities } from '../../util/data';

// ================ Action types ================ //

export const SET_INITAL_VALUES = 'app/OrderPage/SET_INITIAL_VALUES';

export const FETCH_ORDER_REQUEST = 'app/OrderPage/FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = 'app/OrderPage/FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_ERROR = 'app/OrderPage/FETCH_ORDER_ERROR';

export const FETCH_MESSAGES_REQUEST = 'app/OrderPage/FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'app/OrderPage/FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR = 'app/OrderPage/FETCH_MESSAGES_ERROR';

export const SEND_MESSAGE_REQUEST = 'app/OrderPage/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'app/OrderPage/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'app/OrderPage/SEND_MESSAGE_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchOrderInProgress: false,
  fetchOrderError: null,
  transactionRef: null,
  fetchMessagesInProgress: false,
  fetchMessagesError: null,
  messages: [],
  messageSendingFailedToTransaction: null,
  sendMessageInProgress: false,
  sendMessageError: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITAL_VALUES:
      return { ...initialState, ...payload };

    case FETCH_ORDER_REQUEST:
      return { ...state, fetchOrderInProgress: true, fetchOrderError: null };
    case FETCH_ORDER_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchOrderInProgress: false, transactionRef };
    }
    case FETCH_ORDER_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchOrderInProgress: false, fetchOrderError: payload };

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

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setInitialValues = initialValues => ({
  type: SET_INITAL_VALUES,
  payload: pick(initialValues, Object.keys(initialState)),
});

const fetchOrderRequest = () => ({ type: FETCH_ORDER_REQUEST });
const fetchOrderSuccess = response => ({ type: FETCH_ORDER_SUCCESS, payload: response });
const fetchOrderError = e => ({ type: FETCH_ORDER_ERROR, error: true, payload: e });

const fetchMessagesRequest = () => ({ type: FETCH_MESSAGES_REQUEST });
const fetchMessagesSuccess = messages => ({ type: FETCH_MESSAGES_SUCCESS, payload: messages });
const fetchMessagesError = e => ({ type: FETCH_MESSAGES_ERROR, error: true, payload: e });

const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });

// ================ Thunks ================ //

const listingRelationship = txResponse => {
  return txResponse.data.data.relationships.listing.data;
};

export const fetchOrder = id => (dispatch, getState, sdk) => {
  dispatch(fetchOrderRequest());

  let txResponse = null;

  return sdk.transactions
    .show({ id, include: ['customer', 'provider', 'listing', 'booking'] }, { expand: true })
    .then(response => {
      txResponse = response;
      const listingId = listingRelationship(response).id;
      const entities = updatedEntities({}, response.data);
      const denormalised = denormalisedEntities(entities, 'listing', [listingId]);
      const listing = denormalised[0];

      const canFetchListing = listing && listing.attributes && !listing.attributes.deleted;

      if (canFetchListing) {
        return sdk.listings.show({
          id: listingId,
          include: ['author', 'author.profileImage', 'images'],
        });
      } else {
        return response;
      }
    })
    .then(response => {
      dispatch(addMarketplaceEntities(txResponse));
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchOrderSuccess(txResponse));

      return response;
    })
    .catch(e => {
      dispatch(fetchOrderError(storableError(e)));
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
  const orderId = new types.UUID(params.id);

  // Clear the send error since the message form is emptied as well.
  dispatch(setInitialValues({ sendMessageError: null }));

  // Order (i.e. transaction entity in API, but from buyers perspective) contains order details
  return Promise.all([dispatch(fetchOrder(orderId)), dispatch(fetchMessages(orderId))]);
};

export const sendMessage = (orderId, message) => (dispatch, getState, sdk) => {
  dispatch(sendMessageRequest());

  return sdk.messages
    .send({ transactionId: orderId, content: message })
    .then(response => {
      const messageId = response.data.data.id;
      return dispatch(fetchMessages(orderId))
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
