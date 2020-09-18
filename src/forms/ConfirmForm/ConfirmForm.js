import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import { Form, PrimaryButton, FieldTextInput, NamedRedirect } from '../../components';

import css from './ConfirmForm.css';

const KEY_CODE_ENTER = 13;

const ConfirmFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
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
      } = fieldRenderProps;

      // If we don't have authentication information from idp provider, redirect user back to normal signup page
      if (!authInfo) {
        return <NamedRedirect name="SignupPage" />;
      }

      // email
      const emailLabel = intl.formatMessage({
        id: 'ConfirmForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'ConfirmForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'ConfirmForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'ConfirmForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      // firstName
      const firstNameLabel = intl.formatMessage({
        id: 'ConfirmForm.firstNameLabel',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'ConfirmForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmForm.firstNameRequired',
      });
      const firstNameRequired = validators.required(firstNameRequiredMessage);

      // lastName
      const lastNameLabel = intl.formatMessage({
        id: 'ConfirmForm.lastNameLabel',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'ConfirmForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'ConfirmForm.lastNameRequired',
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
          <FormattedMessage id="ConfirmForm.termsAndConditionsLinkText" />
        </span>
      );

      // Initial values from idp provider
      const { email, firstName, lastName, source } = authInfo;

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
                  id="ConfirmForm.termsAndConditionsAcceptText"
                  values={{ termsLink }}
                />
              </span>
            </p>
            <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
              <FormattedMessage id="ConfirmForm.signUp" values={{ idp: source }} />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

ConfirmFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

ConfirmFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ConfirmForm = compose(injectIntl)(ConfirmFormComponent);
ConfirmForm.displayName = 'ConfirmForm';

export default ConfirmForm;
