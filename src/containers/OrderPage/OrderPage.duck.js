import { pick } from 'lodash';
import { types } from '../../util/sdkLoader';
import { isTransactionsTransitionInvalidTransition, storableError } from '../../util/errors';
import * as propTypes from '../../util/propTypes';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { updatedEntities, denormalisedEntities } from '../../util/data';

const MESSAGES_PAGE_SIZE = 100;

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

export const SEND_REVIEW_REQUEST = 'app/OrderPage/SEND_REVIEW_REQUEST';
export const SEND_REVIEW_SUCCESS = 'app/OrderPage/SEND_REVIEW_SUCCESS';
export const SEND_REVIEW_ERROR = 'app/OrderPage/SEND_REVIEW_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchOrderInProgress: false,
  fetchOrderError: null,
  transactionRef: null,
  fetchMessagesInProgress: false,
  fetchMessagesError: null,
  totalMessages: 0,
  totalMessagePages: 0,
  oldestMessagePageFetched: 0,
  messages: [],
  messageSendingFailedToTransaction: null,
  sendMessageInProgress: false,
  sendMessageError: null,
  sendReviewInProgress: false,
  sendReviewError: null,
};

// Merge entity arrays using ids, so that conflicting items in newer array (b) overwrite old values (a).
// const a = [{ id: { uuid: 1 } }, { id: { uuid: 3 } }];
// const b = [{ id: : { uuid: 2 } }, { id: : { uuid: 1 } }];
// mergeEntityArrays(a, b)
// => [{ id: { uuid: 3 } }, { id: : { uuid: 2 } }, { id: : { uuid: 1 } }]
const mergeEntityArrays = (a, b) => {
  return a.filter(aEntity => !b.find(bEntity => aEntity.id.uuid === bEntity.id.uuid)).concat(b);
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
    case FETCH_MESSAGES_SUCCESS: {
      const oldestMessagePageFetched =
        state.oldestMessagePageFetched > payload.page
          ? state.oldestMessagePageFetched
          : payload.page;
      return {
        ...state,
        fetchMessagesInProgress: false,
        messages: mergeEntityArrays(state.messages, payload.messages),
        totalMessages: payload.totalItems,
        totalMessagePages: payload.totalPages,
        oldestMessagePageFetched,
      };
    }
    case FETCH_MESSAGES_ERROR:
      return { ...state, fetchMessagesInProgress: false, fetchMessagesError: payload };

    case SEND_MESSAGE_REQUEST:
      return { ...state, sendMessageInProgress: true, sendMessageError: null };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sendMessageInProgress: false };
    case SEND_MESSAGE_ERROR:
      return { ...state, sendMessageInProgress: false, sendMessageError: payload };

    case SEND_REVIEW_REQUEST:
      return { ...state, sendReviewInProgress: true, sendReviewError: null };
    case SEND_REVIEW_SUCCESS:
      return { ...state, sendReviewInProgress: false };
    case SEND_REVIEW_ERROR:
      return { ...state, sendReviewInProgress: false, sendReviewError: payload };

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
const fetchMessagesSuccess = (messages, pagination) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages, ...pagination },
});
const fetchMessagesError = e => ({ type: FETCH_MESSAGES_ERROR, error: true, payload: e });

const sendMessageRequest = () => ({ type: SEND_MESSAGE_REQUEST });
const sendMessageSuccess = () => ({ type: SEND_MESSAGE_SUCCESS });
const sendMessageError = e => ({ type: SEND_MESSAGE_ERROR, error: true, payload: e });

const sendReviewRequest = () => ({ type: SEND_REVIEW_REQUEST });
const sendReviewSuccess = () => ({ type: SEND_REVIEW_SUCCESS });
const sendReviewError = e => ({ type: SEND_REVIEW_ERROR, error: true, payload: e });

// ================ Thunks ================ //

const listingRelationship = txResponse => {
  return txResponse.data.data.relationships.listing.data;
};

