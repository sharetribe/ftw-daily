import React from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { PrimaryButton, TextInputField, NamedLink } from '../../components';
import * as validators from '../../util/validators';

import css from './PasswordRecoveryForm.css';

const PasswordRecoveryFormComponent = props => {
  const { handleSubmit, pristine, submitting, form, initialValues, intl } = props;

  // email
  const emailLabel = intl.formatMessage({
    id: 'PasswordRecoveryForm.emailLabel',
  });
  const emailPlaceholder = intl.formatMessage({
    id: 'PasswordRecoveryForm.emailPlaceholder',
  });
  const emailRequiredMessage = intl.formatMessage({
    id: 'PasswordRecoveryForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);
  const initialEmail = initialValues ? initialValues.email : null;
  const buttonDisabled = (pristine && !initialEmail) || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        className={css.email}
        type="email"
        name="email"
        id={`${form}.email`}
        label={emailLabel}
        placeholder={emailPlaceholder}
        validate={emailRequired}
      />
      <p className={css.bottomWrapper}>
        <NamedLink name="LoginPage" className={css.goToLoginLink}>
          <span className={css.goToLoginLinkHelp}>
            <FormattedMessage id="PasswordRecoveryForm.goToLoginHelp" />
          </span>
          {' '}
          <FormattedMessage id="PasswordRecoveryForm.goToLogin" />
        </NamedLink>
      </p>
      <PrimaryButton type="submit" disabled={buttonDisabled}>
        <FormattedMessage id="PasswordRecoveryForm.sendInstructions" />
      </PrimaryButton>
    </form>
  );
};

PasswordRecoveryFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
};

const defaultFormName = 'PasswordRecoveryForm';

const PasswordRecoveryForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  PasswordRecoveryFormComponent
);

export default PasswordRecoveryForm;
