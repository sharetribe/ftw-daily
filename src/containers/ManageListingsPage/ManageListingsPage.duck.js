import { updatedEntities, denormalisedEntities } from '../../util/data';

// ================ Action types ================ //

export const FETCH_LISTINGS_REQUEST = 'app/ManageListingsPage/FETCH_LISTINGS_REQUEST';
export const FETCH_LISTINGS_SUCCESS = 'app/ManageListingsPage/FETCH_LISTINGS_SUCCESS';
export const FETCH_LISTINGS_ERROR = 'app/ManageListingsPage/FETCH_LISTINGS_ERROR';

export const OPEN_LISTING_REQUEST = 'app/ManageListingsPage/OPEN_LISTING_REQUEST';
export const OPEN_LISTING_SUCCESS = 'app/ManageListingsPage/OPEN_LISTING_SUCCESS';
export const OPEN_LISTING_ERROR = 'app/ManageListingsPage/OPEN_LISTING_ERROR';

export const CLOSE_LISTING_REQUEST = 'app/ManageListingsPage/CLOSE_LISTING_REQUEST';
export const CLOSE_LISTING_SUCCESS = 'app/ManageListingsPage/CLOSE_LISTING_SUCCESS';
export const CLOSE_LISTING_ERROR = 'app/ManageListingsPage/CLOSE_LISTING_ERROR';

export const ADD_OWN_ENTITIES = 'app/ManageListingsPage/ADD_OWN_ENTITIES';

// ================ Reducer ================ //

const initialState = {
  pagination: null,
  queryParams: null,
  queryInProgress: false,
  queryListingsError: null,
  currentPageResultIds: [],
  ownEntities: {},
  openingListing: null,
  openingListingError: null,
  closingListing: null,
  closingListingError: null,
};

const resultIds = data => data.data.map(l => l.id);

const merge = (state, apiResponse) => {
  return {
    ...state,
    ownEntities: updatedEntities(state.ownEntities, apiResponse.data),
  };
};

const updateListingAttributes = (state, listingEntity) => {
  const oldListing = state.ownEntities.listing[listingEntity.id.uuid];
  const updatedListing = { ...oldListing, attributes: listingEntity.attributes };
  const ownListingEntities = {
    ...state.ownEntities.listing,
    [listingEntity.id.uuid]: updatedListing,
  };
  return {
    ...state,
    ownEntities: { ...state.ownEntities, listing: ownListingEntities },
  };
};

const manageListingsPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LISTINGS_REQUEST:
      return {
        ...state,
        queryParams: payload.queryParams,
        queryInProgress: true,
        queryListingsError: null,
        currentPageResultIds: [],
      };
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        currentPageResultIds: resultIds(payload.data),
        pagination: payload.data.meta,
        queryInProgress: false,
      };
    case FETCH_LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, queryInProgress: false, queryListingsError: payload };

    case OPEN_LISTING_REQUEST:
      return {
        ...state,
        openingListing: payload.listingId,
        openingListingError: null,
      };
    case OPEN_LISTING_SUCCESS:
      return {
        ...updateListingAttributes(state, payload.data),
        openingListing: null,
      };
    case OPEN_LISTING_ERROR: {
      // eslint-disable-next-line no-console
      console.error(payload);
      return {
        ...state,
        openingListing: null,
        openingListingError: {
          listingId: state.openingListing,
          error: payload,
        },
      };
    }

    case CLOSE_LISTING_REQUEST:
      return {
        ...state,
        closingListing: payload.listingId,
        closingListingError: null,
      };
    case CLOSE_LISTING_SUCCESS:
      return {
        ...updateListingAttributes(state, payload.data),
        closingListing: null,
      };
    case CLOSE_LISTING_ERROR: {
      // eslint-disable-next-line no-console
      console.error(payload);
      return {
        ...state,
        closingListing: null,
        closingListingError: {
          listingId: state.closingListing,
          error: payload,
        },
      };
    }

    case ADD_OWN_ENTITIES:
      return merge(state, payload);

    default:
      return state;
  }
};

