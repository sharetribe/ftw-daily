const url = require('url');
const { matchPathname, configureStore } = require('./importer');

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
