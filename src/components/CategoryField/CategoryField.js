import React from 'react';
import { FieldSelect } from '../../components';

const CategoryField = props => {
  const { name, id, categories, className, categoryLabel, categoryPlaceholder, categoryRequired} = props;

  return categories ? (
    <FieldSelect
      className={className}
      name={name}
      id={id}
      label={categoryLabel}
      validate={categoryRequired}
    >
      <option disabled value="">
        {categoryPlaceholder}
      </option>
      {categories.map(c => (

        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CategoryField;
