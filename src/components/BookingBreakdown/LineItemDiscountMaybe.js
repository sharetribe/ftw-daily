import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { propTypes, LINE_ITEM_DISCOUNT } from '../../util/types';
import { bool } from 'prop-types';

import css from './BookingBreakdown.module.css';

const LineItemDiscountMaybe = props => {
  const { transaction, isProvider, intl } = props;
  const {
    lineItems,
    protectedData
  } = transaction.attributes;

  const discount = lineItems.find(
    item => item.code === LINE_ITEM_DISCOUNT
  );

  const { discountReason } = protectedData || {};
  const reason = discountReason ? `(${ discountReason })` : '';

  return discount && !isProvider ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage
          id="BookingBreakdown.discount"
          values={{ reason }}
        />
      </span>
      <span className={css.itemValue}>{formatMoney(intl, discount.lineTotal)}</span>
    </div>
  ) : null;
};

LineItemDiscountMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
  isProvider: bool.isRequired,
};

export default LineItemDiscountMaybe;
