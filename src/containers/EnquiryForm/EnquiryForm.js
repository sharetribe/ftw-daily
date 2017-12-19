import React from 'react';
import { string, bool } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Form, PrimaryButton, TextInputField, IconEnquiry } from '../../components';
import * as validators from '../../util/validators';

import css from './EnquiryForm.css';

const EnquiryFormComponent = props => {
  const {
    rootClassName,
    className,
    submitButtonWrapperClassName,
    form,
    handleSubmit,
    submitting,
    inProgress,
    intl,
    listingTitle,
    authorDisplayName,
  } = props;

  const messageLabel = intl.formatMessage(
    {
      id: 'EnquiryForm.messageLabel',
    },
    { authorDisplayName }
  );
  const messagePlaceholder = intl.formatMessage(
    {
      id: 'EnquiryForm.messagePlaceholder',
    },
    { authorDisplayName }
  );
  const messageRequiredMessage = intl.formatMessage({
    id: 'EnquiryForm.messageRequired',
  });
  const messageRequired = validators.requiredAndNonEmptyString(messageRequiredMessage);

  const classes = classNames(rootClassName || css.root, className);
  const submitInProgress = submitting || inProgress;
  const submitDisabled = submitInProgress;

  return (
    <Form className={classes} onSubmit={handleSubmit}>
      <IconEnquiry className={css.icon} />
      <h2 className={css.heading}>
        <FormattedMessage id="EnquiryForm.heading" values={{ listingTitle }} />
      </h2>
      <TextInputField
        className={css.field}
        type="textarea"
        name="message"
        id={`${form}.message`}
        label={messageLabel}
        placeholder={messagePlaceholder}
        validate={[messageRequired]}
      />
      <div className={submitButtonWrapperClassName}>
        <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
          <FormattedMessage id="EnquiryForm.submitButtonText" />
        </PrimaryButton>
      </div>
    </Form>
  );
};

EnquiryFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  inProgress: false,
};

EnquiryFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  inProgress: bool,

  listingTitle: string.isRequired,
  authorDisplayName: string.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'EnquiryForm';

const EnquiryForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(EnquiryFormComponent);

export default EnquiryForm;
