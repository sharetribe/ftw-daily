/**
 * Export loadData calls from ducks modules of different containers
 */
import { loadData as SearchPageLoader } from './SearchPage/SearchPage.duck';

const getPageDataLoadingAPI = () => {
  return {
    SearchPage: {
      loadData: SearchPageLoader,
    },
  };
};

export default getPageDataLoadingAPI;
