import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingPricingForm.module.css';

const CustomPaymentTypeSelectFieldMaybe = props => {
  const { name, id, paymentTypes, intl } = props;
  const paymentTypeLabel = intl.formatMessage({
    id: 'EditListingPricingForm.paymentTypeLabel',
  });
  const paymentTypePlaceholder = intl.formatMessage({
    id: 'EditListingPricingForm.paymentTypePlaceholder',
  });
  const paymentTypeRequired = required(
    intl.formatMessage({
      id: 'EditListingPricingForm.paymentTypeRequired',
    })
  );
  return paymentTypes ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={paymentTypeLabel}
      validate={paymentTypeRequired}
    >
      <option disabled value="">
        {paymentTypePlaceholder}
      </option>
      {paymentTypes.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomPaymentTypeSelectFieldMaybe;
