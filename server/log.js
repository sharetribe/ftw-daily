/**
 * Error logging for the Starter App server. Can be used to
 * strap on an external error logging service like Sentry
 * or just plain printing errors to the log.
 */

const Raven = require('raven');

// Sentry client key
let SENTRY_DSN;

/**
 * Set up error loggin. If a Sentry DSN is defined
 * Sentry client is configured.
 */
exports.setup = (sentryDsn, env) => {
  if (sentryDsn) {
    Raven.config(sentryDsn, {
      environment: env,
      autoBreadcrumbs: {
        http: true,
      },
    }).install();

    SENTRY_DSN = sentryDsn;
  }
};

/**
 * Returns a Sentry request handler in case
 * Sentry client is set up.
 */
exports.requestHandler = () => {
  if (SENTRY_DSN) {
    return Raven.requestHandler();
  } else {
    return (req, res, next) => {
      next();
    };
  }
};

/**
 * Returns a Sentry error handler in case
 * Sentry client is set up.
 */
exports.errorHandler = () => {
  if (SENTRY_DSN) {
    return Raven.errorHandler();
  } else {
    return (err, req, res, next) => {
      next(err);
    };
  }
};

/**
 * Logs a error. If Sentry client is set up
 * passes the error to that. Otherwise prints
 * the error to `console.error`.
 *
 * @param {Error} e Error that occurred
 * @param {Object} data Additional data to be sent to Sentry
 */
exports.error = (e, data) => {
  if (SENTRY_DSN) {
    Raven.captureException(e, { extra: data });
  } else {
    console.error(e);
  }
};
