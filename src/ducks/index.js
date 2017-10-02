/**
 * Import reducers from shared ducks modules (default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import { reducer as form } from 'redux-form';
import Auth from './Auth.duck';
import FlashNotification from './FlashNotification.duck';
import LocationFilter from './LocationFilter.duck';
import UI from './UI.duck';
import marketplaceData from './marketplaceData.duck';
import user from './user.duck';
import EmailVerification from './EmailVerification.duck';
import log from './log.duck';

export {
  form,
  Auth,
  FlashNotification,
  LocationFilter,
  UI,
  marketplaceData,
  user,
  EmailVerification,
  log,
};
