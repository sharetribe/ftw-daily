/**
 * Import reducers from shared ducks modules (default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import { reducer as form } from 'redux-form';
import Auth from './Auth.duck';
import FlashNotification from './FlashNotification.duck';
import LocationFilter from './LocationFilter.duck';

export { form, Auth, FlashNotification, LocationFilter };
