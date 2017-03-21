import { watchAuthInfo, watchAuth } from './ducks/Auth.duck';
import { watchSdk } from './ducks/sdk.duck';

const createRootSaga = sdk =>
  function* rootSaga() {
    yield [watchAuthInfo(sdk), watchAuth(sdk), watchSdk(sdk)];
  };

export default createRootSaga;
