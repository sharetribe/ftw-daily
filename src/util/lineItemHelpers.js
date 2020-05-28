import Decimal from 'decimal.js';
import { nightsBetween, daysBetween } from './dates';
import { LINE_ITEM_NIGHT, DATE_TYPE_DATE, LINE_ITEM_DAY } from './types';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from './currency';
import { types as sdkTypes } from './sdkLoader';
const { Money } = sdkTypes;

/** Helper functions for constructing line items
 */

/**
 * Calculates lineTotal for lineItem based on quantity.
 * The total will be `unitPrice * quantity`.
 *
 * @param {Money} unitPrice
 * @param {int} percentage
 *
 * @returns {Money} lineTotal
 */
const calculateTotalPriceFromQuantity = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice).times(unitCount).toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

/**
 * Calculates lineTotal for lineItem based on percentage.
 * The total will be `unitPrice * (percentage / 100)`.
 *
 * @param {Money} unitPrice
 * @param {int} percentage
 *
 * @returns {Money} lineTotal
 */
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

/**
 * Calculates lineTotal for lineItem based on seats and units.
 * The total will be `unitPrice * units * seats`.
 *
 * @param {Money} unitPrice
 * @param {int} unitCount
 * @param {int} seats
 *
 * @returns {Money} lineTotal
 */
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

/**
 * Calculates the quantity based on the booking start and end dates depending on booking type.
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {string} type
 *
 * @returns {Decimal} quantity
 */
export const calculateQuantityFromDates = (startDate, endDate, type) => {
  if (type === LINE_ITEM_NIGHT) {
    return new Decimal(nightsBetween(startDate, endDate));
  } else if (type === LINE_ITEM_DAY) {
    return new Decimal(daysBetween(startDate, endDate));
  }
  throw new Error(`Can't calculate quantity from dates to unit type: ${type}`);
};

/**
 *
 *  `lineTotal` is calculated by the following rules:
 * - If `quantity` is provided, the line total will be `unitPrice * quantity`.
 * - If `percentage` is provided, the line total will be `unitPrice * (percentage / 100)`.
 * - If `seats` and `units` are provided the line item will contain `quantity` as a product of `seats` and `units` and the line total will be `unitPrice * units * seats`.
 *
 * @param {Object} lineItem
 * @return {Money} lineTotal
 *
 */
export const calculateLineTotal = lineItem => {
  const { code, unitPrice, quantity, percentage, seats, units } = lineItem;

  if (quantity) {
    return calculateTotalPriceFromQuantity(unitPrice, quantity);
  } else if (percentage) {
    return calculateTotalPriceFromPercentage(unitPrice, percentage);
  } else if (seats && units) {
    return calculateTotalPriceFromSeats(unitPrice, units, seats);
  } else {
    console.error(
      "Can't calculate the lineTotal of lineItem: ",
      code,
      ' Make sure the lineItem has quantity, percentage or both seats and units'
    );
  }
};

/**
 * Calculates the total sum of lineTotals for given lineItems
 *
 * @param {Array} lineItems
 * @retuns {Money} total sum
 */
export const calculateTotalFromLineItems = lineItems => {
  const numericTotalPrice = lineItems.reduce((sum, lineItem) => {
    const lineTotal = calculateLineTotal(lineItem);
    const numericPrice = convertMoneyToNumber(lineTotal);
    return new Decimal(numericPrice).add(sum);
  }, 0);

  const unitPrice = lineItems[0].unitPrice;

  return new Money(
    convertUnitToSubUnit(numericTotalPrice.toNumber(), unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

/**
 * Calculates the total sum of lineTotals for given lineItems where `includeFor` includes `provider`
 * @param {*} lineItems
 * @returns {Money} total sum
 */
export const calculateTotalForProvider = lineItems => {
  const providerLineItems = lineItems.filter(lineItem => lineItem.includeFor.includes('provider'));
  return calculateTotalFromLineItems(providerLineItems);
};

/**
 * Calculates the total sum of lineTotals for given lineItems where `includeFor` includes `customer`
 * @param {*} lineItems
 * @returns {Money} total sum
 */
export const calculateTotalForCustomer = lineItems => {
  const providerLineItems = lineItems.filter(lineItem => lineItem.includeFor.includes('customer'));
  return calculateTotalFromLineItems(providerLineItems);
};

export const consrtuctValidLineItems = lineItems => {
  const lineItemsWithTotals = lineItems.map(lineItem => {
    const { code, quantity, percentage } = lineItem;

    if (!/^line-item\/.+/.test(code)) {
      throw new Error(`Invalid line item code: ${code}`);
    }

    // lineItems are expected to be in similar format as when they are returned from API
    // so that we can use them in e.g. BookingBreakdown component.
    // This means we need to convert quantity to Decimal and add attributes lineTotal and reversal to lineItems
    const lineTotal = calculateLineTotal(lineItem);
    return {
      ...lineItem,
      lineTotal,
      quantity: new Decimal(quantity),
      reversal: false,
    };
  });

  //TODO do we want to validate payout and payin sums?

  return lineItemsWithTotals;
};
