import React from 'react';
import config from '../../config';
import { required } from '../../util/validators';
import { SelectField } from '../../components';

import css from './EditListingDescriptionForm.css';

export const CategorySelectFieldMaybe = props => {
  const { form, intl } = props;

  // Does custom attribute 'category' exists in current marketplace configuration
  const caCategory = config.customAttributes && config.customAttributes.category;
  const isSingleChoiceCategory = caCategory && caCategory.type === 'singleChoice';

  // If custom attribute for category doesn't exist, don't print SelectField
  if (!isSingleChoiceCategory) {
    return null;
  }

  const categoryLabel = intl.formatMessage({ id: 'EditListingDescriptionForm.categoryLabel' });
  const categoryPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.categoryPlaceholder',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.categoryRequired',
    })
  );

  return (
    <SelectField
      className={css.selectCategory}
      name="category"
      id={`${form}.category`}
      label={categoryLabel}
      validate={categoryRequired}
    >
      <option value="">{categoryPlaceholder}</option>
      {caCategory.values.map(c => (
        <option key={c} value={c}>
          {intl.formatMessage({ id: `EditListingDescriptionForm.categoryOption.${c}` })}
        </option>
      ))}
    </SelectField>
  );
};
