import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import {
  ContentWrapper,
  LayoutSideNavigation,
  PageLayout,
  SideNavWrapper,
  TabNav,
  Topbar,
  TopbarWrapper,
  UserNav,
} from '../../components';
import { PasswordChangeForm } from '../../containers';

import { changePassword, changePasswordClear } from './PasswordChangePage.duck';
import css from './PasswordChangePage.css';

export const PasswordChangePageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    changePasswordError,
    changePasswordInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    history,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onChange,
    onLogout,
    onManageDisableScrolling,
    onSubmitChangePassword,
    passwordChanged,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
  } = props;

  const tabs = [
    {
      text: <FormattedMessage id="PasswordChangePage.emailTabTitle" />,
      selected: false,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="PasswordChangePage.passwordTabTitle" />,
      selected: true,
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
  ];

  const changePasswordForm = currentUser && currentUser.id
    ? <PasswordChangeForm
        className={css.form}
        changePasswordError={changePasswordError}
        currentUser={currentUser}
        onSubmit={onSubmitChangePassword}
        onChange={onChange}
        inProgress={changePasswordInProgress}
        ready={passwordChanged}
      />
    : null;

  return (
    <PageLayout authInfoError={authInfoError} logoutError={logoutError} title="Contact details">
      <LayoutSideNavigation>
        <TopbarWrapper>
          <Topbar
            authInProgress={authInProgress}
            currentPage="PasswordChangePage"
            currentUser={currentUser}
            currentUserHasListings={currentUserHasListings}
            currentUserHasOrders={currentUserHasOrders}
            desktopClassName={css.desktopTopbar}
            history={history}
            isAuthenticated={isAuthenticated}
            location={location}
            mobileClassName={css.mobileTopbar}
            notificationCount={notificationCount}
            onLogout={onLogout}
            onManageDisableScrolling={onManageDisableScrolling}
            onResendVerificationEmail={onResendVerificationEmail}
            sendVerificationEmailInProgress={sendVerificationEmailInProgress}
            sendVerificationEmailError={sendVerificationEmailError}
          />
          <UserNav selectedPageName="PasswordChangePage" />
        </TopbarWrapper>
        <SideNavWrapper>
          <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />
        </SideNavWrapper>
        <ContentWrapper>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="PasswordChangePage.title" />
            </h1>
            {changePasswordForm}
          </div>
        </ContentWrapper>
      </LayoutSideNavigation>
    </PageLayout>
  );
};

PasswordChangePageComponent.defaultProps = {
  authInfoError: null,
  changePasswordError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

const { bool, func, instanceOf, number, object, shape } = PropTypes;

PasswordChangePageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  changePasswordError: instanceOf(Error),
  changePasswordInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onChange: func.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSubmitChangePassword: func.isRequired,
  passwordChanged: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

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
    changePasswordError,
    changePasswordInProgress,
    passwordChanged,
  } = state.PasswordChangePage;
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    changePasswordError,
    changePasswordInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    notificationCount,
    isAuthenticated,
    logoutError,
    passwordChanged,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(changePasswordClear()),
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSubmitChangePassword: values => dispatch(changePassword(values)),
});

const PasswordChangePage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  PasswordChangePageComponent
);

export default PasswordChangePage;
