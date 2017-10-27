import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Form, PrimaryButton, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './SignupForm.css';

const KEY_CODE_ENTER = 13;

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
    onOpenTermsOfService,
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

  const handleTermsKeyUp = e => {
    // Allow click action with keyboard like with normal links
    if (e.keyCode === KEY_CODE_ENTER) {
      onOpenTermsOfService();
    }
  };
  const termsLink = (
    <span
      className={css.termsLink}
      onClick={onOpenTermsOfService}
      role="button"
      tabIndex="0"
      onKeyUp={handleTermsKeyUp}
    >
      <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
    </span>
  );

  return (
    <Form className={classes} onSubmit={handleSubmit}>
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
        <p className={css.bottomWrapperText}>
          <span className={css.termsText}>
            <FormattedMessage id="SignupForm.termsAndConditionsAcceptText" values={{ termsLink }} />
          </span>
        </p>
        <PrimaryButton
          className={css.submitButton}
          type="submit"
          inProgress={submitInProgress}
          disabled={submitDisabled}
        >
          <FormattedMessage id="SignupForm.signUp" />
        </PrimaryButton>
      </div>
    </Form>
  );
};

SignupFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

SignupFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'SignupForm';

const SignupForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(SignupFormComponent);

export default SignupForm;
