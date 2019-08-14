import contentfulClient from '../../util/contentful';




// ================ Action types ================ //


export const FETCH_FORCOMPANIESPAGEDATA_REQUEST = 'app/ForCompaniesPage/FETCH_FORCOMPANIESPAGEDATA_REQUEST';
export const FETCH_FORCOMPANIESPAGEDATA_SUCCESS = 'app/ForCompaniesPage/FETCH_FORCOMPANIESPAGEDATA_SUCCESS';
export const FETCH_FORCOMPANIESPAGEDATA_ERROR = 'app/ForCompaniesPage/FETCH_FORCOMPANIESPAGEDATA_ERROR';
export const SET_INITIAL_STATE = 'app/ForCompaniesPage/SET_INITIAL_STATE';

// ================ Reducer ================ //

const initialState = {
  forCompaniesPageEntryId: null,
  forCompaniesPageFetched: false,
  forCompaniesPageData: {},
  forCompaniesPageFetchError: null,
};

export default function ForCompaniesPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case FETCH_FORCOMPANIESPAGEDATA_REQUEST:
      return { ...state, forCompaniesPageFetchError: null , forCompaniesPageEntryId: payload};
    case FETCH_FORCOMPANIESPAGEDATA_SUCCESS:
      return { ...state, forCompaniesPageData: payload.entryData, forCompaniesPageFetched: true };
    case FETCH_FORCOMPANIESPAGEDATA_ERROR:
      return { ...state, forCompaniesPageFetchError: true };
    default:
      return state;
  }
}

// ================ Action creators ================ //
export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

const fetchForCompaniesPageDataRequest = entryId => ({
  type: FETCH_FORCOMPANIESPAGEDATA_REQUEST,
  payload: {entryId}
});

export const fetchForCompaniesPageDataSuccess = entryData => ({
  type: FETCH_FORCOMPANIESPAGEDATA_SUCCESS,
  payload: { entryData },
});

const fetchForCompaniesPageDataError = e => ({
  type: FETCH_FORCOMPANIESPAGEDATA_ERROR,
  error: true,
  payload: e,
});
// ================ Thunks ================ //

export const fetchForCompaniesPageData = entryId => (dispatch, getState) => {
  dispatch(fetchForCompaniesPageDataRequest());

  contentfulClient
  .getEntry(entryId)
  .then(response => {
    const entryData = response.fields;
    

    dispatch(fetchForCompaniesPageDataSuccess(entryData));
    return entryData;
  })
  .catch(e => dispatch(fetchForCompaniesPageDataError(e)));

};

export const loadData = entryId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState(entryId));

  return Promise.all([
    dispatch(fetchForCompaniesPageData(entryId)),
  ]);
};
