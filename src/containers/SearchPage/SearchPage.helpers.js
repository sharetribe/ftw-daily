import { intersection } from 'lodash';
import config from '../../config';

// customURLParams
export const validURLParamForExtendedData = (paramKey, urlParams, customConfigKeys) => {
  //const configKey = customConfigKey(paramKey);
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
export const validURLParamsForExtendedData = (params, customURLParams, customURLParamToConfig) => {
  const paramKeys = Object.keys(params);
  return paramKeys.reduce((validParams, paramKey) => {
    return customURLParams.includes(paramKey)
      ? {
          ...validParams,
          ...validURLParamForExtendedData(paramKey, params, customURLParamToConfig),
        }
      : { ...validParams, [paramKey]: params[paramKey] };
  }, {});
};

// extract search parameters, including a custom attribute named category
export const pickSearchParamsOnly = (params, customURLParams, customURLParamToConfig) => {
  const { address, origin, bounds, country, ...rest } = params || {};
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
