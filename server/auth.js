const auth = require('basic-auth');

/**
 * Create a basic authentication middleware function that checks
 * against the given credentials.
 */
exports.basicAuth = (username, password) => {
  if (!username || !password) {
    throw new Error('Missing required username and password for basic authentication.');
  }

  return (req, res, next) => {
    const user = auth(req);

    if (user && user.name === username && user.pass === password) {
      next();
    } else {
      res
        .set({ 'WWW-Authenticate': 'Basic realm="Authentication required"' })
        .status(401)
        .end("I'm afraid I cannot let you do that.");
    }
  };
};
