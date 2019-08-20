import contentfulClient from '../../util/contentful';




// ================ Action types ================ //


export const FETCH_SPORTSPAGEENTITIES_REQUEST = 'app/SportsPage/FETCH_SPORTSPAGEENTITIES_REQUEST';
export const FETCH_SPORTSPAGEENTITIES_SUCCESS = 'app/SportsPage/FETCH_SPORTSPAGEENTITIES_SUCCESS';
export const FETCH_SPORTSPAGEENTITIES_ERROR = 'app/SportsPage/FETCH_SPORTSPAGEENTITIES_ERROR';
export const SET_INITIAL_STATE = 'app/SportsPage/SET_INITIAL_STATE';

// ================ Reducer ================ //

const initialState = {
  sportsPageFetched: false,
  sportsPageEntities: {},
  sportsPageFetchError: null,
};

export default function SportsPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case FETCH_SPORTSPAGEENTITIES_REQUEST:
      return { ...state, sportsPageFetchError: null , sportsPageEntryId: payload};
    case FETCH_SPORTSPAGEENTITIES_SUCCESS:
      return { ...state, sportsPageEntities: payload.entryData, sportsPageFetched: true };
    case FETCH_SPORTSPAGEENTITIES_ERROR:
      return { ...state, sportsPageFetchError: true };
    default:
      return state;
  }
}

// ================ Action creators ================ //
export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

const fetchSportsPageEntitiesRequest = entryId => ({
  type: FETCH_SPORTSPAGEENTITIES_REQUEST,
  payload: {entryId}
});

export const fetchSportsPageEntitiesSuccess = entryData => ({
  type: FETCH_SPORTSPAGEENTITIES_SUCCESS,
  payload: { entryData },
});

const fetchSportsPageEntitiesError = e => ({
  type: FETCH_SPORTSPAGEENTITIES_ERROR,
  error: true,
  payload: e,
});
// ================ Thunks ================ //

export const fetchSportsPageEntities = typeId => (dispatch, getState) => {
  dispatch(fetchSportsPageEntitiesRequest(typeId));

  //api call to fetch all entries belonging to content type "Sport"
  contentfulClient
  .getEntries({
    content_type: typeId
  })
  .then(response => {
    const entryData = response.items;
    console.log(entryData);

    dispatch(fetchSportsPageEntitiesSuccess(entryData));
    return entryData;
  })
  .catch(e => dispatch(fetchSportsPageEntitiesError(e)));

};

export const loadData = typeId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState(typeId));

  return Promise.all([
    dispatch(fetchSportsPageEntities(typeId)),
  ]);
};
