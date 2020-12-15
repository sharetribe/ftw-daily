import { renderApp } from './app';
import configureStore from './store';
import { matchPathname } from './util/routes';
import routeConfiguration from './routeConfiguration';
import config from './config';

// Show warning if CSP is not enabled
const CSP = process.env.REACT_APP_CSP;
const cspEnabled = CSP === 'block' || CSP === 'report';

if (CSP === 'report' && process.env.REACT_APP_ENV === 'production') {
  console.warn(
    'Your production environment should use CSP with "block" mode. Read more from: https://www.sharetribe.com/docs/ftw-security/how-to-set-up-csp-for-ftw/'
  );
} else if (!cspEnabled) {
  console.warn(
    "CSP is currently not enabled! You should add an environment variable REACT_APP_CSP with the value 'report' or 'block'. Read more from: https://www.sharetribe.com/docs/ftw-security/how-to-set-up-csp-for-ftw/"
  );
}

// Export the function for server side rendering.
export default renderApp;

// exporting matchPathname and configureStore for server side rendering.
// matchPathname helps to figure out which route is called and if it has preloading needs
// configureStore is used for creating initial store state for Redux after preloading
export { matchPathname, configureStore, routeConfiguration, config };
