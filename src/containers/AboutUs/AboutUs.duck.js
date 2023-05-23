import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'aboutus';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { aboutus: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
