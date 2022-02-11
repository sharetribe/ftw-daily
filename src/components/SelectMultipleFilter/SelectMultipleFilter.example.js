import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilter from './SelectMultipleFilter';
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

const handleSubmit = (values, history) => {
  console.log('Submitting values', values);
  const queryParams = values ? `?${stringify(values)}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const AmenitiesFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params[URL_PARAM];
  const initialValues = { [URL_PARAM]: !!amenities ? amenities : null };

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPopupExample"
      name="amenities"
      queryParamNames={[URL_PARAM]}
      label="Amenities"
      onSubmit={values => handleSubmit(values, history)}
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
  const initialValues = { [URL_PARAM]: !!amenities ? amenities : null };

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPlainExample"
      name="amenities"
      queryParamNames={[URL_PARAM]}
      label="Amenities"
      onSubmit={values => {
        handleSubmit(values, history);
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
