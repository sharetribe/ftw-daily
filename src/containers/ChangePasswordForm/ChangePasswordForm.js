import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';

const ChangePasswordForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword1">New password</label>
      <Field name="newPassword1" component="input" type="password" />
      <label htmlFor="newPassword2">New password, again</label>
      <Field name="newPassword2" component="input" type="password" />
      <button type="submit" disabled={pristine || submitting}>Change password</button>
    </form>
  );
};

ChangePasswordForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'changePassword' })(ChangePasswordForm);
