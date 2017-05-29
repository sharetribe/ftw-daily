/* eslint-disable no-console */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as validators from '../../util/validators';
import { enhancedField } from '../../util/forms';
import BirthdayInput from './BirthdayInput';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.EnhancedBirthdayInput = enhancedField(BirthdayInput);
  }
  render() {
    const required = validators.required('A valid date is required');
    return (
      <form>
        <Field
          name="birthday"
          label="Date of birth"
          format={null}
          component={this.EnhancedBirthdayInput}
          validate={required}
        />
      </form>
    );
  }
}

const Form = reduxForm({
  form: 'Styleguide.BirthdayInput.Form',
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    onChange: ({ birthday }) => {
      console.log('birthday changed to:', birthday ? birthday.toUTCString() : birthday);
    },
  },
  group: 'inputs',
};
