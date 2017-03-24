import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, TextFieldOneLiner } from '../../components';

import css from './LoginForm.css';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <div className={css.row}>
          <TextFieldOneLiner name="email" type="email" label="Email" />
        </div>
        <div className={css.row}>
          <TextFieldOneLiner name="password" type="password" label="Password" />
        </div>
      </div>
      <Button className={css.button} type="submit" disabled={pristine || submitting}>Log in</Button>
    </form>
  );
};

LoginForm.propTypes = { ...formPropTypes };

export default reduxForm({ form: 'login' })(LoginForm);
