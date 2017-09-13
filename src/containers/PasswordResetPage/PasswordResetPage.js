import React, { PropTypes, Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { PageLayout, Topbar, NamedLink, KeysIcon, KeysIconSuccess } from '../../components';
import { PasswordResetForm } from '../../containers';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { parse } from '../../util/urlHelpers';
import { resetPassword } from './PasswordResetPage.duck';

import css from './PasswordResetPage.css';

const { bool, func, instanceOf, number, object, shape, string } = PropTypes;

const parseUrlParams = location => {
  const params = parse(location.search);
  const { t: token, e: email } = params;
  return { token, email };
};

export class PasswordResetPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { newPasswordSubmitted: false };
  }
  render() {
    const {
      authInfoError,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserHasOrders,
      intl,
      isAuthenticated,
      logoutError,
      notificationCount,
      onLogout,
      onManageDisableScrolling,
      scrollingDisabled,
      location,
      history,
      resetPasswordInProgress,
      resetPasswordError,
      onSubmitPassword,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
    } = this.props;

    const title = intl.formatMessage({
      id: 'PasswordResetPage.title',
    });

    const { token, email } = parseUrlParams(location);
    const paramsValid = !!(token && email);

    const handleSubmit = values => {
      const { password } = values;
      this.setState({ newPasswordSubmitted: false });
      onSubmitPassword(email, token, password).then(() => {
        this.setState({ newPasswordSubmitted: true });
      });
    };

    const paramsErrorContent = (
      <div className={css.content}>
        <p className={css.error}>
          <FormattedMessage id="PasswordResetPage.invalidUrlParams" />
        </p>
      </div>
    );

    const resetFormContent = (
      <div className={css.content}>
        <KeysIcon />
        <h1 className={css.mainHeading}>
          <FormattedMessage id="PasswordResetPage.mainHeading" />
        </h1>
        <p className={css.helpText}>
          <FormattedMessage id="PasswordResetPage.helpText" />
        </p>
        {resetPasswordError
          ? <p className={css.error}>
              <FormattedMessage id="PasswordResetPage.resetFailed" />
            </p>
          : null}
        <PasswordResetForm
          className={css.form}
          onSubmit={handleSubmit}
          inProgress={resetPasswordInProgress}
        />
      </div>
    );

    const resetDoneContent = (
      <div className={css.content}>
        <KeysIconSuccess />
        <h1 className={css.mainHeading}>
          <FormattedMessage id="PasswordResetPage.passwordChangedHeading" />
        </h1>
        <p className={css.helpText}>
          <FormattedMessage id="PasswordResetPage.passwordChangedHelpText" />
        </p>
        <NamedLink name="LoginPage" className={css.buttonLink}>
          <FormattedMessage id="PasswordResetPage.loginButtonText" />
        </NamedLink>
      </div>
    );

    let content;

    if (!paramsValid) {
      content = paramsErrorContent;
    } else if (!resetPasswordError && this.state.newPasswordSubmitted) {
      content = resetDoneContent;
    } else {
      content = resetFormContent;
    }

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
          currentUserHasOrders={currentUserHasOrders}
          notificationCount={notificationCount}
          history={history}
          location={location}
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
  }
}

PasswordResetPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  resetPasswordError: null,
  sendVerificationEmailError: null,
};

PasswordResetPageComponent.propTypes = {
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
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

  resetPasswordInProgress: bool.isRequired,
  resetPasswordError: instanceOf(Error),
  onSubmitPassword: func.isRequired,

  // from withRouter
  history: object.isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
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
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const { resetPasswordInProgress, resetPasswordError } = state.PasswordResetPage;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    isAuthenticated,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onSubmitPassword: (email, token, password) => dispatch(resetPassword(email, token, password)),
});

const PasswordResetPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  injectIntl
)(PasswordResetPageComponent);

export default PasswordResetPage;
