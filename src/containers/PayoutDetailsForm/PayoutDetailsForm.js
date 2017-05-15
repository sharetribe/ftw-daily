import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import config from '../../config';
import {
  Button,
  StripeBankAccountToken,
  Select,
  BirthdayInput,
  LocationAutocompleteInput,
} from '../../components';
import * as validators from '../../util/validators';
import { enhancedField } from '../../util/forms';

import css from './PayoutDetailsForm.css';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

const requiresAddress = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);
  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country.payoutAddressRequired;
};

const CountriesSelect = props => {
  const { input } = props;
  return (
    <Select className={css.countries} {...input}>
      <option />
      {supportedCountries.map(c => <option key={c} value={c}>{c}</option>)}
    </Select>
  );
};

const { string, bool, object } = PropTypes;

CountriesSelect.propTypes = {
  input: object.isRequired,
};

class PayoutDetailsFormComponent extends Component {
  constructor(props) {
    super(props);
    this.EnhancedInput = enhancedField('input', {
      errorClassName: css.error,
    });
    this.EnhancedCountriesDropdown = enhancedField(CountriesSelect, {
      errorClassName: css.error,
    });
    this.EnhancedBirthdayInput = enhancedField(BirthdayInput, {
      errorClassName: css.error,
    });
    this.EnhancedLocationAutocompleteInput = enhancedField(LocationAutocompleteInput, {
      errorClassName: css.error,
    });
  }
  render() {
    const { country, currency, handleSubmit, pristine, submitting, inProgress, intl } = this.props;

    const firstNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.firstNameLabel' });
    const firstNameRequired = validators.required(
      intl.formatMessage({
        id: 'PayoutDetailsForm.firstNameRequired',
      })
    );

    const lastNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.lastNameLabel' });
    const lastNameRequired = validators.required(
      intl.formatMessage({
        id: 'PayoutDetailsForm.lastNameRequired',
      })
    );

    const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
    const birthdayRequired = validators.required(
      intl.formatMessage({
        id: 'PayoutDetailsForm.birthdayRequired',
      })
    );

    const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
    const countryRequired = validators.required(
      intl.formatMessage({
        id: 'PayoutDetailsForm.countryRequired',
      })
    );

    const streetAddressLabel = intl.formatMessage({ id: 'PayoutDetailsForm.streetAddressLabel' });
    const streetAddressPlaceholder = intl.formatMessage({
      id: 'PayoutDetailsForm.streetAddressPlaceholder',
    });
    const streetAddressRequiredMessage = intl.formatMessage({
      id: 'PayoutDetailsForm.streetAddressRequired',
    });
    const streetAddressNotRecognizedMessage = intl.formatMessage({
      id: 'PayoutDetailsForm.streetAddressNotRecognized',
    });
    const validateStreetAddress = [
      validators.autocompleteSearchRequired(streetAddressRequiredMessage),
      validators.autocompletePlaceSelected(streetAddressNotRecognizedMessage),
    ];

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
    const addressSection = showAddressFields
      ? <div>
          <Field
            name="streetAddress"
            type="text"
            label={streetAddressLabel}
            placeholder={streetAddressPlaceholder}
            format={null}
            component={this.EnhancedLocationAutocompleteInput}
            validate={validateStreetAddress}
            clearOnUnmount
          />
          <Field
            name="postalCode"
            type="text"
            label={postalCodeLabel}
            placeholder={postalCodePlaceholder}
            component={this.EnhancedInput}
            validate={postalCodeRequired}
            clearOnUnmount
          />
          <Field
            name="city"
            type="text"
            label={cityLabel}
            placeholder={cityPlaceholder}
            component={this.EnhancedInput}
            validate={cityRequired}
            clearOnUnmount
          />
        </div>
      : null;

    const bankAccountRequired = validators.required(
      intl.formatMessage({
        id: 'PayoutDetailsForm.bankAccountRequired',
      })
    );

    const bankAccountSection = country
      ? <div>
          <h2 className={css.subTitle}>
            <FormattedMessage id="PayoutDetailsForm.bankDetails" />
          </h2>
          <Field
            name="bankAccountToken"
            component={StripeBankAccountToken}
            props={{ country, currency }}
            validate={bankAccountRequired}
            clearOnUnmount
          />
        </div>
      : null;

    const submitDisabled = pristine || submitting || inProgress;

    return (
      <form className={css.root} onSubmit={handleSubmit}>
        <h2 className={css.formTitle}>
          <FormattedMessage id="PayoutDetailsForm.title" />
        </h2>
        <p>
          <FormattedMessage id="PayoutDetailsForm.information" />
        </p>
        <h2 className={css.subTitle}>
          <FormattedMessage id="PayoutDetailsForm.personalDetailsTitle" />
        </h2>
        <Field
          name="firstName"
          type="text"
          label={firstNameLabel}
          component={this.EnhancedInput}
          validate={firstNameRequired}
        />
        <Field
          name="lastName"
          type="text"
          label={lastNameLabel}
          component={this.EnhancedInput}
          validate={lastNameRequired}
        />
        <Field
          name="birthDate"
          type="text"
          label={birthdayLabel}
          format={null}
          component={this.EnhancedBirthdayInput}
          validate={birthdayRequired}
        />
        <h2 className={css.subTitle}>
          <FormattedMessage id="PayoutDetailsForm.addressTitle" />
        </h2>
        <Field
          name="country"
          type="text"
          label={countryLabel}
          component={this.EnhancedCountriesDropdown}
          validate={countryRequired}
        />
        {addressSection}
        {bankAccountSection}
        <Button className={css.submitButton} type="submit" disabled={submitDisabled}>
          <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
        </Button>
      </form>
    );
  }
}

PayoutDetailsFormComponent.defaultProps = { country: null, inProgress: false };

PayoutDetailsFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  currency: string.isRequired,

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
