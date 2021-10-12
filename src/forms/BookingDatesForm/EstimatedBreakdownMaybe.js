/**
 * Booking breakdown estimation
 *
 * Transactions have payment information that can be shown with the
 * BookingBreakdown component. However, when selecting booking
 * details, there is no transaction object present and we have to
 * estimate the breakdown of the transaction without data from the
 * API.
 *
 * If the payment process of a customized marketplace is something
 * else than simply daily or nightly bookings, the estimation will
 * most likely need some changes.
 *
 * To customize the estimation, first change the BookingDatesForm to
 * collect all booking information from the user (in addition to the
 * default date pickers), and provide that data to the
 * EstimatedBreakdownMaybe components. You can then make customization
 * within this file to create a fake transaction object that
 * calculates the breakdown information correctly according to the
 * process.
 *
 * In the future, the optimal scenario would be to use the same
 * transactions.initiateSpeculative API endpoint as the CheckoutPage
 * is using to get the breakdown information from the API, but
 * currently the API doesn't support that for logged out users, and we
 * are forced to estimate the information here.
 */
import React from 'react';
import moment from 'moment';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { dateFromLocalToAPI } from '../../util/dates';
import { injectIntl } from '../../util/reactIntl';

import { TRANSITION_REQUEST_PAYMENT, TX_TRANSITION_ACTOR_CUSTOMER } from '../../util/transaction';
import {
  LINE_ITEM_DAY,
  LINE_ITEM_NIGHT,
  LINE_ITEM_UNITS,
  LINE_ITEM_DISCOUNT,
  DATE_TYPE_DATE,
  DATE_TYPE_DATETIME,
  HOURLY_PRICE,
} from '../../util/types';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import config from '../../config';
import { BookingBreakdown } from '../../components';
import FieldDiscount from '../BookingTimeForm/FiledDiscount';

import css from './BookingDatesForm.module.css';

const { Money, UUID } = sdkTypes;

const estimatedNumericLineItemPrice = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericLineItemPrice = new Decimal(numericPrice).times(unitCount).toNumber();
  return numericLineItemPrice;
};

const estimatedNumericTotalDiscount = (discount, unitPrice, unitCount) => {
  const { amount: discountAmount, breakpoint: discountBreakpoint, unitType: discountUnitType } =
    discount || {};

  if (!discountAmount || !discountBreakpoint || !discountUnitType) return null;

  const breakpointCount = parseInt(discountBreakpoint);

  if (unitCount <= breakpointCount) return null;

  const eligibleDiscountedDays = unitCount - breakpointCount;
  const numericUnitPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericUnitPrice).times(eligibleDiscountedDays).toNumber();
  const discountPercentage = new Decimal(discountAmount).times(0.01).toNumber();
  const numericTotalDiscount = new Decimal(numericTotalPrice).times(discountPercentage).toNumber();

  return numericTotalDiscount || 0;
};

const estimatedTotalPrice = lineItems => {
  const numericTotalPrice = lineItems.reduce((sum, lineItem) => {
    const numericPrice = convertMoneyToNumber(lineItem.lineTotal);
    return new Decimal(numericPrice).add(sum);
  }, 0);

  // All the lineItems should have same currency so we can use the first one to check that
  // In case there are no lineItems we use currency from config.js as default
  const currency =
    lineItems[0] && lineItems[0].unitPrice ? lineItems[0].unitPrice.currency : config.currency;

  return new Money(
    convertUnitToSubUnit(numericTotalPrice.toNumber(), unitDivisor(currency)),
    currency
  );
};

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the transaction for booking breakdown. This function creates
// an estimated transaction object for that use case.
// const estimatedTransaction = (unitType, bookingStart, bookingEnd, unitPrice, quantity, discount) => {
//   const now = new Date();
//   const numericLineItemPrice = estimatedNumericLineItemPrice(unitPrice, unitCount);
//   const numericTotalDiscount = estimatedNumericTotalDiscount(discount, unitPrice, unitCount);
//   const numericTotalPrice = numericLineItemPrice - numericTotalDiscount;

//   const totalPrice = new Money(
//     convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
//     unitPrice.currency
//   );

//   // bookingStart: "Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)"
//   // Server normalizes night/day bookings to start from 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
//   // The result is: local timestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)

//   // local noon -> startOf('day') => 00:00 local => remove timezoneoffset => 00:00 API (UTC)
//   const serverDayStart = dateFromLocalToAPI(
//     moment(bookingStart)
//       .startOf('day')
//       .toDate()
//   );
//   const serverDayEnd = dateFromLocalToAPI(
//     moment(bookingEnd)
//       .startOf('day')
//       .toDate()
//   );

