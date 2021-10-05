import React from 'react';
import classNames from 'classnames';
import { DATE_TYPE_DATE, DATE_TYPE_DATETIME, LINE_ITEM_DAY, HOURLY_PRICE } from '../../util/types';
import { ensureListing } from '../../util/data';
import { BookingBreakdown } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build BookingBreakdown
const BreakdownMaybe = props => {
  const { className, rootClassName, breakdownClassName, transaction, transactionRole, unitType, promocode } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;
  const listingAttributes = ensureListing(transaction.listing).attributes;
  const timeZone =
    loaded && listingAttributes.availabilityPlan
      ? listingAttributes.availabilityPlan.timezone
      : 'Etc/UTC';
  const bookingType = transaction &&
                  transaction.attributes &&
                  transaction.attributes.protectedData &&
                  transaction.attributes.protectedData.type || HOURLY_PRICE;
  const dateType = bookingType === HOURLY_PRICE ? DATE_TYPE_DATETIME : DATE_TYPE_DATE;
  
  const classes = classNames(rootClassName || css.breakdownMaybe, className);
  const breakdownClasses = classNames(breakdownClassName || css.breakdown);

  return loaded ? (
    <div className={classes}>
      <BookingBreakdown
        promocode={promocode}
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
