import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'privacy-policy';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { privacyPolicy: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
