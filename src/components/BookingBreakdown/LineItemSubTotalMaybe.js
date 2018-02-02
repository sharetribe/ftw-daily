import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemSubTotalMaybe = props => {
  const { transaction, unitType, isProvider, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === unitType && item.reversal
  );

  // Show unit purchase line total (unit price * quantity) as a subtotal.
  // PLEASE NOTE that this assumes that the transaction doesn't have other
  // line item types than the defined unit type (e.g. week, month, year).
  const showSubTotal = isProvider || refund;
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );
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
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemSubTotalMaybe;
