import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilter from './SelectMultipleFilter';
import { stringify, parse } from '../../util/urlHelpers';

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

const handleSubmit = (values, history) => {
  const queryParams = values ? `?${stringify({ pub_amenities: values.join(',') })}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const AmenitiesFilterComponent = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params.pub_amenities;
  const initialValues = !!amenities ? amenities.split(',') : [];

  return (
    <SelectMultipleFilter
      onSubmit={values => handleSubmit(values, history)}
      options={options}
      initialValues={initialValues}
      contentPlacementOffset={-14}
    />
  );
});

export const AmenitiesFilter = {
  component: AmenitiesFilterComponent,
  props: {},
  group: 'misc',
};
