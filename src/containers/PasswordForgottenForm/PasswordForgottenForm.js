import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';

const PasswordForgottenForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email" />
      <p>We will send you instructions to your email.</p>
      <button type="submit" disabled={pristine || submitting}>Send</button>
    </form>
  );
};

PasswordForgottenForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'passwordForgotten' })(PasswordForgottenForm)
