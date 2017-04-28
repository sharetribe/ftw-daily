import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, LabeledField } from '../../components';

import css from './LoginForm.css';

const LoginFormComponent = props => {
  const { handleSubmit, pristine, submitting, inProgress, intl } = props;
  const emailLabel = intl.formatMessage({
    id: 'LoginForm.emailLabel',
  });
  const passwordLabel = intl.formatMessage({
    id: 'LoginForm.passwordLabel',
  });
  const submitDisabled = pristine || submitting || inProgress;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <div className={css.row}>
          <LabeledField name="email" type="email" label={emailLabel} />
        </div>
        <div className={css.row}>
          <LabeledField name="password" type="password" label={passwordLabel} />
        </div>
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

const formName = 'LoginForm';

const LoginForm = compose(reduxForm({ form: formName }), injectIntl)(LoginFormComponent);

export default LoginForm;
