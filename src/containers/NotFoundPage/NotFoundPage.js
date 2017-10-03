import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFlattenedRoutes } from '../../util/contextHelpers';
import { createResourceLocatorString } from '../../util/routes';
import * as propTypes from '../../util/propTypes';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { Page, Topbar } from '../../components';
import { LocationSearchForm } from '../../containers';

import css from './NotFoundPage.css';

export class NotFoundPageComponent extends Component {
  componentWillMount() {
    // The StaticRouter component used in server side rendering
    // provides the context object. We attach a `notfound` flag to
    // the context to tell the server to change the response status
    // code into a 404.
    this.props.staticContext.notfound = true;
  }

  render() {
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
      flattenedRoutes,
      intl,
    } = this.props;

    const title = intl.formatMessage({
      id: 'NotFoundPage.title',
    });

    const handleSearchSubmit = values => {
      const { search, selectedPlace } = values.location;
      const { origin, bounds, country } = selectedPlace;
      const searchParams = { address: search, origin, bounds, country };
      history.push(createResourceLocatorString('SearchPage', flattenedRoutes, {}, searchParams));
    };

    return (
      <Page authInfoError={authInfoError} logoutError={logoutError} title={title}>
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
          <div className={css.content}>
            <div className={css.number}>404</div>
            <h1 className={css.heading}>
              <FormattedMessage id="NotFoundPage.heading" />
            </h1>
            <p className={css.description}>
              <FormattedMessage id="NotFoundPage.description" />
            </p>
            <LocationSearchForm className={css.searchForm} onSubmit={handleSearchSubmit} />
          </div>
        </div>
      </Page>
    );
  }
}

NotFoundPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  staticContext: {},
  sendVerificationEmailError: null,
};

const { bool, func, instanceOf, number, object, shape, array } = PropTypes;

NotFoundPageComponent.propTypes = {
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

  // context object from StaticRouter, injected by the withRouter wrapper
  staticContext: object,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: array.isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError, Topbar needs isAuthenticated
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
});

const NotFoundPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl,
  withFlattenedRoutes
)(NotFoundPageComponent);

export default NotFoundPage;
