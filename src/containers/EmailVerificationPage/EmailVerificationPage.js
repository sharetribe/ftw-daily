import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { PageLayout, Topbar } from '../../components';
import { EmailVerificationForm } from '../../containers';
import { authenticationInProgress } from '../../ducks/Auth.duck';
import { verify, verificationInProgress } from '../../ducks/EmailVerification.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { parse } from '../../util/urlHelpers';
import css from './EmailVerificationPage.css';

/**
  Parse verification token from URL

  Returns stringified token, if the token is provided.

  Returns `null` if verification token is not provided.

  Please note that we need to explicitely stringify the token, because
  the unwanted result of the `parse` method is that it automatically
  parses the token to number.
*/
const parseVerificationToken = location => {
  const urlParams = parse(location.search);
  const verificationToken = urlParams.t;

  if (verificationToken) {
    return `${verificationToken}`;
  }

  return null;
};

export const EmailVerificationPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    intl,
    isAuthenticated,
    logoutError,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
    scrollingDisabled,
    submitVerification,
    emailVerificationInProgress,
    verificationError,
  } = props;
  const title = intl.formatMessage({
    id: 'EmailVerificationPage.title',
  });

  const initialValues = { verificationToken: parseVerificationToken(location) };

  return (
    <PageLayout
      title={title}
      authInfoError={authInfoError}
      logoutError={logoutError}
      scrollingDisabled={scrollingDisabled}
    >
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
      <div className={css.root}>
        <div className={css.content}>

          {currentUser
            ? <EmailVerificationForm
                initialValues={initialValues}
                onSubmit={submitVerification}
                currentUser={currentUser}
                inProgress={emailVerificationInProgress}
                verificationError={verificationError}
              />
            : <FormattedMessage id="EmailVerificationPage.loadingUserInformation" />}
        </div>
      </div>

    </PageLayout>
  );
};

EmailVerificationPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  notificationCount: 0,
  verificationError: null,
};

const { bool, func, instanceOf, number } = PropTypes;

EmailVerificationPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  submitVerification: func.isRequired,
  emailVerificationInProgress: bool.isRequired,
  verificationError: instanceOf(Error),
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    authInfoError,
    isAuthenticated,
    logoutError,
  } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;
  const {
    verificationError,
  } = state.EmailVerification;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    emailVerificationInProgress: verificationInProgress(state),
    verificationError,
    currentUser,
    currentUserHasListings,
    isAuthenticated,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  submitVerification: ({ verificationToken }) => {
    return dispatch(verify(verificationToken));
  },
});

const EmailVerificationPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl
)(EmailVerificationPageComponent);

export default EmailVerificationPage;
