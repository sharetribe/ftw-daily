import { types } from '../../util/sdkLoader';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

// ================ Action types ================ //

export const FETCH_ORDER_REQUEST = 'app/InboxPage/FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = 'app/InboxPage/FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_ERROR = 'app/InboxPage/FETCH_ORDER_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchInProgress: false,
  fetchOrderError: null,
  transactionRef: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDER_REQUEST:
      return { ...state, fetchInProgress: true, fetchOrderError: null };
    case FETCH_ORDER_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchInProgress: false, transactionRef };
    }
    case FETCH_ORDER_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrderError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const fetchOrderRequest = () => ({ type: FETCH_ORDER_REQUEST });
const fetchOrderSuccess = response => ({ type: FETCH_ORDER_SUCCESS, payload: response });
const fetchOrderError = e => ({ type: FETCH_ORDER_ERROR, error: true, payload: e });

// ================ Thunks ================ //

export const fetchOrder = id =>
  (dispatch, getState, sdk) => {
    dispatch(fetchOrderRequest());

    return sdk.transactions
      .show({ id, include: ['customer', 'provider', 'listing', 'booking'] }, { expand: true })
      .then(response => {
        dispatch(addMarketplaceEntities(response));
        dispatch(fetchOrderSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(fetchOrderError(e));
        throw e;
      });
  };

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params =>
  dispatch => {
    const orderId = new types.UUID(params.id);

    // Order (i.e. transaction entity in API, but from buyers perspective) contains order details
    return dispatch(fetchOrder(orderId));
  };
