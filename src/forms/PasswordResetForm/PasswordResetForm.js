import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput } from '../../components';
import * as validators from '../../util/validators';

import css from './PasswordResetForm.module.css';

const PasswordResetFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        intl,
        invalid,
      } = fieldRenderProps;

      // password
      const passwordLabel = intl.formatMessage({
        id: 'PasswordResetForm.passwordLabel',
      });
      const passwordPlaceholder = intl.formatMessage({
        id: 'PasswordResetForm.passwordPlaceholder',
      });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'PasswordResetForm.passwordRequired',
      });
      const passwordMinLengthMessage = intl.formatMessage(
        {
          id: 'PasswordResetForm.passwordTooShort',
        },
        {
          minLength: validators.PASSWORD_MIN_LENGTH,
        }
      );
      const passwordMaxLengthMessage = intl.formatMessage(
        {
          id: 'PasswordResetForm.passwordTooLong',
        },
        {
          maxLength: validators.PASSWORD_MAX_LENGTH,
        }
      );
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
      const passwordMinLength = validators.minLength(
        passwordMinLengthMessage,
        validators.PASSWORD_MIN_LENGTH
      );
      const passwordMaxLength = validators.maxLength(
        passwordMaxLengthMessage,
        validators.PASSWORD_MAX_LENGTH
      );

      const classes = classNames(rootClassName || css.root, className);

      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <FieldTextInput
            className={css.password}
            type="password"
            id={formId ? `${formId}.password` : 'password'}
            name="password"
            autoComplete="new-password"
            label={passwordLabel}
            placeholder={passwordPlaceholder}
            validate={validators.composeValidators(
              passwordRequired,
              passwordMinLength,
              passwordMaxLength
            )}
          />
          <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
            <FormattedMessage id="PasswordResetForm.submitButtonText" />
          </PrimaryButton>
        </Form>
      );
    }}
  />
);

PasswordResetFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
  formId: null,
};

const { string, bool } = PropTypes;

PasswordResetFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  inProgress: bool,
  intl: intlShape.isRequired,
  formId: string,
};

const PasswordResetForm = compose(injectIntl)(PasswordResetFormComponent);
PasswordResetForm.displayName = 'PasswordResetForm';

export default PasswordResetForm;
