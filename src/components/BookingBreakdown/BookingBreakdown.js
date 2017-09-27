/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { types } from '../../util/sdkLoader';
import { formatMoney } from '../../util/currency';
import * as propTypes from '../../util/propTypes';
import { error as logError } from '../../util/log';

import css from './BookingBreakdown.css';

const { Money } = types;

// Validate the assumption that the commission exists and the amount
// is zero or negative.
const isValidCommission = commissionLineItem => {
  return commissionLineItem &&
    commissionLineItem.lineTotal instanceof Money &&
    commissionLineItem.lineTotal.amount <= 0;
};

export const BookingBreakdownComponent = props => {
  const {
    rootClassName,
    className,
    userRole,
    transaction,
    booking,
    intl,
  } = props;

  const isProvider = userRole === 'provider';
  const classes = classNames(rootClassName || css.root, className);

  const dateFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  const bookingPeriod = (
    <FormattedMessage
      id="BookingBreakdown.bookingPeriod"
      values={{
        bookingStart: (
          <span className={css.nowrap}>
            {intl.formatDate(booking.attributes.start, dateFormatOptions)}
          </span>
        ),
        bookingEnd: (
          <span className={css.nowrap}>
            {intl.formatDate(booking.attributes.end, dateFormatOptions)}
          </span>
        ),
      }}
    />
  );

  const nightPurchase = transaction.attributes.lineItems.find(
    item => item.code === 'line-item/night'
  );
  const providerCommissionLineItem = transaction.attributes.lineItems.find(
    item => item.code === 'line-item/provider-commission'
  );

  const nightCount = nightPurchase.quantity.toFixed();
  const nightCountMessage = (
    <FormattedHTMLMessage id="BookingBreakdown.nightCount" values={{ count: nightCount }} />
  );

  const formattedUnitPrice = formatMoney(intl, nightPurchase.unitPrice);

  // If commission is passed it will be shown as a fee already reduces from the total price
  let subTotalInfo = null;
  let commissionInfo = null;

  if (isProvider) {
    if (!isValidCommission(providerCommissionLineItem)) {
      const error = new Error(
        'Commission should be present and the value should be zero or negative'
      );
      logError(error, {
        providerCommissionLineItem: providerCommissionLineItem,
        transaction: transaction,
      });
      throw error;
    }

    // The total sum that the customer pays is the payinTotal. We use
    // this amount as the subtotal information for the provider
    // breakdown.
    //
    // NOTE: this might break if the API hides the payinTotal from the provider
    const formattedSubTotal = formatMoney(intl, transaction.attributes.payinTotal);
    subTotalInfo = (
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.subTotal" />
        </span>
        <span className={css.itemValue}>{formattedSubTotal}</span>
      </div>
    );

    const commission = providerCommissionLineItem.lineTotal;
    const formattedCommission = commission ? formatMoney(intl, commission) : null;

    commissionInfo = (
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.commission" />
        </span>
        <span className={css.itemValue}>{formattedCommission}</span>
      </div>
    );
  }

  let providerTotalMessageId = 'BookingBreakdown.providerTotalDefault';
  if (propTypes.txIsDelivered(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDelivered';
  } else if (propTypes.txIsRejectedOrAutorejected(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalRejected';
  }

  const totalLabel = isProvider
    ? <FormattedMessage id={providerTotalMessageId} />
    : <FormattedMessage id="BookingBreakdown.total" />;

  const totalPrice = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal;
  const formattedTotalPrice = formatMoney(intl, totalPrice);

  return (
    <div className={classes}>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.pricePerNight" />
        </span>
        <span className={css.itemValue}>{formattedUnitPrice}</span>
      </div>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          {bookingPeriod}
        </span>
        <span className={css.itemValue}>{nightCountMessage}</span>
      </div>
      {subTotalInfo}
      {commissionInfo}
      <hr className={css.totalDivider} />
      <div className={css.lineItem}>
        <div className={css.totalLabel}>
          {totalLabel}
        </div>
        <div className={css.totalPrice}>
          {formattedTotalPrice}
        </div>
      </div>
    </div>
  );
};

BookingBreakdownComponent.defaultProps = { rootClassName: null, className: null };

const { oneOf, string } = PropTypes;

BookingBreakdownComponent.propTypes = {
  rootClassName: string,
  className: string,

  userRole: oneOf(['customer', 'provider']).isRequired,
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = 'BookingBreakdown';

export default BookingBreakdown;
