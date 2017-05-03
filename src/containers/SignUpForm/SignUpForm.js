import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button, LabeledField } from '../../components';

import css from './SignupForm.css';

const SignupFormComponent = props => {
  const { handleSubmit, pristine, submitting, inProgress, intl } = props;
  const emailLabel = intl.formatMessage({
    id: 'SignupForm.emailLabel',
  });
  const passwordLabel = intl.formatMessage({
    id: 'SignupForm.passwordLabel',
  });
  const firstNameLabel = intl.formatMessage({
    id: 'SignupForm.firstNameLabel',
  });
  const lastNameLabel = intl.formatMessage({
    id: 'SignupForm.lastNameLabel',
  });
  const submitDisabled = pristine || submitting || inProgress;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <div className={css.row}>
          <LabeledField name="email" type="email" label={emailLabel} />
        </div>
        <div className={css.row}>
          <LabeledField name="firstName" label={firstNameLabel} />
        </div>
        <div className={css.row}>
          <LabeledField name="lastName" label={lastNameLabel} />
        </div>
        <div className={css.row}>
          <LabeledField name="password" type="password" label={passwordLabel} />
        </div>
      </div>
      <Button className={css.button} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="SignupForm.signUp" />
      </Button>
    </form>
  );
};

SignupFormComponent.defaultProps = { inProgress: false };

const { bool } = PropTypes;

SignupFormComponent.propTypes = {
  ...formPropTypes,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const formName = 'SignupForm';

const SignupForm = compose(reduxForm({ form: formName }), injectIntl)(SignupFormComponent);

export default SignupForm;
