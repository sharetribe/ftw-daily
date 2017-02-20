import { createInstance } from 'sharetribe-sdk';

import { watchAuth } from './ducks/Auth.duck';
import { watchLoadListings } from './containers/SearchPage/SearchPage.duck';
// eslint-disable-next-line no-unused-vars
import fakeSdk from './util/fakeSDK';

const clientId = '08ec69f6-d37e-414d-83eb-324e94afddf0';
const baseUrl = 'http://localhost:8088';

const sdk = createInstance({ clientId, baseUrl });

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

  // FakeSDK
  // yield [watchAuth(mockSdk), watchLoadListings(fakeSdk)];

  // Real SDK
  yield [watchAuth(mockSdk), watchLoadListings(sdk)];
}
