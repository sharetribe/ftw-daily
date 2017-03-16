const url = require('url');
const { types } = require('sharetribe-sdk');
const { matchPathname, configureStore } = require('./importer');

// Currently the SDK serialisation doesn't work with mixed types from
// client bundle and server imports. To fix this temporarily, we wrap
// the id param here for the server side instead of doing the same in
// the loadData handler.
// TODO: remove this once the SDK serialisation works
const fixParams = params => {
  if (params.id) {
    return Object.assign({}, params, { id: new types.UUID(params.id) });
  }
  return params;
};

exports.loadData = function(requestUrl, sdk) {
  const { pathname, query } = url.parse(requestUrl, true);
  const matchedRoutes = matchPathname(pathname);

  const store = configureStore(sdk);

  const dataLoadingCalls = matchedRoutes.reduce(
    (calls, match) => {
      const { route, params } = match;
      if (typeof route.loadData === 'function' && !route.auth) {
        calls.push(store.dispatch(route.loadData(params, query)));
      }
      return calls;
    },
    []
  );

  return Promise.all(dataLoadingCalls).then(() => {
    return store.getState();
  });
};
