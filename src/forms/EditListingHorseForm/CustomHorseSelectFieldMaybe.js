import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingHorseForm.css';

const CustomHorseSelectFieldMaybe = props => {
  const { name, id, values, selectLabel, selectPlaceholder, selectRequired } = props;

  return values ? (
    <FieldSelect
      className={css.selectField}
      name={name}
      id={id}
      label={selectLabel}
      validate={required(selectRequired)}
    >
      <option disabled value="">
        {selectPlaceholder}
      </option>
      {values.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomHorseSelectFieldMaybe;
