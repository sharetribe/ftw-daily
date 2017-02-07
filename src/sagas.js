import { watchLogin, watchLogout } from './ducks/Auth.ducks';
import { watchLoadListings } from './containers/SearchPage/SearchPage.ducks';
import sdk from './util/fakeSDK';

export default function* rootSaga() {
  yield [watchLogin(), watchLogout(), watchLoadListings(sdk)];
}
