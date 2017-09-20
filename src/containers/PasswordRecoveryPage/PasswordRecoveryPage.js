import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import {
  isPasswordRecoveryEmailNotFoundError,
  isPasswordRecoveryEmailNotVerifiedError,
} from '../../util/errors';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  recoverPassword,
  retypePasswordRecoveryEmail,
  clearPasswordRecoveryError,
} from './PasswordRecoveryPage.duck';
import { PageLayout, Topbar, InlineTextButton, IconKeys } from '../../components';
import { PasswordRecoveryForm } from '../../containers';

import DoorIcon from './DoorIcon';
import css from './PasswordRecoveryPage.css';

export const PasswordRecoveryPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    history,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
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
    <InlineTextButton className={css.bottomLink} onClick={() => onSubmitEmail(submittedEmail)}>
      <FormattedMessage id="PasswordRecoveryPage.resendEmailLinkText" />
    </InlineTextButton>
  );

  const fixEmailLink = (
    <InlineTextButton className={css.bottomLink} onClick={onRetypeEmail}>
      <FormattedMessage id="PasswordRecoveryPage.fixEmailLinkText" />
    </InlineTextButton>
  );

  const submitEmailContent = (
    <div className={css.submitEmailContent}>
      <IconKeys />
      <h1 className={css.title}>
        <FormattedMessage id="PasswordRecoveryPage.forgotPasswordTitle" />
      </h1>
      <p className={css.message}>
        <FormattedMessage id="PasswordRecoveryPage.forgotPasswordMessage" />
      </p>
      <PasswordRecoveryForm
        onChange={onChange}
        onSubmit={values => onSubmitEmail(values.email)}
        initialValues={{ email: initialEmail }}
        recoveryError={recoveryError}
      />
    </div>
  );

  const submittedEmailText = passwordRequested
    ? <span className={css.submittedEmail}>{initialEmail}</span>
    : <span className={css.submittedEmail}>{submittedEmail}</span>;

  const emailSubmittedContent = (
    <div className={css.emailSubmittedContent}>
      <IconKeys />
      <h1 className={css.title}>
        <FormattedMessage id="PasswordRecoveryPage.emailSubmittedTitle" />
      </h1>
      <p className={css.message}>
        <FormattedMessage
          id="PasswordRecoveryPage.emailSubmittedMessage"
          values={{ submittedEmailText }}
        />
      </p>
      <div className={css.bottomWrapper}>
        <p className={css.bottomInfo}>
          {recoveryInProgress
            ? <FormattedMessage id="PasswordRecoveryPage.resendingEmailInfo" />
            : <FormattedMessage
                id="PasswordRecoveryPage.resendEmailInfo"
                values={{ resendEmailLink }}
              />}
        </p>
        <p className={css.bottomInfo}>
          <FormattedMessage id="PasswordRecoveryPage.fixEmailInfo" values={{ fixEmailLink }} />
        </p>
      </div>
    </div>
  );

  const initialEmailText = <span className={css.submittedEmail}>{initialEmail}</span>;
  const emailNotVerifiedContent = (
    <div className={css.emailNotVerifiedContent}>
      <DoorIcon />
      <h1 className={css.title}>
        <FormattedMessage id="PasswordRecoveryPage.emailNotVerifiedTitle" />
      </h1>
      <p className={css.message}>
        <FormattedMessage
          id="PasswordRecoveryPage.emailNotVerifiedMessage"
          values={{ initialEmailText }}
        />
      </p>
      <p className={css.emailNotVerifiedBottomText}>
        <FormattedMessage id="PasswordRecoveryPage.emailNotVerifiedContactAdmin" />
      </p>
    </div>
  );

  const genericErrorContent = (
    <div className={css.genericErrorContent}>
      <IconKeys />
      <h1 className={css.title}>
        <FormattedMessage id="PasswordRecoveryPage.actionFailedTitle" />
      </h1>
      <p>
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
    <PageLayout authInfoError={authInfoError} logoutError={logoutError} title={title}>
      <Topbar
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentUserHasOrders={currentUserHasOrders}
        history={history}
        isAuthenticated={isAuthenticated}
        location={location}
        notificationCount={notificationCount}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
        onResendVerificationEmail={onResendVerificationEmail}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
      />
      <div className={css.root}>
        {content}
      </div>

    </PageLayout>
  );
};

PasswordRecoveryPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
  initialEmail: null,
  submittedEmail: null,
  recoveryError: null,
};

const { bool, func, instanceOf, number, object, shape, string } = PropTypes;

PasswordRecoveryPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,
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

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,
};

const mapStateToProps = state => {
  // PageLayout needs authInfoError and logoutError, Topbar needs isAuthenticated
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  // Topbar needs user info.
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;

  const {
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
  } = state.PasswordRecoveryPage;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    isAuthenticated,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    initialEmail,
    submittedEmail,
    recoveryError,
    recoveryInProgress,
    passwordRequested,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onChange: () => dispatch(clearPasswordRecoveryError()),
  onSubmitEmail: email => dispatch(recoverPassword(email)),
  onRetypeEmail: () => dispatch(retypePasswordRecoveryEmail()),
});

const PasswordRecoveryPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl
)(PasswordRecoveryPageComponent);

export default PasswordRecoveryPage;
