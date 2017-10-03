import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { PrimaryButton, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './SignupForm.css';

const SignupFormComponent = props => {
  const {
    rootClassName,
    className,
    form,
    handleSubmit,
    submitting,
    inProgress,
    invalid,
    intl,
  } = props;

  // email
  const emailLabel = intl.formatMessage({
    id: 'SignupForm.emailLabel',
  });
  const emailPlaceholder = intl.formatMessage({
    id: 'SignupForm.emailPlaceholder',
  });
  const emailRequiredMessage = intl.formatMessage({
    id: 'SignupForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);
  const emailInvalidMessage = intl.formatMessage({
    id: 'SignupForm.emailInvalid',
  });
  const emailValid = validators.emailFormatValid(emailInvalidMessage);

  // password
  const passwordLabel = intl.formatMessage({
    id: 'SignupForm.passwordLabel',
  });
  const passwordPlaceholder = intl.formatMessage({
    id: 'SignupForm.passwordPlaceholder',
  });
  const passwordRequiredMessage = intl.formatMessage({
    id: 'SignupForm.passwordRequired',
  });
  const passwordMinLengthMessage = intl.formatMessage(
    {
      id: 'SignupForm.passwordTooShort',
    },
    {
      minLength: validators.PASSWORD_MIN_LENGTH,
    }
  );
  const passwordMaxLengthMessage = intl.formatMessage(
    {
      id: 'SignupForm.passwordTooLong',
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
  const passwordRequired = validators.required(passwordRequiredMessage);
  const passwordValidators = [passwordRequired, passwordMinLength, passwordMaxLength];

  // firstName
  const firstNameLabel = intl.formatMessage({
    id: 'SignupForm.firstNameLabel',
  });
  const firstNamePlaceholder = intl.formatMessage({
    id: 'SignupForm.firstNamePlaceholder',
  });
  const firstNameRequiredMessage = intl.formatMessage({
    id: 'SignupForm.firstNameRequired',
  });
  const firstNameRequired = validators.required(firstNameRequiredMessage);

  // lastName
  const lastNameLabel = intl.formatMessage({
    id: 'SignupForm.lastNameLabel',
  });
  const lastNamePlaceholder = intl.formatMessage({
    id: 'SignupForm.lastNamePlaceholder',
  });
  const lastNameRequiredMessage = intl.formatMessage({
    id: 'SignupForm.lastNameRequired',
  });
  const lastNameRequired = validators.required(lastNameRequiredMessage);

  const classes = classNames(rootClassName || css.root, className);
  const submitInProgress = submitting || inProgress;
  const submitDisabled = invalid || submitInProgress;

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <div>
        <TextInputField
          type="email"
          name="email"
          id={`${form}.email`}
          label={emailLabel}
          placeholder={emailPlaceholder}
          validate={[emailRequired, emailValid]}
        />
        <div className={css.name}>
          <TextInputField
            className={css.firstNameRoot}
            type="text"
            name="firstName"
            id={`${form}.firstName`}
            label={firstNameLabel}
            placeholder={firstNamePlaceholder}
            validate={firstNameRequired}
          />
          <TextInputField
            className={css.lastNameRoot}
            type="text"
            name="lastName"
            id={`${form}.lastName`}
            label={lastNameLabel}
            placeholder={lastNamePlaceholder}
            validate={lastNameRequired}
          />
        </div>
        <TextInputField
          className={css.password}
          type="password"
          name="password"
          id={`${form}.password`}
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          validate={passwordValidators}
        />
      </div>

      <div className={css.bottomWrapper}>
        <PrimaryButton
          className={css.submitButton}
          type="submit"
          inProgress={submitInProgress}
          disabled={submitDisabled}
        >
          <FormattedMessage id="SignupForm.signUp" />
        </PrimaryButton>
      </div>

    </form>
  );
};

SignupFormComponent.defaultProps = { inProgress: false };

const { bool } = PropTypes;

SignupFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const defaultFormName = 'SignupForm';

const SignupForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(SignupFormComponent);

export default SignupForm;
