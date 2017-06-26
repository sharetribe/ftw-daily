import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import config from '../../config';
import {
  Button,
  StripeBankAccountTokenInputField,
  SelectField,
  BirthdayInputField,
  TextInputField,
} from '../../components';
import * as validators from '../../util/validators';

import css from './PayoutDetailsForm.css';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

const requiresAddress = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);
  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country.payoutAddressRequired;
};

const PayoutDetailsFormComponent = props => {
  const {
    className,
    country,
    currency,
    form,
    disabled,
    handleSubmit,
    pristine,
    submitting,
    intl,
  } = props;

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

  const birthdayId = `${form}.birthday`;
  const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
  const birthdayRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.birthdayRequired',
    })
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
  const addressSection = showAddressFields
    ? <div>
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
        <TextInputField
          className={css.field}
          type="text"
          name="postalCode"
          id={`${form}.postalCode`}
          label={postalCodeLabel}
          placeholder={postalCodePlaceholder}
          validate={postalCodeRequired}
          clearOnUnmount
        />
        <TextInputField
          className={css.field}
          type="text"
          name="city"
          id={`${form}.city`}
          label={cityLabel}
          placeholder={cityPlaceholder}
          validate={cityRequired}
          clearOnUnmount
        />
      </div>
    : null;

  // StripeBankAccountTokenInputField handles the error messages
  // internally, we just have to make sure we require a valid token
  // out of the field. Therefore the empty validation message.
  const bankAccountRequired = validators.required(' ');

  const bankAccountSection = country
    ? <div>
        <h2 className={css.subTitle}>
          <FormattedMessage id="PayoutDetailsForm.bankDetails" />
        </h2>
        <StripeBankAccountTokenInputField
          name="bankAccountToken"
          routingNumberId={`${form}.bankAccountToken.routingNumber`}
          accountNumberId={`${form}.bankAccountToken.accountNumber`}
          country={country}
          currency={currency}
          validate={bankAccountRequired}
        />
      </div>
    : null;

  const classes = classNames(css.root, className);
  const submitDisabled = pristine || submitting || disabled;

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <h2 className={css.formTitle}>
        <FormattedMessage id="PayoutDetailsForm.title" />
      </h2>
      <p>
        <FormattedMessage id="PayoutDetailsForm.information" />
      </p>
      <h2 className={css.subTitle}>
        <FormattedMessage id="PayoutDetailsForm.personalDetailsTitle" />
      </h2>
      <TextInputField
        className={css.field}
        type="text"
        name="firstName"
        id={`${form}.firstName`}
        label={firstNameLabel}
        validate={firstNameRequired}
      />
      <TextInputField
        className={css.field}
        type="text"
        name="lastName"
        id={`${form}.lastName`}
        label={lastNameLabel}
        validate={lastNameRequired}
      />
      <BirthdayInputField
        className={css.field}
        id={birthdayId}
        name="birthDate"
        label={birthdayLabel}
        format={null}
        validate={birthdayRequired}
      />
      <h2 className={css.subTitle}>
        <FormattedMessage id="PayoutDetailsForm.addressTitle" />
      </h2>
      <SelectField
        name="country"
        id={`${form}.country`}
        label={countryLabel}
        validate={countryRequired}
      >
        <option value="">{countryPlaceholder}</option>
        {supportedCountries.map(c => <option key={c} value={c}>{c}</option>)}
      </SelectField>
      {addressSection}
      {bankAccountSection}
      <Button className={css.submitButton} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
      </Button>
    </form>
  );
};

PayoutDetailsFormComponent.defaultProps = { className: null, country: null, disabled: false };

const { string, bool } = PropTypes;

PayoutDetailsFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  disabled: bool,
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
