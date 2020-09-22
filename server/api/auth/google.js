const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authWithIdp = require('./authWithIdp');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const callbackURL = `http://localhost:${PORT}/api/auth/google/callback`;
const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const strategyOptions = {
  clientID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  const { email, given_name, family_name } = profile._json;
  const userData = {
    email,
    firstName: given_name,
    lastName: family_name,
    accessToken,
    refreshToken,
  };

  done(null, userData);
};

passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

exports.authenticateGoogle = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
});

exports.authenticateGoogleCallback = (req, res, next) => {
  passport.authenticate('google', function(err, user) {
    authWithIdp(err, user, req, res, clientID, 'Google');
  })(req, res, next);
};
