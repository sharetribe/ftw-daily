/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

/* eslint-disable import/prefer-default-export */
import EditListingPage from './EditListingPage/EditListingPage.duck';
import SearchPage from './SearchPage/SearchPage.duck';

export { EditListingPage, SearchPage };
