const { calculateQuantityFromDates, calculateTotalFromLineItems, calculateTotalPrice, calculateTotalPrices } = require('./lineItemHelpers');
const moment = require('moment');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;

// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/night';
const servicespickupUnitType = 'line-item/pick Up price';
const servicesdropupUnitType = 'line-item/drop Off price';
const bookingUnitDayType = 'line-item/day';
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
  const lineItems = [];
  const unitPrice = listing.attributes.price;
  const { startDate, endDate, serviceSetup, numberOfPets, pickyes, dropPick, dropyes } = bookingData;
  const pickyesprice = pickyes * 100;
  const dropyesprice = dropyes * 100;

  const discount = listing.attributes.publicData.discountlengthOfStays;
  const DISCOUNT_COMMISSION_PERCENTAGE = -discount;
  const letofstay = listing.attributes.publicData.lengthOfStays;
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

  if (serviceSetup === 'overnightsStay') {
    lineItems.push(booking)
  }

  const pickservices = {
    code: servicespickupUnitType,
    unitPrice: new Money(pickyesprice,unitPrice.currency),
    quantity: 1,
    includeFor: ['customer', 'provider'],
  };
  if (dropPick === 'dropPick_yes') {
    lineItems.push(pickservices)
  }


  const dropservices = {
    code: servicesdropupUnitType,
    unitPrice: new Money(dropyesprice,unitPrice.currency),
    quantity: 1,
    includeFor: ['customer','provider'],
  };
  if (dropPick === 'dropPick_yes') {
     lineItems.push(dropservices)
  }



  const dayCareStay = {
    code: bookingUnitDayType,
    unitPrice: calculateTotalPrices(serviceSetup, listing, unitPrice, numberOfPets),
    quantity: 1,
    includeFor: ['customer', 'provider'],
  };

  if (serviceSetup === 'dayCareStay') {
    lineItems.push(dayCareStay)
  }

  const discount_price = {
    code: 'line-item/discount',
    unitPrice: calculateTotalFromLineItems(lineItems),
    percentage: DISCOUNT_COMMISSION_PERCENTAGE,
    includeFor: ['customer', 'provider'],
  };

  if (discount_price && yy) {
    lineItems.push(discount_price)
  }

  if (PROVIDER_COMMISSION_PERCENTAGE && typeof PROVIDER_COMMISSION_PERCENTAGE == 'number') {
    const providerCommissions = {
      code: 'line-item/provider-commission',
      unitPrice: calculateTotalFromLineItems(lineItems),
      percentage: PROVIDER_COMMISSION_PERCENTAGE,
      includeFor: ['provider'],
    };
    lineItems.push(providerCommissions);
  }
  if ((CUSTOMER_COMMISSION_PERCENTAGE && typeof CUSTOMER_COMMISSION_PERCENTAGE == 'number')) {
    const customerCommissions = {
      code: 'line-item/customer-commission',
      unitPrice: calculateTotalFromLineItems(lineItems),
      percentage: CUSTOMER_COMMISSION_PERCENTAGE,
      includeFor: ['customer'],
    };
    lineItems.push(customerCommissions);
  }

  return lineItems;
};
