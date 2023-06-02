import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomLandSelectFieldMaybe = props => {
  const { name, id, laender, intl } = props;
  const landLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.landLabel',
  });
  const landPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.landPlaceholder',
  });
  const landRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.landRequired',
    })
  );
  return laender ? (
    <FieldSelect
      className={css.firstName}
      name={name}
      id={id}
      label={landLabel}
      validate={landRequired}
    >
      <option disabled value="">
        {landPlaceholder}
      </option>
      {laender.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomLandSelectFieldMaybe;
