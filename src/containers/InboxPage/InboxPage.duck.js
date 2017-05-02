import { reverse, sortBy } from 'lodash';
import { parse } from '../../util/urlHelpers';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';

const sortedTransactions = txs =>
  reverse(
    sortBy(txs, tx => {
      return tx.attributes ? tx.attributes.lastTransitionedAt : null;
    })
  );

// ================ Action types ================ //

export const FETCH_ORDERS_OR_SALES_REQUEST = 'app/InboxPage/FETCH_ORDERS_OR_SALES_REQUEST';
export const FETCH_ORDERS_OR_SALES_SUCCESS = 'app/InboxPage/FETCH_ORDERS_OR_SALES_SUCCESS';
export const FETCH_ORDERS_OR_SALES_ERROR = 'app/InboxPage/FETCH_ORDERS_OR_SALES_ERROR';

export const FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST = 'app/InboxPage/FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST';
export const FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS = 'app/InboxPage/FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS';
export const FETCH_CURRENT_USER_HAS_LISTINGS_ERROR = 'app/InboxPage/FETCH_CURRENT_USER_HAS_LISTINGS_ERROR';

// ================ Reducer ================ //

const entityRefs = entities =>
  entities.map(entity => ({
    id: entity.id,
    type: entity.type,
  }));

const initialState = {
  fetchInProgress: false,
  fetchOrdersOrSalesError: null,
  pagination: null,
  transactionRefs: [],
  currentUserHasListingsError: null,
  currentUserHasListings: false,
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDERS_OR_SALES_REQUEST:
      return { ...state, fetchInProgress: true, fetchOrdersOrSalesError: null };
    case FETCH_ORDERS_OR_SALES_SUCCESS: {
      const transactions = sortedTransactions(payload.data.data);
      return {
        ...state,
        fetchInProgress: false,
        transactionRefs: entityRefs(transactions),
        pagination: payload.data.meta,
      };
    }
    case FETCH_ORDERS_OR_SALES_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrdersOrSalesError: payload };

    case FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST:
      return { ...state, currentUserHasListingsError: null };
    case FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS:
      return { ...state, currentUserHasListings: payload.hasListings };
    case FETCH_CURRENT_USER_HAS_LISTINGS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserHasListingsError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const fetchOrdersOrSalesRequest = () => ({ type: FETCH_ORDERS_OR_SALES_REQUEST });
const fetchOrdersOrSalesSuccess = response => ({
  type: FETCH_ORDERS_OR_SALES_SUCCESS,
  payload: response,
});
const fetchOrdersOrSalesError = e => ({
  type: FETCH_ORDERS_OR_SALES_ERROR,
  error: true,
  payload: e,
});

const fetchCurrentUserHasListingsRequest = () => ({
  type: FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST,
});

const fetchCurrentUserHasListingsSuccess = hasListings => ({
  type: FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS,
  payload: { hasListings },
});

const fetchCurrentUserHasListingsError = e => ({
  type: FETCH_CURRENT_USER_HAS_LISTINGS_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

const fetchCurrentUserHasListings = () =>
  (dispatch, getState, sdk) => {
    dispatch(fetchCurrentUserHasListingsRequest());
    dispatch(fetchCurrentUser())
      .then(() => {
        const currentUserId = getState().user.currentUser.id;
        const params = {
          author_id: currentUserId,

          // Since we are only interested in if the user has
          // listings, we only need at most one result.
          page: 1,
          per_page: 1,
        };
        return sdk.listings.query(params);
      })
      .then(response => {
        const hasListings = response.data.data && response.data.data.length > 0;
        dispatch(fetchCurrentUserHasListingsSuccess(hasListings));
      })
      .catch(e => dispatch(fetchCurrentUserHasListingsError(e)));
  };

const INBOX_PAGE_SIZE = 10;

export const loadData = (params, search) =>
  (dispatch, getState, sdk) => {
    const { tab } = params;

    const onlyFilterValues = {
      orders: 'order',
      sales: 'sale',
    };

    const onlyFilter = onlyFilterValues[tab];
    if (!onlyFilter) {
      return Promise.reject(new Error(`Invalid tab for InboxPage: ${tab}`));
    }

    dispatch(fetchOrdersOrSalesRequest());
    dispatch(fetchCurrentUserHasListings());

    const { page = 1 } = parse(search);

    const apiQueryParams = {
      only: onlyFilter,
      include: ['provider', 'customer'],
      page,
      per_page: INBOX_PAGE_SIZE,
    };

    return sdk.transactions
      .query(apiQueryParams)
      .then(response => {
        dispatch(addMarketplaceEntities(response));
        dispatch(fetchOrdersOrSalesSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(fetchOrdersOrSalesError(e));
        throw e;
      });
  };
