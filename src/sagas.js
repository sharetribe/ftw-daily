import { watchAuth } from './ducks/Auth.duck';
import { watchSdk } from './ducks/sdk.duck';

const createRootSaga = sdk =>
  function* rootSaga() {
    yield [watchAuth(sdk), watchSdk(sdk)];
  };

export default createRootSaga;
