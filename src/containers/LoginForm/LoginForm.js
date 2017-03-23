import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email" />
      <label htmlFor="password">Password</label>
      <Field name="password" component="input" type="password" />
      <p>Forgot password?</p>
      <Button type="submit" disabled={pristine || submitting}>Log in</Button>
    </form>
  );
};

LoginForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'login' })(LoginForm);
