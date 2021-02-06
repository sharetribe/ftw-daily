import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomWorkstationsSelectFieldMaybe = props => {
  const { name, id, workstationNumbers, intl } = props;
  const workstationLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.workstationLabel',
  });
  const workstationPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.workstationPlaceholder',
  });
  const workstationRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.workstationRequired',
    })
  );
  return workstationNumbers ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={workstationLabel}
      validate={workstationRequired}
    >
      <option disabled value="">
        {workstationPlaceholder}
      </option>
      {workstationNumbers.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomWorkstationsSelectFieldMaybe;
