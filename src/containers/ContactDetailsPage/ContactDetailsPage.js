import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser } from '../../util/data';
import { fetchCurrentUser, sendVerificationEmail } from '../../ducks/user.duck';
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
import { ContactDetailsForm } from '../../containers';

import { changeEmail } from './ContactDetailsPage.duck';
import css from './ContactDetailsPage.css';

export const ContactDetailsPageComponent = props => {
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
    onSubmitChangeEmail,
  } = props;

  const tabs = [
    {
      text: <FormattedMessage id="ContactDetailsPage.emailTabTitle" />,
      selected: true,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="ContactDetailsPage.passwordTabTitle" />,
      selected: false,
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
  ];

  const user = ensureCurrentUser(currentUser);
  const email = user.attributes.email || '';
  const changeEmailForm = user.id
    ? <ContactDetailsForm
        className={css.form}
        initialValues={{ email }}
        currentUser={currentUser}
        onResendVerificationEmail={onResendVerificationEmail}
        onSubmit={onSubmitChangeEmail}
        inProgress={authInProgress}
      />
    : null;

  return (
    <PageLayout authInfoError={authInfoError} logoutError={logoutError} title="Contact details">
      <LayoutSideNavigation>
        <TopbarWrapper>
          <Topbar
            authInProgress={authInProgress}
            currentPage="ContactDetailsPage"
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
          <UserNav selectedPageName="ContactDetailsPage" />
        </TopbarWrapper>
        <SideNavWrapper>
          <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />
        </SideNavWrapper>
        <ContentWrapper>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="ContactDetailsPage.title" />
            </h1>
            {changeEmailForm}
          </div>
        </ContentWrapper>
      </LayoutSideNavigation>
    </PageLayout>
  );
};

ContactDetailsPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

const { bool, func, instanceOf, number, object, shape } = PropTypes;

ContactDetailsPageComponent.propTypes = {
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
  onSubmitChangeEmail: func.isRequired,
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
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    notificationCount,
    isAuthenticated,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSubmitChangeEmail: values => dispatch(changeEmail(values)),
});

const ContactDetailsPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  ContactDetailsPageComponent
);

ContactDetailsPage.loadData = () => {
  // Since verify email happens in separate tab, current user's data might be updated
  return fetchCurrentUser();
};

export default ContactDetailsPage;
