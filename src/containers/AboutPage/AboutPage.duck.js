import contentfulClient from '../../util/contentful';




// ================ Action types ================ //


export const FETCH_ABOUTPAGEDATA_REQUEST = 'app/AboutPage/FETCH_ABOUTPAGEDATA_REQUEST';
export const FETCH_ABOUTPAGEDATA_SUCCESS = 'app/AboutPage/FETCH_ABOUTPAGEDATA_SUCCESS';
export const FETCH_ABOUTPAGEDATA_ERROR = 'app/AboutPage/FETCH_ABOUTPAGEDATA_ERROR';
export const SET_INITIAL_STATE = 'app/AboutPage/SET_INITIAL_STATE';

// ================ Reducer ================ //

const initialState = {
  aboutPageEntryId: null,
  aboutPageFetched: false,
  aboutPageData: {},
  aboutPageFetchError: null,
};

export default function AboutPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case FETCH_ABOUTPAGEDATA_REQUEST:
      return { ...state, aboutPageFetchError: null , aboutPageEntryId: payload};
    case FETCH_ABOUTPAGEDATA_SUCCESS:
      return { ...state, aboutPageData: payload.entryData, aboutPageFetched: true };
    case FETCH_ABOUTPAGEDATA_ERROR:
      return { ...state, aboutPageFetchError: true };
    default:
      return state;
  }
}

// ================ Action creators ================ //
export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

const fetchAboutPageDataRequest = entryId => ({
  type: FETCH_ABOUTPAGEDATA_REQUEST,
  payload: {entryId}
});

export const fetchAboutPageDataSuccess = entryData => ({
  type: FETCH_ABOUTPAGEDATA_SUCCESS,
  payload: { entryData },
});

const fetchAboutPageDataError = e => ({
  type: FETCH_ABOUTPAGEDATA_ERROR,
  error: true,
  payload: e,
});
// ================ Thunks ================ //

export const fetchAboutPageData = entryId => (dispatch, getState) => {
  dispatch(fetchAboutPageDataRequest());

  contentfulClient
  .getEntry(entryId)
  .then(response => {
    const entryData = response.fields;
    

    dispatch(fetchAboutPageDataSuccess(entryData));
    return entryData;
  })
  .catch(e => dispatch(fetchAboutPageDataError(e)));

};

export const loadData = entryId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState(entryId));

  return Promise.all([
    dispatch(fetchAboutPageData(entryId)),
  ]);
};
