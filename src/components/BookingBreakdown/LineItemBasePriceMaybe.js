import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import {
  LINE_ITEM_NIGHT,
  LINE_ITEM_DAY,
  DAILY_PRICE,
  WEEKLY_PRICE,
  MONTHLY_PRICE,
  propTypes
} from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemBasePriceMaybe = props => {
  const { transaction, unitType, intl, isDaily, transactionType } = props;
  // const isNightly = unitType === LINE_ITEM_NIGHT;
  // const isDaily = unitType === LINE_ITEM_DAY;
  // const translationKey = isNightly
  //   ? 'BookingBreakdown.baseUnitNight'
  //   : isDaily
  //   ? 'BookingBreakdown.baseUnitDay'
  //   : 'BookingBreakdown.baseUnitQuantity';
  let translationKey = 'BookingBreakdown.baseUnitQuantity';

  switch(transactionType){
    case DAILY_PRICE: {
      translationKey = 'BookingBreakdown.baseUnitDay';
    };
    break;
    case WEEKLY_PRICE: {
      translationKey = 'BookingBreakdown.baseUnitWeek';
    };
    break;
    case MONTHLY_PRICE: {
      translationKey = 'BookingBreakdown.baseUnitMonth';
    };
    break;
  }

  // Find correct line-item for given unitType prop.
  // It should be one of the following: 'line-item/night, 'line-item/day', 'line-item/units', or 'line-item/time'
  // These are defined in '../../util/types';
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  const quantity = unitPurchase ? unitPurchase.quantity.toString() : null;
  const unitPrice = unitPurchase ? formatMoney(intl, unitPurchase.unitPrice) : null;
  const total = unitPurchase ? formatMoney(intl, unitPurchase.lineTotal) : null;

  return quantity && total ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={translationKey} values={{ unitPrice, quantity }} />
      </span>
      <span className={css.itemValue}>{total}</span>
    </div>
  ) : null;
};

LineItemBasePriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemBasePriceMaybe;
