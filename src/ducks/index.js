/**
 * Import reducers from shared ducks modules (default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import { reducer as formReducer } from 'redux-form';
import FlashNotification from './FlashNotification.ducks';
import LocationFilter from './LocationFilter.ducks';

export { formReducer as form, FlashNotification, LocationFilter };
