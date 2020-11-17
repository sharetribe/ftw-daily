import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { propTypes, LINE_ITEM_CUSTOMER_COMMISSION } from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemCustomerCommissionRefundMaybe = props => {
  const { transaction, isCustomer, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_CUSTOMER_COMMISSION && item.reversal
  );

  return isCustomer && refund ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.refundCustomerFee" />
      </span>
      <span className={css.itemValue}>{formatMoney(intl, refund.lineTotal)}</span>
    </div>
  ) : null;
};

LineItemCustomerCommissionRefundMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemCustomerCommissionRefundMaybe;
