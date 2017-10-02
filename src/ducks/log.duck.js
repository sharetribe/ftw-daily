/**
 * A utility duck file that can be used to log errors
 * asynchronously without interrupting other thunks.
 */

import * as log from '../util/log';

// ================ Thunks ================ //

export const logError = (error, data) => () => log.error(error, data);
