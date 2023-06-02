import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'provider-page';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { providerPage: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};