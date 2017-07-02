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

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const enforceSsl = require('express-enforces-ssl');
const path = require('path');
const qs = require('qs');
const sharetribeSdk = require('sharetribe-sdk');
const Decimal = require('decimal.js');
const auth = require('./auth');
const renderer = require('./renderer');
const dataLoader = require('./dataLoader');

const buildPath = path.resolve(__dirname, '..', 'build');
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 4000;
const CLIENT_ID = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID ||
  '08ec69f6-d37e-414d-83eb-324e94afddf0';
const BASE_URL = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL || 'http://localhost:8088';
const ENFORCE_SSL = process.env.SERVER_SHARETRIBE_ENFORCE_SSL === 'true';
const TRUST_PROXY = process.env.SERVER_SHARETRIBE_TRUST_PROXY || null;
const app = express();

// The helmet middleware sets various HTTP headers to improve security.
// See: https://www.npmjs.com/package/helmet
app.use(helmet());

// Redirect HTTP to HTTPS if ENFORCE_SSL is `true`.
// This also works behind reverse proxies (load balancers) as they are for example used by Heroku.
// In such cases, however, the TRUST_PROXY parameter has to be set (see below)
//
// Read more: https://github.com/aredo/express-enforces-ssl
//
if (ENFORCE_SSL) {
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

// Use basic authentication when not in dev mode.
if (!dev) {
  const USERNAME = process.env.BASIC_AUTH_USERNAME;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;
  app.use(auth.basicAuth(USERNAME, PASSWORD));
}

app.use(compression());
app.use('/static', express.static(path.join(buildPath, 'static')));
app.use(cookieParser());

app.get('*', (req, res) => {
  const context = {};
  const filters = qs.parse(req.query);

  const sdk = sharetribeSdk.createInstance({
    clientId: CLIENT_ID,
    baseUrl: BASE_URL,
    tokenStore: sharetribeSdk.tokenStore.expressCookieStore({
      clientId: CLIENT_ID,
      req,
      res,
    }),
    typeHandlers: [
      {
        type: sharetribeSdk.types.BigDecimal,
        customType: Decimal,
        writer: v => new sharetribeSdk.types.BigDecimal(v.toString()),
        reader: v => new Decimal(v.value),
      },
    ],
  });

  dataLoader
    .loadData(req.url, sdk)
    .then(preloadedState => {
      const html = renderer.render(req.url, context, preloadedState);

      const debugData = {
        url: req.url,
        context,
      };

      console.log(`\nRender info:\n${JSON.stringify(debugData, null, '  ')}`);

      if (context.forbidden) {
        // Routes component injects the context.forbidden when the
        // user isn't logged in to view the page that requires
        // authentication.
        //
        // TODO: separate 401 and 403 cases when authorization is done
        // as well.
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
      console.error(e);
      res.status(500).send(e.message);
    });
});

app.listen(PORT, () => {
  const mode = dev ? 'development' : 'production';
  console.log(`Listening to port ${PORT} in ${mode} mode`);
  if (dev) {
    console.log(`Open http://localhost:${PORT}/ and start hacking!`);
  }
});
