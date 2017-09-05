const requestAction = actionType => params => ({ type: actionType, payload: { params } });
const successAction = actionType => result => ({ type: actionType, payload: result.data });
const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

// ================ Action types ================ //

export const UPLOAD_IMAGE_REQUEST = 'app/EditListingPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/EditListingPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/EditListingPage/UPLOAD_IMAGE_ERROR';

export const REMOVE_LISTING_IMAGE = 'app/EditListingPage/REMOVE_LISTING_IMAGE';

// ================ Reducer ================ //

const initialState = {
  // Error instance placeholders for each endpoint
  uploadImageError: null,
  image: {},
  updateInProgress: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {

    case UPLOAD_IMAGE_REQUEST: {
      // payload.params: { id: 'tempId', file }
      const image = {
        [payload.params.id]: { ...payload.params },
      };

      return {
        ...state,
        image,
        updateInProgress: true,
        uploadImageError: null,
      };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      // payload.params: { id: 'tempId', imageId: 'some-real-id'}
      const { id, imageId } = payload;
      const file = state.image[id].file;
      const image = { [id]: { id, imageId, file } };
      return { ...state, image, updateInProgress: false };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      return { ...state, image: null,  updateInProgress: false , uploadImageError: payload.error };
    }

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

// SDK method: listings.uploadImage
export const uploadImage = requestAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccess = successAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageError = errorAction(UPLOAD_IMAGE_ERROR);

// ================ Thunk ================ //

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
