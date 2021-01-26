import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { FieldSelect } from '../../components';

const FieldBoolean = props => {
  const { placeholder, intl, ...rest } = props;
  const trueLabel = intl.formatMessage({
    id: 'FieldBoolean.yes',
  });
  const falseLabel = intl.formatMessage({
    id: 'FieldBoolean.no',
  });
  const selectProps = {
    ...rest,
    format: option => {
      if (option === true) {
        return 'true';
      } else if (option === false) {
        return 'false';
      }
      return '';
    },
    parse: value => {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
      return '';
    },
  };
  return (
    <FieldSelect {...selectProps}>
      <option value="">{placeholder}</option>
      <option value="true">{trueLabel}</option>
      <option value="false">{falseLabel}</option>
    </FieldSelect>
  );
};

FieldBoolean.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(FieldBoolean);
