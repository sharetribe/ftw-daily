import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'terms-of-service';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { termsOfServicePage: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
