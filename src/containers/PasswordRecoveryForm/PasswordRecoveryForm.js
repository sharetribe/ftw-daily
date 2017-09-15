import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { PrimaryButton, TextInputField, NamedLink } from '../../components';
import * as validators from '../../util/validators';
import { isPasswordRecoveryEmailNotFoundError } from '../../util/errors';

import css from './PasswordRecoveryForm.css';

const PasswordRecoveryFormComponent = props => {
  const {
    rootClassName,
    className,
    handleSubmit,
    pristine,
    submitting,
    form,
    initialValues,
    intl,
    recoveryError,
  } = props;

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
  const emailNotFoundMessage = intl.formatMessage({
    id: 'PasswordRecoveryForm.emailNotFound',
  });

  const emailRequired = validators.required(emailRequiredMessage);
  // In case a given email is not found, pass a custom error message
  // to be rendered with the input component
  const customErrorText = isPasswordRecoveryEmailNotFoundError(recoveryError)
    ? emailNotFoundMessage
    : null;
  const initialEmail = initialValues ? initialValues.email : null;
  const submitDisabled = (pristine && !initialEmail) || submitting;
  const classes = classNames(rootClassName || css.root, className);

  const loginLink = (
    <NamedLink name="LoginPage" className={css.modalHelperLink}>
      <FormattedMessage id="PasswordRecoveryForm.loginLinkText" />
    </NamedLink>
  );

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <TextInputField
        className={css.email}
        type="email"
        name="email"
        id={`${form}.email`}
        label={emailLabel}
        placeholder={emailPlaceholder}
        validate={emailRequired}
        customErrorText={customErrorText}
      />

      <div className={css.bottomWrapper}>
        <p className={css.bottomWrapperText}>
          <span className={css.modalHelperText}>
            <FormattedMessage id="PasswordRecoveryForm.loginLinkInfo" values={{ loginLink }} />
          </span>
        </p>

        <PrimaryButton className={css.submitButton} type="submit" disabled={submitDisabled}>
          <FormattedMessage id="PasswordRecoveryForm.sendInstructions" />
        </PrimaryButton>
      </div>

    </form>
  );
};


PasswordRecoveryFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  recoveryError: null,
};

const { instanceOf, string } = PropTypes;

PasswordRecoveryFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  recoveryError: instanceOf(Error),
  intl: intlShape.isRequired,
};

const defaultFormName = 'PasswordRecoveryForm';

const PasswordRecoveryForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  PasswordRecoveryFormComponent
);

export default PasswordRecoveryForm;
