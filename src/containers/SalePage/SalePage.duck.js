import { types } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import * as log from '../../util/log';
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

// ================ Reducer ================ //

const initialState = {
  fetchInProgress: false,
  fetchSaleError: null,
  transactionRef: null,
  acceptInProgress: false,
  declineInProgress: false,
  acceptSaleError: null,
  declineSaleError: null,
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
      dispatch(fetchSaleError(e));
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
      dispatch(acceptSaleError(e));
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
      dispatch(declineSaleError(e));
      log.error(e, 'redect-sale-failed', {
        txId: id,
        transition: propTypes.TX_TRANSITION_DECLINE,
      });
      throw e;
    });
};

// loadData is a collection of async calls that need to be made
// before page has all the info it needs to render itself
export const loadData = params => dispatch => {
  const saleId = new types.UUID(params.id);

  // Sale (i.e. transaction entity in API, but from buyers perspective) contains sale details
  return dispatch(fetchSale(saleId));
};
