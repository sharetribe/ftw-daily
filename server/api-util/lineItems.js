const { calculateQuantityFromDates, calculateTotalFromLineItems, calculateTotalPrice, calculateTotalPrices } = require('./lineItemHelpers');
const moment = require('moment');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;

// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/night';
const bookingUnitDatType = 'line-item/day';
const PROVIDER_COMMISSION_PERCENTAGE = -12;
const CUSTOMER_COMMISSION_PERCENTAGE = 3;


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
  let lineItems = [];
  const unitPrice = listing.attributes.price;
  const { startDate, endDate, serviceSetup, numberOfPets } = bookingData;

  const discount = listing.attributes.publicData.discountlengthOfStays
  const DISCOUNT_COMMISSION_PERCENTAGE = -discount
  const letofstay = listing.attributes.publicData.lengthOfStays
  const diffBetweenDays = moment(endDate).diff(startDate, 'days');
  const yy = letofstay <= diffBetweenDays;

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
    unitPrice: calculateTotalPrice(serviceSetup, listing, unitPrice, numberOfPets),
    quantity: calculateQuantityFromDates(startDate, endDate, bookingUnitType),
    includeFor: ['customer', 'provider'],
  };

  if (serviceSetup.filter(e => e == 'overnightsStay')?.length) {
    lineItems.push(booking)
  }

  const dayCareStay = {
    code: bookingUnitDatType,
    unitPrice: calculateTotalPrices(serviceSetup, listing, unitPrice, numberOfPets),
    quantity: calculateQuantityFromDates(startDate, endDate, bookingUnitDatType),
    includeFor: ['customer', 'provider'],
  };

  if (serviceSetup.filter(e => e == 'dayCareStay')?.length) {
    lineItems.push(dayCareStay)
  }

  const discount_price = {
    code: 'line-item/discount-commission',
    unitPrice: calculateTotalFromLineItems(lineItems),
    percentage: DISCOUNT_COMMISSION_PERCENTAGE,
    includeFor: ['customer', 'provider'],
  };

  if (discount_price && yy) {
    lineItems.push(discount_price)
  }

  const customerCommissions = {
    code: 'line-item/customer-commission',
    unitPrice: calculateTotalFromLineItems(lineItems),
    percentage: CUSTOMER_COMMISSION_PERCENTAGE,
    includeFor: ['customer'],
  };

  const providerCommissions = {
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems(lineItems),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

  if (PROVIDER_COMMISSION_PERCENTAGE && typeof PROVIDER_COMMISSION_PERCENTAGE == 'number') {
    lineItems.push(providerCommissions);
  }
  if ((CUSTOMER_COMMISSION_PERCENTAGE && typeof CUSTOMER_COMMISSION_PERCENTAGE == 'number')) {
    lineItems.push(customerCommissions);
  }

  return lineItems;
};
