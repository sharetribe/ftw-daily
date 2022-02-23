import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingSubjectForm.module.css';

const CustomClassLevelTypeSelectFieldMaybe = props => {
  const { name, id, classLevelTypes, intl } = props;
  const classLevelTypeLabel = intl.formatMessage({
    id: 'EditListingSubjectForm.classLevelTypeLabel',
  });
  const classLevelTypePlaceholder = intl.formatMessage({
    id: 'EditListingSubjectForm.classLevelTypePlaceholder',
  });
  const classLevelTypeRequired = required(
    intl.formatMessage({
      id: 'EditListingSubjectForm.classLevelTypeRequired',
    })
  );
  return classLevelTypes ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={classLevelTypeLabel}
      validate={classLevelTypeRequired}
    >
      <option disabled value="">
        {classLevelTypePlaceholder}
      </option>
      {classLevelTypes.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomClassLevelTypeSelectFieldMaybe;
