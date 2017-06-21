import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './LoginForm.css';

const LoginFormComponent = props => {
  const { form, handleSubmit, submitting, inProgress, intl } = props;

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

  const submitDisabled = submitting || inProgress;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <TextInputField
          type="email"
          name="email"
          id={`${form}.email`}
          label={emailLabel}
          validate={emailRequired}
        />
        <TextInputField
          className={css.password}
          type="password"
          name="password"
          id={`${form}.password`}
          label={passwordLabel}
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
