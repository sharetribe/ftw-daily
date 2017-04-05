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

export const UPLOAD_IMAGE_REQUEST = 'app/EditListingPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/EditListingPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/EditListingPage/UPLOAD_IMAGE_ERROR';

export const UPDATE_IMAGE_ORDER = 'app/EditListingPage/UPDATE_IMAGE_ORDER';

// ================ Reducer ================ //

const initialState = {
  // Error instance placeholders for each endpoint
  createListingsError: null,
  showListingsError: null,
  submittedListingId: null,
  redirectToListing: false,
  images: {},
  imageOrder: [],
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
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, createListingsError: payload, redirectToListing: false };

    case SHOW_LISTINGS_REQUEST:
      return { ...state, showListingsError: null };
    case SHOW_LISTINGS_SUCCESS:
      return initialState;
    case SHOW_LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, showListingsError: payload, redirectToListing: false };

    case UPLOAD_IMAGE_REQUEST: {
      // payload.params: { id: 'tempId', file }
      const images = {
        ...state.images,
        [payload.params.id]: { ...payload.params, uploadImageError: false },
      };
      return { ...state, images, imageOrder: state.imageOrder.concat([payload.params.id]) };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      // payload.params: { id: 'tempId', imageId: 'some-real-id'}
      const { id, imageId } = payload;
      const file = state.images[id].file;
      const images = { ...state.images, [id]: { id, imageId, file, uploadImageError: false } };
      return { ...state, images };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      console.error(payload);
      const { id, error } = payload;
      const { file } = state.images[id];
      const images = {
        ...state.images,
        [id]: { id, file, imageId: null, uploadImageError: error },
      };
      return { ...state, images };
    }
    case UPDATE_IMAGE_ORDER:
      return { ...state, imageOrder: payload.imageOrder };

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const updateImageOrder = imageOrder => ({
  type: UPDATE_IMAGE_ORDER,
  payload: { imageOrder },
});

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

// SDK method: listings.uploadImage
export const uploadImage = requestAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccess = successAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageError = errorAction(UPLOAD_IMAGE_ERROR);

// ================ Thunk ================ //

export function requestShowListing(actionPayload) {
  return (dispatch, getState, sdk) => {
    dispatch(showListings(actionPayload));
    return sdk.listings
      .show(actionPayload)
      .then(response => {
        // EditListingPage fetches new listing data, which also needs to be added to global data
        dispatch(globalShowListingsSuccess(response));
        // In case of success, we'll clear state.EditListingPage (user will be redirected away)
        dispatch(showListingsSuccess(response));
        return response;
      })
      .catch(e => dispatch(showListingsError(e)));
  };
}

export function requestCreateListing(data) {
  return (dispatch, getState, sdk) => {
    const { bankAccountToken, country, ...actionPayload } = data;
    // eslint-disable-next-line no-console
    console.log('TODO: call API with Stripe token:', bankAccountToken, 'and country:', country);
    dispatch(createListing(actionPayload));
    return sdk.listings
      .create(actionPayload)
      .then(response => {
        const id = response.data.data.id.uuid;
        // Modify store to understand that we have created listing and can redirect away
        dispatch(createListingSuccess(response));
        // Fetch listing data so that redirection is smooth
        dispatch(requestShowListing({ id, include: ['author', 'images'] }));
        return response;
      })
      .catch(e => dispatch(createListingError(e)));
  };
}

// Images return imageId which we need to map with previously generated temporary id
export function requestImageUpload(actionPayload) {
  return (dispatch, getState, sdk) => {
    const id = actionPayload.id;
    dispatch(uploadImage(actionPayload));
    return sdk.listings
      .uploadImage({ image: actionPayload.file })
      .then(resp => dispatch(uploadImageSuccess({ data: { id, imageId: resp.data.data.id } })))
      .catch(e => dispatch(uploadImageError({ data: { id, error: e } })));
  };
}
