import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import {
  LINE_ITEM_UNITS,
  DAILY_PRICE,
  WEEKLY_PRICE,
  MONTHLY_PRICE,
  propTypes
} from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemUnitsMaybe = props => {
  const { transaction, unitType, isDaily, transactionType } = props;
  const isHourly = unitType === LINE_ITEM_UNITS;

  if (!isHourly) return null;

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  if (!unitPurchase) {
    throw new Error(`LineItemUnitsMaybe: lineItem (${unitType}) missing`);
  }

  const quantity = unitPurchase.quantity;

  let key1 = 'quantityUnit';
  let key2 = 'quantity';

  switch(transactionType){
    case DAILY_PRICE: {
      key1 = 'quantityUnitDays';
      key2 = 'quantityDays';
    };
    break;
    case WEEKLY_PRICE: {
      key1 = 'quantityUnitWeeks';
      key2 = 'quantityWeeks';
    };
    break;
    case MONTHLY_PRICE: {
      key1 = 'quantityUnitMonths';
      key2 = 'quantityMonths';
    };
    break;
  }

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
