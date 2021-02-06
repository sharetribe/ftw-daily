import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomPrivacySelectFieldMaybe = props => {
  const { name, id, privacyTypes, intl } = props;
  const privacyLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.privacyLabel',
  });
  const privacyPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.privacyPlaceholder',
  });
  const privacyRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.privacyRequired',
    })
  );
  return privacyTypes ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={privacyLabel}
      validate={privacyRequired}
    >
      <option disabled value="">
        {privacyPlaceholder}
      </option>
      {privacyTypes.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomPrivacySelectFieldMaybe;
