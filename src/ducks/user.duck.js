import { authInfo } from './Auth.duck';
import { updatedEntities, denormalisedEntities } from '../util/data';
import { TX_TRANSITION_PREAUTHORIZE } from '../util/propTypes';

// ================ Action types ================ //

export const CURRENT_USER_SHOW_REQUEST = 'app/user/CURRENT_USER_SHOW_REQUEST';
export const CURRENT_USER_SHOW_SUCCESS = 'app/user/CURRENT_USER_SHOW_SUCCESS';
export const CURRENT_USER_SHOW_ERROR = 'app/user/CURRENT_USER_SHOW_ERROR';

export const CLEAR_CURRENT_USER = 'app/user/CLEAR_CURRENT_USER';

export const STRIPE_ACCOUNT_CREATE_REQUEST = 'app/user/STRIPE_ACCOUNT_CREATE_REQUEST';
export const STRIPE_ACCOUNT_CREATE_SUCCESS = 'app/user/STRIPE_ACCOUNT_CREATE_SUCCESS';
export const STRIPE_ACCOUNT_CREATE_ERROR = 'app/user/STRIPE_ACCOUNT_CREATE_ERROR';

export const STRIPE_ACCOUNT_CLEAR_ERROR = 'app/user/STRIPE_ACCOUNT_CLEAR_ERROR';

export const FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST';
export const FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS';
export const FETCH_CURRENT_USER_HAS_LISTINGS_ERROR = 'app/user/FETCH_CURRENT_USER_HAS_LISTINGS_ERROR';

export const FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST = 'app/user/FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST';
export const FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS = 'app/user/FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS';
export const FETCH_CURRENT_USER_NOTIFICATIONS_ERROR = 'app/user/FETCH_CURRENT_USER_NOTIFICATIONS_ERROR';

export const FETCH_CURRENT_USER_HAS_ORDERS_REQUEST = 'app/user/FETCH_CURRENT_USER_HAS_ORDERS_REQUEST';
export const FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS = 'app/user/FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS';
export const FETCH_CURRENT_USER_HAS_ORDERS_ERROR = 'app/user/FETCH_CURRENT_USER_HAS_ORDERS_ERROR';

export const SEND_VERIFICATION_EMAIL_REQUEST = 'app/user/SEND_VERIFICATION_EMAIL_REQUEST';
export const SEND_VERIFICATION_EMAIL_SUCCESS = 'app/user/SEND_VERIFICATION_EMAIL_SUCCESS';
export const SEND_VERIFICATION_EMAIL_ERROR = 'app/user/SEND_VERIFICATION_EMAIL_ERROR';

// ================ Reducer ================ //

