import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import {
  propTypes,
  LINE_ITEM_CUSTOMER_COMMISSION,
  LINE_ITEM_PROVIDER_COMMISSION,
} from '../../util/types';

import css from './BookingBreakdown.css';

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
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  if (!unitPurchase) {
    throw new Error(`LineItemSubTotalMaybe: lineItem (${unitType}) missing`);
  }

  const formattedSubTotal = formatMoney(intl, unitPurchase.lineTotal);

  return showSubTotal ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.subTotal" />
      </span>
      <span className={css.itemValue}>{formattedSubTotal}</span>
    </div>
  ) : null;
};

LineItemSubTotalMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  userRole: string.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemSubTotalMaybe;
