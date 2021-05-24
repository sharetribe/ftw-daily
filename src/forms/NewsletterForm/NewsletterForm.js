import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';
import * as validators from '../../util/validators';

import css from './NewsletterForm.module.css';

const NewsletterFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        form,
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
        <Form
          id="nl-form"
          className={classes}
          onSubmit={async event => {
            await handleSubmit(event)
            form.reset()
          }}
        >
          <div className={css.emailField}>
            {/* <FieldTextInput
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name="newsletterEmail"
              autoComplete="email"
              placeholder={emailPlaceholder}
              validate={validators.composeValidators(emailRequired, emailValid)}
            /> */}
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

NewsletterFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

NewsletterFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const NewsletterForm = compose(injectIntl)(NewsletterFormComponent);
NewsletterForm.displayName = 'LoginForm';

export default NewsletterForm;
