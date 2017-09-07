import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as propTypes from '../../util/propTypes';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { recoverPassword } from './PasswordRecoveryPage.duck';
import { PageLayout, Topbar } from '../../components';
import { PasswordRecoveryForm } from '../../containers';

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
    recoveryInProgress,
    recoveryError,
    onSubmitEmail,
  } = props;

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
      <PasswordRecoveryForm onSubmit={values => onSubmitEmail(values.email)} />
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
  recoveryInProgress: bool.isRequired,
  recoveryError: instanceOf(Error),
  onSubmitEmail: func.isRequired,

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
});

const PasswordRecoveryPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  PasswordRecoveryPageComponent
);

export default PasswordRecoveryPage;
