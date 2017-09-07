import { updatedEntities, denormalisedEntities } from '../../util/data';
import { currentUserShowSuccess } from '../../ducks/user.duck';

const requestAction = actionType => params => ({ type: actionType, payload: { params } });
const successAction = actionType => result => ({ type: actionType, payload: result.data });
const errorAction = actionType => error => ({ type: actionType, payload: error, error: true });

// ================ Action types ================ //

export const MARK_FORM_UPDATED = 'app/EditListingPage/MARK_FORM_UPDATED';
export const CLEAR_UPDATED_FORM = 'app/EditListingPage/CLEAR_UPDATED_FORM';

export const UPLOAD_IMAGE_REQUEST = 'app/ProfileSettingsPage/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'app/ProfileSettingsPage/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'app/ProfileSettingsPage/UPLOAD_IMAGE_ERROR';

export const UPDATE_PROFILE_REQUEST = 'app/ProfileSettingsPage/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'app/ProfileSettingsPage/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'app/ProfileSettingsPage/UPDATE_PROFILE_ERROR';

// ================ Reducer ================ //

const initialState = {
  formUpdated: false,
  image: null,
  uploadImageError: null,
  uploadInProgress: false,
  updateInProgress: false,
  updateProfileError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_IMAGE_REQUEST:
      // payload.params: { id: 'tempId', file }
      return {
        ...state,
        image: { ...payload.params },
        uploadInProgress: true,
        uploadImageError: null,
      };
    case UPLOAD_IMAGE_SUCCESS: {
      // payload: { id: 'tempId', imageId: 'some-real-id'}
      const { id, imageId } = payload;
      const { file } = state.image || {};
      const image = { id, imageId, file };
      return { ...state, image, uploadInProgress: false };
    }
    case UPLOAD_IMAGE_ERROR: {
      // eslint-disable-next-line no-console
      return { ...state, image: null, uploadInProgress: false, uploadImageError: payload.error };
    }

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updateInProgress: true,
        updateProfileError: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateInProgress: false,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateInProgress: false,
        updateProfileError: payload,
      };

    case MARK_FORM_UPDATED:
      return { ...state, formUpdated: payload };
    case CLEAR_UPDATED_FORM:
      return { ...state, formUpdated: null, updateProfileError: null, uploadImageError: null };

    default:
      return state;
  }
}

// ================ Selectors ================ //

// ================ Action creators ================ //

export const markFormUpdated = tab => ({
  type: MARK_FORM_UPDATED,
  payload: tab,
});

export const clearUpdatedForm = () => ({
  type: CLEAR_UPDATED_FORM,
});

// SDK method: images.uploadListingImage
export const uploadImageRequest = requestAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccess = successAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageError = errorAction(UPLOAD_IMAGE_ERROR);

// SDK method: sdk.currentUser.updateProfile
export const updateProfileRequest = requestAction(UPDATE_PROFILE_REQUEST);
export const updateProfileSuccess = successAction(UPDATE_PROFILE_SUCCESS);
export const updateProfileError = errorAction(UPDATE_PROFILE_ERROR);

// ================ Thunk ================ //

// Images return imageId which we need to map with previously generated temporary id
export function uploadImage(actionPayload) {
  return (dispatch, getState, sdk) => {
    const id = actionPayload.id;
    dispatch(uploadImageRequest(actionPayload));

    return sdk.images
      .uploadProfileImage({ image: actionPayload.file })
      .then(resp => dispatch(uploadImageSuccess({ data: { id, imageId: resp.data.data.id } })))
      .catch(e => dispatch(uploadImageError({ id, error: e })));
  };
}

export const updateProfile = actionPayload => {
  return (dispatch, getState, sdk) => {
    dispatch(updateProfileRequest());

    return sdk.currentUser
      .updateProfile(actionPayload, { expand: true, include: ['profileImage'] })
      .then(response => {
        dispatch(updateProfileSuccess(response));

        // Temporary denormalization for profileImage
        // Profile image will be included to users
        const currentUserId = response.data.data.id;
        const entities = updatedEntities({}, response.data);
        const denormalised = denormalisedEntities(entities, 'current-user', [currentUserId]);
        const currentUser = denormalised[0];

        // Update current user in state.user.currentUser through user.duck.js
        dispatch(currentUserShowSuccess(currentUser));
      })
      .catch(e => dispatch(updateProfileError(e)));
  };
};
