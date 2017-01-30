import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';

const ChangeAccountPasswordForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword1">New password</label>
      <Field name="newPassword1" component="input" type="password" />
      <label htmlFor="newPassword2">New password, again</label>
      <Field name="newPassword2" component="input" type="password" />
      <label htmlFor="password">Current password</label>
      <Field name="password" component="input" type="password" />
      <p>Delete account (module)</p>
      <button type="submit" disabled={pristine || submitting}>Save changes</button>
    </form>
  );
};

ChangeAccountPasswordForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'changeAccountPassword' })(ChangeAccountPasswordForm);
