const http = require('http');
const https = require('https');
const Decimal = require('decimal.js');
const sharetribeSdk = require('sharetribe-flex-sdk');

const clientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const clientSecret = process.env.SHARETRIBE_SDK_CLIENT_SECRET;
const secure = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';
const transitVerbose = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';
const typeHandlers = [
  {
    type: sharetribeSdk.types.BigDecimal,
    customType: Decimal,
    writer: v => new sharetribeSdk.types.BigDecimal(v.toString()),
    reader: v => new Decimal(v.value),
  }
];
const baseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const log = (...args) => {
  const formattedArgs = args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, '  ');
    }
    return arg;
  });
  console.log.apply(console, formattedArgs);
};

const memoryStore = token => {
  const store = sharetribeSdk.tokenStore.memoryStore();
  store.setToken(token);
  return store;
};

// Read the user token from the request cookie
const getUserToken = req => {
  const cookieTokenStore = sharetribeSdk.tokenStore.expressCookieStore({
    clientId,
    req,
    secure,
  });
  return cookieTokenStore.getToken();
};

const getTrustedSdk = req => {
  const userToken = getUserToken(req);
  log('userToken:', userToken);

  // Initiate an SDK instance for token exchange
  const sdk = sharetribeSdk.createInstance({
    transitVerbose,
    clientId,
    clientSecret,
    httpAgent,
    httpsAgent,
    tokenStore: memoryStore(userToken),
    typeHandlers,
    baseUrl,
  });

  // Perform a token exchange
  log('exchange token');
  return sdk.exchangeToken()
    .then(response => {
      // Setup a trusted sdk with the token we got from the exchange:
      const trustedToken = response.data;
      log('trustedToken:', trustedToken);

      log('create trusted SDK');
      return sharetribeSdk.createInstance({
        transitVerbose,

        // We don't need CLIENT_SECRET here anymore
        clientId,

        // Important! Do not use a cookieTokenStore here but a memoryStore
        // instead so that we don't leak the token back to browser client.
        tokenStore: memoryStore(trustedToken),

        httpAgent,
        httpsAgent,
        typeHandlers,
        baseUrl,
      });
    });
};

module.exports = (req, res) => {
  const { bodyParams, queryParams } = req.body;
  log('================================================================');
  log('transition privileged');
  log('bodyParams:', bodyParams);
  log('queryParams:', queryParams);

  getTrustedSdk(req)
    .then(trustedSdk => {
      log('initiating tx with trusted SDK');
      return trustedSdk.transactions.initiate(bodyParams, queryParams);
    })
    .then(response => {
      log('response from tx initiate:', response);
      res
        .status(response.status)
        .json(response.data)
        .end();
    })
    .catch(e => {
      log('error in tx initiate');
      log('status:', e.status, 'status text:', e.statusText);
      log('error data:', e.data);
      res.status(500).json({ message: e.message }).end();
    });
};
