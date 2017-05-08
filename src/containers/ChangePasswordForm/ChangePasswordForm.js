import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, Input } from '../../components';

const ChangePasswordForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword1">New password</label>
      <Field name="newPassword1" component={Input.fieldComponent} type="password" />
      <label htmlFor="newPassword2">New password, again</label>
      <Field name="newPassword2" component={Input.fieldComponent} type="password" />
      <Button type="submit" disabled={pristine || submitting}>Change password</Button>
    </form>
  );
};

ChangePasswordForm.propTypes = { ...formPropTypes };

const defaultFormName = 'ChangePasswordForm';

export default reduxForm({ form: defaultFormName })(ChangePasswordForm);
