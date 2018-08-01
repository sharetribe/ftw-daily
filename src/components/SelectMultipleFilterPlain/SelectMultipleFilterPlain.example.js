import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilterPlain from './SelectMultipleFilterPlain';
import { stringify, parse } from '../../util/urlHelpers';

const URL_PARAM = 'pub_amenities';

const options = [
  {
    key: 'towels',
    label: 'Towels',
  },
  {
    key: 'bathroom',
    label: 'Bathroom',
  },
  {
    key: 'swimming_pool',
    label: 'Swimming pool',
  },
  {
    key: 'own_drinks',
    label: 'Own drinks allowed',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'audiovisual_entertainment',
    label: 'Audiovisual entertainment',
  },
  {
    key: 'barbeque',
    label: 'Barbeque',
  },
  {
    key: 'own_food_allowed',
    label: 'Own food allowed',
  },
];

const handleSelect = (urlParam, values, history) => {
  console.log(`handle select`, values);
  const queryParams = values ? `?${stringify({ [urlParam]: values.join(',') })}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const AmenitiesFilterComponent = props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params[URL_PARAM];
  const initialValues = !!amenities ? amenities.split(',') : [];

  return (
    <SelectMultipleFilterPlain
      id="SelectMultipleFilterPlainExample"
      name="amenities"
      urlParam={URL_PARAM}
      label="Amenities"
      options={options}
      onSelect={(urlParam, values) => handleSelect(urlParam, values, history)}
      initialValues={initialValues}
    />
  );
};

export const AmenitiesFilter = {
  component: withRouter(AmenitiesFilterComponent),
  props: {},
  group: 'misc',
};
