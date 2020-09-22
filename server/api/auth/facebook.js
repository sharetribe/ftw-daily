const passport = require('passport');
const passportFacebook = require('passport-facebook');
const authWithIdp = require('./authWithIdp');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const clientID = process.env.REACT_APP_FACEBOOK_APP_ID;
const clientSecret = process.env.FACEBOOK_APP_SECRET;

const FacebookStrategy = passportFacebook.Strategy;

const callbackURL = `http://localhost:${PORT}/api/auth/facebook/callback`;

const strategyOptions = {
  clientID,
  clientSecret,
  callbackURL,
  profileFields: ['id', 'displayName', 'name', 'emails'],
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  const { email, first_name, last_name } = profile._json;

  const userData = {
    email,
    firstName: first_name,
    lastName: last_name,
    accessToken,
    refreshToken,
  };

  done(null, userData);
};

passport.use(new FacebookStrategy(strategyOptions, verifyCallback));

exports.authenticateFacebook = passport.authenticate('facebook', { scope: ['email'] });

exports.authenticateFacebookCallback = (req, res, next) => {
  passport.authenticate('facebook', function(err, user) {
    authWithIdp(err, user, req, res, clientID, 'Facebook');
  })(req, res, next);
};
