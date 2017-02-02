import { watchLogin, watchLogout } from './ducks/Auth.ducks';

export default function* rootSaga() {
  yield [watchLogin(), watchLogout()];
}
