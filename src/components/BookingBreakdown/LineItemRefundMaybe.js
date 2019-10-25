import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import Decimal from 'decimal.js';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';
import {
  propTypes,
  LINE_ITEM_CUSTOMER_COMMISSION,
  LINE_ITEM_PROVIDER_COMMISSION,
} from '../../util/types';

import css from './BookingBreakdown.css';

const { Money } = sdkTypes;

/**
 * Calculates the total price in sub units for multiple line items.
 */
const lineItemsTotal = lineItems => {
  const amount = lineItems.reduce((total, item) => {
    return total.plus(item.lineTotal.amount);
  }, new Decimal(0));
  const currency = lineItems[0] ? lineItems[0].lineTotal.currency : config.currency;
  return new Money(amount, currency);
};

/**
 * Checks if line item represents commission
 */
const isCommission = lineItem => {
  return (
    lineItem.code === LINE_ITEM_PROVIDER_COMMISSION ||
    lineItem.code === LINE_ITEM_CUSTOMER_COMMISSION
  );
};

/**
 * Returns non-commission, reversal line items
 */
const nonCommissionReversalLineItems = transaction => {
  return transaction.attributes.lineItems.filter(item => !isCommission(item) && item.reversal);
};

const LineItemRefundMaybe = props => {
  const { transaction, intl } = props;

  // all non-commission, reversal line items
  const refundLineItems = nonCommissionReversalLineItems(transaction);

  const refund = lineItemsTotal(refundLineItems);

  const formattedRefund = refundLineItems.length > 0 ? formatMoney(intl, refund) : null;

  return formattedRefund ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.refund" />
      </span>
      <span className={css.itemValue}>{formattedRefund}</span>
    </div>
  ) : null;
};

LineItemRefundMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemRefundMaybe;
