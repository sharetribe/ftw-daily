/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import CheckoutPage from './CheckoutPage/CheckoutPage.duck';
import EditListingPage from './EditListingPage/EditListingPage.duck';
import InboxPage from './InboxPage/InboxPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import OrderPage from './OrderPage/OrderPage.duck';
import SalePage from './SalePage/SalePage.duck';
import SearchPage from './SearchPage/SearchPage.duck';
import ManageListingsPage from './ManageListingsPage/ManageListingsPage.duck';
import ProfileSettingsPage from './ProfileSettingsPage/ProfileSettingsPage.duck';

export {
  CheckoutPage,
  EditListingPage,
  InboxPage,
  ListingPage,
  ManageListingsPage,
  OrderPage,
  ProfileSettingsPage,
  SalePage,
  SearchPage,
};
