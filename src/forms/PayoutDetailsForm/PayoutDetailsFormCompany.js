import React from 'react';
import { bool, object, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { FieldTextInput } from '../../components';
import * as validators from '../../util/validators';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsBankDetails from './PayoutDetailsBankDetails';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';
import { stripeCountryConfigs } from './PayoutDetailsForm';
import css from './PayoutDetailsForm.css';

const PayoutDetailsFormCompanyComponent = ({ fieldRenderProps, country }) => {
  const { disabled, form, intl, values } = fieldRenderProps;

  const companyNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyNameLabel' });
  const companyNamePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.companyNamePlaceholder',
  });
  const companyNameRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.companyNameRequired',
    })
  );

  const companyTaxIdLabel = intl.formatMessage({
    id: `PayoutDetailsForm.companyTaxIdLabel.${country}`,
  });
  const companyTaxIdPlaceholder = intl.formatMessage(
    {
      id: 'PayoutDetailsForm.companyTaxIdPlaceholder',
    },
    {
      idName: companyTaxIdLabel,
    }
  );
  const companyTaxIdRequired = validators.required(
    intl.formatMessage(
      {
        id: 'PayoutDetailsForm.companyTaxIdRequired',
      },
      {
        idName: companyTaxIdLabel,
      }
    )
  );

  const showPersonalAddressField =
    country &&
    stripeCountryConfigs(country).companyConfig &&
    stripeCountryConfigs(country).companyConfig.personalAddress;

  return (
    <React.Fragment>
      {country ? (
        <React.Fragment>
          <div className={css.sectionContainer}>
            <h3 className={css.subTitle}>
              <FormattedMessage id="PayoutDetailsForm.companyDetailsTitle" />
            </h3>
            <FieldTextInput
              id="company.companyName"
              name="company.companyName"
              disabled={disabled}
              type="text"
              autoComplete="company-name"
              label={companyNameLabel}
              placeholder={companyNamePlaceholder}
              validate={companyNameRequired}
            />

            <FieldTextInput
              id="company.companyTaxId"
              name="company.companyTaxId"
              className={css.taxId}
              disabled={disabled}
              type="text"
              autoComplete="company-tax-id"
              label={companyTaxIdLabel}
              placeholder={companyTaxIdPlaceholder}
              validate={companyTaxIdRequired}
            />
          </div>

          <PayoutDetailsAddress
            country={country}
            intl={intl}
            disabled={disabled}
            form={form}
            fieldId="company.address"
          />

          <PayoutDetailsBankDetails country={country} disabled={disabled} fieldId="company" />

          <PayoutDetailsPersonalDetails
            intl={intl}
            disabled={disabled}
            values={values}
            country={country}
            fieldId="company"
          />
          {showPersonalAddressField ? (
            <PayoutDetailsAddress
              country={country}
              intl={intl}
              disabled={disabled}
              form={form}
              fieldId="company.personalAddress"
            />
          ) : null}
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
<<<<<<< HEAD
  inProgress: false,
  ready: false,
  submitButtonText: null,
=======
>>>>>>> 70cd0720... Merge to add personal address
};

PayoutDetailsFormCompanyComponent.propTypes = {
  className: string,
  createStripeAccountError: object,
  disabled: bool,
<<<<<<< HEAD
  inProgress: bool,
  ready: bool,
  submitButtonText: string,
=======
>>>>>>> 70cd0720... Merge to add personal address

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsFormCompany = compose(injectIntl)(PayoutDetailsFormCompanyComponent);

export default PayoutDetailsFormCompany;
