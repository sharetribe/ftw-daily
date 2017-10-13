import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  isPasswordRecoveryEmailNotFoundError,
  isPasswordRecoveryEmailNotVerifiedError,
} from '../../util/errors';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  recoverPassword,
  retypePasswordRecoveryEmail,
  clearPasswordRecoveryError,
} from './PasswordRecoveryPage.duck';
import { Page, InlineTextButton, IconKeys } from '../../components';
import { PasswordRecoveryForm, TopbarContainer } from '../../containers';

import DoorIcon from './DoorIcon';
import css from './PasswordRecoveryPage.css';

export const PasswordRecoveryPageComponent = props => {
  const {
    authInfoError,
    logoutError,
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
    onChange,
    onSubmitEmail,
    onRetypeEmail,
    intl,
  } = props;

  const title = intl.formatMessage({
    id: 'PasswordRecoveryPage.title',
  });

  const resendEmailLink = (
    <InlineTextButton className={css.helperLink} onClick={() => onSubmitEmail(submittedEmail)}>
      <FormattedMessage id="PasswordRecoveryPage.resendEmailLinkText" />
    </InlineTextButton>
  );

  const fixEmailLink = (
    <InlineTextButton className={css.helperLink} onClick={onRetypeEmail}>
      <FormattedMessage id="PasswordRecoveryPage.fixEmailLinkText" />
    </InlineTextButton>
  );

  const submitEmailContent = (
    <div className={css.submitEmailContent}>
      <IconKeys className={css.modalIcon} />
      <h1 className={css.modalTitle}>
        <FormattedMessage id="PasswordRecoveryPage.forgotPasswordTitle" />
      </h1>
      <p className={css.modalMessage}>
        <FormattedMessage id="PasswordRecoveryPage.forgotPasswordMessage" />
      </p>
      <PasswordRecoveryForm
        inProgress={recoveryInProgress}
        onChange={onChange}
        onSubmit={values => onSubmitEmail(values.email)}
        initialValues={{ email: initialEmail }}
        recoveryError={recoveryError}
      />
    </div>
  );

  const submittedEmailText = passwordRequested ? (
    <span className={css.email}>{initialEmail}</span>
  ) : (
    <span className={css.email}>{submittedEmail}</span>
  );

  const emailSubmittedContent = (
    <div className={css.emailSubmittedContent}>
      <IconKeys className={css.modalIcon} />
      <h1 className={css.modalTitle}>
        <FormattedMessage id="PasswordRecoveryPage.emailSubmittedTitle" />
      </h1>
      <p className={css.modalMessage}>
        <FormattedMessage
          id="PasswordRecoveryPage.emailSubmittedMessage"
          values={{ submittedEmailText }}
        />
      </p>
      <div className={css.bottomWrapper}>
        <p className={css.helperText}>
          {recoveryInProgress ? (
            <FormattedMessage id="PasswordRecoveryPage.resendingEmailInfo" />
          ) : (
            <FormattedMessage
              id="PasswordRecoveryPage.resendEmailInfo"
              values={{ resendEmailLink }}
            />
          )}
        </p>
        <p className={css.helperText}>
          <FormattedMessage id="PasswordRecoveryPage.fixEmailInfo" values={{ fixEmailLink }} />
        </p>
      </div>
    </div>
  );

  const initialEmailText = <span className={css.email}>{initialEmail}</span>;
  const emailNotVerifiedContent = (
    <div className={css.emailNotVerifiedContent}>
      <DoorIcon className={css.modalIcon} />
      <h1 className={css.modalTitle}>
        <FormattedMessage id="PasswordRecoveryPage.emailNotVerifiedTitle" />
      </h1>
      <p className={css.modalMessage}>
        <FormattedMessage
          id="PasswordRecoveryPage.emailNotVerifiedMessage"
          values={{ initialEmailText }}
        />
      </p>
      <p className={css.modalMessage}>
        <FormattedMessage id="PasswordRecoveryPage.emailNotVerifiedContactAdmin" />
      </p>
    </div>
  );

  const genericErrorContent = (
    <div className={css.genericErrorContent}>
      <IconKeys className={css.modalIcon} />
      <h1 className={css.modalTitle}>
        <FormattedMessage id="PasswordRecoveryPage.actionFailedTitle" />
      </h1>
      <p className={css.modalMessage}>
        <FormattedMessage id="PasswordRecoveryPage.actionFailedMessage" />
      </p>
    </div>
  );

  let content;
  if (isPasswordRecoveryEmailNotVerifiedError(recoveryError)) {
    content = emailNotVerifiedContent;
  } else if (isPasswordRecoveryEmailNotFoundError(recoveryError)) {
    content = submitEmailContent;
  } else if (recoveryError) {
    content = genericErrorContent;
  } else if (submittedEmail || passwordRequested) {
    content = emailSubmittedContent;
  } else {
    content = submitEmailContent;
  }

  return (
    <Page authInfoError={authInfoError} logoutError={logoutError} title={title}>
      <TopbarContainer />
      <div className={css.root}>{content}</div>
    </Page>
  );
};

PasswordRecoveryPageComponent.defaultProps = {
  authInfoError: null,
  logoutError: null,
  sendVerificationEmailError: null,
  initialEmail: null,
  submittedEmail: null,
  recoveryError: null,
};

const { bool, func, instanceOf, string } = PropTypes;

PasswordRecoveryPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  initialEmail: string,
  submittedEmail: string,
  recoveryError: instanceOf(Error),
  recoveryInProgress: bool.isRequired,
  passwordRequested: bool.isRequired,
  onChange: func.isRequired,
  onSubmitEmail: func.isRequired,
  onRetypeEmail: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError
  const { authInfoError, logoutError } = state.Auth;

  const {
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
  } = state.PasswordRecoveryPage;
  return {
    authInfoError,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(clearPasswordRecoveryError()),
  onSubmitEmail: email => dispatch(recoverPassword(email)),
  onRetypeEmail: () => dispatch(retypePasswordRecoveryEmail()),
});

const PasswordRecoveryPage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  PasswordRecoveryPageComponent
);

export default PasswordRecoveryPage;
