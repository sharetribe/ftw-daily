import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, Input } from '../../components';

const PasswordForgottenForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Field name="email" component={Input.fieldComponent} type="email" />
      <p>We will send you instructions to your email.</p>
      <Button type="submit" disabled={pristine || submitting}>Send</Button>
    </form>
  );
};

PasswordForgottenForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'passwordForgotten' })(PasswordForgottenForm);
