/**
 * This is the main server to run the production application.
 *
 * Running the server requires that `npm run build` is run so that the
 * production JS bundle can be imported.
 *
 * This server renders the requested URL in the server side for
 * performance, SEO, etc., and properly handles redirects, HTTP status
 * codes, and serving the static assets.
 *
 * When the application is loaded in a browser, the client side app
 * takes control and all the functionality such as routing is handled
 * in the client.
 */

// This enables nice stacktraces from the minified production bundle
require('source-map-support').install();

// Configure process.env with .env.* files
require('./env').configureEnv();

const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const enforceSsl = require('express-enforces-ssl');
const path = require('path');
const sharetribeSdk = require('sharetribe-flex-sdk');
const sitemap = require('express-sitemap');
const auth = require('./auth');
const apiRouter = require('./apiRouter');
const renderer = require('./renderer');
const dataLoader = require('./dataLoader');
const fs = require('fs');
const log = require('./log');
const { sitemapStructure } = require('./sitemap');
const csp = require('./csp');
const sdkUtils = require('./api-util/sdk');

const buildPath = path.resolve(__dirname, '..', 'build');
const env = process.env.REACT_APP_ENV;
const dev = process.env.REACT_APP_ENV === 'development';
const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ID = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const BASE_URL = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const TRANSIT_VERBOSE = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';
const USING_SSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';
const TRUST_PROXY = process.env.SERVER_SHARETRIBE_TRUST_PROXY || null;
const CSP = process.env.REACT_APP_CSP;
const cspReportUrl = '/csp-report';
const cspEnabled = CSP === 'block' || CSP === 'report';
const app = express();

const errorPage = fs.readFileSync(path.join(buildPath, '500.html'), 'utf-8');

// load sitemap and robots file structure
// and write those into files
sitemap(sitemapStructure()).toFile();

// Setup error logger
log.setup();
// Add logger request handler. In case Sentry is set up
// request information is added to error context when sent
// to Sentry.
app.use(log.requestHandler());

// The helmet middleware sets various HTTP headers to improve security.
// See: https://www.npmjs.com/package/helmet
app.use(helmet());

if (cspEnabled) {
  // When a CSP directive is violated, the browser posts a JSON body
  // to the defined report URL and we need to parse this body.
  app.use(
    bodyParser.json({
      type: ['json', 'application/csp-report'],
    })
  );

  // CSP can be turned on in report or block mode. In report mode, the
  // browser checks the policy and calls the report URL when the
  // policy is violated, but doesn't block any requests. In block
  // mode, the browser also blocks the requests.
  const reportOnly = CSP === 'report';
  app.use(csp(cspReportUrl, USING_SSL, reportOnly));
}

// Redirect HTTP to HTTPS if USING_SSL is `true`.
// This also works behind reverse proxies (load balancers) as they are for example used by Heroku.
// In such cases, however, the TRUST_PROXY parameter has to be set (see below)
//
// Read more: https://github.com/aredo/express-enforces-ssl
//
if (USING_SSL) {
  app.use(enforceSsl());
}

// Set the TRUST_PROXY when running the app behind a reverse proxy.
//
// For example, when running the app in Heroku, set TRUST_PROXY to `true`.
//
// Read more: https://expressjs.com/en/guide/behind-proxies.html
//
if (TRUST_PROXY === 'true') {
  app.enable('trust proxy');
} else if (TRUST_PROXY === 'false') {
  app.disable('trust proxy');
} else if (TRUST_PROXY !== null) {
  app.set('trust proxy', TRUST_PROXY);
}

app.use(compression());
app.use('/static', express.static(path.join(buildPath, 'static')));
// server robots.txt from the root
app.use('/robots.txt', express.static(path.join(buildPath, 'robots.txt')));
app.use(cookieParser());

