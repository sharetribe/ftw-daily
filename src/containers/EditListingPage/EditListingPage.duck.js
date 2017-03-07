/* eslint-disable no-console */
import { showListingsSuccess as globalShowListingsSuccess } from '../../ducks/sdk.duck';

const requestAction = actionType => params => ({ type: actionType, payload: { params } });

const successAction = actionType => result => ({ type: actionType, payload: result.data });

const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

// ================ Action types ================ //

export const CREATE_LISTING_REQUEST = 'app/EditListingPage/CREATE_LISTING_REQUEST';
export const CREATE_LISTING_SUCCESS = 'app/EditListingPage/CREATE_LISTING_SUCCESS';
export const CREATE_LISTING_ERROR = 'app/EditListingPage/CREATE_LISTING_ERROR';

export const SHOW_LISTINGS_REQUEST = 'app/EditListingPage/SHOW_LISTINGS_REQUEST';
export const SHOW_LISTINGS_SUCCESS = 'app/EditListingPage/SHOW_LISTINGS_SUCCESS';
export const SHOW_LISTINGS_ERROR = 'app/EditListingPage/SHOW_LISTINGS_ERROR';

// ================ Reducer ================ //

const initialState = {
  // Error instance placeholders for each endpoint
  createListingsError: null,
  showListingsError: null,
  submittedListingId: null,
  redirectToListing: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_LISTING_REQUEST:
      return {
        ...state,
        createListingsError: null,
        submittedListingId: null,
        redirectToListing: false,
      };
    case CREATE_LISTING_SUCCESS:
      return { ...state, submittedListingId: payload.data.id, redirectToListing: true };
    case CREATE_LISTING_ERROR:
      console.error(payload);
      return { ...state, createListingsError: payload, redirectToListing: false };

    case SHOW_LISTINGS_REQUEST:
      return { ...state, showListingsError: null };
    case SHOW_LISTINGS_SUCCESS:
      return initialState;
    case SHOW_LISTINGS_ERROR:
      console.error(payload);
      return { ...state, showListingsError: payload, redirectToListing: false };

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

// All the action creators that don't have the {Success, Error} suffix
// take the params object that the corresponding SDK endpoint method
// expects.

// SDK method: listings.create
export const createListing = requestAction(CREATE_LISTING_REQUEST);
export const createListingSuccess = successAction(CREATE_LISTING_SUCCESS);
export const createListingError = errorAction(CREATE_LISTING_ERROR);

// SDK method: listings.show
export const showListings = requestAction(SHOW_LISTINGS_REQUEST);
export const showListingsSuccess = successAction(SHOW_LISTINGS_SUCCESS);
export const showListingsError = errorAction(SHOW_LISTINGS_ERROR);

// ================ Thunk ================ //

const endpoints = {
  [CREATE_LISTING_REQUEST]: {
    method: sdk => sdk.listings.create,
    success: createListingSuccess,
    error: createListingError,
  },
  [SHOW_LISTINGS_REQUEST]: {
    method: sdk => sdk.listings.show,
    success: showListingsSuccess,
    error: showListingsError,
  },
};

function callEndpoint(sdkMethod, dispatchSuccess, dispatchError, action) {
  const params = action.payload.params;
  return sdkMethod(params).then(resp => dispatchSuccess(resp)).catch(e => dispatchError(e));
}

export function requestCreateListing(actionPayload) {
  return (dispatch, getState, sdk) => {
    // Create request action
    const action = createListing(actionPayload);
    // Notify store that we are sending a request
    dispatch(action);
    // Select SDK endpoint and call it
    const { method, success, error } = endpoints[action.type];
    return callEndpoint(
      method(sdk),
      response => dispatch(success(response)),
      e => dispatch(error(e)),
      action,
    );
  };
}

export function requestShowListing(actionPayload) {
  return (dispatch, getState, sdk) => {
    const action = showListings(actionPayload);
    dispatch(action);
    const { method, success, error } = endpoints[action.type];
    return callEndpoint(
      method(sdk),
      response => {
        // EditListingPage fetches new listing data, which also needs to be added to global data
        dispatch(globalShowListingsSuccess(response));
        // In case of success, we'll clear state.EditListingPage (user will be redirected away)
        dispatch(success(response));
      },
      e => dispatch(error(e)),
      action,
    );
  };
}
