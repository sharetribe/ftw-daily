import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingSubjectForm.module.css';

const CustomClassLevelSelectFieldMaybe = props => {
  const { name, id, classLevels, intl } = props;
  const classLevelLabel = intl.formatMessage({
    id: 'EditListingSubjectForm.classLevelLabel',
  });
  const classLevelPlaceholder = intl.formatMessage({
    id: 'EditListingSubjectForm.classLevelPlaceholder',
  });
  const classLevelRequired = required(
    intl.formatMessage({
      id: 'EditListingSubjectForm.classLevelRequired',
    })
  );
  return classLevels ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={classLevelLabel}
      validate={classLevelRequired}
    >
      <option disabled value="">
        {classLevelPlaceholder}
      </option>
      {classLevels.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomClassLevelSelectFieldMaybe;
