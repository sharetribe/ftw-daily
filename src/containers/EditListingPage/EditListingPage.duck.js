import { omit, omitBy, isUndefined } from 'lodash';
import { types } from '../../util/sdkLoader';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUserHasListingsSuccess } from '../../ducks/user.duck';

const requestAction = actionType => params => ({ type: actionType, payload: { params } });

const successAction = actionType => result => ({ type: actionType, payload: result.data });

const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

// ================ Action types ================ //

export const MARK_TAB_UPDATED = 'app/EditListingPage/MARK_TAB_UPDATED';
export const CLEAR_UPDATED_TAB = 'app/EditListingPage/CLEAR_UPDATED_TAB';

export const CREATE_LISTING_REQUEST = 'app/EditListingPage/CREATE_LISTING_REQUEST';
export const CREATE_LISTING_SUCCESS = 'app/EditListingPage/CREATE_LISTING_SUCCESS';
export const CREATE_LISTING_ERROR = 'app/EditListingPage/CREATE_LISTING_ERROR';

export const UPDATE_LISTING_REQUEST = 'app/EditListingPage/UPDATE_LISTING_REQUEST';
export const UPDATE_LISTING_SUCCESS = 'app/EditListingPage/UPDATE_LISTING_SUCCESS';
export const UPDATE_LISTING_ERROR = 'app/EditListingPage/UPDATE_LISTING_ERROR';

export const SHOW_LISTINGS_REQUEST = 'app/EditListingPage/SHOW_LISTINGS_REQUEST';
export const SHOW_LISTINGS_SUCCESS = 'app/EditListingPage/SHOW_LISTINGS_SUCCESS';
export const SHOW_LISTINGS_ERROR = 'app/EditListingPage/SHOW_LISTINGS_ERROR';

export const UPLOAD_IMAGE_REQUEST = 'app/EditListingPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/EditListingPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/EditListingPage/UPLOAD_IMAGE_ERROR';

export const UPDATE_IMAGE_ORDER = 'app/EditListingPage/UPDATE_IMAGE_ORDER';

export const CREATE_LISTING_DRAFT = 'app/EditListingPage/CREATE_LISTING_DRAFT';
export const UPDATE_LISTING_DRAFT = 'app/EditListingPage/UPDATE_LISTING_DRAFT';

export const REMOVE_LISTING_IMAGE = 'app/EditListingPage/REMOVE_LISTING_IMAGE';

// ================ Reducer ================ //

const initialState = {
  // Error instance placeholders for each endpoint
  createListingsError: null,
  updateListingError: null,
  showListingsError: null,
  uploadImageError: null,
  submittedListingId: null,
  redirectToListing: false,
  images: {},
  imageOrder: [],
  removedImageIds: [],
  listingDraft: null,
  updatedTab: null,
  updateInProgress: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case MARK_TAB_UPDATED:
      return { ...state, updatedTab: payload };
    case CLEAR_UPDATED_TAB:
      return { ...state, updatedTab: null, updateListingError: null };

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

    case UPDATE_LISTING_REQUEST:
      return { ...state, updateInProgress: true, updateListingError: null };
    case UPDATE_LISTING_SUCCESS:
      return { ...state, updateInProgress: false };
    case UPDATE_LISTING_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, updateInProgress: false, updateListingError: payload };

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
        [payload.params.id]: { ...payload.params },
      };
      return {
        ...state,
        images,
        imageOrder: state.imageOrder.concat([payload.params.id]),
        uploadImageError: null,
      };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      // payload.params: { id: 'tempId', imageId: 'some-real-id'}
      const { id, imageId } = payload;
      const file = state.images[id].file;
      const images = { ...state.images, [id]: { id, imageId, file } };
      return { ...state, images };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      const { id, error } = payload;
      const imageOrder = state.imageOrder.filter(i => i !== id);
      const images = omit(state.images, id);
      return { ...state, imageOrder, images, uploadImageError: error };
    }
    case UPDATE_IMAGE_ORDER:
      return { ...state, imageOrder: payload.imageOrder };

    case CREATE_LISTING_DRAFT:
    case UPDATE_LISTING_DRAFT: {
      const { attributes, images } = state.listingDraft || {};
      const updatedImages = payload.images || images;
      const listingDraft = {
        attributes: { ...attributes, ...omitBy(payload.attributes, isUndefined) },
        images: updatedImages,
      };
      return { ...state, listingDraft };
    }

    case REMOVE_LISTING_IMAGE: {
      const id = payload.imageId;

      // Only mark the image removed if it hasn't been added to the
      // listing already
      const removedImageIds = state.images[id]
        ? state.removedImageIds
        : state.removedImageIds.concat(id);

      // Always remove from the draft since it might be a new image to
      // an existing listing.
      const images = omit(state.images, id);
      const imageOrder = state.imageOrder.filter(i => i !== id);

      return { ...state, images, imageOrder, removedImageIds };
    }

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const markTabUpdated = tab => ({
  type: MARK_TAB_UPDATED,
  payload: tab,
});

