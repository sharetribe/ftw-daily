import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { LINE_ITEM_PROVIDER_COMMISSION, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const { Money } = sdkTypes;

// Validate the assumption that the commission exists and the amount
// is zero or negative.
const isValidCommission = commissionLineItem => {
  return commissionLineItem.lineTotal instanceof Money && commissionLineItem.lineTotal.amount <= 0;
};

const LineItemProviderCommissionMaybe = props => {
  const { transaction, isProvider, intl } = props;

  const providerCommissionLineItem = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_PROVIDER_COMMISSION && !item.reversal
  );

  // If commission is passed it will be shown as a fee already reduces from the total price
  let commissionItem = null;

  // Flex Template for Web is using the default transaction process (https://www.sharetribe.com/docs/background/transaction-process/#sharetribe-flex-default-transaction-process)
  // which containt provider commissions so by default the providerCommissionLineItem should exist.
  // If you are not using provider commisison you might want to remove this whole component from BookingBreakdown.js file.
  if (isProvider && providerCommissionLineItem) {
    if (!isValidCommission(providerCommissionLineItem)) {
      // eslint-disable-next-line no-console
      console.error('invalid commission line item:', providerCommissionLineItem);
      throw new Error('Commission should be present and the value should be zero or negative');
    }

    const commission = providerCommissionLineItem.lineTotal;
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

LineItemProviderCommissionMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemProviderCommissionMaybe;
