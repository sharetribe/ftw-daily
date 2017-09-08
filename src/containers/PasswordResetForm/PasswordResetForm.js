import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { PrimaryButton, TextInputField } from '../../components';
import * as validators from '../../util/validators';

import css from './PasswordResetForm.css';

const PasswordResetFormComponent = props => {
  const {
    rootClassName,
    className,
    form,
    handleSubmit,
    submitting,
    inProgress,
    intl,
    invalid,
  } = props;

  // password
  const passwordLabel = intl.formatMessage({
    id: 'PasswordResetForm.passwordLabel',
  });
  const passwordPlaceholder = intl.formatMessage({
    id: 'PasswordResetForm.passwordPlaceholder',
  });
  const passwordRequiredMessage = intl.formatMessage({
    id: 'PasswordResetForm.passwordRequired',
  });
  const passwordRequired = validators.required(passwordRequiredMessage);

  const classes = classNames(rootClassName || css.root, className);
  const submitDisabled = invalid || submitting || inProgress;

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <TextInputField
        className={css.passwordInput}
        type="password"
        name="password"
        id={`${form}.password`}
        label={passwordLabel}
        placeholder={passwordPlaceholder}
        validate={passwordRequired}
      />
      <PrimaryButton className={css.submitButton} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="PasswordResetForm.submitButtonText" />
      </PrimaryButton>
    </form>
  );
};

PasswordResetFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

PasswordResetFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const defaultFormName = 'PasswordResetForm';

const PasswordResetForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  PasswordResetFormComponent
);

export default PasswordResetForm;
