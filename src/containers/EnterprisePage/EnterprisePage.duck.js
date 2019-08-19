import contentfulClient from '../../util/contentful';




// ================ Action types ================ //


export const FETCH_ENTERPRISEPAGEDATA_REQUEST = 'app/EnterprisePage/FETCH_ENTERPRISEPAGEDATA_REQUEST';
export const FETCH_ENTERPRISEPAGEDATA_SUCCESS = 'app/EnterprisePage/FETCH_ENTERPRISEPAGEDATA_SUCCESS';
export const FETCH_ENTERPRISEPAGEDATA_ERROR = 'app/EnterprisePage/FETCH_ENTERPRISEPAGEDATA_ERROR';
export const SET_INITIAL_STATE = 'app/EnterprisePage/SET_INITIAL_STATE';

// ================ Reducer ================ //

const initialState = {
  enterprisePageEntryId: '0',
  enterprisePageFetched: false,
  enterprisePageData: {},
  enterprisePageFetchError: null,
};

export default function EnterprisePageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case FETCH_ENTERPRISEPAGEDATA_REQUEST:
      return { ...state, enterprisePageFetchError: null , enterprisePageEntryId: payload};
    case FETCH_ENTERPRISEPAGEDATA_SUCCESS:
      return { ...state, enterprisePageData: payload.entryData, enterprisePageFetched: true };
    case FETCH_ENTERPRISEPAGEDATA_ERROR:
      return { ...state, enterprisePageFetchError: true };
    default:
      return state;
  }
}

// ================ Action creators ================ //
export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

const fetchEnterprisePageDataRequest = entryId => ({
  type: FETCH_ENTERPRISEPAGEDATA_REQUEST,
  payload: {entryId}
});

export const fetchEnterprisePageDataSuccess = entryData => ({
  type: FETCH_ENTERPRISEPAGEDATA_SUCCESS,
  payload: { entryData },
});

const fetchEnterprisePageDataError = e => ({
  type: FETCH_ENTERPRISEPAGEDATA_ERROR,
  error: true,
  payload: e,
});
// ================ Thunks ================ //

export const fetchEnterprisePageData = entryId => (dispatch, getState) => {
  dispatch(fetchEnterprisePageDataRequest(entryId));

  contentfulClient
  .getEntry(entryId)
  .then(response => {
    const entryData = response.fields;
    console.log(entryData);

    dispatch(fetchEnterprisePageDataSuccess(entryData));
    return entryData;
  })
  .catch(e => dispatch(fetchEnterprisePageDataError(e)));

};

export const loadData = entryId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState(entryId));

  return Promise.all([
    dispatch(fetchEnterprisePageData(entryId)),
  ]);
};