const initialState = {
  currentUser: null,
  currentUserShowError: null,
  createStripeAccountInProgress: false,
  createStripeAccountError: null,
  currentUserHasListings: false,
  currentUserHasListingsError: null,
  currentUserNotificationCount: 0,
  currentUserNotificationCountError: null,
  currentUserHasOrders: null, // This is not fetched unless unverified emails exist
  currentUserHasOrdersError: null,
  sendVerificationEmailInProgress: false,
  sendVerificationEmailError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER_SHOW_REQUEST:
      return { ...state, currentUserShowError: null };
    case CURRENT_USER_SHOW_SUCCESS:
      return { ...state, currentUser: payload };
    case CURRENT_USER_SHOW_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, currentUserShowError: payload };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        currentUserShowError: null,
        currentUserHasListings: false,
        currentUserHasListingsError: null,
        currentUserNotificationCount: 0,
        currentUserNotificationCountError: null,
      };

    case FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST:
      return { ...state, currentUserHasListingsError: null };
    case FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS:
      return { ...state, currentUserHasListings: payload.hasListings };
    case FETCH_CURRENT_USER_HAS_LISTINGS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserHasListingsError: payload };

    case FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST:
      return { ...state, currentUserNotificationCountError: null };
    case FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS:
      return { ...state, currentUserNotificationCount: payload.transactions.length };
    case FETCH_CURRENT_USER_NOTIFICATIONS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserNotificationCountError: payload };

    case FETCH_CURRENT_USER_HAS_ORDERS_REQUEST:
      return { ...state, currentUserHasOrdersError: null };
    case FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS:
      return { ...state, currentUserHasOrders: payload.hasOrders };
    case FETCH_CURRENT_USER_HAS_ORDERS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, currentUserHasOrdersError: payload };

    case STRIPE_ACCOUNT_CREATE_REQUEST:
      return { ...state, createStripeAccountError: null, createStripeAccountInProgress: true };
    case STRIPE_ACCOUNT_CREATE_SUCCESS:
      return { ...state, createStripeAccountInProgress: false };
    case STRIPE_ACCOUNT_CREATE_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, createStripeAccountError: payload, createStripeAccountInProgress: false };

    case STRIPE_ACCOUNT_CLEAR_ERROR:
      return { ...state, createStripeAccountError: null, createStripeAccountInProgress: false };

    case SEND_VERIFICATION_EMAIL_REQUEST:
      return {
        ...state,
        sendVerificationEmailInProgress: true,
        sendVerificationEmailError: null,
      };
    case SEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        sendVerificationEmailInProgress: false,
      };
    case SEND_VERIFICATION_EMAIL_ERROR:
      return {
        ...state,
        sendVerificationEmailInProgress: false,
        sendVerificationEmailError: payload,
      };

    default:
      return state;
  }
}

// ================ Selectors ================ //

export const verificationSendingInProgress = state => {
  return state.user.sendVerificationEmailInProgress;
};

// ================ Action creators ================ //

export const currentUserShowRequest = () => ({ type: CURRENT_USER_SHOW_REQUEST });

export const currentUserShowSuccess = user => ({
  type: CURRENT_USER_SHOW_SUCCESS,
  payload: user,
});

