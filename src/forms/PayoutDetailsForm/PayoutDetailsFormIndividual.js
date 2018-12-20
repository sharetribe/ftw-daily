import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsBankDetails from './PayoutDetailsBankDetails';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';

const PayoutDetailsFormIndividualComponent = ({ fieldRenderProps }) => {
  const { disabled, form, intl, values } = fieldRenderProps;
  const { country } = values;

  return (
    <React.Fragment>
      <PayoutDetailsPersonalDetails
        intl={intl}
        disabled={disabled}
        values={values}
        country={country}
        fieldId="individual"
      />
      <PayoutDetailsAddress
        country={country}
        intl={intl}
        disabled={disabled}
        form={form}
        fieldId="individual.address"
      />
      <PayoutDetailsBankDetails country={country} disabled={disabled} fieldId="individual" />
    </React.Fragment>
  );
};

PayoutDetailsFormIndividualComponent.defaultProps = {
  disabled: false,
};

PayoutDetailsFormIndividualComponent.propTypes = {
  disabled: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsFormIndividual = compose(injectIntl)(PayoutDetailsFormIndividualComponent);

export default PayoutDetailsFormIndividual;
