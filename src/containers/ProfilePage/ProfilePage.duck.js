import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';
import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const SHOW_USER_REQUEST = 'app/ProfilePage/SHOW_USER_REQUEST';
export const SHOW_USER_SUCCESS = 'app/ProfilePage/SHOW_USER_SUCCESS';
export const SHOW_USER_ERROR = 'app/ProfilePage/SHOW_USER_ERROR';

export const QUERY_LISTINGS_REQUEST = 'app/ProfilePage/QUERY_LISTINGS_REQUEST';
export const QUERY_LISTINGS_SUCCESS = 'app/ProfilePage/QUERY_LISTINGS_SUCCESS';
export const QUERY_LISTINGS_ERROR = 'app/ProfilePage/QUERY_LISTINGS_ERROR';

// ================ Reducer ================ //

const initialState = {
  userId: null,

  userShowInProgress: false,
  userShowError: null,

  queryListingsError: null,
  userListingRefs: [],
};

export default function profilePageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_USER_REQUEST:
      return { ...state, userShowInProgress: true, userShowError: null, userId: payload.userId };
    case SHOW_USER_SUCCESS:
      return { ...state, userShowInProgress: false };
    case SHOW_USER_ERROR:
      return { ...state, userShowInProgress: false, userShowError: payload };

    case QUERY_LISTINGS_REQUEST:
      return { ...state, userListingRefs: [], queryListingsError: null };
    case QUERY_LISTINGS_SUCCESS:
      return { ...state, userListingRefs: payload.listingRefs };
    case QUERY_LISTINGS_ERROR:
      return { ...state, queryListingsError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const showUserRequest = userId => ({
  type: SHOW_USER_REQUEST,
  payload: { userId },
});

export const showUserSuccess = () => ({
  type: SHOW_USER_SUCCESS,
});

export const showUserError = e => ({
  type: SHOW_USER_ERROR,
  error: true,
  payload: e,
});

export const queryListingsRequest = () => ({
  type: QUERY_LISTINGS_REQUEST,
});

export const queryListingsSuccess = listingRefs => ({
  type: QUERY_LISTINGS_SUCCESS,
  payload: { listingRefs },
});

export const queryListingsError = e => ({
  type: QUERY_LISTINGS_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const queryUserListings = userId => (dispatch, getState, sdk) => {
  dispatch(queryListingsRequest());
  return sdk.listings
    .query({ author_id: userId, include: ['images'] })
    .then(response => {
      // Pick only the id and type properties from the response listings
      const listingRefs = response.data.data.map(({ id, type }) => ({ id, type }));
      dispatch(addMarketplaceEntities(response));
      dispatch(queryListingsSuccess(listingRefs));
      return response;
    })
    .catch(e => dispatch(queryListingsError(storableError(e))));
};

export const showUser = userId => (dispatch, getState, sdk) => {
  dispatch(showUserRequest(userId));
  return sdk.users
    .show({ id: userId, include: ['profileImage'] })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(showUserSuccess());
      return response;
    })
    .catch(e => dispatch(showUserError(storableError(e))));
};

export const loadData = userId => (dispatch, getState, sdk) => {
  return Promise.all([
    dispatch(fetchCurrentUser()),
    dispatch(showUser(userId)),
    dispatch(queryUserListings(userId)),
  ]);
};
