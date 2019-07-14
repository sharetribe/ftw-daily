import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilter from './SelectMultipleFilter';
import { stringify, parse } from '../../util/urlHelpers';

const URL_PARAM = 'pub_amenities';

const options = [
  {
    key: 'first_aid',
    label: 'First Aid',
  },
  {
    key: 'own_transport',
    label: 'Own Transport',
  },
  {
    key: 'non_smoker',
    label: 'Non Smoker',
  },
  {
    key: 'new_borns',
    label: 'New Borns',
  },
  {
    key: 'qualifications',
    label: 'Qualifications',
  },
  {
    key: 'overnights',
    label: 'Overnights',
  },
  {
    key: 'evenings',
    label: 'Evenings',
  },
  {
    key: 'mornings',
    label: 'Mornings',
  },
  {
    key: 'all_day',
    label: 'All Day',
  },
];

const handleSubmit = (urlParam, values, history) => {
  console.log('Submitting values', values);
  const queryParams = values ? `?${stringify({ [urlParam]: values.join(',') })}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const AmenitiesFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params[URL_PARAM];
  const initialValues = !!amenities ? amenities.split(',') : [];

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPopupExample"
      name="amenities"
      urlParam={URL_PARAM}
      label="Amenities"
      onSubmit={(urlParam, values) => handleSubmit(urlParam, values, history)}
      showAsPopup={true}
      liveEdit={false}
      options={options}
      initialValues={initialValues}
      contentPlacementOffset={-14}
    />
  );
});

export const AmenitiesFilterPopupExample = {
  component: AmenitiesFilterPopup,
  props: {},
  group: 'filters',
};

const AmenitiesFilterPlain = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params[URL_PARAM];
  const initialValues = !!amenities ? amenities.split(',') : [];

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPlainExample"
      name="amenities"
      urlParam={URL_PARAM}
      label="Amenities"
      onSubmit={(urlParam, values) => {
        handleSubmit(urlParam, values, history);
      }}
      showAsPopup={false}
      liveEdit={true}
      options={options}
      initialValues={initialValues}
    />
  );
});

export const AmenitiesFilterPlainExample = {
  component: AmenitiesFilterPlain,
  props: {},
  group: 'filters',
};
