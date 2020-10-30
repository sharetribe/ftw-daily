import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';
import * as validators from '../../util/validators';

import css from './NewsletterForm.css';

const LoginFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        intl,
        invalid,
      } = fieldRenderProps;

      // email
      const emailPlaceholder = intl.formatMessage({
        id: 'NewsletterForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'NewsletterForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'NewsletterForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <div className={css.emailField}>
            <FieldTextInput
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name="newsletterEmail"
              autoComplete="email"
              placeholder={emailPlaceholder}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
          </div>
          <div className={css.formBtn}>
            <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
              <FormattedMessage id="NewsletterForm.subscribe" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

LoginFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

LoginFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const LoginForm = compose(injectIntl)(LoginFormComponent);
LoginForm.displayName = 'LoginForm';

export default LoginForm;
