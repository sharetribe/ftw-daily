import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { LINE_ITEM_UNITS, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemUnitsMaybe = props => {
  const { transaction, unitType, isDaily } = props;
  const isHourly = unitType === LINE_ITEM_UNITS;

  if (!isHourly) return null;

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  if (!unitPurchase) {
    throw new Error(`LineItemUnitsMaybe: lineItem (${unitType}) missing`);
  }

  const quantity = unitPurchase.quantity;

  const key1 = isDaily ? 'quantityUnitDays' : 'quantityUnit';
  const key2 = isDaily ? 'quantityDays' : 'quantity';

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={`BookingBreakdown.${key1}`} />
      </span>
      <span className={css.itemValue}>
        <FormattedMessage id={`BookingBreakdown.${key2}`} values={{ quantity }} />
      </span>
    </div>
  );
};

LineItemUnitsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
};

export default LineItemUnitsMaybe;
