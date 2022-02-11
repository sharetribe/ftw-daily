const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const { types } = require('sharetribe-flex-sdk');

const buildPath = path.resolve(__dirname, '..', 'build');

// The HTML build file is generated from the `public/index.html` file
// and used as a template for server side rendering. The application
// head and body are injected to the template from the results of
// calling the `renderApp` function imported from the bundle above.
const indexHtml = fs.readFileSync(path.join(buildPath, 'index.html'), 'utf-8');

const reNoMatch = /($^)/;

// Not all the Helmet provided data is tags to be added inside <head> or <body>
// <html> tag's attributes need separate interpolation functionality
const templateWithHtmlAttributes = _.template(indexHtml, {
  // Interpolate htmlAttributes (Helmet data) in the HTML template with the following
  // syntax: data-htmlattr="variableName"
  //
  // This syntax is very intentional: it works as a data attribute and
  // doesn't render attributes that have special meaning in HTML renderig
  // (except containing some data).
  //
  // This special attribute should be added to <html> tag
  // It may contain attributes like lang, itemscope, and itemtype
  interpolate: /data-htmlattr=\"([\s\S]+?)\"/g,
  // Disable evaluated and escaped variables in the template
  evaluate: reNoMatch,
  escape: reNoMatch,
});

// Template tags inside given template string (templatedWithHtmlAttributes),
// which cantains <html> attributes already.
const templateTags = templatedWithHtmlAttributes =>
  _.template(templatedWithHtmlAttributes, {
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

// Interpolate htmlAttributes and other helmet data into the template
const template = params => {
  const htmlAttributes = params.htmlAttributes;
  const tags = _.omit(params, ['htmlAttributes']);
  const templatedWithHtmlAttributes = templateWithHtmlAttributes({ htmlAttributes });
  return templateTags(templatedWithHtmlAttributes)(tags);
};

//
// Clean Error details when stringifying Error.
//
const cleanErrorValue = value => {
  // This should not happen
  // Pick only selected few values to be stringified if Error object is encountered.
  // Other values might contain circular structures
  // (SDK's Axios library might add ctx and config which has such structures)
  if (value instanceof Error) {
    const { name, message, status, statusText, apiErrors } = value;
    return { type: 'error', name, message, status, statusText, apiErrors };
  }
  return value;
};

//
// JSON replacer
// This stringifies SDK types and errors.
//
const replacer = (key = null, value) => {
  const cleanedValue = cleanErrorValue(value);
  return types.replacer(key, cleanedValue);
};

exports.render = function(requestUrl, context, preloadedState, renderApp, webExtractor) {
  // Bind webExtractor as "this" for collectChunks call.
  const collectWebChunks = webExtractor.collectChunks.bind(webExtractor);

  const { head, body } = renderApp(requestUrl, context, preloadedState, collectWebChunks);

  // Preloaded state needs to be passed for client side too.
  // For security reasons we ensure that preloaded state is considered as a string
  // by replacing '<' character with its unicode equivalent.
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  const serializedState = JSON.stringify(preloadedState, replacer).replace(/</g, '\\u003c');

  // At this point the serializedState is a string, the second
  // JSON.stringify wraps it within double quotes and escapes the
  // contents properly so the value can be injected in the script tag
  // as a string.
  const preloadedStateScript = `
      <script>window.__PRELOADED_STATE__ = ${JSON.stringify(serializedState)};</script>
  `;

  // We want to precisely control where the analytics script is
  // injected in the HTML file so we can catch all events as early as
  // possible. This is why we inject the GA script separately from
  // react-helmet. This script also ensures that all the GA scripts
  // are added only when the proper env var is present.
  //
  // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tracking_snippet
  const googleAnalyticsScript = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
    ? `
        <script>
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', '${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}', 'auto');
        </script>
        <script async src="https://www.google-analytics.com/analytics.js"></script>
        `
    : '';

  return template({
    htmlAttributes: head.htmlAttributes.toString(),
    title: head.title.toString(),
    link: head.link.toString(),
    meta: head.meta.toString(),
    script: head.script.toString(),
    preloadedStateScript,
    googleAnalyticsScript,
    ssrStyles: webExtractor.getStyleTags(),
    ssrLinks: webExtractor.getLinkTags(),
    ssrScripts: webExtractor.getScriptTags(),
    body,
  });
};
