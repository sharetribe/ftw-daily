import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const GET_LATEST_LISTINGS_REQUEST = 'app/LandingPage/GET_LATEST_LISTINGS_REQUEST';
export const GET_LATEST_LISTINGS_SUCCESS = 'app/LandingPage/GET_LATEST_LISTINGS_SUCCESS';
export const GET_LATEST_LISTINGS_ERROR = 'app/LandingPage/GET_LATEST_LISTINGS_ERROR';

// ================ Reducer ================ //

const initialState = {
  latestListingsIds: [],
  getLatestListingsInProgress: false,
  getLatestListingsError: null,
};

const landingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LATEST_LISTINGS_REQUEST:
      return {
        ...state,
        getLatestListingsInProgress: true,
        getLatestListingsError: null,
      };
    case GET_LATEST_LISTINGS_SUCCESS:
      return {
        ...state,
        latestListingsIds: payload,
        getLatestListingsInProgress: true,
      };
    case GET_LATEST_LISTINGS_ERROR:
      return {
        ...state,
        getLatestListingsInProgress: false,
        getLatestListingsError: payload,
      };
    default:
      return state;
  }
};

export default landingPageReducer;

// ================ Action creators ================ //

export const getLatestListingsRequest = () => ({
  type: GET_LATEST_LISTINGS_REQUEST,
});

export const getLatestListingsSuccess = res => ({
  type: GET_LATEST_LISTINGS_SUCCESS,
  payload: res,
});

export const getLatestListingsError = e => ({
  type: GET_LATEST_LISTINGS_ERROR,
  error: true,
  payload: e,
});

export const getLatestListing = searchParams => (dispatch, getState, sdk) => {
  dispatch(getLatestListingsRequest());

  return sdk.listings
  .query(searchParams)
  .then(res => {
    dispatch(addMarketplaceEntities(res));
    const resultIds = res.data.data.map(i=> i.id);
    dispatch(getLatestListingsSuccess(resultIds));
  })
  .catch(e=> {
    dispatch(getLatestListingsError(storableError(e)));

    throw e;
  })
};