//   let tx = {
//     id: new UUID('estimated-transaction'),
//     type: 'transaction',
//     attributes: {
//       createdAt: now,
//       lastTransitionedAt: now,
//       lastTransition: TRANSITION_REQUEST_PAYMENT,
//       payinTotal: totalPrice,
//       payoutTotal: totalPrice,
//       lineItems: [
//         {
//           code: unitType,
//           includeFor: ['customer', 'provider'],
//           unitPrice: unitPrice,
//           quantity: new Decimal(unitCount),
//           lineTotal: new Money(
//             convertUnitToSubUnit(numericLineItemPrice, unitDivisor(unitPrice.currency)),
//             unitPrice.currency
//           ),
//           reversal: false,
//         },
//       ],
//       transitions: [
//         {
//           createdAt: now,
//           by: TX_TRANSITION_ACTOR_CUSTOMER,
//           transition: TRANSITION_REQUEST_PAYMENT,
//         },
//       ],
//     },
//     booking: {
//       id: new UUID('estimated-booking'),
//       type: 'booking',
//       attributes: {
//         start: serverDayStart,
//         end: serverDayEnd,
//       },
//     },
//   };

//   if (numericTotalDiscount) tx.attributes.lineItems.push({
//     code: LINE_ITEM_DISCOUNT,
//     lineTotal: new Money(
//       convertUnitToSubUnit(numericTotalDiscount * -1, unitDivisor(unitPrice.currency)),
//       unitPrice.currency
//     ),
//   });

//   return tx;
// };

const estimatedTransaction = (bookingStart, bookingEnd, lineItems, userRole, bookingType) => {
  const now = new Date();

  const isCustomer = userRole === 'customer';

  const customerLineItems = lineItems.filter(item => item.includeFor.includes('customer'));
  const providerLineItems = lineItems.filter(item => item.includeFor.includes('provider'));

  const payinTotal = estimatedTotalPrice(customerLineItems);
  const payoutTotal = estimatedTotalPrice(providerLineItems);

  // bookingStart: "Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)"
  // Server normalizes night/day bookings to start from 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // The result is: local timestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)

  // local noon -> startOf('day') => 00:00 local => remove timezoneoffset => 00:00 API (UTC)
  const serverDayStart = dateFromLocalToAPI(
    moment(bookingStart)
      .startOf('day')
      .toDate()
  );
  const serverDayEnd = dateFromLocalToAPI(
    moment(bookingEnd)
      .startOf('day')
      .toDate()
  );

  return {
    id: new UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      payinTotal,
      payoutTotal,
      lineItems: isCustomer ? customerLineItems : providerLineItems,
      transitions: [
        {
          createdAt: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
      ],
      protectedData: {
        type: bookingType
      }
    },
    booking: {
      id: new UUID('estimated-booking'),
      type: 'booking',
      attributes: {
        start: serverDayStart,
        end: serverDayEnd,
      },
    },
  };
};

const EstimatedBreakdownMaybeComponent = props => {
  const { unitType, unitPrice, startDate, endDate, quantity, intl, promocode } = props.bookingData;
  const { lineItems, bookingType } = props;
  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice = startDate && endDate && quantityIfUsingUnits;

  const [result, setResult] = React.useState({
  _sdkType: 'Money',
  amount: 0,
  currency: 'GBP',
});
  if (!canEstimatePrice) {
    return null;
  }

  // const tx = estimatedTransaction(unitType, startDate, endDate, unitPrice, quantity, discount);
  const userRole = 'customer';
  const dateType = bookingType === HOURLY_PRICE ? DATE_TYPE_DATETIME : DATE_TYPE_DATE;

  const tx =
    startDate && endDate && lineItems
      ? estimatedTransaction(startDate, endDate, lineItems, userRole, bookingType)
      : null;
  const isCustomer = userRole === 'customer';
  const isProvider = userRole === 'provider';
  const total = isProvider
    ? tx.attributes.payoutTotal
    : tx.attributes.payinTotal;

  React.useEffect(() => {
    total && setResult(total);
  }, []);

  const updateResult = data => {
    setResult(data);
  };
  return tx ? (<div>
    <BookingBreakdown
      promo={props.promo}
      className={css.receipt}
      userRole={userRole}
      unitType={unitType}
      transaction={tx}
      booking={tx.booking}
      dateType={dateType}
    />
    <FieldDiscount
      promo={props.promo}
      updateDiscount={props.updateDiscount}
      updateResult={updateResult}
      result={result}
      transaction={tx}
      intl={intl}
      isProvider={isProvider}
    />
  </div>
  ) : null;
};
const EstimatedBreakdownMaybe = injectIntl(EstimatedBreakdownMaybeComponent);

EstimatedBreakdownMaybe.displayName = 'EstimatedBreakdownMaybe';

export default EstimatedBreakdownMaybe;
