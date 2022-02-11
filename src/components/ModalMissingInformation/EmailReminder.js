import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { isTooManyEmailVerificationRequestsError } from '../../util/errors';
import { IconEmailAttention, InlineTextButton, NamedLink } from '../../components';

import css from './ModalMissingInformation.module.css';

const EmailReminder = props => {
  const {
    className,
    user,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
  } = props;

  const email = user.id ? <span className={css.email}>{user.attributes.email}</span> : '';

  const resendEmailLink = (
    <InlineTextButton rootClassName={css.helperLink} onClick={onResendVerificationEmail}>
      <FormattedMessage id="ModalMissingInformation.resendEmailLinkText" />
    </InlineTextButton>
  );

  const fixEmailLink = (
    <NamedLink className={css.helperLink} name="ContactDetailsPage">
      <FormattedMessage id="ModalMissingInformation.fixEmailLinkText" />
    </NamedLink>
  );

  const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
    sendVerificationEmailError
  )
    ? 'ModalMissingInformation.resendFailedTooManyRequests'
    : 'ModalMissingInformation.resendFailed';
  const resendErrorMessage = sendVerificationEmailError ? (
    <p className={css.error}>
      <FormattedMessage id={resendErrorTranslationId} />
    </p>
  ) : null;

  return (
    <div className={className}>
      <IconEmailAttention className={css.modalIcon} />
      <p className={css.modalTitle}>
        <FormattedMessage id="ModalMissingInformation.verifyEmailTitle" />
      </p>
      <p className={css.modalMessage}>
        <FormattedMessage id="ModalMissingInformation.verifyEmailText" />
      </p>
      <p className={css.modalMessage}>
        <FormattedMessage id="ModalMissingInformation.checkInbox" values={{ email }} />
      </p>
      {resendErrorMessage}

      <div className={css.bottomWrapper}>
        <p className={css.helperText}>
          {sendVerificationEmailInProgress ? (
            <FormattedMessage id="ModalMissingInformation.sendingEmail" />
          ) : (
            <FormattedMessage
              id="ModalMissingInformation.resendEmail"
              values={{ resendEmailLink }}
            />
          )}
        </p>
        <p className={css.helperText}>
          <FormattedMessage id="ModalMissingInformation.fixEmail" values={{ fixEmailLink }} />
        </p>
      </div>
    </div>
  );
};

export default EmailReminder;
