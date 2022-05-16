import { storableError } from '../util/errors';
import * as log from '../util/log';

// ================ Action types ================ //

export const ASSETS_REQUEST = 'app/assets/REQUEST';
export const ASSETS_SUCCESS = 'app/assets/SUCCESS';
export const ASSETS_ERROR = 'app/assets/ERROR';

// ================ Reducer ================ //

const initialState = {
  // List of assets that should be fetched and their path in Asset API.
  // assets: { assetName: 'path/to/asset.json' }
  assets: {},
  // Current version of the saved asset.
  // Typically, the version that is returned by the "latest" alias.
  version: null,
  inProgress: false,
  error: null,
};

export default function assetReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ASSETS_REQUEST:
      return { ...state, inProgress: true, error: null };
    case ASSETS_SUCCESS:
      return {
        ...state,
        assets: payload.assets,
        version: payload.version,
        inProgress: false,
      };
    case ASSETS_ERROR:
      return { ...state, inProgress: true, error: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const assetsRequested = () => ({ type: ASSETS_REQUEST });
export const assetsSuccess = (assets, version) => ({
  type: ASSETS_SUCCESS,
  payload: { assets, version },
});
export const assetsError = error => ({
  type: ASSETS_ERROR,
  payload: error,
});

// ================ Thunks ================ //

export const fetchAppAssets = (assets, version) => (dispatch, getState, sdk) => {
  dispatch(assetsRequested());

  // If version is given fetch assets by the version,
  // otherwise default to "latest" alias
  const fetchAssets = version
    ? assetPath => sdk.assetByVersion({ path: assetPath, version })
    : assetPath => sdk.assetByAlias({ path: assetPath, alias: 'latest' });
  const assetEntries = Object.entries(assets);
  const sdkAssets = assetEntries.map(([key, assetPath]) => fetchAssets(assetPath));

  return Promise.all(sdkAssets)
    .then(responses => {
      const version = responses[0]?.data?.meta?.version;
      dispatch(assetsSuccess(assets, version));

      // Returned value looks like this for a single asset with name: "translations":
      // {
      //    translations: {
      //      path: 'content/translations.json', // an example path in Asset Delivery API
      //      data, // translation key & value pairs
      //    },
      // }
      return assetEntries.reduce((collectedAssets, assetEntry, i) => {
        const [name, path] = assetEntry;
        return { ...collectedAssets, [name]: { path, data: responses[i].data.data } };
      }, {});
    })
    .catch(e => {
      log.error(e, 'app-asset-fetch-failed', { assets, version });
      dispatch(assetsError(storableError(e)));
    });
};
