import config from '../config';
import { formatMoney } from './currency';

export const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      )
    };
  }
  return {};
};

export const priceRangeData = (products, intl) => {
  if (!products || !products.length) return {}

  try {
    const amounts = [...products.map(p => {
      // eslint-disable-next-line
      if (p.price.currency !== config.currency) throw {
        type: 'unsupportedCurrency',
        formattedPrice: intl.formatMessage(
          { id: 'ManageListingCard.unsupportedPrice' },
          { currency: p.price.currency }
        ),
        priceTitle: intl.formatMessage(
          { id: 'ManageListingCard.unsupportedPriceTitle' },
          { currency: p.price.currency }
        )
      };

      return p.price.amount;
    })];

    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    // Create Money object since it's currently not possible to save product price that
    // const formattedMin = formatMoney(intl, new Money(min, config.currency));
    // const formattedMax = formatMoney(intl, new Money(max, config.currency));
    // const formattedPriceRange = min === max ? formattedMin : `${formattedMin} - ${formattedMax}`;

    const numberFormatOptions = {
      style: 'currency',
      currency: config.currency,
      currencyDisplay: 'symbol',
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };

    const minFormatted = intl.formatNumber(min/100, numberFormatOptions);
    const maxFormatted = max/100;

    const formattedPriceRange = min === max ? minFormatted : `${minFormatted} - ${maxFormatted}`;

    return { formattedPrice: formattedPriceRange, priceTitle: formattedPriceRange };
  } catch (msg) {
    if (msg.type === 'unsupportedCurrency') return msg;
    return {};
  }
}