import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomBrancheSelectFieldMaybe = props => {
  const { name, id, branches, intl } = props;
  const brancheLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.brancheLabel',
  });
  const branchePlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.branchePlaceholder',
  });
  const brancheRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.brancheRequired',
    })
  );
  return branches ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={brancheLabel}
      validate={brancheRequired}
    >
      <option disabled value="">
        {branchePlaceholder}
      </option>
      {branches.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomBrancheSelectFieldMaybe;
