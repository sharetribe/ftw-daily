import { watchAuth } from './ducks/Auth.ducks';
import { watchLoadListings } from './containers/SearchPage/SearchPage.ducks';
import sdk from './util/fakeSDK';

const mockLogin = (email, password) => new Promise((resolve, reject) => {
  window.setTimeout(
    () => {
      if (email && password) {
        // any non-empty email and password is ok
        resolve({ email, password });
      } else {
        reject(new Error('Invalid credentials, try a valid email and a non-empty password'));
      }
    },
    1000,
  );
});

const mockLogout = () => new Promise(resolve => {
  window.setTimeout(resolve, 1000);
});

// Temporary mock SDK
const mockSdk = { login: mockLogin, logout: mockLogout };

export default function* rootSaga() {
  // TODO: inject sdk in function arguments
  yield [watchAuth(mockSdk), watchLoadListings(sdk)];
}
