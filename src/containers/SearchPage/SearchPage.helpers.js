import intersection from 'lodash/intersection';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug } from '../../util/urlHelpers';
import routeConfiguration from '../../routeConfiguration';

/**
 * Validates a filter search param agains a filters configuration.
 *
 * All invalid param names and values are dropped
 *
 * @param {String} paramName Search parameter name
 * @param {Object} paramValue Search parameter value
 * @param {Object} filters Filters configuration
 */
export const validURLParamForExtendedData = (paramName, paramValue, filters) => {
  const filtersArray = Object.values(filters);
  // resolve configuration for this filter
  const filterConfig = filtersArray.find(f => f.paramName === paramName);

  const valueArray = paramValue ? paramValue.split(',') : [];

  if (filterConfig && valueArray.length > 0) {
    const { min, max } = filterConfig.config || {};

    if (filterConfig.options) {
      const allowedValues = filterConfig.options.map(o => o.key);

      const validValues = intersection(valueArray, allowedValues).join(',');
      return validValues.length > 0 ? { [paramName]: validValues } : {};
    } else if (filterConfig.config && min != null && max != null) {
      const validValues = valueArray.map(v => {
        return v < min ? min : v > max ? max : v;
      });
      return validValues.length === 2 ? { [paramName]: validValues.join(',') } : {};
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
  const filterParamNames = Object.values(filters).map(f => f.paramName);
  const paramEntries = Object.entries(params);

  return paramEntries.reduce((validParams, entry) => {
    const paramName = entry[0];
    const paramValue = entry[1];

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
  const filterParamNames = Object.values(filters).map(f => f.paramName);
  const paramEntries = Object.entries(params);

  return paramEntries.reduce((validParams, entry) => {
    const paramName = entry[0];
    const paramValue = entry[1];

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
export const pickSearchParamsOnly = (params, filters) => {
  const { address, origin, bounds, ...rest } = params || {};
  const boundsMaybe = bounds ? { bounds } : {};
  const originMaybe = config.sortSearchByDistance && origin ? { origin } : {};
  const filterParams = validFilterParams(rest, filters);

  return {
    ...boundsMaybe,
    ...originMaybe,
    ...filterParams,
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
