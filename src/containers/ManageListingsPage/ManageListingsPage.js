import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import * as propTypes from '../../util/propTypes';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { PageLayout, Topbar, TabNavHorizontal } from '../../components';

import css from './ManageListingsPage.css';

export const ManageListingsPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    history,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
  } = props;

  const tabs = [
    {
      text: <FormattedMessage id="ManageListingsPage.profileSettings" />,
      selected: false,
      disabled: true,
      linkProps: {
        name: 'EditProfilePage',
        params: { displayName: 'testinglink' },
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.accountSettings" />,
      selected: false,
      disabled: true,
      linkProps: {
        name: 'AccountPage',
      },
    },
    {
      text: <FormattedMessage id="ManageListingsPage.yourListings" />,
      selected: true,
      linkProps: {
        name: 'ManageListingsPage',
      },
    },
  ];

  return (
    <PageLayout authInfoError={authInfoError} logoutError={logoutError} title="Manage listings">
      <Topbar
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentPage="ManageListingsPage"
        history={history}
        isAuthenticated={isAuthenticated}
        location={location}
        notificationCount={notificationCount}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
      />
      <TabNavHorizontal className={css.tabs} tabRootClassName={css.tab} tabs={tabs} skin="dark" />

    </PageLayout>
  );
};

ManageListingsPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  notificationCount: 0,
};

const { bool, func, instanceOf, number, object, shape } = PropTypes;

ManageListingsPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,

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
    currentUserNotificationCount: notificationCount,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
    isAuthenticated,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const ManageListingsPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  ManageListingsPageComponent
);

export default ManageListingsPage;
