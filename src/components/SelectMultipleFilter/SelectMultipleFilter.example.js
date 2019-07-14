import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilter from './SelectMultipleFilter';
import { stringify, parse } from '../../util/urlHelpers';

const URL_PARAM = 'pub_filters';

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

const FiltersFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const filters = params[URL_PARAM];
  const initialValues = !!filters ? filters.split(',') : [];

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPopupExample"
      name="filters"
      urlParam={URL_PARAM}
      label="Filters"
      onSubmit={(urlParam, values) => handleSubmit(urlParam, values, history)}
      showAsPopup={true}
      liveEdit={false}
      options={options}
      initialValues={initialValues}
      contentPlacementOffset={-14}
    />
  );
});

export const FiltersFilterPopupExample = {
  component: FiltersFilterPopup,
  props: {},
  group: 'filters',
};

const FiltersFilterPlain = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const filters = params[URL_PARAM];
  const initialValues = !!filters ? filters.split(',') : [];

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPlainExample"
      name="filters"
      urlParam={URL_PARAM}
      label="Filters"
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

export const FiltersFilterPlainExample = {
  component: FiltersFilterPlain,
  props: {},
  group: 'filters',
};
