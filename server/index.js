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
const fs = require('fs');
const _ = require('lodash');
const React = require('react');
const { createServerRenderContext } = require('react-router');

// Construct the bundle path where the server side renering function
// can be imported.
const buildPath = path.resolve(__dirname, '..', 'build');
const manifestPath = path.join(buildPath, 'asset-manifest.json');
const manifest = require(manifestPath);
const mainJsPath = path.join(buildPath, manifest['main.js']);
const renderApp = require(mainJsPath).default;

// The HTML build file is generated from the `public/index.html` file
// and used as a template for server side rendering. The application
// head and body are injected to the template from the results of
// calling the `renderApp` function imported from the bundle above.
const indexHtml = fs.readFileSync(path.join(buildPath, 'index.html'), 'utf-8');

const reNoMatch = /($^)/;
const template = _.template(indexHtml, {

  // Interpolate variables in the HTML template with the following
  // syntax: <!--!variableName-->
  //
  // This syntax is very intentional: it works as a HTML comment and
  // doesn't render anything visual in the dev mode, and in the
  // production mode, HtmlWebpackPlugin strips out comments using
  // HTMLMinifier except those that aren't explicitly marked as custom
  // comments. By default, custom comments are those that begin with a
  // ! character.
  //
  // Note that the variables are _not_ escaped since we only inject
  // HTML content.
  //
  // See:
  // - https://github.com/ampedandwired/html-webpack-plugin
  // - https://github.com/kangax/html-minifier
  // - Plugin options in the production Webpack configuration file
  interpolate: /<!--!([\s\S]+?)-->/g,

  // Disable evaluated and escaped variables in the template
  evaluate: reNoMatch,
  escape: reNoMatch,
});

function render(url, context) {
  const { head, body } = renderApp(url, context);
  return template({
    title: head.title.toString(),
    body
  });
}

const env = process.env.NODE_ENV;
const dev = env !== 'production';
const PORT = process.env.PORT || 4000;
const app = express();

// The helmet middleware sets various HTTP headers to improve security.
// See: https://www.npmjs.com/package/helmet
app.use(helmet());

app.use(compression());
app.use('/static', express.static(path.join(buildPath, 'static')));

app.get('*', (req, res) => {
  const context = createServerRenderContext();
  const html = render(req.url, context);
  const result = context.getResult();

  if (result.redirect) {
    res.redirect(result.redirect.pathname);
  } else if (result.missed) {
    // Do a second render pass with the context to clue <Miss>
    // components into rendering this time.
    // See: https://react-router.now.sh/ServerRouter
    res.status(404).send(render(req.url, context));
  } else {
    res.send(html);
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT} in ${env} mode`);
  if (dev) {
    console.log(`Open http://localhost:${PORT}/ and start hacking!`);
  }
});
