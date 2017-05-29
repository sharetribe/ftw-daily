import React, { Component } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as propTypes from '../../util/propTypes';
import { Button } from '../../components';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const FormComponent = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="location">Select location:</label>
      <Field name="location" format={null} component={LocationAutocompleteInput} />
      <Button type="submit" disabled={pristine || submitting}>Submit</Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const defaultFormName = 'Styleguide.LocationAutocompleteInput.Form';

const Form = reduxForm({
  form: defaultFormName,
})(FormComponent);

const PlaceInfo = props => {
  const { place } = props;
  const { address, country, origin, bounds } = place;
  return (
    <div>
      <p>Submitted place:</p>
      <ul>
        <li>Address: {address}</li>
        <li>Country: {country || '[no country]'}</li>
        <li>Coordinates: {origin.lat}, {origin.lng}</li>
        <li>Bounds: {bounds ? 'yes' : 'no'}</li>
      </ul>
    </div>
  );
};

PlaceInfo.propTypes = { place: propTypes.place.isRequired };

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { location: {} };
  }
  render() {
    const onSubmit = values => {
      this.setState({ location: values.location });
    };
    const place = this.state.location.selectedPlace;
    return (
      <div>
        <p>
          Search for a place name or address, select on with mouse or keyboard, and submit the form.
        </p>
        <Form onSubmit={onSubmit} />
        {place ? <PlaceInfo place={place} /> : null}
      </div>
    );
  }
}

export const Empty = {
  component: FormContainer,
  group: 'inputs',
};
