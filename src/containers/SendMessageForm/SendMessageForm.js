import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Form, TextInputField, SecondaryButton } from '../../components';

import css from './SendMessageForm.css';

const BLUR_TIMEOUT_MS = 100;

class SendMessageFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.blurTimeoutId = null;
  }
  handleFocus() {
    this.props.onFocus();
    window.clearTimeout(this.blurTimeoutId);
  }
  handleBlur() {
    // We only trigger a blur if another focus event doesn't come
    // within a timeout. This enables keeping the focus synced when
    // focus is switched between the message area and the submit
    // button.
    this.blurTimeoutId = window.setTimeout(() => {
      this.props.onBlur();
    }, BLUR_TIMEOUT_MS);
  }
  render() {
    const {
      rootClassName,
      className,
      messagePlaceholder,
      form,
      handleSubmit,
      submitting,
      inProgress,
      invalid,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const submitInProgress = submitting || inProgress;
    const submitDisabled = invalid || submitInProgress;

    return (
      <Form className={classes} onSubmit={handleSubmit}>
        <TextInputField
          inputRootClass={css.textarea}
          type="textarea"
          id={`${form}.message`}
          name="message"
          placeholder={messagePlaceholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <SecondaryButton
          className={css.submitButton}
          inProgress={submitInProgress}
          disabled={submitDisabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          <FormattedMessage id="SendMessageForm.sendMessage" />
        </SecondaryButton>
      </Form>
    );
  }
}

SendMessageFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
  messagePlaceholder: null,
  onFocus: () => null,
  onBlur: () => null,
};

SendMessageFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  inProgress: bool,

  messagePlaceholder: string,
  onFocus: func,
  onBlur: func,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'SendMessageForm';

const SendMessageForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  SendMessageFormComponent
);

export default SendMessageForm;
