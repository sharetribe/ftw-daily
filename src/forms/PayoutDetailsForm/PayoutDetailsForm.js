import React from 'react';
import { bool, object, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import config from '../../config';
import {
  Button,
  ExternalLink,
  StripeBankAccountTokenInputField,
  FieldSelect,
  FieldBirthdayInput,
  FieldTextInput,
  Form,
} from '../../components';
import * as validators from '../../util/validators';
import { isStripeInvalidPostalCode } from '../../util/errors';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import css from './PayoutDetailsForm.css';

const MIN_STRIPE_ACCOUNT_AGE = 18;

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

const countryCurrency = countryCode => {
  const country = stripeCountryConfigs(countryCode);
  return country.currency;
};

const PayoutDetailsFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        createStripeAccountError,
        disabled,
        form,
        handleSubmit,
        inProgress,
        intl,
        invalid,
        pristine,
        ready,
        submitButtonText,
        values,
      } = fieldRenderProps;
      const { country } = values;

      const firstNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.firstNameLabel' });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.firstNamePlaceholder',
      });
      const firstNameRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.firstNameRequired',
        })
      );

      const lastNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.lastNameLabel' });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.lastNamePlaceholder',
      });
      const lastNameRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.lastNameRequired',
        })
      );

      const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
      const birthdayLabelMonth = intl.formatMessage({
        id: 'PayoutDetailsForm.birthdayLabelMonth',
      });
      const birthdayLabelYear = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabelYear' });
      const birthdayRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.birthdayRequired',
        })
      );
      const birthdayMinAge = validators.ageAtLeast(
        intl.formatMessage(
          {
            id: 'PayoutDetailsForm.birthdayMinAge',
          },
          {
            minAge: MIN_STRIPE_ACCOUNT_AGE,
          }
        ),
        MIN_STRIPE_ACCOUNT_AGE
      );

      const companyNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyNameLabel' });
      const companyNamePlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.companyNamePlaceholder',
      });
      const companyNameRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.companyNameRequired',
        })
      );

      const companyTaxIdLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyTaxIdLabel' });
      const companyTaxIdPlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.companyTaxIdPlaceholder',
      });
      const companyTaxIdRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.companyTaxIdRequired',
        })
      );
      const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
      const countryPlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.countryPlaceholder',
      });
      const countryRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.countryRequired',
        })
      );

      // StripeBankAccountTokenInputField handles the error messages
      // internally, we just have to make sure we require a valid token
      // out of the field. Therefore the empty validation message.
      const bankAccountRequired = validators.required(' ');

      const showPersonalIdNumber =
        (country && stripeCountryConfigs(country).personalIdNumberRequired) ||
        (country && stripeCountryConfigs(country).ssnLast4Required);

      const personalIdNumberRequired = validators.required(
        intl.formatMessage({
          id: `PayoutDetailsForm.personalIdNumberRequired`,
        })
      );

      let personalIdNumberLabel = null;
      let personalIdNumberPlaceholder = null;
      let personalIdNumberValid = personalIdNumberRequired;

      if (country === 'US') {
        personalIdNumberLabel = intl.formatMessage({
          id: `PayoutDetailsForm.personalIdNumberLabel.US`,
        });
        personalIdNumberPlaceholder = intl.formatMessage({
          id: `PayoutDetailsForm.personalIdNumberPlaceholder.US`,
        });

        const validSSN = validators.validSsnLast4(
          intl.formatMessage({
            id: `PayoutDetailsForm.personalIdNumberValid`,
          })
        );
        personalIdNumberValid = validators.composeValidators(personalIdNumberRequired, validSSN);
      } else if (country === 'HK') {
        personalIdNumberLabel = intl.formatMessage({
          id: `PayoutDetailsForm.personalIdNumberLabel.HK`,
        });
        personalIdNumberPlaceholder = intl.formatMessage({
          id: `PayoutDetailsForm.personalIdNumberPlaceholder.HK`,
        });
        const validHKID = validators.validHKID(
          intl.formatMessage({
            id: `PayoutDetailsForm.personalIdNumberValid`,
          })
        );
        personalIdNumberValid = validators.composeValidators(personalIdNumberRequired, validHKID);
      }

      const classes = classNames(css.root, className, {
        [css.disabled]: disabled,
      });
      const submitInProgress = inProgress;
      const submitDisabled = pristine || invalid || disabled || submitInProgress;

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
              <FormattedMessage id="PayoutDetailsForm.personalDetailsTitle" />
            </h3>
            <div className={css.formRow}>
              <FieldTextInput
                id="fname"
                name="fname"
                disabled={disabled}
                className={css.firstName}
                type="text"
                autoComplete="given-name"
                label={firstNameLabel}
                placeholder={firstNamePlaceholder}
                validate={firstNameRequired}
              />
              <FieldTextInput
                id="lname"
                name="lname"
                disabled={disabled}
                className={css.lastName}
                type="text"
                autoComplete="family-name"
                label={lastNameLabel}
                placeholder={lastNamePlaceholder}
                validate={lastNameRequired}
              />
            </div>
            <FieldBirthdayInput
              id="birthDate"
              name="birthDate"
              disabled={disabled}
              className={css.field}
              label={birthdayLabel}
              labelForMonth={birthdayLabelMonth}
              labelForYear={birthdayLabelYear}
              format={null}
              valueFromForm={values.birthDate}
              validate={validators.composeValidators(birthdayRequired, birthdayMinAge)}
            />
          </div>

          <div className={css.sectionContainer}>
            <h3 className={css.subTitle}>
              <FormattedMessage id="PayoutDetailsForm.addressTitle" />
            </h3>
            <FieldSelect
              id="country"
              name="country"
              disabled={disabled}
              className={css.selectCountry}
              autoComplete="country"
              label={countryLabel}
              validate={countryRequired}
            >
              <option disabled value="">
                {countryPlaceholder}
              </option>
              {supportedCountries.map(c => (
                <option key={c} value={c}>
                  {intl.formatMessage({ id: `PayoutDetailsForm.countryNames.${c}` })}
                </option>
              ))}
            </FieldSelect>

            <PayoutDetailsAddress country={country} intl={intl} disabled={disabled} form={form} />
          </div>
          {country ? (
            <div className={css.sectionContainer}>
              <h3 className={css.subTitle}>
                <FormattedMessage id="PayoutDetailsForm.bankDetails" />
              </h3>
              <StripeBankAccountTokenInputField
                disabled={disabled}
                name="bankAccountToken"
                formName="PayoutDetailsForm"
                country={country}
                currency={countryCurrency(country)}
                validate={bankAccountRequired}
              />
            </div>
          ) : null}

          {showPersonalIdNumber ? (
            <div className={css.sectionContainer}>
              <h3 className={css.subTitle}>
                <FormattedMessage id="PayoutDetailsForm.personalIdNumberTitle" />
              </h3>
              <FieldTextInput
                id="personalIdNumber"
                name="personalIdNumber"
                disabled={disabled}
                className={css.personalIdNumber}
                type="text"
                label={personalIdNumberLabel}
                placeholder={personalIdNumberPlaceholder}
                validate={personalIdNumberValid}
              />
            </div>
              <div className={css.sectionContainer}>
                <h3 className={css.subTitle}>
                  <FormattedMessage id="PayoutDetailsForm.companyDetailsTitle" />
                </h3>
                <div className={css.formRow}>
                  <FieldTextInput
                    id="companyName"
                    name="companyName"
                    disabled={disabled}
                    type="text"
                    autoComplete="company-name"
                    label={companyNameLabel}
                    placeholder={companyNamePlaceholder}
                    validate={companyNameRequired}
                  />
                  <FieldTextInput
                    id="companyTaxId"
                    name="companyTaxId"
                    disabled={disabled}
                    className={css.taxId}
                    type="text"
                    autoComplete="company-tax-id"
                    label={companyTaxIdLabel}
                    placeholder={companyTaxIdPlaceholder}
                    validate={companyTaxIdRequired}
                  />
                </div>
              </div>
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
