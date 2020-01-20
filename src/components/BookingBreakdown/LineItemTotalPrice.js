import React from 'react';
import { bool } from 'prop-types';
import moment from 'moment';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney, convertMoneyToNumber, convertUnitToSubUnit, unitDivisor } from '../../util/currency';
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
  const dueDate = moment(startDate).subtract(3, 'days');

  const attributes = transaction.attributes;
  const isEstimate = transaction.id.uuid === 'estimated-transaction';

  const totalMoney = isProvider
    ? attributes.payoutTotal
    : attributes.payinTotal;

  let totalPrice = convertUnitToSubUnit(convertMoneyToNumber(totalMoney), unitDivisor(totalMoney.currency))
  const isSplitPayment = !!attributes.protectedData && attributes.protectedData.linkedProcessId;

  if (isSplitPayment && !isEstimate) totalPrice *= 2

  const splitPrice = totalPrice / 2;

  return (
    <>
      <hr className={css.totalDivider} />
      { isSplitPayment ?
        <>
          <div className={css.subTotalLineItem}>
            <div className={css.totalLabel}>Due now</div>
            <div className={css.totalPrice}>{formatMoney(intl, new Money(splitPrice, totalMoney.currency))}</div>
          </div>
          <div className={css.lineItemTotal}>
            <div className={css.totalLabel}>Due {formatDateToText(intl, dueDate).date}</div>
            <div className={css.totalPrice}>{formatMoney(intl, new Money(splitPrice, totalMoney.currency))}</div>
          </div>
        </> :
        <div className={css.lineItemTotal}>
          <div className={css.totalLabel}>{totalLabel}</div>
          <div className={css.totalPrice}>{formatMoney(intl, new Money(totalPrice, totalMoney.currency))}</div>
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
