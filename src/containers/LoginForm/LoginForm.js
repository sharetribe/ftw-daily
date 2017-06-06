import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { InputField, Button } from '../../components';
import * as validators from '../../util/validators';

import css from './LoginForm.css';

const LoginFormComponent = props => {
  const { handleSubmit, pristine, submitting, inProgress, intl } = props;

  // email
  const emailLabel = intl.formatMessage({
    id: 'LoginForm.emailLabel',
  });
  const emailRequiredMessage = intl.formatMessage({
    id: 'LoginForm.emailRequired',
  });
  const emailRequired = validators.required(emailRequiredMessage);

  // password
  const passwordLabel = intl.formatMessage({
    id: 'LoginForm.passwordLabel',
  });
  const passwordRequiredMessage = intl.formatMessage({
    id: 'LoginForm.passwordRequired',
  });
  const passwordRequired = validators.required(passwordRequiredMessage);

  const submitDisabled = pristine || submitting || inProgress;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <Field
          name="email"
          type="email"
          label={emailLabel}
          component={InputField}
          validate={emailRequired}
        />
        <Field
          name="password"
          type="password"
          label={passwordLabel}
          component={InputField}
          validate={passwordRequired}
        />
      </div>
      <Button className={css.button} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="LoginForm.logIn" />
      </Button>
    </form>
  );
};

LoginFormComponent.defaultProps = { inProgress: false };

const { bool } = PropTypes;

LoginFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const defaultFormName = 'LoginForm';

const LoginForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(LoginFormComponent);

export default LoginForm;
