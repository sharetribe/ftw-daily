import Decimal from 'decimal.js';
import { nightsBetween, daysBetween } from './dates';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from './currency';
import { types as sdkTypes } from './sdkLoader';
const { Money } = sdkTypes;

/** Expected output:
  `lineItems`: Collection of line items (max 50). Each line items has following fields:
    - `code`: string, mandatory, indentifies line item type (e.g. \"line-item/cleaning-fee\"), maximum length 64 characters.
    - `unitPrice`: money, mandatory
    - `lineTotal`: money
    - `quantity`: number
    - `percentage`: number (e.g. 15.5 for 15.5%)
    - `seats`: number
    - `units`: number
    - `includeFor`: array containing strings \"customer\" or \"provider\", default [\":customer\"  \":provider\" ]

  Line item must have either `quantity` or `percentage` or both
  `seats` and `units`.
  `lineTotal` is calculated by the following rules:
  - If `quantity` is provided, the line total will
  be `unitPrice * quantity`.
  - If `percentage` is provided, the line
  total will be `unitPrice * (percentage / 100)`.
  - If `seats` and `units` are provided the line item will contain `quantity` as a
  product of `seats` and `units` and the line total will be `unitPrice
  * units * seats`.
  `lineTotal` can be optionally passed in. Will be validated against
  calculated line total.
  `includeFor` defines commissions. Customer commission is added by
  defining `includeFor` array `[\"customer\"]` and provider commission by `[\"provider\"]`.
 */

const calculateTotalPriceFromQuantity = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice).times(unitCount).toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

const calculateTotalPriceFromPercentage = (unitPrice, percentage) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice)
    .times(percentage)
    .dividedBy(100)
    .toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

const calculateTotalPriceFromSeats = (unitPrice, unitCount, seats) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice)
    .times(unitCount)
    .times(seats)
    .toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

export const validLineItem = params => {
  const { code, unitPrice, quantity, percentage, seats, units, includeFor } = params;

  let pricingParams;

  if (quantity) {
    pricingParams = { quantity, lineTotal: calculateTotalPriceFromQuantity(unitPrice, quantity) };
  } else if (percentage) {
    pricingParams = {
      percentage,
      lineTotal: calculateTotalPriceFromPercentage(unitPrice, percentage),
    };
  } else if (seats && units) {
    pricingParams = {
      seats,
      units,
      lineTotal: calculateTotalPriceFromSeats(unitPrice, units, seats),
    };
  } else {
    console.error(
      "Can't calculate the lineTotal of lineItem: ",
      code,
      ' Make sure you have provided quantity, percentage or both seats and units'
    );
  }

  return {
    code: code,
    unitPrice,
    includeFor: includeFor ? includeFor : ['customer', 'provider'],
    ...pricingParams,
  };
};

export const calculateTotalFromLineItems = lineItems => {
  const numericTotalPrice = lineItems.reduce((sum, lineItem) => {
    const numericPrice = convertMoneyToNumber(lineItem.lineTotal);
    return new Decimal(numericPrice).add(sum);
  }, 0);

  const unitPrice = lineItems[0].unitPrice;

  return new Money(
    convertUnitToSubUnit(numericTotalPrice.toNumber(), unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

export const calculateTotalForProvider = lineItems => {
  const providerLineItems = lineItems.filter(lineItem => lineItem.includeFor.includes('provider'));
  return calculateTotalFromLineItems(providerLineItems);
};

export const calculateTotalForCustomer = lineItems => {
  const providerLineItems = lineItems.filter(lineItem => lineItem.includeFor.includes('customer'));
  return calculateTotalFromLineItems(providerLineItems);
};

export const constructLineItems = (startDate, endDate, unitPrice) => {
  const bookingLineItem = validLineItem({
    code: 'line-item/nights',
    unitPrice,
    quantity: nightsBetween(startDate, endDate),
    includeFor: ['customer', 'provider'],
  });

  const cleaningFee = validLineItem({
    code: 'line-item/cleaning-fee',
    unitPrice: new Money(7500, 'USD'),
    quantity: 1,
    includeFor: ['customer', 'provider'],
  });

  const providerCommission = validLineItem({
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems([bookingLineItem, cleaningFee]),
    percentage: -15,
    includeFor: ['provider'],
  });

  const customerCommission = validLineItem({
    code: 'line-item/customer-commission',
    unitPrice: calculateTotalFromLineItems([bookingLineItem, cleaningFee]),
    percentage: 10,
    includeFor: ['customer'],
  });

  const providerCommissionDiscount = validLineItem({
    code: 'line-item/provider-commission-discount',
    unitPrice: new Money(2500, 'USD'),
    quantity: 1,
    includeFor: ['provider'],
  });

  return [
    bookingLineItem,
    cleaningFee,
    providerCommission,
    customerCommission,
    providerCommissionDiscount,
  ];
};
