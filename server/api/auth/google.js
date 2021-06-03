const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const loginWithIdp = require('./loginWithIdp');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const rootUrl = process.env.REACT_APP_CANONICAL_ROOT_URL;
const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

let callbackURL = null;

const useDevApiServer = process.env.NODE_ENV === 'development' && !!PORT;

if (useDevApiServer) {
  callbackURL = `http://localhost:${PORT}/api/auth/google/callback`;
} else {
  callbackURL = `${rootUrl}/api/auth/google/callback`;
}

const strategyOptions = {
  clientID,
  clientSecret,
  callbackURL,
  passReqToCallback: true,
};

const verifyCallback = (req, accessToken, refreshToken, rawReturn, profile, done) => {
  // We need to add additional parameter `rawReturn` to the callback
  // so that we can access the id_token coming from Google
  // With Google we want to use that id_token instead of accessToken in Flex
  const idpToken = rawReturn.id_token;

  const { email, given_name, family_name } = profile._json;
  const state = req.query.state;
  const queryParams = JSON.parse(state);

  const { from, defaultReturn, defaultConfirm } = queryParams;

  const userData = {
    email,
    firstName: given_name,
    lastName: family_name,
    idpToken,
    from,
    defaultReturn,
    defaultConfirm,
  };

  done(null, userData);
};

// ClientId is required when adding a new Google strategy to passport
if (clientID) {
  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));
}

exports.authenticateGoogle = (req, res, next) => {
  const from = req.query.from ? req.query.from : null;
  const defaultReturn = req.query.defaultReturn ? req.query.defaultReturn : null;
  const defaultConfirm = req.query.defaultConfirm ? req.query.defaultConfirm : null;

  const params = {
    ...(!!from && { from }),
    ...(!!defaultReturn && { defaultReturn }),
    ...(!!defaultConfirm && { defaultConfirm }),
  };

  const paramsAsString = JSON.stringify(params);

  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    state: paramsAsString,
  })(req, res, next);
};

// Use custom callback for calling loginWithIdp enpoint
// to log in the user to Flex with the data from Google
exports.authenticateGoogleCallback = (req, res, next) => {
  passport.authenticate('google', function(err, user) {
    loginWithIdp(err, user, req, res, clientID, 'google');
  })(req, res, next);
};
