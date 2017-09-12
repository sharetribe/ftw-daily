/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import AuthenticationPage from './AuthenticationPage/AuthenticationPage.duck';
import CheckoutPage from './CheckoutPage/CheckoutPage.duck';
import EditListingPage from './EditListingPage/EditListingPage.duck';
import InboxPage from './InboxPage/InboxPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import ManageListingsPage from './ManageListingsPage/ManageListingsPage.duck';
import OrderPage from './OrderPage/OrderPage.duck';
import PasswordResetPage from './PasswordResetPage/PasswordResetPage.duck';
import ProfileSettingsPage from './ProfileSettingsPage/ProfileSettingsPage.duck';
import SalePage from './SalePage/SalePage.duck';
import SearchPage from './SearchPage/SearchPage.duck';

export {
  AuthenticationPage,
  CheckoutPage,
  EditListingPage,
  InboxPage,
  ListingPage,
  ManageListingsPage,
  OrderPage,
  PasswordResetPage,
  ProfileSettingsPage,
  SalePage,
  SearchPage,
};