// Use basic authentication when not in dev mode. This is
// intentionally after the static middleware to skip basic auth for
// static resources.
if (!dev) {
  const USERNAME = process.env.BASIC_AUTH_USERNAME;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;
  const hasUsername = typeof USERNAME === 'string' && USERNAME.length > 0;
  const hasPassword = typeof PASSWORD === 'string' && PASSWORD.length > 0;

  // If BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD have been set - let's use them
  if (hasUsername && hasPassword) {
    app.use(auth.basicAuth(USERNAME, PASSWORD));
  }
}

// Server-side routes that do not render the application
app.use('/api', apiRouter);

const noCacheHeaders = {
  'Cache-control': 'no-cache, no-store, must-revalidate',
};

// Instantiate HTTP(S) Agents with keepAlive set to true.
// This will reduce the request time for consecutive requests by
// reusing the existing TCP connection, thus eliminating the time used
// for setting up new TCP connections.
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });




const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;


// shopify - based on https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-express and https://shopify.dev/tutorials/graphql-with-node-and-express


const dotenv = require('dotenv').config();
// const express = require('express');
// const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const fetch = require('node-fetch');

const apiKey = SHOPIFY_API_KEY;
const apiSecret = SHOPIFY_API_SECRET_KEY;

// TODO (SY): change scopes
const scopes = 'read_orders';
const forwardingAddress = "https://b63a1cac1054.ngrok.io"; // Replace this with your HTTPS Forwarding address

app.get('/shopify', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});

app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex'),
      'utf-8'
    );
    let hashEquals = false;
    // timingSafeEqual will prevent any timing attacks. Arguments must be buffers
    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
      // timingSafeEqual will return an error if the input buffers are not the same length.
    } catch (e) {
      hashEquals = false;
    };

    if (!hashEquals) {
      return res.status(400).send('HMAC validation failed');
    }

    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {
        const accessToken = accessTokenResponse.access_token;

        console.log('access_token');
        console.log(accessToken);
        // // TODO (SY): Store access token somewhere safer
        // document.cookie=`accessToken=${accessToken}`;
        const shopRequestUrl = 'https://' + shop + '/admin/api/2020-07/shop.json';
        const shopRequestHeaders = {
          'X-Shopify-Access-Token': accessToken,
        };

        request.get(shopRequestUrl, { headers: shopRequestHeaders })
          .then((shopResponse) => {
            res.end(shopResponse);
          })
          .catch((error) => {
            res.status(error.statusCode).send(error.error.error_description);
          });
        // TODO
        // Use access token to make API call to 'shop' endpoint
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });

    // TODO
    // Validate request is from Shopify
    // Exchange temporary code for a permanent access token
    // Use access token to make API call to 'shop' endpoint
  } else {
    res.status(400).send('Required parameters missing');
  }
});


app.get("/shop-info", (req, res) => {

  // let cookies = cookie.parse(document.cookie);
  // shop should be stored in a variable somewhere 
  fetch("https://sonias-clothing-store.myshopify.com/admin/api/graphql.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": '<insert access token here>',
    },
    body: JSON.stringify({
      query: `{
         shop {
           name
           url
           email
           myshopifyDomain
         }
       }`
    })
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log("data returned:\n", data);
      res.send(data);
    });
});


// Shopify paste from https://github.com/Shopify/shopify-express
// const shopifyExpress = require('@shopify/shopify-express');
// const session = require('express-session');


// // const {
// //   SHOPIFY_API_KEY,
// //   // SHOPIFY_APP_HOST,
// //   SHOPIFY_API_SECRET_KEY,
// //   // NODE_ENV,
// // } = process.env;



// // session is necessary for api proxy and auth verification
// app.use(session({secret: SHOPIFY_API_SECRET_KEY}));

// const {routes, withShop} = shopifyExpress({
//   host: SHOPIFY_APP_HOST,
//   apiKey: SHOPIFY_API_KEY,
//   secret: SHOPIFY_API_SECRET_KEY,
//   scope: ['write_orders, write_products'],
//   accessMode: 'offline',
//   afterAuth(request, response) {
//     const { session: { accessToken, shop } } = request;
//     // install webhooks or hook into your own app here
//     return response.redirect('/');
//   },
// });




