import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { txIsCanceled, txIsDelivered, txIsDeclined } from '../../util/transaction';
import { propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './BookingBreakdown.module.css';
const { Money } = sdkTypes;

const LineItemUnitPrice = props => {
  const { transaction, isProvider, intl, promocode } = props;

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

  const discount = transaction.attributes.lineItems.find(
    item => item.code === 'line-item/units'
  );

  const payoutTotalAfterDiscount = new Money((transaction.attributes.payoutTotal.amount - (discount.lineTotal.amount * 10 / 100)), transaction.attributes.payoutTotal.currency);
  const payinTotalAfterDiscount = new Money((transaction.attributes.payinTotal.amount - (discount.lineTotal.amount * 10 / 100)), transaction.attributes.payinTotal.currency);

  const totalPricePromo = isProvider
    ? payoutTotalAfterDiscount
    : payinTotalAfterDiscount;
  const totalPrice = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal;
  const formattedTotalPrice = formatMoney(intl, totalPrice);
  const formattedTotalPricePromo = formatMoney(intl, totalPricePromo);
  const total = promocode ? formattedTotalPricePromo : formattedTotalPrice;

  return (
    <>
      <hr className={css.totalDivider} />
      <div className={css.lineItemTotal}>
        <div className={css.totalLabel}>{totalLabel}</div>
        <div className={css.totalPrice}>{formattedTotalPrice}</div>
      </div>
    </>
  );
};

LineItemUnitPrice.propTypes = {
  promocode: bool,
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
