/**
 * Export loadData calls from ducks modules of different containers
 */
import { loadData as ListingPageLoader } from './ListingPage/ListingPage.duck';
import { loadData as SearchPageLoader } from './SearchPage/SearchPage.duck';

const getPageDataLoadingAPI = () => {
  return {
    ListingPage: {
      loadData: ListingPageLoader,
    },
    SearchPage: {
      loadData: SearchPageLoader,
    },
  };
};

export default getPageDataLoadingAPI;