export const fetchOrder = id => (dispatch, getState, sdk) => {
  dispatch(fetchOrderRequest());

  let txResponse = null;

  return sdk.transactions
    .show(
      {
        id,
        include: [
          'customer',
          'provider',
          'listing',
          'booking',
          'reviews',
          'reviews.author',
          'reviews.subject',
        ],
      },
      { expand: true }
    )
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

const fetchMessages = (txId, page) => (dispatch, getState, sdk) => {
  const paging = { page, per_page: MESSAGES_PAGE_SIZE };
  dispatch(fetchMessagesRequest());

  return sdk.messages
    .query({ transaction_id: txId, include: ['sender', 'sender.profileImage'], ...paging })
    .then(response => {
      const entities = updatedEntities({}, response.data);
      const messageIds = response.data.data.map(d => d.id);
      const denormalizedMessages = denormalisedEntities(entities, 'message', messageIds);
      const { totalItems, totalPages, page: fetchedPage } = response.data.meta;
      const pagination = { totalItems, totalPages, page: fetchedPage };
      const totalMessages = getState().OrderPage.totalMessages;

      // Original fetchMessages call succeeded
      dispatch(fetchMessagesSuccess(denormalizedMessages, pagination));

      // Check if totalItems has changed between fetched pagination pages
      // if totalItems has changed, fetch first page again to include new incoming messages.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      if (totalItems > totalMessages && page > 1) {
        dispatch(fetchMessages(txId, 1))
          .then(() => {
            // Original fetch was enough as a response for user action,
            // this just includes new incoming messages
          })
          .catch(() => {
            // Background update, no need to to do anything atm.
          });
      }
    })
    .catch(e => {
      dispatch(fetchMessagesError(storableError(e)));
      throw e;
    });
};

export const fetchMoreMessages = txId => (dispatch, getState, sdk) => {
  const state = getState();
  const { oldestMessagePageFetched, totalMessagePages } = state.OrderPage;
  const hasMoreOldMessages = totalMessagePages > oldestMessagePageFetched;

  // In case there're no more old pages left we default to fetching the current cursor position
  const nextPage = hasMoreOldMessages ? oldestMessagePageFetched + 1 : oldestMessagePageFetched;

  return dispatch(fetchMessages(txId, nextPage));
};

export const sendMessage = (orderId, message) => (dispatch, getState, sdk) => {
  dispatch(sendMessageRequest());

  return sdk.messages
    .send({ transactionId: orderId, content: message })
    .then(response => {
      const messageId = response.data.data.id;

      // We fetch the first page again to add sent message to the page data
      // and update possible incoming messages too.
      // TODO if there're more than 100 incoming messages,
      // this should loop through most recent pages instead of fetching just the first one.
      return dispatch(fetchMessages(orderId, 1))
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

const REVIEW_TX_INCLUDES = ['reviews', 'reviews.author', 'reviews.subject'];

// If other party (provider) has already sent a review, we need to make transition to
// TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND
const sendReviewAsSecond = (id, params, dispatch, sdk) => {
  const transition = propTypes.TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND;
  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      dispatch(sendReviewError(storableError(e)));

      // Rethrow so the page can track whether the sending failed, and
      // keep the message in the form for a retry.
      throw e;
    });
};

// If other party (provider) has not yet sent a review, we need to make transition to
// TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST
// However, the other party might have made the review after previous data synch point.
// So, error is likely to happen and then we must try another state transition
// by calling sendReviewAsSecond().
const sendReviewAsFirst = (id, params, dispatch, sdk) => {
  const transition = propTypes.TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST;
  const include = REVIEW_TX_INCLUDES;

  return sdk.transactions
    .transition({ id, transition, params }, { expand: true, include })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(sendReviewSuccess());
      return response;
    })
    .catch(e => {
      // If transaction transition is invalid, lets try another endpoint.
      if (isTransactionsTransitionInvalidTransition(e)) {
        return sendReviewAsSecond(id, params, dispatch, sdk);
      } else {
        dispatch(sendReviewError(storableError(e)));

        // Rethrow so the page can track whether the sending failed, and
        // keep the message in the form for a retry.
        throw e;
      }
    });
};

export const sendReview = (tx, reviewRating, reviewContent) => (dispatch, getState, sdk) => {
  const params = { reviewRating, reviewContent };
  const txStateProviderFirst =
    tx.attributes.lastTransition === propTypes.TX_TRANSITION_REVIEW_BY_PROVIDER_FIRST;

  dispatch(sendReviewRequest());

  return txStateProviderFirst
    ? sendReviewAsSecond(tx.id, params, dispatch, sdk)
    : sendReviewAsFirst(tx.id, params, dispatch, sdk);
};

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params => dispatch => {
  const orderId = new types.UUID(params.id);

  // Clear the send error since the message form is emptied as well.
  dispatch(setInitialValues({ sendMessageError: null, sendReviewError: null }));

  // Order (i.e. transaction entity in API, but from buyers perspective) contains order details
  return Promise.all([dispatch(fetchOrder(orderId)), dispatch(fetchMessages(orderId, 1))]);
};
