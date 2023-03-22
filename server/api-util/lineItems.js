const {
  calculateQuantityFromDates,
  calculateQuantityFromHours,
  calculateTotalFromLineItems
} = require('./lineItemHelpers');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;

// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/units';
const CUSTOMER_COMMISSION_PERCENTAGE = 10;
const PROVIDER_COMMISSION_PERCENTAGE = -10;
const WITH_DISCOUNT = -10;

/** Returns collection of lineItems (max 50)
 *
 * Each line items has following fields:
 * - `code`: string, mandatory, indentifies line item type (e.g. \"line-item/cleaning-fee\"), maximum length 64 characters.
 * - `unitPrice`: money, mandatory
 * - `lineTotal`: money
 * - `quantity`: number
 * - `percentage`: number (e.g. 15.5 for 15.5%)
 * - `seats`: number
 * - `units`: number
 * - `includeFor`: array containing strings \"customer\" or \"provider\", default [\":customer\"  \":provider\" ]
 *
 * Line item must have either `quantity` or `percentage` or both `seats` and `units`.
 *
 * `includeFor` defines commissions. Customer commission is added by defining `includeFor` array `["customer"]` and provider commission by `["provider"]`.
 *
 * @param {Object} listing
 * @param {Object} bookingData
 * @returns {Array} lineItems
 */
exports.transactionLineItems = (listing, bookingData) => {
  let unitPrice;
  let quantity;

  const { startDate, endDate, type, promocode } = bookingData;

  if (type === 'price'){
    unitPrice = listing.attributes.price;
    quantity = calculateQuantityFromHours(startDate, endDate);
  } else {
    const {amount, currency} = listing &&
                               listing.attributes &&
                               listing.attributes.publicData &&
                               listing.attributes.publicData[type] || {};
    if (!amount) {
      throw new Error(type + " price isn't provided")
    }
    unitPrice = new Money(amount, currency);
    quantity = calculateQuantityFromDates(startDate, endDate, type);
  }

  /**
   * If you want to use pre-defined component and translations for printing the lineItems base price for booking,
   * you should use one of the codes:
   * line-item/night, line-item/day or line-item/units (translated to persons).
   *
   * Pre-definded commission components expects line item code to be one of the following:
   * 'line-item/provider-commission', 'line-item/customer-commission'
   *
   * By default BookingBreakdown prints line items inside LineItemUnknownItemsMaybe if the lineItem code is not recognized. */

  const booking = {
    code: bookingUnitType,
    unitPrice,
    quantity,
    includeFor: ['customer', 'provider'],
  };

  const providerCommission = {
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems([booking]),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

  const customerCommission = {
    code: 'line-item/customer-commission',
    unitPrice: calculateTotalFromLineItems([booking]),
    percentage: CUSTOMER_COMMISSION_PERCENTAGE,
    includeFor: ['customer'],
  };

  const withDiscount = {
    code: 'line-item/discount',
    unitPrice: calculateTotalFromLineItems([booking]),
    percentage: WITH_DISCOUNT,
    includeFor: ['customer'],
  };

  // const discount = {
  //   code: 'line-item/discount',
  //   unitPrice: calculateTotalFromLineItems([booking]),
  //   percentage: calcedPerc,
  //   includeFor: ['customer', 'provider'],
  // }
  const lineItemsWithDiscount = [booking, customerCommission, providerCommission, withDiscount];

  const lineItems = [booking, providerCommission, customerCommission];

  return promocode ? lineItemsWithDiscount : lineItems;
};
