import { intersection } from 'lodash';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import { createSlug } from '../../util/urlHelpers';
import routeConfiguration from '../../routeConfiguration';

// customURLParams
export const validURLParamForExtendedData = (paramKey, urlParams, customConfigKeys) => {
  const configKey = customConfigKeys[paramKey];
  const value = urlParams[paramKey];
  const valueArray = value ? value.split(',') : [];

  if (configKey && valueArray.length > 0) {
    const allowedValues = config.custom[configKey].map(a => a.key);
    const validValues = intersection(valueArray, allowedValues).join(',');
    return validValues.length > 0 ? { [paramKey]: validValues } : {};
  }
  return {};
};

// validate filter params
export const validURLParamsForExtendedData = (params, customURLParamToConfig) => {
  const paramKeys = Object.keys(params);
  const customURLParams = Object.keys(customURLParamToConfig);
  return paramKeys.reduce((validParams, paramKey) => {
    return customURLParams.includes(paramKey)
      ? {
          ...validParams,
          ...validURLParamForExtendedData(paramKey, params, customURLParamToConfig),
        }
      : { ...validParams, [paramKey]: params[paramKey] };
  }, {});
};

// extract search parameters, including a custom URL params
// which are validated by mapping the values to marketplace custom config.
export const pickSearchParamsOnly = (params, customURLParamToConfig) => {
  const { address, origin, bounds, country, ...rest } = params || {};
  const customURLParams = Object.keys(customURLParamToConfig);
  const boundsMaybe = bounds ? { bounds } : {};
  const originMaybe = config.sortSearchByDistance && origin ? { origin } : {};

  const customSearchParamKeys = Object.keys(rest);
  const customSearchParams = customSearchParamKeys.reduce((validParams, paramKey) => {
    return customURLParams.includes(paramKey)
      ? { ...validParams, ...validURLParamForExtendedData(paramKey, rest, customURLParamToConfig) }
      : { ...validParams };
  }, {});

  return {
    ...boundsMaybe,
    ...originMaybe,
    ...customSearchParams,
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
