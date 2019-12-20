import { types as sdkTypes } from './sdkLoader';
import config from '../config';

import {
  // formatCurrencyMajorUnit
} from './currency';

const {
  UUID,
  // Money,
  // BigDecimal
} = sdkTypes;

export const priceRangeData = (products, intl) => {
  if (!products || !products.length) return {}

  try {
    const amounts = [...products.map(p => {
      if (p.price.currency !== config.currency) throw {
        type: 'unsupportedCurrency',
        formattedPrice: `(${p.price.currency})`,
        priceTitle: `Unsupported currency (${p.price.currency})`,
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