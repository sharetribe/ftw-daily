import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './SignupForm.css';

const SignupFormComponent = props => {
  const { form, handleSubmit, pristine, submitting, inProgress, intl } = props;

  // email
  const emailLabel = intl.formatMessage({
    id: 'SignupForm.emailLabel',
  });
  const emailRequiredMessage = intl.formatMessage({
    id: 'SignupForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);

  // password
  const passwordLabel = intl.formatMessage({
    id: 'SignupForm.passwordLabel',
  });
  const passwordRequiredMessage = intl.formatMessage({
    id: 'SignupForm.passwordRequired',
  });
  const passwordRequired = validators.required(passwordRequiredMessage);

  // firstName
  const firstNameLabel = intl.formatMessage({
    id: 'SignupForm.firstNameLabel',
  });
  const firstNameRequiredMessage = intl.formatMessage({
    id: 'SignupForm.firstNameRequired',
  });
  const firstNameRequired = validators.required(firstNameRequiredMessage);

  // lastName
  const lastNameLabel = intl.formatMessage({
    id: 'SignupForm.lastNameLabel',
  });
  const lastNameRequiredMessage = intl.formatMessage({
    id: 'SignupForm.lastNameRequired',
  });
  const lastNameRequired = validators.required(lastNameRequiredMessage);

  const submitDisabled = pristine || submitting || inProgress;
  return (
    <form className={css.root} onSubmit={handleSubmit}>
      <div>
        <TextInputField
          type="email"
          name="email"
          id={`${form}.email`}
          label={emailLabel}
          validate={emailRequired}
        />
        <div className={css.name}>
          <TextInputField
            className={css.firstNameRoot}
            type="text"
            name="firstName"
            id={`${form}.firstName`}
            label={firstNameLabel}
            validate={firstNameRequired}
          />
          <TextInputField
            className={css.lastNameRoot}
            type="text"
            name="lastName"
            id={`${form}.lastName`}
            label={lastNameLabel}
            validate={lastNameRequired}
          />
        </div>
        <TextInputField
          className={css.password}
          type="password"
          name="password"
          id={`${form}.password`}
          label={passwordLabel}
          validate={passwordRequired}
        />
      </div>
      <div>
        <Button className={css.button} type="submit" disabled={submitDisabled}>
          <FormattedMessage id="SignupForm.signUp" />
        </Button>
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
