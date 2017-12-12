/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import CheckoutPage from './CheckoutPage/CheckoutPage.duck';
import ContactDetailsPage from './ContactDetailsPage/ContactDetailsPage.duck';
import EditListingPage from './EditListingPage/EditListingPage.duck';
import InboxPage from './InboxPage/InboxPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import ManageListingsPage from './ManageListingsPage/ManageListingsPage.duck';
import OrderPage from './OrderPage/OrderPage.duck';
import PasswordChangePage from './PasswordChangePage/PasswordChangePage.duck';
import PasswordRecoveryPage from './PasswordRecoveryPage/PasswordRecoveryPage.duck';
import PasswordResetPage from './PasswordResetPage/PasswordResetPage.duck';
import ProfilePage from './ProfilePage/ProfilePage.duck';
import ProfileSettingsPage from './ProfileSettingsPage/ProfileSettingsPage.duck';
import SalePage from './SalePage/SalePage.duck';
import SearchPage from './SearchPage/SearchPage.duck';
import TransactionPage from './TransactionPage/TransactionPage.duck';

export {
  CheckoutPage,
  ContactDetailsPage,
  EditListingPage,
  InboxPage,
  ListingPage,
  ManageListingsPage,
  OrderPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  ProfilePage,
  ProfileSettingsPage,
  SalePage,
  SearchPage,
  TransactionPage,
};
