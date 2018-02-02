import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemRefundMaybe = props => {
  const { transaction, unitType, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === unitType && item.reversal
  );

  return refund ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.refund" />
      </span>
      <span className={css.itemValue}>{formatMoney(intl, refund.lineTotal)}</span>
    </div>
  ) : null;
};

LineItemRefundMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemRefundMaybe;
