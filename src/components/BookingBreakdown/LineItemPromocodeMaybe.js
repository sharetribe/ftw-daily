import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { propTypes, LINE_ITEM_DISCOUNT } from '../../util/types';
import { bool } from 'prop-types';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './BookingBreakdown.module.css';

const { Money } = sdkTypes;

const LineItemPromocodeMaybe = props => {
  const { transaction, intl, promocode } = props;
  const {
    lineItems,
    protectedData
  } = transaction.attributes;

  const discount = lineItems.find(
    item => item.code === 'line-item/units'
  );

  const disc = new Money((discount.lineTotal.amount * 10 / 100), discount.lineTotal.currency);

  return promocode ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage
          id="BookingBreakdown.discountWithPromocode"
        />
      </span>
      <span className={css.itemValue}>{formatMoney(intl, disc)}</span>
    </div>
  ) : null;
};

LineItemPromocodeMaybe.propTypes = {
  promocode: bool,
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemPromocodeMaybe;
