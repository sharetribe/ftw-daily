/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React from 'react';
import { oneOf, string } from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';

import LineItemUnitPrice from './LineItemUnitPrice';
import LineItemBookingPeriod from './LineItemBookingPeriod';
import LineItemSubTotalMaybe from './LineItemSubTotalMaybe';
import LineItemCommissionMaybe from './LineItemCommissionMaybe';
import LineItemRefundMaybe from './LineItemRefundMaybe';
import LineItemTotalPrice from './LineItemTotalPrice';
import css from './BookingBreakdown.css';

export const BookingBreakdownComponent = props => {
  const { rootClassName, className, userRole, unitType, transaction, booking, intl } = props;

  const isProvider = userRole === 'provider';
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <LineItemUnitPrice transaction={transaction} unitType={unitType} intl={intl} />
      <LineItemBookingPeriod transaction={transaction} booking={booking} unitType={unitType} />

      <LineItemSubTotalMaybe
        transaction={transaction}
        unitType={unitType}
        isProvider={isProvider}
        intl={intl}
      />
      <LineItemCommissionMaybe transaction={transaction} isProvider={isProvider} intl={intl} />
      <LineItemRefundMaybe transaction={transaction} unitType={unitType} intl={intl} />

      <hr className={css.totalDivider} />
      <LineItemTotalPrice transaction={transaction} isProvider={isProvider} intl={intl} />
    </div>
  );
};

BookingBreakdownComponent.defaultProps = { rootClassName: null, className: null };

BookingBreakdownComponent.propTypes = {
  rootClassName: string,
  className: string,

  userRole: oneOf(['customer', 'provider']).isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = 'BookingBreakdown';

export default BookingBreakdown;
