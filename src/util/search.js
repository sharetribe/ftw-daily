/**
 * SelectMultipleFilter needs to parse values from format
 * "has_all:a,b,c,d" or "a,b,c,d"
 */
export const parseSelectFilterOptions = uriComponentValue => {
  const startsWithHasAll = uriComponentValue && uriComponentValue.indexOf('has_all:') === 0;
  const startsWithHasAny = uriComponentValue && uriComponentValue.indexOf('has_any:') === 0;

  if (startsWithHasAll) {
    return uriComponentValue.substring(8).split(',');
  } else if (startsWithHasAny) {
    return uriComponentValue.substring(8).split(',');
  } else {
    return uriComponentValue.split(',');
  }
};

/**
 * Check if any of the filters (defined by filterIds) have currently active query parameter in URL.
 */
export const isAnyFilterActive = (filterIds, urlQueryParams, filterConfigs) => {
  const getQueryParamKeysOfGivenFilters = (keys, config) => {
    const isFilterIncluded = filterIds.includes(config.id);
    const addedQueryParamNamesMaybe = isFilterIncluded ? config.queryParamNames : [];
    return [...keys, ...addedQueryParamNamesMaybe];
  };
  const queryParamKeysOfGivenFilters = filterConfigs.reduce(getQueryParamKeysOfGivenFilters, []);

  const paramEntries = Object.entries(urlQueryParams);
  const activeKey = paramEntries.find(entry => {
    const [key, value] = entry;
    return queryParamKeysOfGivenFilters.includes(key) && value != null;
  });
  return !!activeKey;
};

/**
 * Check if the filter is currently active.
 */
export const findOptionsForSelectFilter = (filterIds, filters) => {
  if (typeof filterIds === 'string') {
    const filter = filters.find(f => f.id === filterIds);
    return filter && filter.config && filter.config.options ? filter.config.options : [];
  } else {
    // NOTE assume if not a string, will be an array of strings
    const mult_filters = filterIds.map(fid => filters.find(f=> f.id === fid));
    const mult_filters_options = mult_filters.map(filt => filt && filt.config && filt.config.options ? filt.config.options : []);
    // return the flattened array of arrays (of objects)
    return [].concat.apply([], mult_filters_options);
  }
};
