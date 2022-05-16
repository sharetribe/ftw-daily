/**
 * Import reducers from shared ducks modules (default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import Auth from './Auth.duck';
import EmailVerification from './EmailVerification.duck';
import LocationFilter from './LocationFilter.duck';
import Routing from './Routing.duck';
import UI from './UI.duck';
import hostedAssets from './hostedAssets.duck';
import marketplaceData from './marketplaceData.duck';
import paymentMethods from './paymentMethods.duck';
import stripe from './stripe.duck';
import stripeConnectAccount from './stripeConnectAccount.duck';
import user from './user.duck';

export {
  Auth,
  EmailVerification,
  LocationFilter,
  Routing,
  UI,
  hostedAssets,
  marketplaceData,
  paymentMethods,
  stripe,
  stripeConnectAccount,
  user,
};
