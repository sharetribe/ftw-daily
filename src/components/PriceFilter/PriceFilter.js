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
    'pub_pricePerDay',
    'pub_pricePerWeek',
    'pub_pricePerMonth',
  ];

  const priceTypesEquals = {
    price: 'price',
    pub_pricePerDay: 'pricePerDay',
    pub_pricePerWeek: 'pricePerWeek',
    pub_pricePerMonth: 'pricePerMonth',
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
