import React from 'react';
import { string, bool, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { injectIntl, intlShape } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import { propTypes } from '../../util/types';
import { FieldTextInput, PrimaryButton, Form } from '../../components';
import css from './ContactForm.module.css';

const ContactUsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const { formId, handleSubmit, onChange, intl, values, error2, form } = formRenderProps;

      const emailPlaceholder = intl.formatMessage({
        id: 'InviteForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'LoginForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'LoginForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      const messageRequiredMessage = intl.formatMessage({
        id: 'EnquiryForm.messageRequired',
      });
      const messageRequired = validators.requiredAndNonEmptyString(
        messageRequiredMessage
      );
      return (
        <>
          <div className={css.mainContactWrap}>
            <div className={css.contactBox}>
              <div className={css.headingBox}>
                <h1>Contact Us</h1>
                <h3>Get in touch with real people</h3>
                <p>We will respond to you by email or you can provide us with a phone number if you prefer.</p>
              </div>
              <div className={css.contactFields}>
                <Form
                  onSubmit={e => {
                    handleSubmit(e);
                    form.reset();
                    onChange(e);
                  }}
                  enforcePagePreloadFor="OrderDetailsPage"
                >
                  <FieldTextInput
                    className={css.inputForm}
                    type="email"
                    id={formId ? `${formId}.email` : 'email'}
                    name="email"
                    autoComplete="email"
                    label={'Email *'}
                    placeholder='Enter your email'
                  //validate={validators.composeValidators(emailRequired, emailValid)}
                  />
                  <FieldTextInput
                    className={css.inputForm}
                    type="textarea"
                    name="message"
                    id={formId ? `${formId}.message` : 'message'}
                    label={'Message *'}
                    placeholder='Enter your message..'
                  //validate={messageRequired}
                  />
                  <div className={css.submitButton}>
                    <button
                      type="submit"
                      className={!values.email || !values.message ? css.disableButton : null}
                      disabled={!values.email || !values.message}>Submit</button>
                  </div>

                  {/* <PrimaryButton
            type="submit"
            disabled={!values.email || !values.message}
          >
            Send
          </PrimaryButton> */}
                </Form>
              </div>
            </div>
          </div>
        </>
      );
    }}
  />
);

ContactUsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  inProgress: false,
  sendEnquiryError: null,
};

ContactUsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  onSubmit: func.isRequired,
  submitButtonWrapperClassName: string,
  inProgress: bool,
  sendEnquiryError: propTypes.error,
  // from injectIntl
  intl: intlShape.isRequired,
};

const ContactUsForm = compose(injectIntl)(ContactUsFormComponent);

ContactUsForm.displayName = 'ContactUsForm';

export default ContactUsForm;