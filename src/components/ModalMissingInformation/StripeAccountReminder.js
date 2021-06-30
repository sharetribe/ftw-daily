import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink } from '../../components';

import css from './ModalMissingInformation.module.css';

const StripeAccountReminder = props => {
  const { className } = props;

  return (
    <div className={className}>
      <p className={css.modalTitle}>
        <FormattedMessage id="ModalMissingInformation.missingStripeAccountTitle" />
      </p>
      <p className={css.modalMessage}>
        <FormattedMessage id="ModalMissingInformation.missingStripeAccountText" />
      </p>
      <div className={css.bottomWrapper}>
        <NamedLink className={css.reminderModalLinkButton} name="StripePayoutPage">
          <FormattedMessage id="ModalMissingInformation.gotoPaymentSettings" />
        </NamedLink>
      </div>
    </div>
  );
};

export default StripeAccountReminder;
