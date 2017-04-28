import { types } from '../../util/sdkLoader';
import { addEntities } from '../../ducks/sdk.duck';

// Transition-to keys
const TRANSITION_ACCEPT = 'transition/accept';
const TRANSITION_REJECT = 'transition/reject';

// ================ Action types ================ //

export const FETCH_SALE_REQUEST = 'app/SalePagePage/FETCH_SALE_REQUEST';
export const FETCH_SALE_SUCCESS = 'app/SalePage/FETCH_SALE_SUCCESS';
export const FETCH_SALE_ERROR = 'app/SalePage/FETCH_SALE_ERROR';

export const ACCEPT_SALE_REQUEST = 'app/SalePage/ACCEPT_SALE_REQUEST';
export const ACCEPT_SALE_SUCCESS = 'app/SalePage/ACCEPT_SALE_SUCCESS';
export const ACCEPT_SALE_ERROR = 'app/SalePage/ACCEPT_SALE_ERROR';

export const REJECT_SALE_REQUEST = 'app/SalePage/REJECT_SALE_REQUEST';
export const REJECT_SALE_SUCCESS = 'app/SalePage/REJECT_SALE_SUCCESS';
export const REJECT_SALE_ERROR = 'app/SalePage/REJECT_SALE_ERROR';

// ================ Reducer ================ //

const initialState = {
  fetchInProgress: false,
  fetchSaleError: null,
  transactionRef: null,
  acceptOrRejectInProgress: false,
  acceptSaleError: null,
  rejectSaleError: null,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SALE_REQUEST:
      return { ...state, fetchInProgress: true, fetchSaleError: null };
    case FETCH_SALE_SUCCESS: {
      const transactionRef = { id: payload.data.data.id, type: 'transaction' };
      return { ...state, fetchInProgress: false, transactionRef };
    }
    case FETCH_SALE_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchSaleError: payload };

    case ACCEPT_SALE_REQUEST:
      return { ...state, acceptOrRejectInProgress: true, acceptSaleError: null };
    case ACCEPT_SALE_SUCCESS:
      return { ...state, acceptOrRejectInProgress: false };
    case ACCEPT_SALE_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, acceptOrRejectInProgress: false, acceptSaleError: payload };

    case REJECT_SALE_REQUEST:
      return { ...state, acceptOrRejectInProgress: true, rejectSaleError: null };
    case REJECT_SALE_SUCCESS:
      return { ...state, acceptOrRejectInProgress: false };
    case REJECT_SALE_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, acceptOrRejectInProgress: false, rejectSaleError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const fetchSaleRequest = () => ({ type: FETCH_SALE_REQUEST });
const fetchSaleSuccess = response => ({ type: FETCH_SALE_SUCCESS, payload: response });
const fetchSaleError = e => ({ type: FETCH_SALE_ERROR, error: true, payload: e });

const acceptSaleRequest = () => ({ type: ACCEPT_SALE_REQUEST });
const acceptSaleSuccess = () => ({ type: ACCEPT_SALE_SUCCESS });
const acceptSaleError = e => ({ type: ACCEPT_SALE_ERROR, error: true, payload: e });

const rejectSaleRequest = () => ({ type: REJECT_SALE_REQUEST });
const rejectSaleSuccess = () => ({ type: REJECT_SALE_SUCCESS });
const rejectSaleError = e => ({ type: REJECT_SALE_ERROR, error: true, payload: e });

// ================ Thunks ================ //

export const fetchSale = id =>
  (dispatch, getState, sdk) => {
    dispatch(fetchSaleRequest());

    return sdk.transactions
      .show({ id, include: ['customer', 'provider', 'listing', 'booking'] }, { expand: true })
      .then(response => {
        dispatch(addEntities(response));
        dispatch(fetchSaleSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(fetchSaleError(e));
        throw e;
      });
  };

export const acceptSale = id =>
  (dispatch, getState, sdk) => {
    dispatch(acceptSaleRequest());

    return sdk.transactions
      .transition({ id, transition: TRANSITION_ACCEPT, params: {} }, { expand: true })
      .then(response => {
        dispatch(addEntities(response));
        dispatch(acceptSaleSuccess());
        return response;
      })
      .catch(e => {
        dispatch(acceptSaleError(e));
        throw e;
      });
  };

export const rejectSale = id =>
  (dispatch, getState, sdk) => {
    dispatch(rejectSaleRequest());

    return sdk.transactions
      .transition({ id, transition: TRANSITION_REJECT, params: {} }, { expand: true })
      .then(response => {
        dispatch(addEntities(response));
        dispatch(rejectSaleSuccess());
        return response;
      })
      .catch(e => {
        dispatch(rejectSaleError(e));
        throw e;
      });
  };

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params =>
  dispatch => {
    const saleId = new types.UUID(params.id);

    // Sale (i.e. transaction entity in API, but from buyers perspective) contains sale details
    return dispatch(fetchSale(saleId));
  };
