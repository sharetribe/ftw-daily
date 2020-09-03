const sdk = require('../utils/sdk');

let isAuthorized = () => {

  return async (req, res, next) => {

    // TODO: Uncomment later
    // return next();

    try {
      let authInfo = await sdk.getSdk(req, res).authInfo();

      if (authInfo && authInfo.isAnonymous === false) {
        return next()
      }

      throw new Error("User is NOT logged in.");

    } catch (error) {
      return res.status(401).send({
        status: false,
        error: error.message
      });
    }
  }
};

module.exports = {
  isAuthorized
}
