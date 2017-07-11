import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { PageLayout, HeroSection, Topbar } from '../../components';
import * as propTypes from '../../util/propTypes';
import { withFlattenedRoutes } from '../../util/contextHelpers';

import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const {
    authInProgress,
    currentUser,
    currentUserHasListings,
    flattenedRoutes,
    history,
    isAuthenticated,
    location,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
    scrollingDisabled,
  } = props;
  return (
    <PageLayout title="Landing page" className={css.root} scrollingDisabled={scrollingDisabled}>
      <Topbar
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
      />
      <HeroSection
        className={css.hero}
        flattenedRoutes={flattenedRoutes}
        history={history}
        location={location}
      />
    </PageLayout>
  );
};

LandingPageComponent.defaultProps = {
  currentUser: null,
  notificationCount: 0,
};

const { array, bool, func, number, object } = PropTypes;

LandingPageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: array.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;
  return {
    isAuthenticated,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const LandingPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withFlattenedRoutes
)(LandingPageComponent);

export default LandingPage;
