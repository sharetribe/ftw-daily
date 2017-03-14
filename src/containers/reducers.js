/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import EditListingPage from './EditListingPage/EditListingPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import SearchPage from './SearchPage/SearchPage.duck';

export { EditListingPage, ListingPage, SearchPage };
