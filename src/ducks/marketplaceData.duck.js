import { updatedEntities, denormalisedEntities } from '../util/data';

// ================ Action types ================ //

export const ADD_MARKETPLACE_ENTITIES = 'app/marketplaceData/ADD_MARKETPLACE_ENTITIES';

// ================ Reducer ================ //

const initialState = {
  // Database of all the fetched entities.
  entities: {},
};

const merge = (state, apiResponse) => {
  return {
    ...state,
    entities: updatedEntities({ ...state.entities }, apiResponse.data),
  };
};

export default function marketplaceDataReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADD_MARKETPLACE_ENTITIES:
      return merge(state, payload);

    default:
      return state;
  }
}

// ================ Selectors ================ //

/**
 * Get the denormalised listing entities with the given IDs
 *
 * @param {Object} state the full Redux store
 * @param {Array<UUID>} listingIds listing IDs to select from the store
 */
export const getListingsById = (state, listingIds) => {
  const { entities } = state.marketplaceData;
  try {
    return denormalisedEntities(entities, 'listing', listingIds);
  } catch (e) {
    return [];
  }
};

/**
 * Get the denormalised entities from the given entity references.
 *
 * @param {Object} state the full Redux store
 *
 * @param {Array<{ id, type }} entityRefs References to entities that
 * we want to query from the data. Currently we expect that all the
 * entities have the same type.
 *
 * @return {Array<Object>} denormalised entities
 */
export const getMarketplaceEntities = (state, entityRefs) => {
  const { entities } = state.marketplaceData;
  const type = entityRefs.length > 0 ? entityRefs[0].type : null;
  const ids = entityRefs.map(ref => ref.id);
  try {
    return denormalisedEntities(entities, type, ids);
  } catch (e) {
    return [];
  }
};

/**
 * Get the denormalised transaction entities with the given IDs
 *
 * @param {Object} state the full Redux store
 * @param {Array<UUID>} transactionIds transaction IDs to select from the store
 */
export const getTransactionsById = (state, transactionIds) => {
  const entityRefs = transactionIds.map(id => ({ id, type: 'transaction' }));
  return getMarketplaceEntities(state, entityRefs);
};

// ================ Action creators ================ //

export const addMarketplaceEntities = apiResponse => ({
  type: ADD_MARKETPLACE_ENTITIES,
  payload: apiResponse,
});
