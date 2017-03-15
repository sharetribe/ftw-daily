const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const { renderApp } = require('./importer');

const buildPath = path.resolve(__dirname, '..', 'build');

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

exports.render = function(requestUrl, context, preloadedState) {
  const { head, body } = renderApp(requestUrl, context, preloadedState);

  // Preloaded state needs to be passed for client side too.
  // For security reasons we ensure that preloaded state is considered as a string
  // by replacing '<' character with its unicode equivalent.
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  const serializedState = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
  const preloadedStateScript = `
      <script>window.__PRELOADED_STATE__ = ${serializedState};</script>
  `;

  return template({ title: head.title.toString(), preloadedStateScript, body });
};
