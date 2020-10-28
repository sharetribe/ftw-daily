import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isPasswordRecoveryEmailNotFoundError } from '../../util/errors';
import { Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';

import css from './PasswordRecoveryForm.module.css';

class PasswordRecoveryFormComponent extends Component {
  constructor(props) {
    super(props);
    this.submittedValues = {};
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            rootClassName,
            className,
            formId,
            handleSubmit,
            pristine,
            initialValues,
            intl,
            inProgress,
            recoveryError,
            values,
          } = fieldRenderProps;

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
          const emailTouched = values.email !== this.submittedValues.email;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = inProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            (pristine && !initialEmail) || submitInProgress || pristineSinceLastSubmit;

          const loginLink = (
            <NamedLink name="LoginPage" className={css.modalHelperLink}>
              <FormattedMessage id="PasswordRecoveryForm.loginLinkText" />
            </NamedLink>
          );

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <FieldTextInput
                className={css.email}
                type="email"
                id={formId ? `${formId}.email` : 'email'}
                name="email"
                autoComplete="email"
                label={emailLabel}
                placeholder={emailPlaceholder}
                validate={validators.composeValidators(emailRequired, emailValid)}
                customErrorText={emailTouched ? null : customErrorText}
              />

              <div className={css.bottomWrapper}>
                <p className={css.bottomWrapperText}>
                  <span className={css.modalHelperText}>
                    <FormattedMessage
                      id="PasswordRecoveryForm.loginLinkInfo"
                      values={{ loginLink }}
                    />
                  </span>
                </p>

                <PrimaryButton
                  type="submit"
                  inProgress={submitInProgress}
                  disabled={submitDisabled}
                >
                  <FormattedMessage id="PasswordRecoveryForm.sendInstructions" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

PasswordRecoveryFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  formId: null,
  inProgress: false,
  recoveryError: null,
};

const { bool, string } = PropTypes;

PasswordRecoveryFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  formId: string,

  inProgress: bool,
  recoveryError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PasswordRecoveryForm = compose(injectIntl)(PasswordRecoveryFormComponent);
PasswordRecoveryForm.displayName = 'PasswordRecoveryForm';

export default PasswordRecoveryForm;