export default manageListingsPageReducer;

// ================ Selectors ================ //

/**
 * Get the denormalised own listing entities with the given IDs
 *
 * @param {Object} state the full Redux store
 * @param {Array<UUID>} listingIds listing IDs to select from the store
 */
export const getListingsById = (state, listingIds) => {
  const { ownEntities } = state.ManageListingsPage;
  try {
    return denormalisedEntities(ownEntities, 'listing', listingIds);
  } catch (e) {
    return [];
  }
};

/**
 * Get the denormalised own entities from the given entity references.
 *
 * @param {Object} state the full Redux store
 *
 * @param {Array<{ id, type }} entityRefs References to entities that
 * we want to query from the data. Currently we expect that all the
 * entities have the same type.
 *
 * @return {Array<Object>} denormalised entities
 */
export const getOwnEntities = (state, entityRefs) => {
  const { ownEntities } = state.ManageListingsPage;
  const type = entityRefs.length > 0 ? entityRefs[0].type : null;
  const ids = entityRefs.map(ref => ref.id);
  try {
    return denormalisedEntities(ownEntities, type, ids);
  } catch (e) {
    return [];
  }
};

// ================ Action creators ================ //

// This works the same way as addMarketplaceEntities,
// but we don't want to mix own listings with searched listings
// (own listings data contains different info - e.g. exact location etc.)
export const addOwnEntities = apiResponse => ({
  type: ADD_OWN_ENTITIES,
  payload: apiResponse,
});

export const openListingRequest = listingId => ({
  type: OPEN_LISTING_REQUEST,
  payload: { listingId },
});

export const openListingSuccess = response => ({
  type: OPEN_LISTING_SUCCESS,
  payload: response.data,
});

export const openListingError = e => ({
  type: OPEN_LISTING_ERROR,
  error: true,
  payload: e,
});

export const closeListingRequest = listingId => ({
  type: CLOSE_LISTING_REQUEST,
  payload: { listingId },
});

export const closeListingSuccess = response => ({
  type: CLOSE_LISTING_SUCCESS,
  payload: response.data,
});

export const closeListingError = e => ({
  type: CLOSE_LISTING_ERROR,
  error: true,
  payload: e,
});

export const queryListingsRequest = queryParams => ({
  type: FETCH_LISTINGS_REQUEST,
  payload: { queryParams },
});

export const queryListingsSuccess = response => ({
  type: FETCH_LISTINGS_SUCCESS,
  payload: { data: response.data },
});

export const queryListingsError = e => ({
  type: FETCH_LISTINGS_ERROR,
  error: true,
  payload: e,
});

// Throwing error for new (loadData may need that info)
export const queryOwnListings = queryParams =>
  (dispatch, getState, sdk) => {
    dispatch(queryListingsRequest(queryParams));

    const { include = [], page, perPage } = queryParams;

    // TODO: API can't handle camelCase request parameter yet.
    return sdk.listings
      .queryOwn({ include, page, per_page: perPage })
      .then(response => {
        dispatch(addOwnEntities(response));
        dispatch(queryListingsSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(queryListingsError(e));
        throw e;
      });
  };

export const closeListing = listingId =>
  (dispatch, getState, sdk) => {
    dispatch(closeListingRequest(listingId));

    return sdk.listings
      .close({ id: listingId }, { expand: true })
      .then(response => {
        dispatch(closeListingSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(closeListingError(e));
      });
  };

export const openListing = listingId =>
  (dispatch, getState, sdk) => {
    dispatch(openListingRequest(listingId));

    return sdk.listings
      .open({ id: listingId }, { expand: true })
      .then(response => {
        dispatch(openListingSuccess(response));
        return response;
      })
      .catch(e => {
        dispatch(openListingError(e));
      });
  };
