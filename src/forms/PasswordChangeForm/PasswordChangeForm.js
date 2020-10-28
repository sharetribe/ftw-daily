import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { ensureCurrentUser } from '../../util/data';
import { isChangePasswordWrongPassword } from '../../util/errors';
import { Form, PrimaryButton, FieldTextInput } from '../../components';

import css from './PasswordChangeForm.module.css';

const RESET_TIMEOUT = 800;

class PasswordChangeFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showResetPasswordMessage: false };
    this.resetTimeoutId = null;
    this.submittedValues = {};
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }
  componentWillUnmount() {
    window.clearTimeout(this.resetTimeoutId);
  }

  handleResetPassword() {
    this.setState({ showResetPasswordMessage: true });
    const email = this.props.currentUser.attributes.email;

    this.props.onResetPassword(email);
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            rootClassName,
            className,
            formId,
            changePasswordError,
            currentUser,
            handleSubmit,
            inProgress,
            resetPasswordInProgress,
            intl,
            invalid,
            pristine,
            ready,
            form,
            values,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);

          if (!user.id) {
            return null;
          }

          // New password
          const newPasswordLabel = intl.formatMessage({
            id: 'PasswordChangeForm.newPasswordLabel',
          });
          const newPasswordPlaceholder = intl.formatMessage({
            id: 'PasswordChangeForm.newPasswordPlaceholder',
          });
          const newPasswordRequiredMessage = intl.formatMessage({
            id: 'PasswordChangeForm.newPasswordRequired',
          });
          const newPasswordRequired = validators.requiredStringNoTrim(newPasswordRequiredMessage);

          const passwordMinLengthMessage = intl.formatMessage(
            {
              id: 'PasswordChangeForm.passwordTooShort',
            },
            {
              minLength: validators.PASSWORD_MIN_LENGTH,
            }
          );
          const passwordMaxLengthMessage = intl.formatMessage(
            {
              id: 'PasswordChangeForm.passwordTooLong',
            },
            {
              maxLength: validators.PASSWORD_MAX_LENGTH,
            }
          );

          const passwordMinLength = validators.minLength(
            passwordMinLengthMessage,
            validators.PASSWORD_MIN_LENGTH
          );
          const passwordMaxLength = validators.maxLength(
            passwordMaxLengthMessage,
            validators.PASSWORD_MAX_LENGTH
          );

          // password
          const passwordLabel = intl.formatMessage({
            id: 'PasswordChangeForm.passwordLabel',
          });
          const passwordPlaceholder = intl.formatMessage({
            id: 'PasswordChangeForm.passwordPlaceholder',
          });
          const passwordRequiredMessage = intl.formatMessage({
            id: 'PasswordChangeForm.passwordRequired',
          });

          const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);

          const passwordFailedMessage = intl.formatMessage({
            id: 'PasswordChangeForm.passwordFailed',
          });
          const passwordTouched = this.submittedValues.currentPassword !== values.currentPassword;
          const passwordErrorText = isChangePasswordWrongPassword(changePasswordError)
            ? passwordFailedMessage
            : null;

          const confirmClasses = classNames(css.confirmChangesSection, {
            [css.confirmChangesSectionVisible]: !pristine,
          });

          const genericFailure =
            changePasswordError && !passwordErrorText ? (
              <span className={css.error}>
                <FormattedMessage id="PasswordChangeForm.genericFailure" />
              </span>
            ) : null;

          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const classes = classNames(rootClassName || css.root, className);
          const submitDisabled = invalid || pristineSinceLastSubmit || inProgress;

          const sendPasswordLink = (
            <span className={css.helperLink} onClick={this.handleResetPassword} role="button">
              <FormattedMessage id="PasswordChangeForm.resetPasswordLinkText" />
            </span>
          );

          const resendPasswordLink = (
            <span className={css.helperLink} onClick={this.handleResetPassword} role="button">
              <FormattedMessage id="PasswordChangeForm.resendPasswordLinkText" />
            </span>
          );

          const resetPasswordLink =
            this.state.showResetPasswordMessage || resetPasswordInProgress ? (
              <>
                <FormattedMessage
                  id="PasswordChangeForm.resetPasswordLinkSent"
                  values={{
                    email: <span className={css.emailStyle}>{currentUser.attributes.email}</span>,
                  }}
                />{' '}
                {resendPasswordLink}
              </>
            ) : (
              sendPasswordLink
            );

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e)
                  .then(() => {
                    this.resetTimeoutId = window.setTimeout(form.reset, RESET_TIMEOUT);
                  })
                  .catch(() => {
                    // Error is handled in duck file already.
                  });
              }}
            >
              <div className={css.newPasswordSection}>
                <FieldTextInput
                  type="password"
                  id={formId ? `${formId}.newPassword` : 'newPassword'}
                  name="newPassword"
                  autoComplete="new-password"
                  label={newPasswordLabel}
                  placeholder={newPasswordPlaceholder}
                  validate={validators.composeValidators(
                    newPasswordRequired,
                    passwordMinLength,
                    passwordMaxLength
                  )}
                />
              </div>

              <div className={confirmClasses}>
                <h3 className={css.confirmChangesTitle}>
                  <FormattedMessage id="PasswordChangeForm.confirmChangesTitle" />
                </h3>
                <p className={css.confirmChangesInfo}>
                  <FormattedMessage id="PasswordChangeForm.confirmChangesInfo" />
                  <br />
                  <FormattedMessage
                    id="PasswordChangeForm.resetPasswordInfo"
                    values={{ resetPasswordLink }}
                  />
                </p>

                <FieldTextInput
                  className={css.password}
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  autoComplete="current-password"
                  label={passwordLabel}
                  placeholder={passwordPlaceholder}
                  validate={validators.composeValidators(
                    passwordRequired,
                    passwordMinLength,
                    passwordMaxLength
                  )}
                  customErrorText={passwordTouched ? null : passwordErrorText}
                />
              </div>
              <div className={css.bottomWrapper}>
                {genericFailure}
                <PrimaryButton
                  type="submit"
                  inProgress={inProgress}
                  ready={ready}
                  disabled={submitDisabled}
                >
                  <FormattedMessage id="PasswordChangeForm.saveChanges" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

PasswordChangeFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  changePasswordError: null,
  inProgress: false,
  formId: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, string } = PropTypes;

PasswordChangeFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  changePasswordError: propTypes.error,
  inProgress: bool,
  intl: intlShape.isRequired,
  ready: bool.isRequired,
  formId: string,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,
};

const PasswordChangeForm = compose(injectIntl)(PasswordChangeFormComponent);
PasswordChangeForm.displayName = 'PasswordChangeForm';

export default PasswordChangeForm;
