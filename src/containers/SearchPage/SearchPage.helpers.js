import intersection from 'lodash/intersection';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import { parseSelectFilterOptions } from '../../util/search';
import { createSlug } from '../../util/urlHelpers';
import routeConfiguration from '../../routeConfiguration';

const flatten = (acc, val) => acc.concat(val);

/**
 * Validates a filter search param agains a filters configuration.
 *
 * All invalid param names and values are dropped
 *
 * @param {String} queryParamName Search parameter name
 * @param {Object} paramValue Search parameter value
 * @param {Object} filters Filters configuration
 */
export const validURLParamForExtendedData = (queryParamName, paramValueRaw, filters) => {
  // Resolve configuration for this filter
  const filterConfig = filters.find(f => {
    const isArray = Array.isArray(f.queryParamNames);
    return isArray
      ? f.queryParamNames.includes(queryParamName)
      : f.queryParamNames === queryParamName;
  });

  const paramValue = paramValueRaw.toString();

  if (filterConfig) {
    const { min, max } = filterConfig.config || {};

    if (['SelectSingleFilter', 'SelectMultipleFilter'].includes(filterConfig.type)) {
      // Pick valid select options only
      const allowedValues = filterConfig.config.options.map(o => o.key);
      const searchMode = filterConfig.config.searchMode;
      const valueArray = parseSelectFilterOptions(paramValue);
      const validValues = intersection(valueArray, allowedValues).join(',');

      return validValues.length > 0
        ? { [queryParamName]: searchMode ? `${searchMode}:${validValues}` : validValues }
        : {};
    } else if (filterConfig.type === 'PriceFilter') {
      // Restrict price range to correct min & max
      const valueArray = paramValue ? paramValue.split(',') : [];
      const validValues = valueArray.map(v => {
        return v < min ? min : v > max ? max : v;
      });
      return validValues.length === 2 ? { [queryParamName]: validValues.join(',') } : {};
    } else if (filterConfig) {
      // Generic filter - remove empty params
      return paramValue.length > 0 ? { [queryParamName]: paramValue } : {};
    }
  }
  return {};
};

/**
 * Checks filter param value validity.
 *
 * Non-filter params are dropped.
 *
 * @param {Object} params Search params
 * @param {Object} filters Filters configuration
 */
export const validFilterParams = (params, filters) => {
  const filterParamNames = filters.map(f => f.queryParamNames).reduce(flatten, []);
  const paramEntries = Object.entries(params);

  return paramEntries.reduce((validParams, entry) => {
    const [paramName, paramValue] = entry;

    return filterParamNames.includes(paramName)
      ? {
          ...validParams,
          ...validURLParamForExtendedData(paramName, paramValue, filters),
        }
      : { ...validParams };
  }, {});
};

/**
 * Checks filter param value validity.
 *
 * Non-filter params are returned as they are.
 *
 * @param {Object} params Search params
 * @param {Object} filters Filters configuration
 */
export const validURLParamsForExtendedData = (params, filters) => {
  const filterParamNames = filters.map(f => f.queryParamNames).reduce(flatten, []);
  const paramEntries = Object.entries(params);

  return paramEntries.reduce((validParams, entry) => {
    const [paramName, paramValue] = entry;

    return filterParamNames.includes(paramName)
      ? {
          ...validParams,
          ...validURLParamForExtendedData(paramName, paramValue, filters),
        }
      : { ...validParams, [paramName]: paramValue };
  }, {});
};

// extract search parameters, including a custom URL params
// which are validated by mapping the values to marketplace custom config.
export const pickSearchParamsOnly = (params, filters, sortConfig) => {
  const { address, origin, bounds, ...rest } = params || {};
  const boundsMaybe = bounds ? { bounds } : {};
  const originMaybe = config.sortSearchByDistance && origin ? { origin } : {};
  const filterParams = validFilterParams(rest, filters);
  const sort = rest[sortConfig.queryParamName];
  const sortMaybe = sort ? { sort } : {};

  return {
    ...boundsMaybe,
    ...originMaybe,
    ...filterParams,
    ...sortMaybe,
  };
};

export const createSearchResultSchema = (listings, address, intl) => {
  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const searchAddress = address || intl.formatMessage({ id: 'SearchPage.schemaMapSearch' });
  const schemaDescription = intl.formatMessage({ id: 'SearchPage.schemaDescription' });
  const schemaTitle = intl.formatMessage(
    { id: 'SearchPage.schemaTitle' },
    { searchAddress, siteTitle }
  );

  const schemaListings = listings.map((l, i) => {
    const title = l.attributes.title;
    const pathToItem = createResourceLocatorString('ListingPage', routeConfiguration(), {
      id: l.id.uuid,
      slug: createSlug(title),
    });
    return {
      '@type': 'ListItem',
      position: i,
      url: `${config.canonicalRootURL}${pathToItem}`,
      name: title,
    };
  });

  const schemaMainEntity = JSON.stringify({
    '@type': 'ItemList',
    name: searchAddress,
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    itemListElement: schemaListings,
  });
  return {
    title: schemaTitle,
    description: schemaDescription,
    schema: {
      '@context': 'http://schema.org',
      '@type': 'SearchResultsPage',
      description: schemaDescription,
      name: schemaTitle,
      mainEntity: [schemaMainEntity],
    },
  };
};
