import React from 'react';
import { string } from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { required } from '../../util/validators';
import { SelectField } from '../../components';

import css from './FieldCustomAttributeSelect.css';

const FieldCustomAttributeSelect = props => {
  const { className, rootClassName, id, customAttribute, intl } = props;

  // Does custom attribute 'customAttribute' exists in current marketplace configuration
  const ca = config.customAttributes && config.customAttributes[customAttribute];
  const isSingleChoice = ca && ca.select === 'single' && ca.type === 'string';

  // If custom attribute config for given 'customAttribute' doesn't exist, don't print SelectField
  if (!isSingleChoice) {
    return null;
  }

  const caLabel = intl.formatMessage({ id: `FieldCustomAttributeSelect.${customAttribute}.label` });
  const caPlaceholder = intl.formatMessage({
    id: `FieldCustomAttributeSelect.${customAttribute}.placeholder`,
  });
  const caRequired = required(
    intl.formatMessage({
      id: `FieldCustomAttributeSelect.${customAttribute}.required`,
    })
  );

  const classes = classNames(rootClassName || css.root, className);

  return (
    <SelectField
      className={classes}
      name={customAttribute}
      id={id}
      label={caLabel}
      validate={caRequired}
    >
      <option value="">{caPlaceholder}</option>
      {ca.values.map(c => (
        <option key={c} value={c}>
          {intl.formatMessage({ id: `FieldCustomAttributeSelect.${customAttribute}.option.${c}` })}
        </option>
      ))}
    </SelectField>
  );
};

FieldCustomAttributeSelect.defaultProps = {
  className: null,
  rootClassName: null,
};

FieldCustomAttributeSelect.propTypes = {
  className: string,
  rootClassName: string,
  id: string.isRequired,
  customAttribute: string.isRequired,

  // From react-intl
  intl: intlShape.isRequired,
};

export default injectIntl(FieldCustomAttributeSelect);
