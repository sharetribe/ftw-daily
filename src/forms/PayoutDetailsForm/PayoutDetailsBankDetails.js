import React from 'react';
import { bool, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import { StripeBankAccountTokenInputField } from '../../components';

import { stripeCountryConfigs } from './PayoutDetailsForm';
import css from './PayoutDetailsForm.module.css';

const countryCurrency = countryCode => {
  const country = stripeCountryConfigs(countryCode);
  return country.currency;
};

const PayoutDetailsBankDetails = props => {
  const { country, disabled, fieldId } = props;

  // StripeBankAccountTokenInputField handles the error messages
  // internally, we just have to make sure we require a valid token
  // out of the field. Therefore the empty validation message.
  const bankAccountRequired = validators.required(' ');

  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>
        <FormattedMessage id="PayoutDetailsForm.bankDetails" />
      </h3>
      <StripeBankAccountTokenInputField
        className={css.bankDetailsStripeField}
        disabled={disabled}
        name={`${fieldId}.bankAccountToken`}
        formName="PayoutDetailsForm"
        country={country}
        currency={countryCurrency(country)}
        validate={bankAccountRequired}
      />
    </div>
  );
};
PayoutDetailsBankDetails.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
};

PayoutDetailsBankDetails.propTypes = {
  country: string,
  disabled: bool,
  fieldId: string,
};

export default PayoutDetailsBankDetails;
