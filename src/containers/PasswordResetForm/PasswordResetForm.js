import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Form, PrimaryButton, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './PasswordResetForm.css';

const PasswordResetFormComponent = props => {
  const {
    rootClassName,
    className,
    form,
    handleSubmit,
    submitting,
    inProgress,
    intl,
    invalid,
  } = props;

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
  const passwordRequired = validators.required(passwordRequiredMessage);
  const passwordMinLength = validators.minLength(
    passwordMinLengthMessage,
    validators.PASSWORD_MIN_LENGTH
  );
  const passwordMaxLength = validators.maxLength(
    passwordMaxLengthMessage,
    validators.PASSWORD_MAX_LENGTH
  );

  const classes = classNames(rootClassName || css.root, className);

  const submitInProgress = submitting || inProgress;
  const submitDisabled = invalid || submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      <TextInputField
        className={css.password}
        type="password"
        name="password"
        autoComplete="new-password"
        id={`${form}.password`}
        label={passwordLabel}
        placeholder={passwordPlaceholder}
        validate={[passwordRequired, passwordMinLength, passwordMaxLength]}
      />
      <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
        <FormattedMessage id="PasswordResetForm.submitButtonText" />
      </PrimaryButton>
    </Form>
  );
};

PasswordResetFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

PasswordResetFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const defaultFormName = 'PasswordResetForm';

const PasswordResetForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  PasswordResetFormComponent
);

export default PasswordResetForm;
