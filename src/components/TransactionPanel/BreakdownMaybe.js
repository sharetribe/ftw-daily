import React from 'react';
import classNames from 'classnames';
import config from '../../config';
import { DATE_TYPE_DATE } from '../../util/types';
import { BookingBreakdown } from '../../components';

import css from './TransactionPanel.css';

// Functional component as a helper to build BookingBreakdown
const BreakdownMaybe = props => {
  const { className, rootClassName, breakdownClassName, transaction, transactionRole } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  const classes = classNames(rootClassName || css.breakdownMaybe, className);
  const breakdownClasses = classNames(breakdownClassName || css.breakdown);

  return loaded ? (
    <div className={classes}>
      <BookingBreakdown
        hourly={props.hourly}
        className={breakdownClasses}
        userRole={transactionRole}
        unitType={props.hourly ? "line-item/hour" : config.bookingUnitType}
        transaction={transaction}
        booking={transaction.booking}
        dateType={DATE_TYPE_DATE}
      />
    </div>
  ) : null;
};

export default BreakdownMaybe;
