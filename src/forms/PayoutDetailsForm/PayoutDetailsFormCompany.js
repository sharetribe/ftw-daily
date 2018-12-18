import React from 'react';
import { bool, object, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { StripeBankAccountTokenInputField, FieldTextInput } from '../../components';
import * as validators from '../../util/validators';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';
import { stripeCountryConfigs } from './PayoutDetailsForm';
import css from './PayoutDetailsForm.css';

const countryCurrency = countryCode => {
  const country = stripeCountryConfigs(countryCode);
  return country.currency;
};

const PayoutDetailsFormCompanyComponent = ({ fieldRenderProps }) => {
  const { disabled, form, intl, values } = fieldRenderProps;
  const { country } = values;

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

  // StripeBankAccountTokenInputField handles the error messages
  // internally, we just have to make sure we require a valid token
  // out of the field. Therefore the empty validation message.
  const bankAccountRequired = validators.required(' ');

  return (
    <React.Fragment>
      {country ? (
        <React.Fragment>
          <div className={css.sectionContainer}>
            <h3 className={css.subTitle}>
              <FormattedMessage id="PayoutDetailsForm.companyDetailsTitle" />
            </h3>
            <div className={css.formRow}>
              <FieldTextInput
                id="companyName"
                name="companyName"
                disabled={disabled}
                className={css.firstName}
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
                className={css.lastName}
                type="text"
                autoComplete="company-tax-id"
                label={companyTaxIdLabel}
                placeholder={companyTaxIdPlaceholder}
                validate={companyTaxIdRequired}
              />
            </div>
          </div>

          <PayoutDetailsAddress
            country={country}
            intl={intl}
            disabled={disabled}
            form={form}
            companyAddress
          />

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

          <PayoutDetailsPersonalDetails
            intl={intl}
            disabled={disabled}
            values={values}
            country={country}
          />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

PayoutDetailsFormCompanyComponent.defaultProps = {
  className: null,
  country: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
};

PayoutDetailsFormCompanyComponent.propTypes = {
  className: string,
  createStripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  submitButtonText: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsFormCompany = compose(injectIntl)(PayoutDetailsFormCompanyComponent);

export default PayoutDetailsFormCompany;
