const sharetribeSdk = require('sharetribe-flex-sdk');

const CLIENT_ID = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;

const userToken = req => {
  const tokenStore = sharetribeSdk.tokenStore.expressCookieStore({
    clientId: CLIENT_ID,
    req,
  });
  return tokenStore.getToken();
};

module.exports = (req, res) => {
  console.log('transition privileged');
  console.log('req body:');
  console.log(req.body);
  console.log('user token:');
  console.log(userToken(req));

  res
    .status(200)
    .json({
      req: {
        method: req.method,
        cookies: req.cookies || null,
        body: req.body,
        cookieHeader: req.get('Cookie'),
      },
    })
    .end();
};
