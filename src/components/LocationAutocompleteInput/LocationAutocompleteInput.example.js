import React, { Component } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const FormComponent = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="location">Select location:</label>
      <Field name="location" format={null} component={LocationAutocompleteInput} />
      <button type="submit" disabled={pristine || submitting}>Submit</button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const Form = reduxForm({
  form: 'Styleguide.LocationAutocompleteInput.Form',
})(FormComponent);

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
        {place
          ? <p>
              Submitted place: {place.address} (
              {place.origin.lat},
              {place.origin.lng},
              {place.bounds ? ' with' : ' without'} bounds
              )
            </p>
          : null}
      </div>
    );
  }
}

export const Empty = {
  component: FormContainer,
};
