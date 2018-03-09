import React from 'react';

import { TextInputField } from '../../components';
import { format, parse } from './fiFormatter';

const FieldPhoneNumberInput = props => {
  const inputProps = {
    ...props,
    type: 'text',
    format: format,
    parse: parse,
  };

  return <TextInputField {...inputProps} />;
};

export default FieldPhoneNumberInput;
