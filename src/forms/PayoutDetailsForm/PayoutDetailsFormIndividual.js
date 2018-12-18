import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { StripeBankAccountTokenInputField } from '../../components';
import * as validators from '../../util/validators';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';
import { stripeCountryConfigs } from './PayoutDetailsForm';
import css from './PayoutDetailsForm.css';

const countryCurrency = countryCode => {
  const country = stripeCountryConfigs(countryCode);
  return country.currency;
};

const PayoutDetailsFormIndividualComponent = ({ fieldRenderProps }) => {
  const { disabled, form, intl, values } = fieldRenderProps;
  const { country } = values;

  // StripeBankAccountTokenInputField handles the error messages
  // internally, we just have to make sure we require a valid token
  // out of the field. Therefore the empty validation message.
  const bankAccountRequired = validators.required(' ');

  return (
    <React.Fragment>
      <PayoutDetailsPersonalDetails
        intl={intl}
        disabled={disabled}
        values={values}
        country={country}
      />
      <PayoutDetailsAddress country={country} intl={intl} disabled={disabled} form={form} />

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
    </React.Fragment>
  );
};

PayoutDetailsFormIndividualComponent.defaultProps = {
  disabled: false,
};

PayoutDetailsFormIndividualComponent.propTypes = {
  disabled: bool,
  form: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsFormIndividual = compose(injectIntl)(PayoutDetailsFormIndividualComponent);

export default PayoutDetailsFormIndividual;
