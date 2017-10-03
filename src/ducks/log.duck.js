/**
 * A utility duck file that can be used to pass
 * error data to a logger.
 */

import * as log from '../util/log';

// ================ Thunks ================ //

export const logError = (error, code, data) => () => log.error(error, code, data);
