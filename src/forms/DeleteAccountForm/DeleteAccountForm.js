import React, { useEffect, useState } from 'react';
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
import { Form, FieldTextInput, Button } from '../../components';

import css from './DeleteAccountForm.module.css';

const RESET_TIMEOUT = 800;

export const DeleteAccountFormComponent = props => {
  const { currentUser, onResetPassword } = props;

  const [showResetPasswordMessage, setShowResetPasswordMessage] = useState(
    false
  );
  let submittedValues = {};
  let resetTimeoutId = null;

  useEffect(() => {
    return window.clearTimeout(resetTimeoutId);
  }, []);

  const handleResetPassword = () => {
    setShowResetPasswordMessage(true);
    const email = currentUser.attributes.email;

    onResetPassword(email);
  };

  return (
    <FinalForm
      {...props}
      render={fieldRenderProps => {
        const {
          rootClassName,
          className,
          deleteAccountError,
          currentUser,
          handleSubmit,
          inProgress,
          resetPasswordInProgress,
          intl,
          invalid,
          ready,
          form,
          values,
        } = fieldRenderProps;

        const user = ensureCurrentUser(currentUser);

        if (!user.id) {
          return null;
        }

        // Password validation
        const passwordMinLengthMessage = intl.formatMessage(
          {
            id: 'DeleteAccountForm.passwordTooShort',
          },
          {
            minLength: validators.PASSWORD_MIN_LENGTH,
          }
        );
        const passwordMaxLengthMessage = intl.formatMessage(
          {
            id: 'DeleteAccountForm.passwordTooLong',
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

        const passwordLabel = intl.formatMessage({
          id: 'DeleteAccountForm.passwordLabel',
        });
        const passwordPlaceholder = intl.formatMessage({
          id: 'DeleteAccountForm.passwordPlaceholder',
        });
        const passwordRequiredMessage = intl.formatMessage({
          id: 'DeleteAccountForm.passwordRequired',
        });

        const passwordRequired = validators.requiredStringNoTrim(
          passwordRequiredMessage
        );

        const passwordFailedMessage = intl.formatMessage({
          id: 'DeleteAccountForm.passwordFailed',
        });

        const passwordTried =
          !!values.currentPassword &&
          submittedValues.currentPassword === values.currentPassword;
        const passwordErrorText = isChangePasswordWrongPassword(
          deleteAccountError
        )
          ? passwordFailedMessage
          : null;

        const confirmClasses = classNames(
          css.confirmChangesSection,
          css.confirmChangesSectionVisible
        );

        const genericFailure =
          deleteAccountError && !passwordErrorText ? (
            <span className={css.error}>
              <FormattedMessage id="DeleteAccountForm.genericFailure" />
            </span>
          ) : null;

        const submittedOnce = Object.keys(submittedValues).length > 0;
        const pristineSinceLastSubmit =
          submittedOnce && isEqual(values, submittedValues);
        const classes = classNames(rootClassName || css.root, className);
        const submitDisabled = invalid || pristineSinceLastSubmit || inProgress;

        const sendPasswordLink = (
          <span
            className={css.helperLink}
            onClick={handleResetPassword}
            role="button"
          >
            <FormattedMessage id="DeleteAccountForm.resetPasswordLinkText" />
          </span>
        );

        const resendPasswordLink = (
          <span
            className={css.helperLink}
            onClick={handleResetPassword}
            role="button"
          >
            <FormattedMessage id="DeleteAccountForm.resendPasswordLinkText" />
          </span>
        );

        const resetPasswordLink =
          showResetPasswordMessage || resetPasswordInProgress ? (
            <>
              <FormattedMessage
                id="DeleteAccountForm.resetPasswordLinkSent"
                values={{
                  email: (
                    <span className={css.emailStyle}>
                      {currentUser.attributes.email}
                    </span>
                  ),
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
              submittedValues = values;
              handleSubmit(e)
                .then(() => {
                  resetTimeoutId = window.setTimeout(form.reset, RESET_TIMEOUT);
                })
                .catch(() => {
                  // Error is handled in duck file already.
                });
            }}
          >
            <div className={confirmClasses}>
              <h3 className={css.confirmChangesTitle}>
                <FormattedMessage id="DeleteAccountForm.confirmChangesTitle" />
              </h3>
              <p className={css.confirmChangesInfo}>
                <FormattedMessage id="DeleteAccountForm.confirmChangesInfo" />
                <br />
                <FormattedMessage
                  id="DeleteAccountForm.resetPasswordInfo"
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
                customErrorText={passwordTried ? null : passwordErrorText}
              />
            </div>
            <div className={css.bottomWrapper}>
              {genericFailure}
              <Button
                type="submit"
                inProgress={inProgress}
                ready={ready}
                disabled={submitDisabled}
              >
                <FormattedMessage id="DeleteAccountForm.saveChanges" />
              </Button>
            </div>
          </Form>
        );
      }}
    />
  );
};

DeleteAccountFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  changePasswordError: null,
  inProgress: false,
  formId: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, string } = PropTypes;

DeleteAccountFormComponent.propTypes = {
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

const DeleteAccountForm = compose(injectIntl)(DeleteAccountFormComponent);
DeleteAccountForm.displayName = 'DeleteAccountForm';

export default DeleteAccountForm;