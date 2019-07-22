/**
 * This module constructs the path to import what the client build
 * bundle exports.
 */

const path = require('path');

// Construct the bundle path where the bundle exports can be imported
const buildPath = path.resolve(__dirname, '..', 'build');
const manifestPath = path.join(buildPath, 'asset-manifest.json');
const manifest = require(manifestPath);
const mainJsPath = path.join(buildPath, manifest['files']['main.js']);
const mainJs = require(mainJsPath);

module.exports = {
  renderApp: mainJs.default,
  matchPathname: mainJs.matchPathname,
  configureStore: mainJs.configureStore,
  routeConfiguration: mainJs.routeConfiguration,
};
