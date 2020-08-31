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
import React from 'react'
import moment from 'moment'
import Decimal from 'decimal.js'
import groupBy from 'lodash/groupBy'
import forIn from 'lodash/forIn'
import { types as sdkTypes } from '../../util/sdkLoader'
import { dateFromLocalToAPI, nightsBetween, daysBetween } from '../../util/dates'
import { TRANSITION_REQUEST_PAYMENT, TX_TRANSITION_ACTOR_CUSTOMER } from '../../util/transaction'
import {
  LINE_ITEM_DAY, LINE_ITEM_NIGHT, LINE_ITEM_UNITS, DATE_TYPE_DATE, LINE_ITEM_CUSTOMER_COMMISSION,
} from '../../util/types'
import { BookingBreakdown } from '../../components'
import config from '../../config'

import css from './BookingDatesForm.css'

const { Money, UUID } = sdkTypes

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (
  unitType,
  bookingStart,
  bookingEnd,
  unitPrice,
  quantity,
  product,
  totalPrice,
  discount
) => {
  console.log(discount)
  const now = new Date()
  const isNightly = unitType === LINE_ITEM_NIGHT
  const isDaily = unitType === LINE_ITEM_DAY
  // const { moneyPrice, preDiscountMoneyPrice, breakdown } = chargeBreakdown
  // const totalPrice = !discount ? moneyPrice

  const unitCount = isNightly
    ? nightsBetween(bookingStart, bookingEnd)
    : isDaily
      ? daysBetween(bookingStart, bookingEnd)
      : quantity

  const unitPriceAfterAdjustments = (up) => {
    if (discount) {
      return new Money(up.amount * discount, up.currency)
    }
    return new Money(up.amount, up.currency)
  }
  const userCommissionAfterAdjustments = () => new Money(totalPrice.amount * 0.11, unitPrice.currency)

  const createStandardLineItem = () => ([{
    code: unitType,
    includeFor: ['customer', 'provider'],
    unitPrice: unitPriceAfterAdjustments(unitPrice),
    quantity: new Decimal(unitCount),
    lineTotal: totalPrice,
    reversal: false,
  }])

  // const createSeasonalLineItems = () => {
  //   const groups = groupBy(breakdown, 'month')
  //   const lineItems = []
  //   forIn(groups, (v, k) => {
  //     lineItems.push({
  //       code: unitType,
  //       includeFor: ['customer', 'provider'],
  //       unitPrice: unitPriceAfterAdjustments(v[0].price),
  //       quantity: new Decimal(v.length),
  //       lineTotal: new Money(v.length * v[0].price, unitPrice.currency),
  //       reversal: false,
  //     })
  //   })
  //   console.log(lineItems)
  //   return lineItems
  // }

  // const nightlyLineItems = product.pricing_type === 'seasonal' ? createSeasonalLineItems() : createStandardLineItem()

  // bookingStart: "Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)"
  // Server normalizes night/day bookings to start from 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // The result is: local timestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)

  // local noon -> startOf('day') => 00:00 local => remove timezoneoffset => 00:00 API (UTC)
  const serverDayStart = dateFromLocalToAPI(
    moment(bookingStart)
    .startOf('day')
    .toDate()
  )
  const serverDayEnd = dateFromLocalToAPI(
    moment(bookingEnd)
    .startOf('day')
    .toDate()
  )

  const nightsUntilStartDate = nightsBetween(now, serverDayStart)
  const isSplitPayment = nightsUntilStartDate >= config.splitPaymentCapDays
  const payInTotal = () => {
    const t = new Decimal(totalPrice.amount)
    const withCustomerCommish = t.add(t.times(0.11)).toNumber().toFixed(0)
    const total = new Decimal(withCustomerCommish)
    return new Money(total.toNumber(), unitPrice.currency)
  }

  return {
    id: new UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      payinTotal: payInTotal(),
      payoutTotal: totalPrice,
      lineItems: [
        ...createStandardLineItem(),
        {
          code: LINE_ITEM_CUSTOMER_COMMISSION,
          includeFor: ['customer'],
          lineTotal: userCommissionAfterAdjustments(),
          unitPrice: unitPriceAfterAdjustments(unitPrice),
          reversal: false,
        }
      ],
      transitions: [
        {
          createdAt: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
      ],
      protectedData: {
        linkedProcessId: isSplitPayment ? '000' : null
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
  }
}

const EstimatedBreakdownMaybe = (props) => {
  const {
    unitType,
    unitPrice,
    startDate,
    endDate,
    quantity,
    product,
    chargeBreakdown,
    discount
  } = props.bookingData
  const isUnits = unitType === LINE_ITEM_UNITS
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity)
  const canEstimatePrice = startDate && endDate && unitPrice && quantityIfUsingUnits
  if (!canEstimatePrice) {
    return null
  }

  console.log(chargeBreakdown)

  const tx = estimatedTransaction(
    unitType,
    startDate,
    endDate,
    unitPrice,
    quantity,
    product,
    chargeBreakdown.moneyPrice,
    discount
  )

  const prediscountTx = estimatedTransaction(
    unitType,
    startDate,
    endDate,
    unitPrice,
    quantity,
    product,
    chargeBreakdown.preDiscountMoneyPrice
  )

  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
      transaction={tx}
      discount={chargeBreakdown.discount < 1 ? chargeBreakdown.discount : null}
      prediscountTx={chargeBreakdown.discount < 1 ? prediscountTx : null}
      booking={tx.booking}
      dateType={DATE_TYPE_DATE}
    />
  )
}

export default EstimatedBreakdownMaybe
