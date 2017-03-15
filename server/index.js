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
const path = require('path');
const qs = require('qs');
const auth = require('./auth');
const renderer = require('./renderer');
const dataLoader = require('./dataLoader');

const buildPath = path.resolve(__dirname, '..', 'build');
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const PORT = process.env.PORT || 4000;
const app = express();

// The helmet middleware sets various HTTP headers to improve security.
// See: https://www.npmjs.com/package/helmet
app.use(helmet());

// Use basic authentication when not in dev mode.
if (!dev) {
  const USERNAME = process.env.BASIC_AUTH_USERNAME;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;
  app.use(auth.basicAuth(USERNAME, PASSWORD));
}

app.use(compression());
app.use('/static', express.static(path.join(buildPath, 'static')));

app.get('*', (req, res) => {
  const context = {};
  const filters = qs.parse(req.query);

  dataLoader
    .loadData(req.url)
    .then(preloadedState => {
      const html = renderer.render(req.url, context, preloadedState);

      const debugData = {
        url: req.url,
        preloadedState,
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
  console.log(`Listening to port ${PORT} in ${env} mode`);
  if (dev) {
    console.log(`Open http://localhost:${PORT}/ and start hacking!`);
  }
});
