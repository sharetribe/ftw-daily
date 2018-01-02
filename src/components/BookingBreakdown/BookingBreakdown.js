/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React from 'react';
import { bool, oneOf, string } from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { types } from '../../util/sdkLoader';
import { formatMoney } from '../../util/currency';
import * as propTypes from '../../util/propTypes';

import css from './BookingBreakdown.css';

const { Money } = types;

// Validate the assumption that the commission exists and the amount
// is zero or negative.
const isValidCommission = commissionLineItem => {
  return (
    commissionLineItem &&
    commissionLineItem.lineTotal instanceof Money &&
    commissionLineItem.lineTotal.amount <= 0
  );
};

const UnitPriceItem = props => {
  const { transaction, unitType, intl } = props;
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );
  const formattedUnitPrice = formatMoney(intl, unitPurchase.unitPrice);

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.pricePerUnit" />
      </span>
      <span className={css.itemValue}>{formattedUnitPrice}</span>
    </div>
  );
};

UnitPriceItem.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: oneOf([propTypes.LINE_ITEM_NIGHT, propTypes.LINE_ITEM_DAY]).isRequired,
  intl: intlShape.isRequired,
};

const UnitsItem = props => {
  const { transaction, booking, unitType, intl } = props;

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
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );
  const unitCount = unitPurchase.quantity.toFixed();
  const unitCountMessage = (
    <FormattedHTMLMessage id="BookingBreakdown.unitCount" values={{ count: unitCount }} />
  );

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>{bookingPeriod}</span>
      <span className={css.itemValue}>{unitCountMessage}</span>
    </div>
  );
};

UnitsItem.propTypes = {
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired,
  intl: intlShape.isRequired,
};

const SubTotalItemMaybe = props => {
  const { transaction, unitType, isProvider, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === unitType && item.reversal
  );

  // Show unit purchase line total (unit price * quantity) as a subtotal.
  // PLEASE NOTE that this assumes that the transaction doesn't have other
  // line item types than the defined unit type (e.g. week, month, year).
  const showSubTotal = isProvider || refund;
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );
  const formattedSubTotal = formatMoney(intl, unitPurchase.lineTotal);

  return showSubTotal ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.subTotal" />
      </span>
      <span className={css.itemValue}>{formattedSubTotal}</span>
    </div>
  ) : null;
};

SubTotalItemMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

const CommissionItemMaybe = props => {
  const { transaction, isProvider, intl } = props;

  const providerCommissionLineItem = transaction.attributes.lineItems.find(
    item => item.code === propTypes.LINE_ITEM_PROVIDER_COMMISSION && !item.reversal
  );
  const commissionRefund = transaction.attributes.lineItems.find(
    item => item.code === propTypes.LINE_ITEM_PROVIDER_COMMISSION && item.reversal
  );

  // If commission is passed it will be shown as a fee already reduces from the total price
  let commissionItem = null;

  if (isProvider) {
    if (!isValidCommission(providerCommissionLineItem)) {
      // eslint-disable-next-line no-console
      console.error('invalid commission line item:', providerCommissionLineItem);
      throw new Error('Commission should be present and the value should be zero or negative');
    }

    const commission = providerCommissionLineItem.lineTotal;
    const formattedCommission = commission ? formatMoney(intl, commission) : null;

    commissionItem = commissionRefund ? null : (
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.commission" />
        </span>
        <span className={css.itemValue}>{formattedCommission}</span>
      </div>
    );
  }

  return commissionItem;
};

CommissionItemMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

const RefundItemMaybe = props => {
  const { transaction, unitType, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === unitType && item.reversal
  );

  return refund ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.refund" />
      </span>
      <span className={css.itemValue}>{formatMoney(intl, refund.lineTotal)}</span>
    </div>
  ) : null;
};

RefundItemMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export const BookingBreakdownComponent = props => {
  const { rootClassName, className, userRole, transaction, booking, intl } = props;

  const unitType = propTypes.LINE_ITEM_NIGHT;

  const isProvider = userRole === 'provider';
  const classes = classNames(rootClassName || css.root, className);

  let providerTotalMessageId = 'BookingBreakdown.providerTotalDefault';
  if (propTypes.txIsDelivered(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDelivered';
  } else if (propTypes.txIsDeclinedOrAutodeclined(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDeclined';
  } else if (propTypes.txIsCanceled(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalCanceled';
  }

  const totalLabel = isProvider ? (
    <FormattedMessage id={providerTotalMessageId} />
  ) : (
    <FormattedMessage id="BookingBreakdown.total" />
  );

  const totalPrice = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal;
  const formattedTotalPrice = formatMoney(intl, totalPrice);

  return (
    <div className={classes}>
      <UnitPriceItem transaction={transaction} unitType={unitType} intl={intl} />
      <UnitsItem transaction={transaction} booking={booking} unitType={unitType} intl={intl} />
      <SubTotalItemMaybe
        transaction={transaction}
        unitType={unitType}
        isProvider={isProvider}
        intl={intl}
      />
      <CommissionItemMaybe transaction={transaction} isProvider={isProvider} intl={intl} />
      <RefundItemMaybe transaction={transaction} unitType={unitType} intl={intl} />
      <hr className={css.totalDivider} />
      <div className={css.lineItem}>
        <div className={css.totalLabel}>{totalLabel}</div>
        <div className={css.totalPrice}>{formattedTotalPrice}</div>
      </div>
    </div>
  );
};

BookingBreakdownComponent.defaultProps = { rootClassName: null, className: null };

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
