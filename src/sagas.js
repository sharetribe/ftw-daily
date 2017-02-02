import { watchLogin, watchLogout } from './ducks/Auth.ducks';
import { watchLoadListings } from './containers/SearchPage/SearchPage.ducks';

export default function* rootSaga() {
  yield [watchLogin(), watchLogout(), watchLoadListings()];
}
