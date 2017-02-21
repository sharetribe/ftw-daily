import { watchAuth } from './ducks/Auth.duck';
import { watchLoadListings } from './containers/SearchPage/SearchPage.duck';

const createRootSaga = sdk => function* rootSaga() {
  yield [watchAuth(sdk), watchLoadListings(sdk)];
};

export default createRootSaga;
