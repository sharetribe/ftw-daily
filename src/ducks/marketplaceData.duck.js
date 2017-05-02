import { updatedEntities, denormalisedEntities } from '../util/data';

const successAction = actionType => data => ({ type: actionType, payload: data });

// ================ Action types ================ //

const SHOW_LISTINGS_SUCCESS = 'app/sdk/SHOW_LISTINGS_SUCCESS';
const ADD_ENTITIES = 'app/sdk/ADD_ENTITIES';

// ================ Reducer ================ //

const initialState = {
  // Database of all the fetched entities.
  entities: {},
};

const merge = (state, apiResponse) => {
  return {
    ...state,
    entities: updatedEntities(state.entities, apiResponse.data),
  };
};

export default function marketplaceDataReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_LISTINGS_SUCCESS:
      return merge(state, payload);

    case ADD_ENTITIES:
      return merge(state, payload);

    default:
      return state;
  }
}

// ================ Selectors ================ //

/**
 * Get the denormalised listing entities with the given IDs
 *
 * @param {Object} data the state part of the Redux store for this SDK reducer
 * @param {Array<UUID>} listingIds listing IDs to select from the store
 */
export const getListingsById = (data, listingIds) => {
  try {
    return denormalisedEntities(data.entities, 'listing', listingIds);
  } catch (e) {
    return [];
  }
};

/**
 * Get the denormalised entities from the given entity references.
 *
 * @param {Object} marketplaceData the state part of the Redux store
 * for this reducer
 *
 * @param {Array<{ id, type }} entityRefs References to entities that
 * we want to query from the data. Currently we expect that all the
 * entities have the same type.
 *
 * @return {Array<Object>} denormalised entities
 */
export const getEntities = (marketplaceData, entityRefs) => {
  const type = entityRefs.length > 0 ? entityRefs[0].type : null;
  const ids = entityRefs.map(ref => ref.id);
  try {
    return denormalisedEntities(marketplaceData.entities, type, ids);
  } catch (e) {
    return [];
  }
};

// ================ Action creators ================ //

// SDK method: listings.show
export const showListingsSuccess = successAction(SHOW_LISTINGS_SUCCESS);

export const addEntities = apiResponse => ({
  type: ADD_ENTITIES,
  payload: apiResponse,
});
