/**
 * A utility duck file that allows logger to be
 * used with Redux's `dispatch` function.
 */

import * as log from '../util/log';

// ================ Thunks ================ //

export const logError = (error, code, data) => () => log.error(error, code, data);
