import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { ensureCurrentUser } from '../../util/data';
import { PrimaryButton, TextInputField } from '../../components';

import css from './ContactDetailsForm.css';

const ContactDetailsFormComponent = props => {
  const {
    rootClassName,
    className,
    currentUser,
    form,
    handleSubmit,
    submitting,
    inProgress,
    intl,
    invalid,
    onResendVerificationEmail,
    pristine,
  } = props;

  const user = ensureCurrentUser(currentUser);

  if (!user.id) {
    return null;
  }

  // email
  const emailLabel = intl.formatMessage({
    id: 'ContactDetailsForm.emailLabel',
  });

  const { email, emailVerified, pendingEmail } = user.attributes;
  const emailPlaceholder = email || '';

  const emailRequiredMessage = intl.formatMessage({
    id: 'ContactDetailsForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);

  // Email status info: unverified, verified and pending email (aka changed unverified email)
  let emailVerifiedInfo = null;

  if (emailVerified && !pendingEmail && pristine) {
    // Current email is verified and there's no pending unverified email
    emailVerifiedInfo = (
      <span className={css.emailVerified}>
        <FormattedMessage id="ContactDetailsForm.emailVerified" />
      </span>
    );
  } else if (!emailVerified && !pendingEmail) {
    // Current email is unverified. This is the email given in sign up form
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const resendEmailLink = (
      <span className={css.helperLink} onClick={onResendVerificationEmail} role="button">
        <FormattedMessage id="ContactDetailsForm.resendEmailVerificationText" />
      </span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    emailVerifiedInfo = (
      <span className={css.emailUnverified}>
        <FormattedMessage id="ContactDetailsForm.emailUnverified" values={{ resendEmailLink }} />
      </span>
    );
  } else if (pendingEmail) {
    // Current email has been tried to change, but the new address is not yet verified

    const pendingEmailStyled = <span className={css.emailStyle}>{pendingEmail}</span>;
    const pendingEmailCheckInbox = (
      <span className={css.checkInbox}>
        <FormattedMessage id="ContactDetailsForm.pendingEmailCheckInbox" values={{ pendingEmail: pendingEmailStyled}} />
      </span>
    );

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const resendPendingEmailLink = (
      <span className={css.helperLink} onClick={onResendVerificationEmail} role="button">
        <FormattedMessage id="ContactDetailsForm.resendEmailVerificationText" />
      </span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    emailVerifiedInfo = (
      <span className={css.pendingEmailUnverified}>
        <FormattedMessage
          id="ContactDetailsForm.pendingEmailUnverified"
          values={{ pendingEmailCheckInbox, resendPendingEmailLink }}
        />
      </span>
    );
  }

  // password
  const passwordLabel = intl.formatMessage({
    id: 'ContactDetailsForm.passwordLabel',
  });
  const passwordPlaceholder = intl.formatMessage({
    id: 'ContactDetailsForm.passwordPlaceholder',
  });
  const passwordRequiredMessage = intl.formatMessage({
    id: 'ContactDetailsForm.passwordRequired',
  });
  const passwordRequired = validators.required(passwordRequiredMessage);

  const classes = classNames(rootClassName || css.root, className);
  const submitDisabled = invalid || submitting || inProgress;

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <div className={css.emailSection}>
        <TextInputField
          type="email"
          name="email"
          id={`${form}.email`}
          label={emailLabel}
          placeholder={emailPlaceholder}
          validate={emailRequired}
        />
        {emailVerifiedInfo}
      </div>

      <div className={css.confirmChangesSection}>
        <h3 className={css.confirmChangesTitle}>
          <FormattedMessage id="ContactDetailsForm.confirmChangesTitle" />
        </h3>
        <p className={css.confirmChangesInfo}>
          <FormattedMessage id="ContactDetailsForm.confirmChangesInfo" />
        </p>

        <TextInputField
          className={css.password}
          type="password"
          name="currentPassword"
          id={`${form}.currentPassword`}
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          validate={passwordRequired}
        />
      </div>
      <div className={css.bottomWrapper}>
        <PrimaryButton className={css.submitButton} type="submit" disabled={submitDisabled}>
          <FormattedMessage id="ContactDetailsForm.saveChanges" />
        </PrimaryButton>
      </div>
    </form>
  );
};

ContactDetailsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
};

const { bool, func, string } = PropTypes;

ContactDetailsFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  inProgress: bool,
  intl: intlShape.isRequired,
  onResendVerificationEmail: func.isRequired,
};

const defaultFormName = 'ContactDetailsForm';

const ContactDetailsForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  ContactDetailsFormComponent
);

export default ContactDetailsForm;
