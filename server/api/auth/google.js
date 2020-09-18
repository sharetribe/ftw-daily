const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authWithIdp = require('./authWithIdp');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const callbackURL = `http://localhost:${PORT}/api/auth/google/callback`;

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log('Google profile:', profile);
  const userData = {
    //email
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
  passport.authenticate('google', function(err, user, info) {
    authWithIdp(err, user, info, req, res, process.env.GOOGLE_CLIENT_ID);
  })(req, res, next);
};
