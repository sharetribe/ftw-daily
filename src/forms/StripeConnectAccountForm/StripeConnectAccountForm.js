import React, { useState } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import config from '../../config';
import { isStripeError } from '../../util/errors';
import * as validators from '../../util/validators';
import {
  Button,
  InlineTextButton,
  FieldSelect,
  Form,
  StripeBankAccountTokenInputField,
} from '../../components';

import css from './StripeConnectAccountForm.css';

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

const CreateStripeAccountFields = props => {
  const { disabled, countryLabel, values, intl } = props;
  const country = values.country;
  const countryRequired = validators.required(
    intl.formatMessage({
      id: 'StripeConnectAccountForm.countryRequired',
    })
  );
  return (
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
          {intl.formatMessage({ id: 'StripeConnectAccountForm.countryPlaceholder' })}
        </option>
        {supportedCountries.map(c => (
          <option key={c} value={c}>
            {intl.formatMessage({ id: `StripeConnectAccountForm.countryNames.${c}` })}
          </option>
        ))}
      </FieldSelect>

      {country ? (
        <StripeBankAccountTokenInputField
          className={css.bankDetailsStripeField}
          disabled={disabled}
          name="bankAccountToken"
          formName="StripeConnectAccountForm"
          country={country}
          currency={countryCurrency(country)}
          validate={validators.required(' ')}
        />
      ) : null}
    </div>
  );
};

const UpdateStripeAccountFields = props => {
  const {
    disabled,
    countryLabel,
    savedCountry,
    showCardUpdateInput,
    submitInProgress,
    setShowCardUpdateInput,
    stripeBankAccountLastDigits,
  } = props;

  return (
    <div className={css.savedInformation}>
      <h3 className={css.accountInformationTitle}>{countryLabel}</h3>
      <div className={css.savedCountry}>
        <FormattedMessage id={`StripeConnectAccountForm.countryNames.${savedCountry}`} />
      </div>
      <h3 className={css.accountInformationTitle}>
        <FormattedMessage id="StripeConnectAccountForm.bankAccountLabel" />
      </h3>

      {showCardUpdateInput && savedCountry ? (
        <StripeBankAccountTokenInputField
          className={css.bankDetailsStripeField}
          disabled={disabled}
          name="bankAccountToken"
          formName="StripeConnectAccountForm"
          country={savedCountry}
          currency={countryCurrency(savedCountry)}
          validate={validators.required(' ')}
        />
      ) : !submitInProgress ? (
        <InlineTextButton
          className={css.savedBankAccount}
          onClick={() => setShowCardUpdateInput(true)}
        >
          •••••••••••••••••••••••• {stripeBankAccountLastDigits}
        </InlineTextButton>
      ) : null}
    </div>
  );
};

const ErrorsMaybe = props => {
  const { stripeAccountError } = props;
  return isStripeError(stripeAccountError) ? (
    <div className={css.error}>
      <FormattedMessage
        id="StripeConnectAccountForm.createStripeAccountFailedWithStripeError"
        values={{ stripeMessage: stripeAccountError.apiErrors[0].meta.stripeMessage }}
      />
    </div>
  ) : stripeAccountError ? (
    <div className={css.error}>
      <FormattedMessage id="StripeConnectAccountForm.createStripeAccountFailed" />
    </div>
  ) : null;
};

const StripeConnectAccountFormComponent = props => {
  const [showCardUpdateInput, setShowCardUpdateInput] = useState(false);
  const { onSubmit, ...restOfProps } = props;
  const isUpdate = props.stripeConnected;

  return (
    <FinalForm
      {...restOfProps}
      onSubmit={values => onSubmit(values, isUpdate)}
      mutators={{
        ...arrayMutators,
      }}
      render={fieldRenderProps => {
        const {
          className,
          children,
          stripeAccountError,
          disabled,
          handleSubmit,
          inProgress,
          intl,
          invalid,
          pristine,
          ready,
          savedCountry,
          stripeAccountFetched,
          stripeBankAccountLastDigits,
          submitButtonText,
          values,
          stripeConnected,
        } = fieldRenderProps;

        const accountDataLoaded = stripeConnected && stripeAccountFetched && savedCountry;
        const submitInProgress = inProgress;
        const submitDisabled = pristine || invalid || disabled || submitInProgress;

        const handleFormSubmit = event => {
          // Close the bank account form when clicking "save details"
          setShowCardUpdateInput(false);
          handleSubmit(event);
        };

        const countryLabel = intl.formatMessage({ id: 'StripeConnectAccountForm.countryLabel' });
        const classes = classNames(css.root, className, {
          [css.disabled]: disabled,
        });

        // If the user doesn't have Stripe connected account,
        // show fields for country and bank account.
        // Otherwise, show only possibility the edit bank account
        // because Stripe doesn't allow user to change the country
        const stripeAccountFields = !stripeConnected ? (
          <CreateStripeAccountFields
            stripeConnected={stripeConnected}
            disabled={disabled}
            countryLabel={countryLabel}
            supportedCountries={supportedCountries}
            values={values}
            intl={intl}
          />
        ) : (
          <UpdateStripeAccountFields
            disabled={disabled}
            countryLabel={countryLabel}
            savedCountry={savedCountry}
            stripeBankAccountLastDigits={stripeBankAccountLastDigits}
            showCardUpdateInput={showCardUpdateInput}
            values={values}
            submitInProgress={submitInProgress}
            setShowCardUpdateInput={setShowCardUpdateInput}
            intl={intl}
          />
        );

        // Don't show the submit button while fetching the Stripe account data
        const submitButtonMaybe =
          !stripeConnected || accountDataLoaded ? (
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={ready}
            >
              {submitButtonText || (
                <FormattedMessage id="StripeConnectAccountForm.submitButtonText" />
              )}
            </Button>
          ) : null;

        // If the Stripe publishable key is not set up, don't show the form
        return config.stripe.publishableKey ? (
          <Form className={classes} onSubmit={handleFormSubmit}>
            {!stripeConnected || accountDataLoaded ? (
              stripeAccountFields
            ) : (
              <div className={css.savedInformation}>
                <FormattedMessage id="StripeConnectAccountForm.loadingStripeAccountData" />
              </div>
            )}

            <ErrorsMaybe stripeAccountError={stripeAccountError} />

            {children}

            {submitButtonMaybe}
          </Form>
        ) : (
          <div className={css.missingStripeKey}>
            <FormattedMessage id="StripeConnectAccountForm.missingStripeKey" />
          </div>
        );
      }}
    />
  );
};

StripeConnectAccountFormComponent.defaultProps = {
  className: null,
  stripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  savedCountry: null,
  stripeBankAccountLastDigits: null,
  submitButtonText: null,
  fieldRenderProps: null,
};

StripeConnectAccountFormComponent.propTypes = {
  className: string,
  stripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  savedCountry: string,
  stripeBankAccountLastDigits: string,
  stripeAccountFetched: bool.isRequired,
  submitButtonText: string,
  fieldRenderProps: shape({
    handleSubmit: func,
    invalid: bool,
    pristine: bool,
    values: object,
  }),

  // from injectIntl
  intl: intlShape.isRequired,
};

const StripeConnectAccountForm = compose(injectIntl)(StripeConnectAccountFormComponent);

export default StripeConnectAccountForm;
