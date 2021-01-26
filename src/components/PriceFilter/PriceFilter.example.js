import React from 'react';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from '../../util/urlHelpers';

import PriceFilter from './PriceFilter';

const URL_PARAM = 'pub_price';
const RADIX = 10;

// Helper for submitting example
const handleSubmit = (urlParam, values, history) => {
  const { minPrice, maxPrice } = values || {};
  const queryParams =
    minPrice != null && maxPrice != null
      ? `?${stringify({ [urlParam]: [minPrice, maxPrice].join(',') })}`
      : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const PriceFilterWrapper = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const price = params[URL_PARAM];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];
  const initialValues = !!price
    ? {
        minPrice: valuesFromParams[0],
        maxPrice: valuesFromParams[1],
      }
    : null;

  return (
    <PriceFilter
      {...props}
      initialValues={initialValues}
      onSubmit={(urlParam, values) => {
        console.log('Submit PriceFilterForm with (unformatted) values:', values);
        handleSubmit(urlParam, values, history);
      }}
    />
  );
});

export const PriceFilterPopup = {
  component: PriceFilterWrapper,
  props: {
    id: 'PriceFilterPopupExample',
    urlParam: URL_PARAM,
    min: 0,
    max: 1000,
    step: 5,
    liveEdit: false,
    showAsPopup: true,
    contentPlacementOffset: -14,
    // initialValues: handled inside wrapper
    // onSubmit: handled inside wrapper
  },
  group: 'misc',
};

export const PriceFilterPlain = {
  component: PriceFilterWrapper,
  props: {
    id: 'PriceFilterPlainExample',
    urlParam: URL_PARAM,
    min: 0,
    max: 1000,
    step: 5,
    liveEdit: true,
    showAsPopup: false,
    contentPlacementOffset: -14,
    // initialValues: handled inside wrapper
    // onSubmit: handled inside wrapper
  },
  group: 'misc',
};
