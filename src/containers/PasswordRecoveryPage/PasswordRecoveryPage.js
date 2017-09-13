import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { recoverPassword, retypeEmail } from './PasswordRecoveryPage.duck';
import { PageLayout, Topbar, InlineTextButton, KeysIcon } from '../../components';
import { PasswordRecoveryForm } from '../../containers';

import css from './PasswordRecoveryPage.css';

const recoveryMessage = submittedEmail => {
  if (submittedEmail) {
    const email = <span className={css.submittedEmail}>{submittedEmail}</span>;
    return <FormattedMessage id="PasswordRecoveryPage.emailSubmittedMessage" values={{ email }} />;
  } else {
    return <FormattedMessage id="PasswordRecoveryPage.forgotPasswordMessage" />;
  }
};

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
    onSubmitEmail,
    onRetypeEmail,
  } = props;

  const title = submittedEmail
    ? <FormattedMessage id="PasswordRecoveryPage.emailSubmittedTitle" />
    : <FormattedMessage id="PasswordRecoveryPage.forgotPasswordTitle" />;

  const message = recoveryMessage(submittedEmail);

  const sendAnotherHelp = (
    <span className={css.emailSubmittedLinkHelp}>
      <FormattedMessage id="PasswordRecoveryPage.sendAnotherHelp" />
    </span>
  );
  const fixEmailHelp = (
    <span className={css.emailSubmittedLinkHelp}>
      <FormattedMessage id="PasswordRecoveryPage.fixEmailHelp" />
    </span>
  );

  const emailSubmittedLinks = (
    <div>
      <p>
        <InlineTextButton
          className={css.emailSubmittedLink}
          onClick={() => onSubmitEmail(submittedEmail)}
        >
          <FormattedMessage id="PasswordRecoveryPage.sendAnother" values={{ sendAnotherHelp }} />
        </InlineTextButton>
      </p>
      <p>
        <InlineTextButton className={css.emailSubmittedLink} onClick={onRetypeEmail}>
          <FormattedMessage id="PasswordRecoveryPage.fixEmail" values={{ fixEmailHelp }} />
        </InlineTextButton>
      </p>
    </div>
  );

  return (
    <PageLayout
      authInfoError={authInfoError}
      logoutError={logoutError}
      title="Request new password"
    >
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
      <div>
        <KeysIcon />
        <h1 className={css.title}>{title}</h1>
        <p>{message}</p>
        {submittedEmail
          ? emailSubmittedLinks
          : <PasswordRecoveryForm
              onSubmit={values => onSubmitEmail(values.email)}
              initialValues={{ email: initialEmail }}
            />}
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
  onSubmitEmail: func.isRequired,
  onRetypeEmail: func.isRequired,

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
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onChange: () => dispatch(clearRecoveryError()),
  onSubmitEmail: email => dispatch(recoverPassword(email)),
  onRetypeEmail: () => dispatch(retypeEmail()),
});

const PasswordRecoveryPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  PasswordRecoveryPageComponent
);

export default PasswordRecoveryPage;
