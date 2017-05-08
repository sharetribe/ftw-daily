import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import * as validators from '../../util/validators';
import { enhancedField } from '../../util/forms';

import css from './LoginForm.css';

class LoginFormComponent extends Component {
  constructor(props) {
    super(props);
    this.EnhancedInput = enhancedField('input', {
      errorClassName: css.error,
    });
  }
  render() {
    const { handleSubmit, pristine, submitting, inProgress, intl } = this.props;

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
            component={this.EnhancedInput}
            validate={emailRequired}
          />
          <Field
            name="password"
            type="password"
            label={passwordLabel}
            component={this.EnhancedInput}
            validate={passwordRequired}
          />
        </div>
        <Button className={css.button} type="submit" disabled={submitDisabled}>
          <FormattedMessage id="LoginForm.logIn" />
        </Button>
      </form>
    );
  }
}

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
