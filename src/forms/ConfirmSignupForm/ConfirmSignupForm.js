import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { Form, PrimaryButton, FieldTextInput } from '../../components';

import css from './ConfirmSignupForm.module.css';

const KEY_CODE_ENTER = 13;

const ConfirmSignupFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        invalid,
        intl,
        onOpenTermsOfService,
        authInfo,
        idp,
      } = formRenderProps;

      // email
      const emailLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      // firstName
      const firstNameLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNameLabel',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.firstNameRequired',
      });
      const firstNameRequired = validators.required(firstNameRequiredMessage);

      // lastName
      const lastNameLabel = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNameLabel',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmSignupForm.lastNameRequired',
      });
      const lastNameRequired = validators.required(lastNameRequiredMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
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
          <FormattedMessage id="ConfirmSignupForm.termsAndConditionsLinkText" />
        </span>
      );

      // If authInfo is not available we should not show the ConfirmForm
      if (!authInfo) {
        return;
      }

      // Initial values from idp provider
      const { email, firstName, lastName } = authInfo;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div>
            <FieldTextInput
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name="email"
              autoComplete="email"
              label={emailLabel}
              placeholder={emailPlaceholder}
              initialValue={email}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
            <div className={css.name}>
              <FieldTextInput
                className={css.firstNameRoot}
                type="text"
                id={formId ? `${formId}.firstName` : 'firstName'}
                name="firstName"
                autoComplete="given-name"
                label={firstNameLabel}
                placeholder={firstNamePlaceholder}
                initialValue={firstName}
                validate={firstNameRequired}
              />
              <FieldTextInput
                className={css.lastNameRoot}
                type="text"
                id={formId ? `${formId}.lastName` : 'lastName'}
                name="lastName"
                autoComplete="family-name"
                label={lastNameLabel}
                placeholder={lastNamePlaceholder}
                initialValue={lastName}
                validate={lastNameRequired}
              />
            </div>
          </div>

          <div className={css.bottomWrapper}>
            <p className={css.bottomWrapperText}>
              <span className={css.termsText}>
                <FormattedMessage
                  id="ConfirmSignupForm.termsAndConditionsAcceptText"
                  values={{ termsLink }}
                />
              </span>
            </p>
            <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
              <FormattedMessage id="ConfirmSignupForm.signUp" values={{ idp: idp }} />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

ConfirmSignupFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

ConfirmSignupFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ConfirmSignupForm = compose(injectIntl)(ConfirmSignupFormComponent);
ConfirmSignupForm.displayName = 'ConfirmSignupForm';

export default ConfirmSignupForm;
