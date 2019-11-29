import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { IconEdit, IconSuccess, PrimaryButton, InlineTextButton } from '../../components';
import css from './StripeVerificationStatusBox.css';

const STATUS_VERIFICATION_NEEDED = 'verificationNeeded';
const STATUS_VERIFICATION_SUCCESS = 'verificationSuccess';
const STATUS_VERIFICATION_ERROR = 'verificationError';

const StripeVerificationStatusBox = props => {
  const { type, onGetVerificationLink, getVerificationLinkParams } = props;

  if (type === STATUS_VERIFICATION_NEEDED) {
    return (
      <div className={classNames(css.verificiationBox, css.verficiationNeededBox)}>
        <div className={css.verificiationBoxTextWrapper}>
          <div className={css.verificationBoxTitle}>
            <FormattedMessage id="StripeVerificationStatusBox.verificationNeededTitle" />
          </div>
          <div className={css.verificationBoxText}>
            <FormattedMessage id="StripeVerificationStatusBox.verificationNeededText" />
          </div>
        </div>

        <PrimaryButton
          className={css.getVerifiedButton}
          type="button"
          onClick={() => onGetVerificationLink(getVerificationLinkParams)}
        >
          <FormattedMessage id="StripeVerificationStatusBox.getVerifiedButton" />
        </PrimaryButton>
      </div>
    );
  } else if (type === STATUS_VERIFICATION_SUCCESS) {
    return (
      <div className={classNames(css.verificiationBox, css.verficiationSuccessBox)}>
        <div
          className={classNames(
            css.verificiationBoxTextWrapper,
            css.verificationBoxSuccessTextWrapper
          )}
        >
          <div className={css.verificationBoxTitle}>
            <IconSuccess className={css.icon} />
            <FormattedMessage id="StripeVerificationStatusBox.verificationSuccessTitle" />
          </div>
        </div>

        <InlineTextButton
          className={css.editVerificationButton}
          type="button"
          onClick={() => onGetVerificationLink(getVerificationLinkParams)}
        >
          <IconEdit className={css.icon} pencilClassName={css.iconEditPencil} />
          <FormattedMessage id="StripeVerificationStatusBox.editAccountButton" />
        </InlineTextButton>
      </div>
    );
  } else if (type === STATUS_VERIFICATION_ERROR) {
    return (
      <div className={classNames(css.verificiationBox, css.verficiationErrorBox)}>
        <div className={css.verificiationBoxTextWrapper}>
          <div className={css.verificationBoxTitle}>
            <FormattedMessage id="StripeVerificationStatusBox.verificationFailedTitle" />
          </div>
          <div className={css.verificationBoxText}>
            <FormattedMessage id="StripeVerificationStatusBox.verificationFailedText" />
          </div>
        </div>

        <PrimaryButton
          className={css.getVerifiedButton}
          type="button"
          onClick={() => onGetVerificationLink(getVerificationLinkParams)}
        >
          <FormattedMessage id="StripeVerificationStatusBox.getVerifiedButton" />
        </PrimaryButton>
      </div>
    );
  } else {
    console.error('Unknown type ', type, 'for StripeVerificationStatusBox');
  }
};

export default StripeVerificationStatusBox;
