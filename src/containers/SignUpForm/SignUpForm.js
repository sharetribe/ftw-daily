import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';

const SignUpForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email" />
      <label htmlFor="firstName">First name</label>
      <Field name="firstName" component="input" />
      <label htmlFor="lastName">Last name</label>
      <Field name="lastName" component="input" />
      <label htmlFor="password">Password</label>
      <Field name="password" component="input" type="password" />
      <p>By confirming I accept the booking terms and conditions.</p>
      <Button type="submit" disabled={pristine || submitting}>Sign up</Button>
    </form>
  );
};

SignUpForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'signup' })(SignUpForm);
