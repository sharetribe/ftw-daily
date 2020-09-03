import React from 'react'
import { nightsBetween } from '../../util/dates'
import { FormattedMessage, intlShape } from '../../util/reactIntl'
import { formatMoney } from '../../util/currency'
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './BookingBreakdown.css'

const { Money } = sdkTypes

const LineItemBasePriceMaybe = (props) => {
  const {
    transaction, unitType, intl, pricingData, shouldHackForCheckoutPage
  } = props
  const isNightly = unitType === LINE_ITEM_NIGHT
  const isDaily = unitType === LINE_ITEM_DAY
  const translationKey = isNightly
    ? 'BookingBreakdown.baseUnitNight'
    : isDaily
      ? 'BookingBreakdown.baseUnitDay'
      : 'BookingBreakdown.baseUnitQuantity'

  // Find correct line-item for given unitType prop.
  // It should be one of the following: 'line-item/night, 'line-item/day', 'line-item/units', or 'line-item/time'
  // These are defined in '../../util/types';
  const unitPurchase = transaction.attributes.lineItems.find(
    (item) => item.code === unitType && !item.reversal
  )

  const { attributes } = transaction
  const isEstimate = transaction.id.uuid === 'estimated-transaction'
  const isSplitPayment = !!attributes.protectedData && attributes.protectedData.linkedProcessId

  let unitPrice = unitPurchase
    ? isSplitPayment && !isEstimate
      ? formatMoney(intl, new Money(unitPurchase.unitPrice.amount * 2, unitPurchase.unitPrice.currency))
      : formatMoney(intl, unitPurchase.unitPrice)
    : null

  const total = unitPurchase
    ? isSplitPayment && !isEstimate
      ? formatMoney(intl, new Money(unitPurchase.lineTotal.amount * 2, unitPurchase.lineTotal.currency))
      : formatMoney(intl, unitPurchase.lineTotal)
    : null

  let quantity = unitPurchase ? unitPurchase.quantity.toString() : null

  // THIS IS A HACK. WE NEED TO TAKE THIS OUT WHEN WE BRING IN THE NEW PAYMENT API
  console.log(shouldHackForCheckoutPage)
  if (shouldHackForCheckoutPage) {
    console.log(shouldHackForCheckoutPage)
    if (pricingData) {
      quantity = pricingData.unitCount
      unitPrice = formatMoney(intl, new Money(pricingData.preDiscountUnitPrice, unitPurchase.unitPrice.currency))
    } else if (transaction) {
      console.log(transaction)
      quantity = nightsBetween(transaction.attributes.start, transaction.attributes.end) + 1
    }
  }
  return quantity && total ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={translationKey} values={{ unitPrice, quantity }} />
      </span>
      <span className={css.itemValue}>{total}</span>
    </div>
  ) : null
}

LineItemBasePriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
}

export default LineItemBasePriceMaybe
