import React from 'react';
import { bool } from 'prop-types';
import SelectSingleFilterPlain from './SelectSingleFilterPlain';
import SelectSingleFilterPopup from './SelectSingleFilterPopup';

const SelectSingleFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? (
    <SelectSingleFilterPopup {...rest} />
  ) : (
    <SelectSingleFilterPlain {...rest} />
  );
};

SelectSingleFilter.defaultProps = {
  showAsPopup: false,
};

SelectSingleFilter.propTypes = {
  showAsPopup: bool,
};

export default SelectSingleFilter;
