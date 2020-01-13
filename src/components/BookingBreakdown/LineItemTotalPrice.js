import React from 'react';
import { bool } from 'prop-types';
import moment from 'moment';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney, convertMoneyToNumber } from '../../util/currency';
import { txIsCanceled, txIsDelivered, txIsDeclined } from '../../util/transaction';
import { propTypes } from '../../util/types';
import { nightsBetween, formatDateToText } from '../../util/dates';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './BookingBreakdown.css';

const { Money } = sdkTypes;

const LineItemUnitPrice = props => {
  const { transaction, isProvider, intl } = props;

  let providerTotalMessageId = 'BookingBreakdown.providerTotalDefault';
  if (txIsDelivered(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDelivered';
  } else if (txIsDeclined(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDeclined';
  } else if (txIsCanceled(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalCanceled';
  }

  const totalLabel = isProvider ? (
    <FormattedMessage id={providerTotalMessageId} />
  ) : (
    <FormattedMessage id="BookingBreakdown.total" />
  );

  const startDate = transaction.booking.attributes.start;
  const nightsUntilStartDate = nightsBetween(transaction.attributes.createdAt, startDate);
  const isSplitPayment = nightsUntilStartDate >= 14;
  const dueDate = moment(startDate).subtract(3, 'days');

  const totalPrice = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal;

  const splitPrice = new Money(convertMoneyToNumber(totalPrice) * 100 / 2, totalPrice.currency)

  return (
    <>
      <hr className={css.totalDivider} />
      { isSplitPayment ?
        <>
          <div className={css.subTotalLineItem}>
            <div className={css.totalLabel}>Due now</div>
            <div className={css.totalPrice}>{formatMoney(intl, splitPrice)}</div>
          </div>
          <div className={css.lineItemTotal}>
            <div className={css.totalLabel}>Due {formatDateToText(intl, dueDate).date}</div>
            <div className={css.totalPrice}>{formatMoney(intl, splitPrice)}</div>
          </div>
        </> :
        <div className={css.lineItemTotal}>
          <div className={css.totalLabel}>{totalLabel}</div>
          <div className={css.totalPrice}>{formatMoney(intl, totalPrice)}</div>
        </div>
      }
    </>
  );
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
