import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { Form, TextInputField, SecondaryButton, IconSpinner } from '../../components';
import * as propTypes from '../../util/propTypes';

import css from './SendMessageForm.css';

const BLUR_TIMEOUT_MS = 100;

const IconSendMessageMobile = () => {
  return (
    <svg
      className={css.sendIconMobile}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          x="-1.9%"
          y="-8.5%"
          width="103.7%"
          height="113.2%"
          filterUnits="objectBoundingBox"
          id="SendMessageForm_IconSendMessageMobile"
        >
          <feOffset dy="-2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        filter="url(#SendMessageForm_IconSendMessageMobile)"
        transform="translate(-313 -10)"
        fill="#FFF"
        fillRule="evenodd"
      >
        <path d="M317.47 23.048c-.14.05-.237.193-.25.36-.013.163.062.317.19.39l4.623 2.688 12.162-10.593-16.726 7.155zM323.47 27.327l-.97 6.59c0 .228.184.416.417.416.145 0 .284-.076.36-.206l2.94-4.823 4.833 2.894c.118.066.26.067.373.015.12-.055.207-.162.234-.292l3.315-15.328-11.5 10.735z" />
      </g>
    </svg>
  );
};

const IconSendMessageDesktop = () => {
  return (
    <svg
      className={css.sendIconDesktop}
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
      submitting,
      inProgress,
      sendMessageError,
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
        {sendMessageError ? (
          <p className={css.errorMobile}>
            <FormattedMessage id="SendMessageForm.sendFailed" />
          </p>
        ) : null}
        <button
          className={css.submitButtonMobile}
          disabled={submitDisabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {submitInProgress ? (
            <IconSpinner className={css.sendIconMobileInProgress} />
          ) : (
            <IconSendMessageMobile />
          )}
        </button>
        <div className={css.submitContainerDesktop}>
          <div className={css.errorContainerDesktop}>
            {sendMessageError ? (
              <p className={css.errorDesktop}>
                <FormattedMessage id="SendMessageForm.sendFailed" />
              </p>
            ) : null}
          </div>
          <SecondaryButton
            className={css.submitButtonDesktop}
            inProgress={submitInProgress}
            disabled={submitDisabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <IconSendMessageDesktop />
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
