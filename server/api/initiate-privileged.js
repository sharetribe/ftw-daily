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

const getTrustedSdk = req => {
  // Get handle to tokenStore and initialize it from the cookies of the
  // incoming HTTP request
  const cookieTokenStore = sharetribeSdk.tokenStore.expressCookieStore({
    clientId,
    req,
    secure,
  });

  // Initiate an SDK instance for token exchange
  const sdk = sharetribeSdk.createInstance({
    transitVerbose,
    clientId,
    clientSecret,
    httpAgent,
    httpsAgent,
    tokenStore: cookieTokenStore,
    typeHandlers,
    baseUrl,
  });

  // Perform a token exchange
  console.log('exchange token');
  return sdk.exchangeToken()
    .then(response => {
      // Setup a trusted sdk with the token we got from the exchange:
      const token = response.data;

      // Important! Do not use a cookieTokenStore here but a memoryStore
      // instead so that we don't leak the token back to browser client.
      const tokenStore = sharetribeSdk.tokenStore.memoryStore();
      tokenStore.setToken(token);

      console.log('create trusted SDK');
      return sharetribeSdk.createInstance({
        transitVerbose,
        clientId, // We don't need CLIENT_SECRET here anymore
        tokenStore,
        httpAgent,
        httpsAgent,
        typeHandlers,
        baseUrl,
      });
    });
};

module.exports = (req, res) => {
  const { bodyParams, queryParams } = req.body;
  console.log('================================================================');
  console.log('transition privileged');
  console.log(bodyParams);
  console.log(queryParams);

  getTrustedSdk(req)
    .then(trustedSdk => {
      console.log('initiating tx with trusted SDK');
      return trustedSdk.transactions.initiate(bodyParams, queryParams);
    })
    .then(response => {
      console.log('response from tx initiate:', response);
      res
        .status(response.status)
        .json(response.data)
        .end();
    })
    .catch(e => {
      console.error('error in tx initiate');
      console.error('status:', e.status, 'status text:', e.statusText);
      console.error('error data:');
      console.error(JSON.stringify(e.data, null, '  '));
      res.status(e.status || 500).json({}).end();
    });
};
