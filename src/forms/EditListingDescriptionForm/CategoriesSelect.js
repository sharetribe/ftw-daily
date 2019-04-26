import React from 'react';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.css';

const CategoriesSelect = props => {
  const { name, id, label, placeholder, errorMessage, categories } = props;

  return categories ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={label}
      validate={errorMessage}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {categories.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CategoriesSelect;