export const clearUpdatedTab = () => ({
  type: CLEAR_UPDATED_TAB,
});

export const updateImageOrder = imageOrder => ({
  type: UPDATE_IMAGE_ORDER,
  payload: { imageOrder },
});

// TODO These temporary listing actions will be changed when API supports unpublished listings
export const createListingDraft = listingData => {
  const { description, title } = listingData;
  return {
    type: CREATE_LISTING_DRAFT,
    payload: { attributes: { title, description } },
  };
};

export const updateListingDraft = listingData => {
  const { address, description, title, geolocation, images, price } = listingData;
  return {
    type: UPDATE_LISTING_DRAFT,
    payload: { attributes: { address, description, geolocation, price, title }, images },
  };
};

export const removeListingImage = imageId => ({
  type: REMOVE_LISTING_IMAGE,
  payload: { imageId },
});

// All the action creators that don't have the {Success, Error} suffix
// take the params object that the corresponding SDK endpoint method
// expects.

// SDK method: listings.create
export const createListing = requestAction(CREATE_LISTING_REQUEST);
export const createListingSuccess = successAction(CREATE_LISTING_SUCCESS);
export const createListingError = errorAction(CREATE_LISTING_ERROR);

// SDK method: listings.update
export const updateListing = requestAction(UPDATE_LISTING_REQUEST);
export const updateListingSuccess = successAction(UPDATE_LISTING_SUCCESS);
export const updateListingError = errorAction(UPDATE_LISTING_ERROR);

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
        dispatch(addMarketplaceEntities(response));
        // In case of success, we'll clear state.EditListingPage (user will be redirected away)
        dispatch(showListingsSuccess(response));
        return response;
      })
      .catch(e => dispatch(showListingsError(e)));
  };
}

export function requestCreateListing(data) {
  return (dispatch, getState, sdk) => {
    dispatch(createListing(data));

    return sdk.listings
      .create(data)
      .then(response => {
        const id = response.data.data.id.uuid;
        // Modify store to understand that we have created listing and can redirect away
        dispatch(createListingSuccess(response));
        // Fetch listing data so that redirection is smooth
        dispatch(requestShowListing({ id, include: ['author', 'images'] }));
        return response;
      })
      .then(response => {
        // We must update the user duck since this might be the first
        // listing for the user, therefore changing the
        // currentUserHasListings flag in the store.
        dispatch(fetchCurrentUserHasListingsSuccess(true));
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
    return sdk.images
      .uploadListingImage({ image: actionPayload.file })
      .then(resp => dispatch(uploadImageSuccess({ data: { id, imageId: resp.data.data.id } })))
      .catch(e => dispatch(uploadImageError({ id, error: e })));
  };
}

// Update the given tab of the wizard with the given data. This saves
// the data to the listing, and marks the tab updated so the UI can
// display the state.
export function requestUpdateListing(tab, data) {
  return (dispatch, getState, sdk) => {
    dispatch(updateListing(data));
    const { id } = data;
    let updateResponse;
    return sdk.listings
      .update(data)
      .then(response => {
        updateResponse = response;
        const payload = { id, include: ['author', 'images'] };
        return dispatch(requestShowListing(payload));
      })
      .then(() => {
        dispatch(markTabUpdated(tab));
        dispatch(updateListingSuccess(updateResponse));
      })
      .catch(e => dispatch(updateListingError(e)));
  };
}

// loadData is run for each tab of the wizard. When editing an
// existing listing, the listing must be fetched first.
export function loadData(params) {
  return dispatch => {
    dispatch(clearUpdatedTab());
    const { id, type } = params;
    if (type === 'new') {
      // No need to fetch anything when creating a new listing
      return Promise.resolve(null);
    }
    const payload = {
      id: new types.UUID(id),
      include: ['author', 'images'],
    };
    return dispatch(requestShowListing(payload));
  };
}
