import { watchSdk } from './ducks/marketplaceData.duck';

const createRootSaga = sdk =>
  function* rootSaga() {
    yield [watchSdk(sdk)];
  };

export default createRootSaga;
