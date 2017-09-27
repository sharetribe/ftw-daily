import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { ensureCurrentUser } from '../../util/data';
import { isForbiddenChangePasswordError } from '../../util/errors';
import { PrimaryButton, TextInputField } from '../../components';

import css from './PasswordChangeForm.css';

const RESET_TIMEOUT = 800;

class PasswordChangeFormComponent extends Component {
  componentWillUnmount() {
    window.clearTimeout(this.resetTimeoutId);
  }
  render() {
    const {
      rootClassName,
      className,
      changePasswordError,
      currentUser,
      form,
      handleSubmit,
      submitting,
      inProgress,
      intl,
      invalid,
      pristine,
      ready,
      reset,
    } = this.props;

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
    const newPasswordRequired = validators.required(newPasswordRequiredMessage);

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

    const passwordRequired = validators.required(passwordRequiredMessage);

    const passwordFailedMessage = intl.formatMessage({
      id: 'PasswordChangeForm.passwordFailed',
    });
    const passwordErrorText = isForbiddenChangePasswordError(changePasswordError)
      ? passwordFailedMessage
      : null;

    const confirmClasses = classNames(css.confirmChangesSection, { [css.confirmChangesSectionVisible]: !pristine });
    const classes = classNames(rootClassName || css.root, className);
    const submitDisabled = invalid || submitting || inProgress;

    return (
      <form
        className={classes}
        onSubmit={values => {
          handleSubmit(values).then(() => {
            this.resetTimeoutId = window.setTimeout(reset, RESET_TIMEOUT);
          });
        }}
      >
        <div className={css.newPasswordSection}>
          <TextInputField
            type="password"
            name="newPassword"
            id={`${form}.newPassword`}
            label={newPasswordLabel}
            placeholder={newPasswordPlaceholder}
            validate={[newPasswordRequired, passwordMinLength, passwordMaxLength]}
          />
        </div>

        <div className={confirmClasses}>
          <h3 className={css.confirmChangesTitle}>
            <FormattedMessage id="PasswordChangeForm.confirmChangesTitle" />
          </h3>
          <p className={css.confirmChangesInfo}>
            <FormattedMessage id="PasswordChangeForm.confirmChangesInfo" />
          </p>

          <TextInputField
            className={css.password}
            type="password"
            name="currentPassword"
            id={`${form}.currentPassword`}
            label={passwordLabel}
            placeholder={passwordPlaceholder}
            validate={[passwordRequired, passwordMinLength, passwordMaxLength]}
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
            <FormattedMessage id="PasswordChangeForm.saveChanges" />
          </PrimaryButton>
        </div>
      </form>
    );
  }
}

PasswordChangeFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  changePasswordError: null,
  inProgress: false,
};

const { bool, instanceOf, string } = PropTypes;

PasswordChangeFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  changePasswordError: instanceOf(Error),
  inProgress: bool,
  intl: intlShape.isRequired,
  ready: bool.isRequired,
};

const defaultFormName = 'PasswordChangeForm';

const PasswordChangeForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  PasswordChangeFormComponent
);

export default PasswordChangeForm;
