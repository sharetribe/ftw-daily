import React from 'react';
import { bool } from 'prop-types';
import PriceFilterPlain from './PriceFilterPlain';
import PriceFilterPopup from './PriceFilterPopup';

const PriceFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? <PriceFilterPopup {...rest} /> : <PriceFilterPlain {...rest} />;
};

PriceFilter.defaultProps = {
  showAsPopup: false,
};

PriceFilter.propTypes = {
  showAsPopup: bool,
};

export default PriceFilter;