// // mounts '/auth' and '/api' off of '/shopify'
// app.use('/shopify', routes);

// // shields myAppMiddleware from being accessed without session
// app.use('/myApp', withShop({authBaseUrl: '/shopify'}), myAppMiddleware)

// // Shopify paste end

app.get('*', (req, res) => {
  if (req.url.startsWith('/static/')) {
    // The express.static middleware only handles static resources
    // that it finds, otherwise passes them through. However, we don't
    // want to render the app for missing static resources and can
    // just return 404 right away.
    return res.status(404).send('Static asset not found.');
  }

  if (req.url === '/_status.json') {
    return res.status(200).send({ status: 'ok' });
  }

  const context = {};

  // Get handle to tokenStore
  // We check in unauthorized cases if requests have set tokens to cookies
  const tokenStore = sharetribeSdk.tokenStore.expressCookieStore({
    clientId: CLIENT_ID,
    req,
    res,
    secure: USING_SSL,
  });

  const baseUrl = BASE_URL ? { baseUrl: BASE_URL } : {};

  const sdk = sharetribeSdk.createInstance({
    transitVerbose: TRANSIT_VERBOSE,
    clientId: CLIENT_ID,
    httpAgent: httpAgent,
    httpsAgent: httpsAgent,
    tokenStore,
    typeHandlers: sdkUtils.typeHandlers,
    ...baseUrl,
  });

  // Until we have a better plan for caching dynamic content and we
  // make sure that no sensitive data can appear in the prefetched
  // data, let's disable response caching altogether.
  res.set(noCacheHeaders);

  dataLoader
    .loadData(req.url, sdk)
    .then(preloadedState => {
      const html = renderer.render(req.url, context, preloadedState);

      if (dev) {
        const debugData = {
          url: req.url,
          context,
        };
        console.log(`\nRender info:\n${JSON.stringify(debugData, null, '  ')}`);
      }

      if (context.unauthorized) {
        // Routes component injects the context.unauthorized when the
        // user isn't logged in to view the page that requires
        // authentication.

        const token = tokenStore.getToken();
        const scopes = !!token && token.scopes;
        const isAnonymous = !!scopes && scopes.length === 1 && scopes[0] === 'public-read';
        if (isAnonymous) {
          res.status(401).send(html);
        } else {
          // If the token is associated with other than public-read scopes, we
          // assume that client can handle the situation
          // TODO: improve by checking if the token is valid (needs an API call)
          res.status(200).send(html);
        }
      } else if (context.forbidden) {
        res.status(403).send(html);
      } else if (context.url) {
        // React Router injects the context.url if a redirect was rendered
        res.redirect(context.url);
      } else if (context.notfound) {
        // NotFoundPage component injects the context.notfound when a
        // 404 should be returned
        res.status(404).send(html);
      } else {
        res.send(html);
      }
    })
    .catch(e => {
      log.error(e, 'server-side-render-failed');
      res.status(500).send(errorPage);
    });
});

// Set error handler. If Sentry is set up, all error responses
// will be logged there.
app.use(log.errorHandler());

if (cspEnabled) {
  // Dig out the value of the given CSP report key from the request body.
  const reportValue = (req, key) => {
    const report = req.body ? req.body['csp-report'] : null;
    return report && report[key] ? report[key] : key;
  };

  // Handler for CSP violation reports.
  app.post(cspReportUrl, (req, res) => {
    const effectiveDirective = reportValue(req, 'effective-directive');
    const blockedUri = reportValue(req, 'blocked-uri');
    const msg = `CSP: ${effectiveDirective} doesn't allow ${blockedUri}`;
    log.error(new Error(msg), 'csp-violation');
    res.status(204).end();
  });
}

app.listen(PORT, () => {
  const mode = dev ? 'development' : 'production';
  console.log(`Listening to port ${PORT} in ${mode} mode`);
  if (dev) {
    console.log(`Open http://localhost:${PORT}/ and start hacking!`);
  }
});
