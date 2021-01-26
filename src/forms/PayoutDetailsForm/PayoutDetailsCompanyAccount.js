import React from 'react';
import { bool, object, shape } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsCompany from './PayoutDetailsCompany';
import PayoutDetailsBankDetails from './PayoutDetailsBankDetails';
import PayoutDetailsAccountOpener from './PayoutDetailsAccountOpener';
import PayoutDetailsAdditionalPersons from './PayoutDetailsAdditionalPersons';
import { stripeCountryConfigs } from './PayoutDetailsForm';

const CompanyAccountComponent = props => {
  const { fieldRenderProps, intl } = props;
  const { disabled, form, values } = fieldRenderProps;
  const { country } = values;
  const { push } = form && form.mutators ? form.mutators : {};

  const companyConfig =
    country && stripeCountryConfigs(country).companyConfig
      ? stripeCountryConfigs(country).companyConfig
      : {};

  const showBusinessURLField = !!companyConfig.businessURL;
  const showCompanyPhoneNumberField = !!companyConfig.companyPhone;
  const showMCCForUSField = !!companyConfig.mccForUS;
  const showPersonalEmailField = !!companyConfig.personalEmail;
  const showPersonalAddressField = !!companyConfig.personalAddress;
  const showPersonalIdNumberField =
    !!companyConfig.personalIdNumberRequired || !!companyConfig.ssnLast4Required;
  const showPersonalPhoneNumberField = !!companyConfig.personalPhone;
  const showOwnerFields = !!companyConfig.owners;

  return (
    <React.Fragment>
      {country ? (
        <React.Fragment>
          <PayoutDetailsCompany
            country={country}
            disabled={disabled}
            fieldId="company"
            intl={intl}
            showPhoneNumberField={showCompanyPhoneNumberField}
            showMCCForUSField={showMCCForUSField}
            showBusinessURLField={showBusinessURLField}
          />
          <PayoutDetailsAddress
            country={country}
            intl={intl}
            disabled={disabled}
            form={form}
            fieldId="company.address"
          />
          <PayoutDetailsBankDetails country={country} disabled={disabled} fieldId="company" />

          <PayoutDetailsAccountOpener
            country={country}
            disabled={disabled}
            fieldId="accountOpener"
            form={form}
            intl={intl}
            showEmailField={showPersonalEmailField}
            showOrganizationTitleField
            showOwnerField={showOwnerFields}
            showPersonalAddressField={showPersonalAddressField}
            showPersonalIdNumberField={showPersonalIdNumberField}
            showPhoneNumberField={showPersonalPhoneNumberField}
            values={values}
          />

          {showOwnerFields ? (
            <PayoutDetailsAdditionalPersons
              country={country}
              disabled={disabled}
              fieldId="persons"
              form={form}
              intl={intl}
              push={push}
              showEmailField={showPersonalEmailField}
              showOrganizationTitleField
              showOwnerField={showOwnerFields}
              showPersonalAddressField={showPersonalAddressField}
              showPersonalIdNumberField={showPersonalIdNumberField}
              showPhoneNumberField={showPersonalPhoneNumberField}
              values={values}
            />
          ) : null}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

CompanyAccountComponent.defaultProps = {
  id: null,
  disabled: false,
};

CompanyAccountComponent.propTypes = {
  fieldRenderProps: shape({
    disabled: bool,
    form: object.isRequired,
    values: object,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsCompanyAccount = compose(injectIntl)(CompanyAccountComponent);

export default PayoutDetailsCompanyAccount;
