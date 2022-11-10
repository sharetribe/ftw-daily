import config from '../config';

export const getMainCurrency = (currency) => {
  if (!currency) {
    return {
      style: 'currency',
      currency: config.currency,
      currencyDisplay: 'symbol',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  }

  const userCurrency = currency === config.additionalCurrency
    ? config.additionalCurrency
    : config.currency;

  return {
    style: 'currency',
    currency: userCurrency,
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
}
