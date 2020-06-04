import React from 'react';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from '../../util/urlHelpers';

import PriceFilter from './PriceFilter';

const URL_PARAM = 'pub_price';

// Helper for submitting example
const handleSubmit = (values, history) => {
  const queryParams = values ? `?${stringify(values)}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const PriceFilterWrapper = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const price = params[URL_PARAM];
  const initialValues = { [URL_PARAM]: !!price ? price : null };

  return (
    <PriceFilter
      {...props}
      initialValues={initialValues}
      onSubmit={values => {
        console.log('Submit PriceFilterForm with (unformatted) values:', values);
        handleSubmit(values, history);
      }}
    />
  );
});

export const PriceFilterPopup = {
  component: PriceFilterWrapper,
  props: {
    id: 'PriceFilterPopupExample',
    queryParamNames: [URL_PARAM],
    min: 0,
    max: 1000,
    step: 5,
    liveEdit: false,
    showAsPopup: true,
    contentPlacementOffset: -14,
    // initialValues: handled inside wrapper
    // onSubmit: handled inside wrapper
  },
  group: 'filters',
};

export const PriceFilterPlain = {
  component: PriceFilterWrapper,
  props: {
    id: 'PriceFilterPlainExample',
    queryParamNames: [URL_PARAM],
    min: 0,
    max: 1000,
    step: 5,
    liveEdit: true,
    showAsPopup: false,
    contentPlacementOffset: -14,
    // initialValues: handled inside wrapper
    // onSubmit: handled inside wrapper
  },
  group: 'filters',
};
