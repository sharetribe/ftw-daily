import React, { useState } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { isStripeError } from '../../util/errors';
import * as validators from '../../util/validators';
import {
  Button,
  InlineTextButton,
  FieldSelect,
  Form,
  StripeBankAccountTokenInputField,
} from '../../components';

import StripeVerificationStatusBox from './StripeVerificationStatusBox';
import css from './StripePayoutForm.css';

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

const StripePayoutFormComponent = props => {
  const [showCardUpdateInput, setShowCardUpdateInput] = useState(false);

  return (
    <FinalForm
      {...props}
      mutators={{
        ...arrayMutators,
      }}
      render={fieldRenderProps => {
        const {
          className,
          stripeAccountError,
          disabled,
          handleSubmit,
          inProgress,
          intl,
          invalid,
          pristine,
          ready,
          submitButtonText,
          values,
          onGetVerificationLink,
          stripeConnected,
          stripeAccountId,
          verificationFailed,
          successUrl,
          failureUrl,
        } = fieldRenderProps;

        const classes = classNames(css.root, className, {
          [css.disabled]: disabled,
        });

        const submitInProgress = inProgress;
        const submitDisabled = pristine || invalid || disabled || submitInProgress;

        const handleFormSubmit = values => {
          // Close the bank account form when clicking "save details"
          setShowCardUpdateInput(false);
          handleSubmit(values);
        };

        let error = null;

        if (isStripeError(stripeAccountError)) {
          const stripeMessage = stripeAccountError.apiErrors[0].meta.stripeMessage;
          error = (
            <div className={css.error}>
              <FormattedMessage
                id="StripePayoutForm.createStripeAccountFailedWithStripeError"
                values={{ stripeMessage }}
              />
            </div>
          );
        } else if (stripeAccountError) {
          error = (
            <div className={css.error}>
              <FormattedMessage id="StripePayoutForm.createStripeAccountFailed" />
            </div>
          );
        }

        const bankAccountRequired = validators.required(' ');

        const { country } = values;

        const countryLabel = intl.formatMessage({ id: 'StripePayoutForm.countryLabel' });
        const countryPlaceholder = intl.formatMessage({
          id: 'StripePayoutForm.countryPlaceholder',
        });
        const countryRequired = validators.required(
          intl.formatMessage({
            id: 'StripePayoutForm.countryRequired',
          })
        );

        // TODO: fetch status of Stripe account and check if there is any requirements missing
        const requirementsMissing = false;

        const showVerificationError = verificationFailed;
        const showVerificationNeeded = stripeConnected && requirementsMissing;

        //TODO:Required: account id, success & fail url, type (verificate/update)
        const getVerificationLinkParams = {
          acoountId: stripeAccountId,
          successUrl,
          failureUrl,
          type: showVerificationNeeded ? 'verificate' : 'update',
        };

        // TODO: Remove the default when we can get the country from Stripe Account
        const savedCountry = 'CA';

        return config.stripe.publishableKey ? (
          <Form className={classes} onSubmit={handleFormSubmit}>
            {!stripeConnected ? (
              <div className={css.sectionContainer}>
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
                      {intl.formatMessage({ id: `StripePayoutForm.countryNames.${c}` })}
                    </option>
                  ))}
                </FieldSelect>

                {values.country ? (
                  <StripeBankAccountTokenInputField
                    className={css.bankDetailsStripeField}
                    disabled={disabled}
                    name="bankAccountToken"
                    formName="StripePayoutForm"
                    country={country}
                    currency={countryCurrency(country)}
                    validate={bankAccountRequired}
                  />
                ) : null}
              </div>
            ) : (
              <div className={css.savedInformation}>
                <p>TODO: get this information from Stripe Account fetched from API</p>

                <h3>{countryLabel}</h3>
                <div className={css.savedCountry}>
                  {intl.formatMessage({ id: `StripePayoutForm.countryNames.${savedCountry}` })}
                </div>
                <h3>Bank account</h3>

                {showCardUpdateInput && savedCountry ? (
                  <StripeBankAccountTokenInputField
                    className={css.bankDetailsStripeField}
                    disabled={disabled}
                    name="bankAccountToken"
                    formName="StripePayoutForm"
                    country={savedCountry}
                    currency={countryCurrency(savedCountry)}
                    validate={bankAccountRequired}
                  />
                ) : !submitInProgress ? (
                  <InlineTextButton
                    className={css.savedBankAccount}
                    onClick={() => setShowCardUpdateInput(true)}
                  >
                    •••••••••••••••••••••••• 1234
                  </InlineTextButton>
                ) : null}
              </div>
            )}
            {error}

            {showVerificationError ? (
              <StripeVerificationStatusBox
                type="verificationError"
                onGetVerificationLink={onGetVerificationLink}
                getVerificationLinkParams={getVerificationLinkParams}
              />
            ) : showVerificationNeeded ? (
              <StripeVerificationStatusBox
                type="verificationNeeded"
                onGetVerificationLink={onGetVerificationLink}
                getVerificationLinkParams={getVerificationLinkParams}
              />
            ) : stripeConnected ? (
              <StripeVerificationStatusBox
                type="verificationSuccess"
                onGetVerificationLink={onGetVerificationLink}
                getVerificationLinkParams={getVerificationLinkParams}
              />
            ) : null}

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
                <FormattedMessage id="StripePayoutForm.submitButtonText" />
              )}
            </Button>
          </Form>
        ) : (
          <div className={css.missingStripeKey}>
            <FormattedMessage id="StripePayoutForm.missingStripeKey" />
          </div>
        );
      }}
    />
  );
};

StripePayoutFormComponent.defaultProps = {
  className: null,
  stripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
  currentUserId: null,
  fieldRenderProps: null,
  verificationSuccess: null,
  verificationFailed: null,
};

StripePayoutFormComponent.propTypes = {
  className: string,
  stripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  submitButtonText: string,
  currentUserId: propTypes.uuid,
  fieldRenderProps: shape({
    handleSubmit: func,
    invalid: bool,
    pristine: bool,
    values: object,
  }),
  verificationSuccess: bool,
  verificationFailed: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const StripePayoutForm = compose(injectIntl)(StripePayoutFormComponent);

export default StripePayoutForm;
