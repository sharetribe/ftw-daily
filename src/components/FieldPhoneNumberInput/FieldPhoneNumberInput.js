import React from 'react';

import { TextInputField } from '../../components';
import normalizePhone from './fiNormalizer';

const FieldPhoneNumberInput = props => {
  const inputProps = {
    ...props,
    type: 'text',
    normalize: normalizePhone,
  };

  return <TextInputField {...inputProps} />;
};

export default FieldPhoneNumberInput;
