// See: https://en.wikipedia.org/wiki/ISO_4217
// See: https://stripe.com/docs/currencies
export const subUnitDivisors = {
  AUD: 100,
  CAD: 100,
  CHF: 100,
  CNY: 100,
  DKK: 100,
  EUR: 100,
  GBP: 100,
  HKD: 100,
  INR: 100,
  JPY: 1,
  MXN: 100,
  NOK: 100,
  NZD: 100,
  SEK: 100,
  SGD: 100,
  USD: 100,
};

// Currency formatting options.
// See: https://github.com/yahoo/react-intl/wiki/API#formatnumber
export const currencyConfiguration = currency => {
  if (!subUnitDivisors[currency]) {
    const currencies = Object.keys(subUnitDivisors);
    throw new Error(
      `Configuration missing for currency: ${currency}. Supported currencies: ${currencies.join(
        ', '
      )}.`
    );
  }

  return subUnitDivisors[currency] === 1
    ? {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
        useGrouping: true,
        // If the currency is not using subunits (like JPY), remove fractions.
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    : {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
};
