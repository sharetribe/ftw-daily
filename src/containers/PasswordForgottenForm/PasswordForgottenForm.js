import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Input } from '../../components';

const PasswordForgottenForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Field name="email" component={Input.fieldComponent} type="email" />
      <p>We will send you instructions to your email.</p>
      <button type="submit" disabled={pristine || submitting}>Send</button>
    </form>
  );
};

PasswordForgottenForm.propTypes = { ...formPropTypes };

const defaultFormName = 'PasswordForgottenForm';

export default reduxForm({ form: defaultFormName })(PasswordForgottenForm);
