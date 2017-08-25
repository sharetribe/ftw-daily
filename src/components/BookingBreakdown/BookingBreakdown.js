/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage, intlShape, injectIntl } from 'react-intl';
import Decimal from 'decimal.js';
import classNames from 'classnames';
import config from '../../config';
import { convertMoneyToNumber, formatMoney } from '../../util/currency';
import * as propTypes from '../../util/propTypes';

import css from './BookingBreakdown.css';

export const BookingBreakdownComponent = props => {
  const {
    rootClassName,
    className,
    bookingStart,
    bookingEnd,
    payinTotal,
    payoutTotal,
    totalLabelMessage,
    lineItems,
    userRole,
    intl,
  } = props;

  const classes = classNames(rootClassName || css.root, className);

  if (userRole === 'customer' && !payinTotal) {
    throw new Error('payinTotal is required for customer breakdown');
  }

  if (userRole === 'provider' && !payoutTotal) {
    throw new Error('payoutTotal is required for provider breakdown');
  }

  const dateFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };
  const bookingPeriod = (
    <FormattedMessage
      id="BookingBreakdown.bookingPeriod"
      values={{
        bookingStart: (
          <span className={css.nowrap}>
            {intl.formatDate(bookingStart, dateFormatOptions)}
          </span>
        ),
        bookingEnd: (
          <span className={css.nowrap}>
            {intl.formatDate(bookingEnd, dateFormatOptions)}
          </span>
        ),
      }}
    />
  );

  const nightPurchase = lineItems.find(item => item.code === 'line-item/night');
  const providerCommission = lineItems.find(item => item.code === 'line-item/provider-commission');

  const nightCount = nightPurchase.quantity.toFixed();
  const nightCountMessage = (
    <FormattedHTMLMessage id="BookingBreakdown.nightCount" values={{ count: nightCount }} />
  );

  const currencyConfig = config.currencyConfig;
  const formattedUnitPrice = formatMoney(intl, nightPurchase.unitPrice);

  // If commission is passed it will be shown as a fee already reduces from the total price
  let subTotalInfo = null;
  let commissionInfo = null;

  if (userRole === 'provider') {
    // TODO: Calculate subtotal from provider total and the commission
    const unitPriceAsNumber = convertMoneyToNumber(nightPurchase.unitPrice);
    const subTotal = new Decimal(nightCount).times(unitPriceAsNumber).toNumber();
    const formattedSubTotal = intl.formatNumber(subTotal, currencyConfig);

    subTotalInfo = (
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.subTotal" />
        </span>
        <span className={css.itemValue}>{formattedSubTotal}</span>
      </div>
    );

    const commission = providerCommission.lineTotal;
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

  const defaultTotalLabel = userRole === 'customer'
    ? <FormattedMessage id="BookingBreakdown.total" />
    : <FormattedMessage id="BookingBreakdown.providerTotal" />;
  const totalLabel = totalLabelMessage || defaultTotalLabel;

  const totalPrice = userRole === 'customer' ? payinTotal : payoutTotal;
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

BookingBreakdownComponent.defaultProps = {
  rootClassName: null,
  className: null,
  payinTotal: null,
  payoutTotal: null,
  totalLabelMessage: null,
};

const { arrayOf, instanceOf, node, oneOf, shape, string } = PropTypes;

const lineItem = shape({
  code: string.isRequired,
  quantity: instanceOf(Decimal),
  unitPrice: propTypes.money,
  lineTotal: propTypes.money,
});

BookingBreakdownComponent.propTypes = {
  rootClassName: string,
  className: string,

  bookingStart: instanceOf(Date).isRequired,
  bookingEnd: instanceOf(Date).isRequired,
  lineItems: arrayOf(lineItem).isRequired,
  userRole: oneOf(['customer', 'provider']).isRequired,
  payinTotal: propTypes.money, // required if userRole === customer
  payoutTotal: propTypes.money, // required if userRole === provider
  totalLabelMessage: node,

  // from injectIntl
  intl: intlShape.isRequired,
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = 'BookingBreakdown';

export default BookingBreakdown;
