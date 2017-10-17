import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import config from '../../config';
import {
  Form,
  Button,
  StripeBankAccountTokenInputField,
  SelectField,
  BirthdayInputField,
  TextInputField,
} from '../../components';
import * as validators from '../../util/validators';

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

const requiresAddress = countryCode => {
  const country = stripeCountryConfigs(countryCode);
  return country.payoutAddressRequired;
};

const countryCurrency = countryCode => {
  const country = stripeCountryConfigs(countryCode);
  return country.currency;
};

const PayoutDetailsFormComponent = props => {
  const {
    className,
    country,
    createStripeAccountError,
    form,
    disabled,
    inProgress,
    handleSubmit,
    pristine,
    submitting,
    invalid,
    intl,
  } = props;

  const firstNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.firstNameLabel' });
  const firstNamePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.firstNamePlaceholder' });
  const firstNameRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.firstNameRequired',
    })
  );

  const lastNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.lastNameLabel' });
  const lastNamePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.lastNamePlaceholder' });
  const lastNameRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.lastNameRequired',
    })
  );

  const birthdayId = `${form}.birthday`;
  const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
  const birthdayLabelMonth = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabelMonth' });
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

  const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
  const countryPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.countryPlaceholder' });
  const countryRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.countryRequired',
    })
  );

  const streetAddressLabel = intl.formatMessage({ id: 'PayoutDetailsForm.streetAddressLabel' });
  const streetAddressPlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.streetAddressPlaceholder',
  });
  const streetAddressRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.streetAddressRequired',
    })
  );

  const postalCodeLabel = intl.formatMessage({ id: 'PayoutDetailsForm.postalCodeLabel' });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.postalCodePlaceholder',
  });
  const postalCodeRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.postalCodeRequired',
    })
  );

  const cityLabel = intl.formatMessage({ id: 'PayoutDetailsForm.cityLabel' });
  const cityPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.cityPlaceholder' });
  const cityRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.cityRequired',
    })
  );

  const showAddressFields = country && requiresAddress(country);
  const addressSection = showAddressFields ? (
    <div>
      <TextInputField
        className={css.field}
        type="text"
        name="streetAddress"
        id={`${form}.streetAddress`}
        label={streetAddressLabel}
        placeholder={streetAddressPlaceholder}
        validate={streetAddressRequired}
        clearOnUnmount
      />
      <div className={css.formRow}>
        <TextInputField
          className={css.postalCode}
          type="text"
          name="postalCode"
          id={`${form}.postalCode`}
          label={postalCodeLabel}
          placeholder={postalCodePlaceholder}
          validate={postalCodeRequired}
          clearOnUnmount
        />
        <TextInputField
          className={css.city}
          type="text"
          name="city"
          id={`${form}.city`}
          label={cityLabel}
          placeholder={cityPlaceholder}
          validate={cityRequired}
          clearOnUnmount
        />
      </div>
    </div>
  ) : null;

  // StripeBankAccountTokenInputField handles the error messages
  // internally, we just have to make sure we require a valid token
  // out of the field. Therefore the empty validation message.
  const bankAccountRequired = validators.required(' ');

  const bankAccountSection = country ? (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>
        <FormattedMessage id="PayoutDetailsForm.bankDetails" />
      </h3>
      <StripeBankAccountTokenInputField
        name="bankAccountToken"
        formName={form}
        country={country}
        currency={countryCurrency(country)}
        validate={bankAccountRequired}
      />
    </div>
  ) : null;

  const classes = classNames(css.root, className);
  const submitReady = false;
  const submitInProgress = submitting || inProgress;
  const submitDisabled = pristine || invalid || disabled || submitInProgress;
  const error = createStripeAccountError ? (
    <div className={css.error}>
      <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailed" />
    </div>
  ) : null;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      <div className={css.sectionContainer}>
        <h3 className={css.subTitle}>
          <FormattedMessage id="PayoutDetailsForm.personalDetailsTitle" />
        </h3>
        <div className={css.formRow}>
          <TextInputField
            className={css.firstName}
            type="text"
            name="firstName"
            id={`${form}.firstName`}
            label={firstNameLabel}
            placeholder={firstNamePlaceholder}
            validate={firstNameRequired}
          />
          <TextInputField
            className={css.lastName}
            type="text"
            name="lastName"
            id={`${form}.lastName`}
            label={lastNameLabel}
            placeholder={lastNamePlaceholder}
            validate={lastNameRequired}
          />
        </div>
        <BirthdayInputField
          className={css.field}
          id={birthdayId}
          name="birthDate"
          label={birthdayLabel}
          labelForMonth={birthdayLabelMonth}
          labelForYear={birthdayLabelYear}
          format={null}
          validate={[birthdayRequired, birthdayMinAge]}
        />
      </div>

      <div className={css.sectionContainer}>
        <h3 className={css.subTitle}>
          <FormattedMessage id="PayoutDetailsForm.addressTitle" />
        </h3>
        <SelectField
          className={css.selectCountry}
          name="country"
          id={`${form}.country`}
          label={countryLabel}
          validate={countryRequired}
        >
          <option value="">{countryPlaceholder}</option>
          {supportedCountries.map(c => (
            <option key={c} value={c}>
              {intl.formatMessage({ id: `PayoutDetailsForm.countryNames.${c}` })}
            </option>
          ))}
        </SelectField>
        {addressSection}
      </div>
      {bankAccountSection}
      {error}
      <Button
        className={css.submitButton}
        type="submit"
        inProgress={submitInProgress}
        disabled={submitDisabled}
        ready={submitReady}
      >
        <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
      </Button>
    </Form>
  );
};

PayoutDetailsFormComponent.defaultProps = {
  className: null,
  country: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
};

const { bool, object, string } = PropTypes;

PayoutDetailsFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  createStripeAccountError: object,
  disabled: bool,
  inProgress: bool,

  // from mapStateToProps
  country: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const formName = 'PayoutDetailsForm';

const selector = formValueSelector(formName);
const mapStateToProps = state => {
  const country = selector(state, 'country');
  return { country };
};

const formOptions = {
  form: formName,
};

const PayoutDetailsForm = compose(connect(mapStateToProps), reduxForm(formOptions), injectIntl)(
  PayoutDetailsFormComponent
);

export default PayoutDetailsForm;
