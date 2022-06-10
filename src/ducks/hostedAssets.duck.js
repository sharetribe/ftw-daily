import { denormalizeAssetData } from '../util/data';
import { storableError } from '../util/errors';
import * as log from '../util/log';

// ================ Action types ================ //

export const ASSETS_REQUEST = 'app/assets/REQUEST';
export const ASSETS_SUCCESS = 'app/assets/SUCCESS';
export const ASSETS_ERROR = 'app/assets/ERROR';

export const PAGE_ASSETS_REQUEST = 'app/assets/PAGE_ASSETS_REQUEST';
export const PAGE_ASSETS_SUCCESS = 'app/assets/PAGE_ASSETS_SUCCESS';
export const PAGE_ASSETS_ERROR = 'app/assets/PAGE_ASSETS_ERROR';

// ================ Reducer ================ //

const initialState = {
  // List of app-wide assets that should be fetched and their path in Asset API.
  // appAssets: { assetName: 'path/to/asset.json' }
  appAssets: {},
  pageAssetsData: null,
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
        appAssets: payload.assets,
        version: state.version || payload.version,
        inProgress: false,
      };
    case ASSETS_ERROR:
      return { ...state, inProgress: false, error: payload };

    case PAGE_ASSETS_REQUEST:
      return { ...state, inProgress: true, error: null };
    case PAGE_ASSETS_SUCCESS:
      return { ...state, pageAssetsData: payload, inProgress: false };
    case PAGE_ASSETS_ERROR:
      return { ...state, inProgress: false, error: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const appAssetsRequested = () => ({ type: ASSETS_REQUEST });
export const appAssetsSuccess = (assets, version) => ({
  type: ASSETS_SUCCESS,
  payload: { assets, version },
});
export const appAssetsError = error => ({
  type: ASSETS_ERROR,
  payload: error,
});

export const pageAssetsRequested = () => ({ type: PAGE_ASSETS_REQUEST });
export const pageAssetsSuccess = assets => ({ type: PAGE_ASSETS_SUCCESS, payload: assets });
export const pageAssetsError = error => ({
  type: PAGE_ASSETS_ERROR,
  payload: error,
});

// ================ Thunks ================ //

export const fetchAppAssets = (assets, version) => (dispatch, getState, sdk) => {
  dispatch(appAssetsRequested());

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
      dispatch(appAssetsSuccess(assets, version));

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
      dispatch(appAssetsError(storableError(e)));
    });
};

export const fetchPageAssets = (assets, hasFallback) => (dispatch, getState, sdk) => {
  const version = getState()?.hostedAssets?.version;
  if (typeof version === 'undefined') {
    throw new Error(
      'App-wide assets were not fetched first. Asset version missing from Redux store.'
    );
  }

  dispatch(pageAssetsRequested());

  // If version is given fetch assets by the version,
  // otherwise default to "latest" alias
  const fetchAssets = assetPath => sdk.assetByVersion({ path: assetPath, version });
  const assetEntries = Object.entries(assets);
  const sdkAssets = assetEntries.map(([key, assetPath]) => fetchAssets(assetPath));

  return Promise.all(sdkAssets)
    .then(responses => {
      // Returned value looks like this for a single asset with name: "about-page":
      // {
      //    "about-page": {
      //      path: 'content/about-page.json', // an example path in Asset Delivery API
      //      data, // translation key & value pairs
      //    },
      //    // etc.
      // }
      const pageAssets = assetEntries.reduce((collectedAssets, assetEntry, i) => {
        const [name, path] = assetEntry;
        const assetData = denormalizeAssetData(responses[i].data);
        return { ...collectedAssets, [name]: { path, data: assetData } };
      }, {});
      dispatch(pageAssetsSuccess(pageAssets));
      return pageAssets;
    })
    .catch(e => {
      // If there's a fallback UI, something went wrong when fetching the "known asset" like landing-page.json.
      // If there's no fallback UI created, we assume that the page URL was mistyped for 404 errors.
      if (hasFallback || (!hasFallback && e.status === 404)) {
        log.error(e, 'page-asset-fetch-failed', { assets, version });
      }
      dispatch(pageAssetsError(storableError(e)));
    });
};
