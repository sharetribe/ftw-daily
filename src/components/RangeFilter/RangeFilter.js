import React from 'react';
import { bool } from 'prop-types';
import RangeFilterPlain from './RangeFilterPlain';
import RangeFilterPopup from './RangeFilterPopup';

const RangeFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? <RangeFilterPopup {...rest} /> : <RangeFilterPlain {...rest} />;
};

RangeFilter.defaultProps = {
  showAsPopup: false,
};

RangeFilter.propTypes = {
  showAsPopup: bool,
};

export default RangeFilter;
