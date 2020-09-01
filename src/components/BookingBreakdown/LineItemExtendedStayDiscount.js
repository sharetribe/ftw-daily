import React from 'react'
import round from 'lodash/round'
import { intlShape } from '../../util/reactIntl'
import { formatMoney } from '../../util/currency'
import { LINE_ITEM_EXTENDED_STAY_DISCOUNT, propTypes } from '../../util/types'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './BookingBreakdown.css'

const { Money } = sdkTypes

const LineItemBasePriceMaybe = (props) => {
  const {
    transaction, unitType, intl, discount
  } = props

  const unitPurchase = transaction.attributes.lineItems.find(
    (item) => item.code === LINE_ITEM_EXTENDED_STAY_DISCOUNT && !item.reversal
  )

  const { attributes } = transaction
  const isEstimate = transaction.id.uuid === 'estimated-transaction'
  const isSplitPayment = !!attributes.protectedData && attributes.protectedData.linkedProcessId

  const total = unitPurchase ? isSplitPayment && !isEstimate
    ? formatMoney(intl, new Money(unitPurchase.lineTotal.amount * 2, unitPurchase.lineTotal.currency))
    : formatMoney(intl, unitPurchase.lineTotal)
    : null

  const quantity = unitPurchase ? unitPurchase.quantity.toString() : null

  formatMoney(intl, new Money(((unitPurchase.lineTotal.amount) * (1 - discount)), unitPurchase.lineTotal.currency))

  return quantity && total ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <span>{`${round((1 - discount) * 100, 0)}`}% Extended Stay Discount</span>
      </span>
      <span className={css.itemValue}>{`-${formatMoney(intl, new Money(((unitPurchase.lineTotal.amount) * (1 - discount)), unitPurchase.lineTotal.currency))}`}</span>
    </div>
  ) : null
}

LineItemBasePriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
}

export default LineItemBasePriceMaybe
