const passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const loginWithIdp = require('./loginWithIdp');
const { createIdToken } = require('../../api-util/idToken');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const rootUrl = process.env.REACT_APP_CANONICAL_ROOT_URL;
const clientID = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

// Identity provider and identity provider client information. They should
// match to an identity provider client "Client ID" and "IdP ID" in Console.
const idpClientId = process.env.LINKEDIN_PROXY_CLIENT_ID;
const idpId = process.env.LINKEDIN_PROXY_IDP_ID;

let callbackURL = null;

const useDevApiServer = process.env.NODE_ENV === 'development' && !!PORT;

if (useDevApiServer) {
  callbackURL = `http://localhost:${PORT}/api/auth/linkedin/callback`;
} else {
  callbackURL = `${rootUrl}/api/auth/linkedin/callback`;
}

const strategyOptions = {
  clientID,
  clientSecret,
  callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
  passReqToCallback: true,
};

const verifyCallback = (req, accessToken, refreshToken, profile, done) => {
  // We can can use util function to generate id token to match OIDC so that we can use
  // our custom id provider in Flex

  const locale = Object.keys(profile._json.firstName.localized)[0];

  const firstName = profile._json.firstName.localized[locale];
  const lastName = profile._json.lastName.localized[locale];
  const email = profile.emails[0].value;

  // LikedIn API doesn't return information if the email is verified or not directly.
  // However, it seems that with OAUTH2 flow authentication is not possible if the email is not verified.
  // There is no official documentation about this, but through testing it seems like this can be trusted
  // For reference: https://stackoverflow.com/questions/19278201/oauth-request-verified-email-address-from-linkedin

  const user = {
    userId: profile.id,
    firstName,
    lastName,
    email,
    emailVerified: true,
  };

  const state = req.query.state;
  const queryParams = JSON.parse(state);

  const { from, defaultReturn, defaultConfirm } = queryParams;

  // These keys are used for signing the ID token (JWT)
  // When you store them to environment variables you should replace
  // any line brakes with '\n'.
  // You should also make sure that the key size is big enough.
  const rsaPrivateKey = process.env.RSA_PRIVATE_KEY;
  const keyId = process.env.KEY_ID;

  createIdToken(idpClientId, user, { signingAlg: 'RS256', rsaPrivateKey, keyId })
    .then(idpToken => {
      const userData = {
        email,
        firstName,
        lastName,
        idpToken,
        from,
        defaultReturn,
        defaultConfirm,
      };
      done(null, userData);
    })
    .catch(e => console.error(e));
};

// ClientId is required when adding a new Linkedin strategy to passport
if (clientID) {
  passport.use(new LinkedInStrategy(strategyOptions, verifyCallback));
}

exports.authenticateLinkedin = (req, res, next) => {
  const from = req.query.from ? req.query.from : null;
  const defaultReturn = req.query.defaultReturn ? req.query.defaultReturn : null;
  const defaultConfirm = req.query.defaultConfirm ? req.query.defaultConfirm : null;

  const params = {
    ...(!!from && { from }),
    ...(!!defaultReturn && { defaultReturn }),
    ...(!!defaultConfirm && { defaultConfirm }),
  };

  const paramsAsString = JSON.stringify(params);

  passport.authenticate('linkedin', {
    state: paramsAsString,
  })(req, res, next);
};

// Use custom callback for calling loginWithIdp enpoint
// to log in the user to Flex with the data from Linkedin
exports.authenticateLinkedinCallback = (req, res, next) => {
  passport.authenticate('linkedin', function(err, user) {
    loginWithIdp(err, user, req, res, idpClientId, idpId);
  })(req, res, next);
};
