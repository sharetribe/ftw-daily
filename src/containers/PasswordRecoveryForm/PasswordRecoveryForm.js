import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { PrimaryButton, TextInputField, NamedLink } from '../../components';
import * as validators from '../../util/validators';

import css from './PasswordRecoveryForm.css';

const isNotFoundError = (error) => error && error.status === 404;

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
  const customErrorText = isNotFoundError(recoveryError) ? emailNotFoundMessage : null;
  const initialEmail = initialValues ? initialValues.email : null;
  const buttonDisabled = (pristine && !initialEmail) || submitting;
  const classes = classNames(rootClassName || css.root, className);

  const goToLoginHelp = (
    <span className={css.goToLoginLinkHelp}>
      <FormattedMessage id="PasswordRecoveryForm.goToLoginHelp" />
    </span>
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
      <p className={css.bottomWrapper}>
        <NamedLink name="LoginPage" className={css.goToLoginLink}>
          <FormattedMessage id="PasswordRecoveryForm.goToLogin" values={{ goToLoginHelp }} />
        </NamedLink>
      </p>
      <PrimaryButton type="submit" disabled={buttonDisabled}>
        <FormattedMessage id="PasswordRecoveryForm.sendInstructions" />
      </PrimaryButton>
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
