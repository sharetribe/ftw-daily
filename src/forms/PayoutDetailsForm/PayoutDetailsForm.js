import React from 'react';
import { bool, object, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import config from '../../config';
import { Button, ExternalLink, FieldRadioButton, Form } from '../../components';
import { isStripeInvalidPostalCode } from '../../util/errors';

import PayoutDetailsFormCompany from './PayoutDetailsFormCompany';
import PayoutDetailsFormIndividual from './PayoutDetailsFormIndividual';
import css from './PayoutDetailsForm.css';

export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

const PayoutDetailsFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        createStripeAccountError,
        disabled,
        handleSubmit,
        inProgress,
        intl,
        invalid,
        pristine,
        ready,
        submitButtonText,
        values,
      } = fieldRenderProps;

      const { country, accountType } = values;

      const individualAccountLabel = intl.formatMessage({
        id: 'PayoutDetailsForm.individualAccount',
      });

      const companyAccountLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyAccount' });

      const classes = classNames(css.root, className, {
        [css.disabled]: disabled,
      });

      const submitInProgress = inProgress;
      const submitDisabled = pristine || invalid || disabled || submitInProgress;
      const showAsRequired = pristine;

      const showIndividual = country && accountType && accountType === 'individual';
      const showCompany = country && accountType && accountType === 'company';

      let error = null;

      if (isStripeInvalidPostalCode(createStripeAccountError)) {
        error = (
          <div className={css.error}>
            <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailedInvalidPostalCode" />
          </div>
        );
      } else if (createStripeAccountError) {
        error = (
          <div className={css.error}>
            <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailed" />
          </div>
        );
      }

      const stripeConnectedAccountTermsLink = (
        <ExternalLink href="https://stripe.com/connect-account/legal" className={css.termsLink}>
          <FormattedMessage id="PayoutDetailsForm.stripeConnectedAccountTermsLink" />
        </ExternalLink>
      );

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div className={css.sectionContainer}>
            <h3 className={css.subTitle}>
              <FormattedMessage id="PayoutDetailsForm.accountTypeTitle" />
            </h3>
            <div className={css.radioButtonRow}>
              <FieldRadioButton
                id="individual"
                name="accountType"
                label={individualAccountLabel}
                value="individual"
                showAsRequired={showAsRequired}
              />
              <FieldRadioButton
                id="company"
                name="accountType"
                label={companyAccountLabel}
                value="company"
                showAsRequired={showAsRequired}
              />
            </div>
          </div>

          {showIndividual ? (
            <PayoutDetailsFormIndividual fieldRenderProps={fieldRenderProps} />
          ) : showCompany ? (
            <PayoutDetailsFormCompany fieldRenderProps={fieldRenderProps} />
          ) : null}

          {error}

          <p className={css.termsText}>
            <FormattedMessage
              id="PayoutDetailsForm.stripeToSText"
              values={{ stripeConnectedAccountTermsLink }}
            />
          </p>
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={ready}
          >
            {submitButtonText ? (
              submitButtonText
            ) : (
              <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
            )}
          </Button>
        </Form>
      );
    }}
  />
);

PayoutDetailsFormComponent.defaultProps = {
  className: null,
  country: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
};

PayoutDetailsFormComponent.propTypes = {
  className: string,
  createStripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  submitButtonText: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsForm = compose(injectIntl)(PayoutDetailsFormComponent);

export default PayoutDetailsForm;
