/**
 * Error logging
 *
 * Can be used to log errors to console or and eternal
 * error logging system, like Sentry for example.
 *
 */

import Raven from 'raven-js';

/**
 * Set up error handling. If a Sentry DSN is
 * provided a Sentry client will be installed.
 *
 * @param {String} sentryDsn A public Sentry DSN
 */
export const setup = (sentryDsn, env) => {
  if (sentryDsn !== undefined) {
    Raven.config(sentryDsn, { environment: env }).install();
  }
};

/**
 * Set user ID for the logger so that it
 * can be attached to Sentry issues.
 *
 * @param {String} userId ID of current user
 */
export const setUserId = userId => {
  if (Raven.isSetup()) {
    Raven.setUserContext({ id: userId });
  }
};

/**
 * Clears the user ID.
 */
export const clearUserId = () => {
  if (Raven.isSetup()) {
    Raven.setUserContext();
  }
};

/**
 * Logs an execption. If Sentry is configured
 * sends the error information there. Otherwise
 * prints the error to the console.
 *
 * @param {Error} e Error that occurred
 * @param {Object} data Additional data to be sent to Sentry
 */
export const error = (e, data) => {
  if (Raven.isSetup()) {
    Raven.captureException(e, { extra: data });
  } else {
    console.error(e); // eslint-disable-line
  }
};
