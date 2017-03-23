import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';

const ChangePasswordForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword1">New password</label>
      <Field name="newPassword1" component="input" type="password" />
      <label htmlFor="newPassword2">New password, again</label>
      <Field name="newPassword2" component="input" type="password" />
      <Button type="submit" disabled={pristine || submitting}>Change password</Button>
    </form>
  );
};

ChangePasswordForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'changePassword' })(ChangePasswordForm);
