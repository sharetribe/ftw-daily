/**
 * Error logging for the Starter App server. Can be used to
 * strap on an external error logging service like Sentry
 * or just plain printing errors to the log.
 */

const Raven = require('raven');

const ENV = process.env.REACT_APP_ENV;
const SENTRY_DSN = process.env.SERVER_SENTRY_DSN;

/**
 * Set up error loggin. If a Sentry DSN is defined
 * Sentry client is configured.
 */
exports.setup = () => {
  if (SENTRY_DSN) {
    // Configure the Sentry client. As is, this catches unhandled
    // exceptions from starting the server etc. but does not catch the
    // ones thrown from Express.js middleware functions. For those
    // an error handler has to be added to the Express app.
    Raven.config(SENTRY_DSN, {
      environment: ENV,
      autoBreadcrumbs: {
        http: true,
      },
    }).install();
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
 * @param {String} code Error code
 * @param {Object} data Additional data to be sent to Sentry
 */
exports.error = (e, code, data) => {
  if (SENTRY_DSN) {
    Raven.captureException(e, { tags: { code }, extra: data });
  } else {
    console.error(e);
  }
};
