import { LOCATION_CHANGED } from '../ducks/Routing.duck';

// Create a Redux middleware from the given analytics handlers. Each
// handler should have the following methods:
//
// - trackPageView(canonicalPath, previousPath): called when the URL is changed
export const createMiddleware = handlers => store => next => action => {
  const { type, payload } = action;

  if (type === LOCATION_CHANGED) {
    const previousPath = store?.getState()?.Routing?.currentCanonicalPath;
    const { canonicalPath } = payload;
    handlers.forEach(handler => {
      handler.trackPageView(canonicalPath, previousPath);
    });
  }

  next(action);
};
