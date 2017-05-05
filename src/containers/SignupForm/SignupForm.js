import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, ExternalLink } from '../../components';
import * as validators from '../../util/validators';
import { enhancedField } from '../../util/forms';

import css from './SignupForm.css';

// Render translated application and Stripe terms of service with
// links to legal texts.
//
// See: https://stripe.com/docs/connect/updating-accounts#tos-acceptance
const Tos = () => (
  <p>
    <FormattedMessage
      id="SignupForm.termsOfService"
      values={{
        stripeConnectedAccountAgreementLink: (
          <ExternalLink href="https://stripe.com/connect-account/legal">
            <FormattedMessage id="SignupForm.stripeConnectedAccountAgreementLinkText" />
          </ExternalLink>
        ),
      }}
    />
  </p>
);

class SignupFormComponent extends Component {
  constructor(props) {
    super(props);
    this.EnhancedInput = enhancedField('input', {
      errorClassName: css.error,
    });
    this.EnhancedFirstNameInput = enhancedField('input', {
      rootClassName: css.firstName,
      errorClassName: css.error,
    });
    this.EnhancedLastNameInput = enhancedField('input', {
      rootClassName: css.lastName,
      errorClassName: css.error,
    });
  }
  render() {
    const { handleSubmit, pristine, submitting, inProgress, intl } = this.props;

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
          <Field
            name="email"
            type="email"
            label={emailLabel}
            validate={emailRequired}
            component={this.EnhancedInput}
          />
          <div className={css.name}>
            <Field
              className={css.firstName}
              name="firstName"
              type="text"
              label={firstNameLabel}
              validate={firstNameRequired}
              component={this.EnhancedFirstNameInput}
            />
            <Field
              className={css.lastName}
              name="lastName"
              type="text"
              label={lastNameLabel}
              validate={lastNameRequired}
              component={this.EnhancedLastNameInput}
            />
          </div>
          <Field
            name="password"
            type="password"
            label={passwordLabel}
            validate={passwordRequired}
            component={this.EnhancedInput}
          />
        </div>
        <div>
          <Tos />
          <Button className={css.button} type="submit" disabled={submitDisabled}>
            <FormattedMessage id="SignupForm.signUp" />
          </Button>
        </div>
      </form>
    );
  }
}

SignupFormComponent.defaultProps = { inProgress: false };

const { bool } = PropTypes;

SignupFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const formName = 'SignupForm';

const SignupForm = compose(reduxForm({ form: formName }), injectIntl)(SignupFormComponent);

export default SignupForm;
