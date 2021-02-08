/**
 * Export loadData calls from ducks modules of different containers
 */
import { setInitialValues as CheckoutPageInitialValues } from './CheckoutPage/CheckoutPage.duck';
import { loadData as EditListingPageLoader } from './EditListingPage/EditListingPage.duck';
import { loadData as InboxPageLoader } from './InboxPage/InboxPage.duck';
import { loadData as ListingPageLoader } from './ListingPage/ListingPage.duck';
import { loadData as ProfilePageLoader } from './ProfilePage/ProfilePage.duck';
import { loadData as SearchPageLoader } from './SearchPage/SearchPage.duck';

const getPageDataLoadingAPI = () => {
  return {
    CheckoutPage: {
      setInitialValues: CheckoutPageInitialValues,
    },
    EditListingPage: {
      loadData: EditListingPageLoader,
    },
    InboxPage: {
      loadData: InboxPageLoader,
    },
    ListingPage: {
      loadData: ListingPageLoader,
    },
    ProfilePage: {
      loadData: ProfilePageLoader,
    },
    SearchPage: {
      loadData: SearchPageLoader,
    },
  };
};

export default getPageDataLoadingAPI;
