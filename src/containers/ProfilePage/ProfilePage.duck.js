import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';
import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const SHOW_USER_REQUEST = 'app/ProfilePage/SHOW_USER_REQUEST';
export const SHOW_USER_SUCCESS = 'app/ProfilePage/SHOW_USER_SUCCESS';
export const SHOW_USER_ERROR = 'app/ProfilePage/SHOW_USER_ERROR';

// ================ Reducer ================ //

const initialState = {
  userId: null,
  userShowInProgress: false,
  userShowError: null,
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

// ================ Thunks ================ //

export const showUser = userId => (dispatch, getState, sdk) => {
  dispatch(showUserRequest(userId));
  dispatch(fetchCurrentUser());
  return sdk.users
    .show({ id: userId, include: ['profileImage'] })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(showUserSuccess());
      return response;
    })
    .catch(e => showUserError(storableError(e)));
};
