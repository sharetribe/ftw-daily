import { reverse, sortBy } from 'lodash';
import { addEntities } from '../../ducks/sdk.duck';

// ================ Action types ================ //

export const FETCH_ORDERS_OR_SALES_REQUEST = 'app/InboxPage/FETCH_ORDERS_OR_SALES_REQUEST';
export const FETCH_ORDERS_OR_SALES_SUCCESS = 'app/InboxPage/FETCH_ORDERS_OR_SALES_SUCCESS';
export const FETCH_ORDERS_OR_SALES_ERROR = 'app/InboxPage/FETCH_ORDERS_OR_SALES_ERROR';

// ================ Reducer ================ //

const entityRefs = entities =>
  entities.map(entity => ({
    id: entity.id,
    type: entity.type,
  }));

const initialState = {
  fetchInProgress: false,
  fetchOrdersOrSalesError: null,
  transactionRefs: [],
};

export default function checkoutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDERS_OR_SALES_REQUEST:
      return { ...state, fetchInProgress: true, fetchOrdersOrSalesError: null };
    case FETCH_ORDERS_OR_SALES_SUCCESS:
      return { ...state, fetchInProgress: false, transactionRefs: entityRefs(payload) };
    case FETCH_ORDERS_OR_SALES_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrdersOrSalesError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const fetchOrdersOrSalesRequest = () => ({ type: FETCH_ORDERS_OR_SALES_REQUEST });
const fetchOrdersOrSalesSuccess = transactions => ({
  type: FETCH_ORDERS_OR_SALES_SUCCESS,
  payload: transactions,
});
const fetchOrdersOrSalesError = e => ({
  type: FETCH_ORDERS_OR_SALES_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

const sortedTransactions = txs =>
  reverse(
    sortBy(txs, tx => {
      return tx.attributes ? tx.attributes.lastTransitionedAt : null;
    })
  );

export const loadData = params =>
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

    const queryParams = {
      only: onlyFilter,
      include: ['provider', 'customer'],
    };

    return sdk.transactions
      .query(queryParams)
      .then(response => {
        const transactions = sortedTransactions(response.data.data);
        dispatch(addEntities(response));
        dispatch(fetchOrdersOrSalesSuccess(transactions));
        return response;
      })
      .catch(e => {
        dispatch(fetchOrdersOrSalesError(e));
        throw e;
      });
  };
