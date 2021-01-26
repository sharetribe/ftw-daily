import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import Decimal from 'decimal.js';
import { formatMoney } from '../../util/currency';
import config from '../../config';
import { types as sdkTypes } from '../../util/sdkLoader';
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
 * Returns non-commission, non-reversal line items
 */
const nonCommissionNonReversalLineItems = transaction => {
  return transaction.attributes.lineItems.filter(item => !isCommission(item) && !item.reversal);
};

/**
 * Checks if a transaction has a commission line-item for
 * a given user role.
 */
const txHasCommission = (transaction, userRole) => {
  let commissionLineItem = null;

  if (userRole === 'customer') {
    commissionLineItem = transaction.attributes.lineItems.find(
      item => item.code === LINE_ITEM_CUSTOMER_COMMISSION
    );
  } else if (userRole === 'provider') {
    commissionLineItem = transaction.attributes.lineItems.find(
      item => item.code === LINE_ITEM_PROVIDER_COMMISSION
    );
  }
  return !!commissionLineItem;
};

const LineItemSubTotalMaybe = props => {
  const { transaction, unitType, userRole, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === unitType && item.reversal
  );

  // Show unit purchase line total (unit price * quantity) as a subtotal.
  // PLEASE NOTE that this assumes that the transaction doesn't have other
  // line item types than the defined unit type (e.g. week, month, year).
  const showSubTotal = txHasCommission(transaction, userRole) || refund;

  // all non-reversal, non-commission line items
  const subTotalLineItems = nonCommissionNonReversalLineItems(transaction);
  // line totals of those line items combined
  const subTotal = lineItemsTotal(subTotalLineItems);

  const formattedSubTotal = subTotalLineItems.length > 0 ? formatMoney(intl, subTotal) : null;

  return formattedSubTotal && showSubTotal ? (
    <>
      <hr className={css.totalDivider} />
      <div className={css.subTotalLineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.subTotal" />
        </span>
        <span className={css.itemValue}>{formattedSubTotal}</span>
      </div>
    </>
  ) : null;
};

LineItemSubTotalMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  userRole: string.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemSubTotalMaybe;
