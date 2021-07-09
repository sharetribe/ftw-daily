import React from 'react';
import { bool } from 'prop-types';
import PriceFilterPlain from './PriceFilterPlain';
import PriceFilterPopup from './PriceFilterPopup';

const getInitialValues = (params) => {
  if (!params){
    return null;
  }

  const priceTypes = [
    'price',
    'pub_pricePerDayFilter',
    'pub_pricePerWeekFilter',
    'pub_pricePerMonthFilter',
  ];

  const priceTypesEquals = {
    price: 'price',
    pub_pricePerDayFilter: 'pricePerDayFilter',
    pub_pricePerWeekFilter: 'pricePerWeekFilter',
    pub_pricePerMonthFilter: 'pricePerMonthFilter',
  };

  const selectedPrice = priceTypes.find(p => !!params[p]);
  const [minPrice = null, maxPrice = null] = selectedPrice ?
        params[selectedPrice].split(',').map(v => Number.parseInt(v, 10)) :
        [];
  return selectedPrice ? {priceType: priceTypesEquals[selectedPrice], minPrice, maxPrice} : null;
}

const PriceFilter = props => {
  const { showAsPopup, urlQueryParams, ...rest } = props;
  const initialValues = getInitialValues(urlQueryParams);
  return showAsPopup ? <PriceFilterPopup {...rest} initialValues={initialValues}/> : <PriceFilterPlain {...rest} initialValues={initialValues}/>;
};

PriceFilter.defaultProps = {
  showAsPopup: false,
};

PriceFilter.propTypes = {
  showAsPopup: bool,
};

export default PriceFilter;
