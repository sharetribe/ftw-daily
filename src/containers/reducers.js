/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

/* eslint-disable import/prefer-default-export */
import SearchPage from './SearchPage/SearchPageDucks';

export { SearchPage };
