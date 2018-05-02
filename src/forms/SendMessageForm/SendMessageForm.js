import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Form, TextInputField, SecondaryButton } from '../../components';
import { propTypes } from '../../util/types';

import css from './SendMessageForm.css';

const BLUR_TIMEOUT_MS = 100;

const IconSendMessage = () => {
  return (
    <svg
      className={css.sendIcon}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={css.strokeMatter} fill="none" fillRule="evenodd" strokeLinejoin="round">
        <path d="M12.91 1L0 7.003l5.052 2.212z" />
        <path d="M10.75 11.686L5.042 9.222l7.928-8.198z" />
        <path d="M5.417 8.583v4.695l2.273-2.852" />
      </g>
    </svg>
  );
};

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
      inProgress,
      sendMessageError,
      invalid,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const submitInProgress = inProgress;
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
        <div className={css.submitContainer}>
          <div className={css.errorContainer}>
            {sendMessageError ? (
              <p className={css.error}>
                <FormattedMessage id="SendMessageForm.sendFailed" />
              </p>
            ) : null}
          </div>
          <SecondaryButton
            className={css.submitButton}
            inProgress={submitInProgress}
            disabled={submitDisabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <IconSendMessage />
            <FormattedMessage id="SendMessageForm.sendMessage" />
          </SecondaryButton>
        </div>
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
  sendMessageError: null,
};

SendMessageFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  inProgress: bool,

  messagePlaceholder: string,
  onFocus: func,
  onBlur: func,
  sendMessageError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'SendMessageForm';

const SendMessageForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  SendMessageFormComponent
);

SendMessageForm.displayName = 'SendMessageForm';

export default SendMessageForm;
