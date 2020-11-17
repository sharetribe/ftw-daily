import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { LINE_ITEM_CUSTOMER_COMMISSION, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const { Money } = sdkTypes;

// Validate the assumption that the commission exists and the amount
// is zero or positive.
const isValidCommission = commissionLineItem => {
  return (
    commissionLineItem &&
    commissionLineItem.lineTotal instanceof Money &&
    commissionLineItem.lineTotal.amount >= 0
  );
};

const LineItemCustomerCommissionMaybe = props => {
  const { transaction, isCustomer, intl } = props;

  const customerCommissionLineItem = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_CUSTOMER_COMMISSION && !item.reversal
  );

  // If commission is passed it will be shown as a fee already reduces from the total price
  let commissionItem = null;

  if (isCustomer && customerCommissionLineItem) {
    if (!isValidCommission(customerCommissionLineItem)) {
      // eslint-disable-next-line no-console
      console.error('invalid commission line item:', customerCommissionLineItem);
      throw new Error('Commission should be present and the value should be zero or positive');
    }

    const commission = customerCommissionLineItem.lineTotal;
    const formattedCommission = commission ? formatMoney(intl, commission) : null;

    commissionItem = (
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

LineItemCustomerCommissionMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isCustomer: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemCustomerCommissionMaybe;
