import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { ensureCurrentUser } from '../../util/data';
import {
  isForbiddenChangeEmailError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import { PrimaryButton, TextInputField } from '../../components';

import css from './ContactDetailsForm.css';

const SHOW_EMAIL_SENT_TIMEOUT = 2000;

class ContactDetailsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { verificationEmailSent: false };
    this.handleResendVerificationEmail = this.handleResendVerificationEmail.bind(this);
  }

  componentWillUnmount() {
    window.clearTimeout(this.emailSentTimeoutId);
  }

  handleResendVerificationEmail() {
    this.props.onResendVerificationEmail();

    this.setState({ verificationEmailSent: true });
    this.emailSentTimeoutId = window.setTimeout(
      () => {
        this.setState({ verificationEmailSent: false });
      },
      SHOW_EMAIL_SENT_TIMEOUT
    );
  }

  render() {
    const {
      rootClassName,
      className,
      changeEmailError,
      currentUser,
      form,
      handleSubmit,
      submitting,
      inProgress,
      intl,
      invalid,
      pristine,
      ready,
      sendVerificationEmailError,
      sendVerificationEmailInProgress,
    } = this.props;

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

    const tooManyVerificationRequests = isTooManyEmailVerificationRequestsError(
      sendVerificationEmailError
    );

    let resendEmailMessage = null;
    if (tooManyVerificationRequests) {
      resendEmailMessage = (
        <span className={css.tooMany}>
          <FormattedMessage id="ContactDetailsForm.tooManyVerificationRequests" />
        </span>
      );
    } else if (sendVerificationEmailInProgress || this.state.verificationEmailSent) {
      resendEmailMessage = (
        <span className={css.emailSent}>
          <FormattedMessage id="ContactDetailsForm.emailSent" />
        </span>
      );
    } else {
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      resendEmailMessage = (
        <span className={css.helperLink} onClick={this.handleResendVerificationEmail} role="button">
          <FormattedMessage id="ContactDetailsForm.resendEmailVerificationText" />
        </span>
      );
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }

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

      emailVerifiedInfo = (
        <span className={css.emailUnverified}>
          <FormattedMessage
            id="ContactDetailsForm.emailUnverified"
            values={{ resendEmailMessage }}
          />
        </span>
      );
    } else if (pendingEmail) {
      // Current email has been tried to change, but the new address is not yet verified

      const pendingEmailStyled = <span className={css.emailStyle}>{pendingEmail}</span>;
      const pendingEmailCheckInbox = (
        <span className={css.checkInbox}>
          <FormattedMessage
            id="ContactDetailsForm.pendingEmailCheckInbox"
            values={{ pendingEmail: pendingEmailStyled }}
          />
        </span>
      );

      emailVerifiedInfo = (
        <span className={css.pendingEmailUnverified}>
          <FormattedMessage
            id="ContactDetailsForm.pendingEmailUnverified"
            values={{ pendingEmailCheckInbox, resendEmailMessage }}
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

    const passwordFailedMessage = intl.formatMessage({
      id: 'ContactDetailsForm.passwordFailed',
    });
    const passwordErrorText = isForbiddenChangeEmailError(changeEmailError)
      ? passwordFailedMessage
      : null;

    const confirmClasses = classNames(css.confirmChangesSection, { [css.confirmChangesSectionVisible]: !pristine });
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

        <div className={confirmClasses}>
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
            customErrorText={passwordErrorText}
          />
        </div>
        <div className={css.bottomWrapper}>
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={inProgress}
            ready={ready}
            disabled={submitDisabled}
          >
            <FormattedMessage id="ContactDetailsForm.saveChanges" />
          </PrimaryButton>
        </div>
      </form>
    );
  }
}

ContactDetailsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  changeEmailError: null,
  inProgress: false,
  sendVerificationEmailError: null,
  sendVerificationEmailInProgress: false,
};

const { bool, func, instanceOf, string } = PropTypes;

ContactDetailsFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  changeEmailError: instanceOf(Error),
  inProgress: bool,
  intl: intlShape.isRequired,
  onResendVerificationEmail: func.isRequired,
  ready: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  sendVerificationEmailInProgress: bool,
};

const defaultFormName = 'ContactDetailsForm';

const ContactDetailsForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  ContactDetailsFormComponent
);

export default ContactDetailsForm;
