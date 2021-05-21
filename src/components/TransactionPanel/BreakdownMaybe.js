import React from 'react';
import classNames from 'classnames';
import { DATE_TYPE_DATE, DATE_TYPE_DATETIME, LINE_ITEM_DAY } from '../../util/types';
import { ensureListing } from '../../util/data';
import { BookingBreakdown } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build BookingBreakdown
const BreakdownMaybe = props => {
  const { className, rootClassName, breakdownClassName, transaction, transactionRole, unitType } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;
  const listingAttributes = ensureListing(transaction.listing).attributes;
  const timeZone =
    loaded && listingAttributes.availabilityPlan
      ? listingAttributes.availabilityPlan.timezone
      : 'Etc/UTC';
  const dateType = unitType === LINE_ITEM_DAY ? DATE_TYPE_DATE : DATE_TYPE_DATETIME;

  const classes = classNames(rootClassName || css.breakdownMaybe, className);
  const breakdownClasses = classNames(breakdownClassName || css.breakdown);

  return loaded ? (
    <div className={classes}>
      <BookingBreakdown
        className={breakdownClasses}
        userRole={transactionRole}
        unitType={unitType}
        transaction={transaction}
        booking={transaction.booking}
        dateType={dateType}
        timeZone={timeZone}
      />
    </div>
  ) : null;
};

export default BreakdownMaybe;
