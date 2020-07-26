import axios from 'axios';
import { apiBaseUrl } from '../util/api';
import * as log from '../util/log';

const requestAction = actionType => params => ({ type: actionType, payload: { params } });

const successAction = actionType => result => ({ type: actionType, payload: result.data });

const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

// ================ Action types ================ //

export const FETCH_SHOPIFY_PRODUCTS = 'app/shopify/FETCH_SHOPIFY_PRODUCTS_REQUEST';

// ================ Action creators ================ //

export const fetchShopifyProductsRequest = requestAction(FETCH_SHOPIFY_PRODUCTS);

// ================ Reducer ================ //

const initialState = {
  shopifyProducts: [],
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SHOPIFY_PRODUCTS:
      // TODO (SY): Add validations; move shopify code to another duck file
      return { ...state, shopifyProducts: payload.params.products.edges };
    default:
      return state;
  }
}

// ================ Thunk ================ //

export function requestFetchShopifyProducts(actionPayload) {
  // TODO(SY): Maybe add another dispatch here for when it starts fetching
  return (dispatch, getState, sdk) => {
    return (
      axios
        .get(`${apiBaseUrl()}/api/products`)
        .then(response => {
          // TODO(SY): this isn't following the convention. shouldn't be fetch
          dispatch(fetchShopifyProductsRequest(response.data.data));
          return response;
        })
        // TODO(SY): Add a state for when there's an error here
        .catch(e => {
          log.error(e, 'request-fetch-shopify-products-failed');
        })
    );
  };
}
