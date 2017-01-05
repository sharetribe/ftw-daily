require('source-map-support').install();

const express = require('express');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const React = require('react');
const { createServerRenderContext } = require('react-router');

const buildPath = path.resolve(__dirname, '..', 'build');
const manifestPath = path.join(buildPath, 'asset-manifest.json');
const manifest = require(manifestPath);
const mainJsPath = path.join(buildPath, manifest['main.js']);
const renderApp = require(mainJsPath).default;

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
  const { head, body } = renderApp(url, context)
  return template({
    title: head.title.toString(),
    body
  });
}

const PORT = process.env.port || 4000;
const app = express();

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
  console.log(`Listening on port ${PORT}`);
});
