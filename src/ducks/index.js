/**
 * Import reducers from shared ducks modules (default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import { reducer as formReducer } from 'redux-form';
import Auth from './Auth.ducks';
import FlashNotification from './FlashNotification.ducks';
import LocationFilter from './LocationFilter.ducks';

export { formReducer as form, Auth, FlashNotification, LocationFilter };
