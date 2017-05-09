// ================ Action types ================ //

export const USERS_ME_REQUEST = 'app/user/USERS_ME_REQUEST';
export const USERS_ME_SUCCESS = 'app/user/USERS_ME_SUCCESS';
export const USERS_ME_ERROR = 'app/user/USERS_ME_ERROR';

export const CLEAR_CURRENT_USER = 'app/user/CLEAR_CURRENT_USER';

export const STRIPE_ACCOUNT_CREATE_REQUEST = 'app/user/STRIPE_ACCOUNT_CREATE_REQUEST';
export const STRIPE_ACCOUNT_CREATE_SUCCESS = 'app/user/STRIPE_ACCOUNT_CREATE_SUCCESS';
export const STRIPE_ACCOUNT_CREATE_ERROR = 'app/user/STRIPE_ACCOUNT_CREATE_ERROR';

export const FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST';
export const FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS';
export const FETCH_CURRENT_USER_HAS_LISTINGS_ERROR = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_ERROR';

// ================ Reducer ================ //

const initialState = {
  currentUser: null,
  usersMeError: null,
  currentUserHasListings: false,
  currentUserHasListingsError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case USERS_ME_REQUEST:
      return { ...state, usersMeError: null };
    case USERS_ME_SUCCESS:
      return { ...state, currentUser: payload };
    case USERS_ME_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, usersMeError: payload };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        usersMeError: null,
        currentUserHasListings: false,
        currentUserHasListingsError: null,
      };

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

export const usersMeRequest = () => ({ type: USERS_ME_REQUEST });

export const usersMeSuccess = user => ({
  type: USERS_ME_SUCCESS,
  payload: user,
});

export const usersMeError = e => ({
  type: USERS_ME_ERROR,
  payload: e,
  error: true,
});

export const clearCurrentUser = () => ({ type: CLEAR_CURRENT_USER });

export const stripeAccountCreateRequest = () => ({ type: STRIPE_ACCOUNT_CREATE_REQUEST });

export const stripeAccountCreateSuccess = response => ({
  type: STRIPE_ACCOUNT_CREATE_SUCCESS,
  payload: response,
});

export const stripeAccountCreateError = e => ({
  type: STRIPE_ACCOUNT_CREATE_ERROR,
  payload: e,
  error: true,
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

export const fetchCurrentUserHasListings = () =>
  (dispatch, getState, sdk) => {
    dispatch(fetchCurrentUserHasListingsRequest());
    const { currentUser } = getState().user;

    if (!currentUser) {
      dispatch(fetchCurrentUserHasListingsSuccess(false));
      return Promise.resolve(null);
    }

    const currentUserId = currentUser.id;
    const params = {
      author_id: currentUserId,

      // Since we are only interested in if the user has
      // listings, we only need at most one result.
      page: 1,
      per_page: 1,
    };

    return sdk.listings
      .query(params)
      .then(response => {
        const hasListings = response.data.data && response.data.data.length > 0;
        dispatch(fetchCurrentUserHasListingsSuccess(!!hasListings));
      })
      .catch(e => {
        // TODO: dispatch flash message
        dispatch(fetchCurrentUserHasListingsError(e));
      });
  };

export const fetchCurrentUser = () =>
  (dispatch, getState, sdk) => {
    dispatch(usersMeRequest());
    const { isAuthenticated } = getState().Auth;

    if (!isAuthenticated) {
      // Ignore when not logged in, current user should be null
      return Promise.resolve({});
    }

    return sdk.users
      .me()
      .then(response => {
        dispatch(usersMeSuccess(response.data.data));
      })
      .then(() => {
        dispatch(fetchCurrentUserHasListings());
      })
      .catch(e => {
        // TODO: dispatch flash message
        dispatch(usersMeError(e));
      });
  };

export const createStripeAccount = (bankAccountToken, address) =>
  (dispatch, getState, sdk) => {
    dispatch(stripeAccountCreateRequest());
    return sdk.users
      .createStripeAccount({ bankAccountToken, address })
      .then(response => {
        dispatch(stripeAccountCreateSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(stripeAccountCreateError(e));
        throw e;
      })
      .then(() => dispatch(fetchCurrentUser()));
  };
