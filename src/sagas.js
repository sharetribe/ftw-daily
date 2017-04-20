import { watchSdk } from './ducks/sdk.duck';

const createRootSaga = sdk =>
  function* rootSaga() {
    yield [watchSdk(sdk)];
  };

export default createRootSaga;
