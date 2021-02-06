import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomAccommodatesSelectFieldMaybe = props => {
  const { name, id, accommodatesNumbers, intl } = props;
  const accommodatesLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.accommodatesLabel',
  });
  const accommodatesPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.accommodatesPlaceholder',
  });
  const accommodatesRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.accommodatesRequired',
    })
  );
  return accommodatesNumbers ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={accommodatesLabel}
      validate={accommodatesRequired}
    >
      <option disabled value="">
        {accommodatesPlaceholder}
      </option>
      {accommodatesNumbers.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomAccommodatesSelectFieldMaybe;
