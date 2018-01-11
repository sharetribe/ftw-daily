import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isPasswordRecoveryEmailNotFoundError } from '../../util/errors';
import { Form, PrimaryButton, TextInputField, NamedLink } from '../../components';

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
    inProgress,
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
  const emailInvalidMessage = intl.formatMessage({
    id: 'PasswordRecoveryForm.emailInvalid',
  });

  const emailRequired = validators.required(emailRequiredMessage);
  const emailValid = validators.emailFormatValid(emailInvalidMessage);

  // In case a given email is not found, pass a custom error message
  // to be rendered with the input component
  const customErrorText = isPasswordRecoveryEmailNotFoundError(recoveryError)
    ? emailNotFoundMessage
    : null;
  const initialEmail = initialValues ? initialValues.email : null;

  const classes = classNames(rootClassName || css.root, className);
  const submitInProgress = submitting || inProgress;
  const submitDisabled = (pristine && !initialEmail) || submitInProgress;

  const loginLink = (
    <NamedLink name="LoginPage" className={css.modalHelperLink}>
      <FormattedMessage id="PasswordRecoveryForm.loginLinkText" />
    </NamedLink>
  );

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      <TextInputField
        className={css.email}
        type="email"
        name="email"
        id={`${form}.email`}
        label={emailLabel}
        placeholder={emailPlaceholder}
        validate={[emailRequired, emailValid]}
        customErrorText={customErrorText}
      />

      <div className={css.bottomWrapper}>
        <p className={css.bottomWrapperText}>
          <span className={css.modalHelperText}>
            <FormattedMessage id="PasswordRecoveryForm.loginLinkInfo" values={{ loginLink }} />
          </span>
        </p>

        <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
          <FormattedMessage id="PasswordRecoveryForm.sendInstructions" />
        </PrimaryButton>
      </div>
    </Form>
  );
};

PasswordRecoveryFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
  recoveryError: null,
};

const { bool, string } = PropTypes;

PasswordRecoveryFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,

  inProgress: bool,
  recoveryError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'PasswordRecoveryForm';

const PasswordRecoveryForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  PasswordRecoveryFormComponent
);

export default PasswordRecoveryForm;
