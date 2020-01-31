import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { propTypes, LINE_ITEM_DISCOUNT } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemDiscountMaybe = props => {
  const { transaction, intl } = props;

  const discount = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_DISCOUNT
  );

  return discount ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage
          id="BookingBreakdown.discount"
          values={{ reason: '' }}
        />
      </span>
      <span className={css.itemValue}>{formatMoney(intl, discount.lineTotal)}</span>
    </div>
  ) : null;
};

LineItemDiscountMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemDiscountMaybe;