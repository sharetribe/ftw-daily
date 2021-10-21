const {
  calculateQuantityFromDates,
  calculateTotalFromLineItems,
  resolveCleaningFeePrice,
} = require('./lineItemHelpers');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;

// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/night';
const PROVIDER_COMMISSION_PERCENTAGE = -10;

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
  const unitPrice = listing.attributes.price;
  const { startDate, endDate, hasCleaningFee } = bookingData;

  const booking = {
    code: 'line-item/night',
    unitPrice,
    quantity: calculateQuantityFromDates(startDate, endDate, unitType),
    includeFor: ['customer', 'provider'],
  };
  const cleaningFeePrice = hasCleaningFee ? resolveCleaningFeePrice(listing) : null;
  const cleaningFee = cleaningFeePrice
    ? [
        {
          code: 'line-item/cleaning-fee',
          unitPrice: cleaningFeePrice,
          quantity: 1,
          includeFor: ['customer', 'provider'],
        },
      ]
    : [];

  const providerCommission = {
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems([booking, ...cleaningFee]),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

  const lineItems = [booking, ...cleaningFee, providerCommission];

  return lineItems;
};
