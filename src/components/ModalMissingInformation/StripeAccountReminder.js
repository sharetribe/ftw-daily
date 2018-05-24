import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NamedLink } from '../../components';

import css from './ModalMissingInformation.css';

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
        <NamedLink className={css.reminderModalLinkButton} name="PayoutPreferencesPage">
          <FormattedMessage id="ModalMissingInformation.gotoPaymentSettings" />
        </NamedLink>
      </div>
    </div>
  );
};

export default StripeAccountReminder;