export const currentUserShowError = e => ({
  type: CURRENT_USER_SHOW_ERROR,
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

export const stripeAccountClearError = () => ({
  type: STRIPE_ACCOUNT_CLEAR_ERROR,
});

const fetchCurrentUserHasListingsRequest = () => ({
  type: FETCH_CURRENT_USER_HAS_LISTINGS_REQUEST,
});

export const fetchCurrentUserHasListingsSuccess = hasListings => ({
  type: FETCH_CURRENT_USER_HAS_LISTINGS_SUCCESS,
  payload: { hasListings },
});

const fetchCurrentUserHasListingsError = e => ({
  type: FETCH_CURRENT_USER_HAS_LISTINGS_ERROR,
  error: true,
  payload: e,
});

const fetchCurrentUserNotificationsRequest = () => ({
  type: FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST,
});

export const fetchCurrentUserNotificationsSuccess = transactions => ({
  type: FETCH_CURRENT_USER_NOTIFICATIONS_SUCCESS,
  payload: { transactions },
});

const fetchCurrentUserNotificationsError = e => ({
  type: FETCH_CURRENT_USER_NOTIFICATIONS_ERROR,
  error: true,
  payload: e,
});

const fetchCurrentUserHasOrdersRequest = () => ({
  type: FETCH_CURRENT_USER_HAS_ORDERS_REQUEST,
});

export const fetchCurrentUserHasOrdersSuccess = hasOrders => ({
  type: FETCH_CURRENT_USER_HAS_ORDERS_SUCCESS,
  payload: { hasOrders },
});

const fetchCurrentUserHasOrdersError = e => ({
  type: FETCH_CURRENT_USER_HAS_ORDERS_ERROR,
  error: true,
  payload: e,
});

export const sendVerificationEmailRequest = () => ({
  type: SEND_VERIFICATION_EMAIL_REQUEST,
});

export const sendVerificationEmailSuccess = () => ({
  type: SEND_VERIFICATION_EMAIL_SUCCESS,
});

export const sendVerificationEmailError = e => ({
  type: SEND_VERIFICATION_EMAIL_ERROR,
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
        // TODO: dispatch flash message: "Something went wrong while retrieving user info"
        dispatch(fetchCurrentUserHasListingsError(e));
      });
  };

export const fetchCurrentUserHasOrders = () =>
  (dispatch, getState, sdk) => {
    dispatch(fetchCurrentUserHasOrdersRequest());

    if (!getState().user.currentUser) {
      dispatch(fetchCurrentUserHasOrdersSuccess(false));
      return Promise.resolve(null);
    }

    const params = {
      only: 'order',
      page: 1,
      per_page: 1,
    };

    return sdk.transactions
      .query(params)
      .then(response => {
        const hasOrders = response.data.data && response.data.data.length > 0;
        dispatch(fetchCurrentUserHasOrdersSuccess(!!hasOrders));
      })
      .catch(e => {
        // TODO: dispatch flash message: "Something went wrong while retrieving user info"
        dispatch(fetchCurrentUserHasOrdersError(e));
      });
  };

// Notificaiton page size is max (100 items on page)
const NOTIFICATION_PAGE_SIZE = 100;

export const fetchCurrentUserNotifications = () =>
  (dispatch, getState, sdk) => {
    dispatch(fetchCurrentUserNotificationsRequest());

    const apiQueryParams = {
      only: 'sale',
      last_transitions: [TX_TRANSITION_PREAUTHORIZE],
      page: 1,
      per_page: NOTIFICATION_PAGE_SIZE,
    };

    sdk.transactions
      .query(apiQueryParams)
      .then(response => {
        const transactions = response.data.data;
        dispatch(fetchCurrentUserNotificationsSuccess(transactions));
      })
      .catch(e => {
        // TODO: dispatch flash message: "Something went wrong while retrieving user info"
        dispatch(fetchCurrentUserNotificationsError(e));
        throw e;
      });
  };

export const fetchCurrentUser = () =>
  (dispatch, getState, sdk) => {
    dispatch(currentUserShowRequest());
    const { isAuthenticated } = getState().Auth;

    if (!isAuthenticated) {
      // Make sure current user is null
      dispatch(currentUserShowSuccess(null));
      return Promise.resolve({});
    }

    return sdk.currentUser
      .show({ include: ['profileImage'] })
      .then(response => {
        // Include profile image to denormalized user entity
        const currentUserId = response.data.data.id;
        const entities = updatedEntities({}, response.data);
        const denormalised = denormalisedEntities(entities, 'current-user', [currentUserId]);
        const currentUser = denormalised[0];
        dispatch(currentUserShowSuccess(currentUser));
        return currentUser;
      })
      .then(currentUser => {
        dispatch(fetchCurrentUserHasListings());
        dispatch(fetchCurrentUserNotifications());
        if (!currentUser.attributes.emailVerified) {
          dispatch(fetchCurrentUserHasOrders());
        }

        // Make sure auth info is up to date
        dispatch(authInfo());
      })
      .catch(e => {
        // Make sure auth info is up to date
        dispatch(authInfo());

        // TODO: dispatch flash message: "Something went wrong while retrieving user info"
        dispatch(currentUserShowError(e));
      });
  };

export const createStripeAccount = payoutDetails =>
  (dispatch, getState, sdk) => {
    dispatch(stripeAccountCreateRequest());

    let accountResponse;

    return sdk.currentUser
      .createStripeAccount(payoutDetails)
      .then(response => {
        accountResponse = response;
        return dispatch(fetchCurrentUser());
      })
      .then(() => {
        dispatch(stripeAccountCreateSuccess(accountResponse));
      })
      .catch(e => {
        dispatch(stripeAccountCreateError(e));
        throw e;
      });
  };

export const sendVerificationEmail = () =>
  (dispatch, getState, sdk) => {
    if (verificationSendingInProgress(getState())) {
      return Promise.reject(new Error('Verification email sending already in progress'));
    }
    dispatch(sendVerificationEmailRequest());
    return sdk.currentUser
      .sendVerificationEmail()
      .then(() => dispatch(sendVerificationEmailSuccess()))
      .catch(e => dispatch(sendVerificationEmailError(e)));
  };
