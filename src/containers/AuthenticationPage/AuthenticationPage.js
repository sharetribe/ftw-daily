import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { apiBaseUrl } from '../../util/api';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import {
  isSignupEmailTakenError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import {
  Page,
  NamedLink,
  NamedRedirect,
  LinkTabNavHorizontal,
  IconEmailSent,
  InlineTextButton,
  SocialLoginButton,
  IconClose,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
  TermsOfService,
} from '../../components';
import { ConfirmSignupForm, LoginForm, SignupForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import { login, authenticationInProgress, signup, signupWithIdp } from '../../ducks/Auth.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';

import css from './AuthenticationPage.css';

export class AuthenticationPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tosModalOpen: false,
      authError: Cookies.get('st-autherror')
        ? JSON.parse(Cookies.get('st-autherror').replace('j:', ''))
        : null,
      authInfo: Cookies.get('st-authinfo')
        ? JSON.parse(Cookies.get('st-authinfo').replace('j:', ''))
        : null,
    };
  }

  componentDidMount() {
    // Remove the autherror cookie once the content is saved to state
    // because we don't want to show the error message e.g. after page refresh
    Cookies.remove('st-autherror');
  }

  render() {
    const {
      authInProgress,
      currentUser,
      intl,
      isAuthenticated,
      location,
      loginError,
      scrollingDisabled,
      signupError,
      submitLogin,
      submitSignup,
      confirmError,
      submitSinguoWithIdp,
      tab,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
      onManageDisableScrolling,
    } = this.props;

    const isConfirm = tab === 'confirm';
    const isLogin = tab === 'login';
    const locationFrom = location.state && location.state.from ? location.state.from : null;
    const authinfoFrom =
      this.state.authInfo && this.state.authInfo.from ? this.state.authInfo.from : null;
    const from = locationFrom ? locationFrom : authinfoFrom ? authinfoFrom : null;

    const user = ensureCurrentUser(currentUser);
    const currentUserLoaded = !!user.id;

    // We only want to show the email verification dialog in the signup
    // tab if the user isn't being redirected somewhere else
    // (i.e. `from` is present). We must also check the `emailVerified`
    // flag only when the current user is fully loaded.
    const showEmailVerification = !isLogin && currentUserLoaded && !user.attributes.emailVerified;

    // Already authenticated, redirect away from auth page
    if (isAuthenticated && from) {
      return <Redirect to={from} />;
    } else if (isAuthenticated && currentUserLoaded && !showEmailVerification) {
      return <NamedRedirect name="LandingPage" />;
    }

    const loginErrorMessage = (
      <div className={css.error}>
        <FormattedMessage id="AuthenticationPage.loginFailed" />
      </div>
    );

    const signupErrorMessage = (
      <div className={css.error}>
        {isSignupEmailTakenError(signupError) ? (
          <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="AuthenticationPage.signupFailed" />
        )}
      </div>
    );

    const confirmErrorMessage = confirmError ? (
      <div className={css.error}>
        {isSignupEmailTakenError(confirmError) ? (
          <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="AuthenticationPage.signupFailed" />
        )}
      </div>
    ) : null;

    // eslint-disable-next-line no-confusing-arrow
    const errorMessage = (error, message) => (error ? message : null);
    const loginOrSignupError = isLogin
      ? errorMessage(loginError, loginErrorMessage)
      : errorMessage(signupError, signupErrorMessage);

    const fromState = { state: from ? { from } : null };

    const tabs = [
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="AuthenticationPage.signupLinkText" />
          </h1>
        ),
        selected: !isLogin,
        linkProps: {
          name: 'SignupPage',
          to: fromState,
        },
      },
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="AuthenticationPage.loginLinkText" />
          </h1>
        ),
        selected: isLogin,
        linkProps: {
          name: 'LoginPage',
          to: fromState,
        },
      },
    ];

    const handleSubmitSignup = values => {
      const { fname, lname, ...rest } = values;
      const params = { firstName: fname.trim(), lastName: lname.trim(), ...rest };
      submitSignup(params);
    };

    const handleSubmitConfirm = values => {
      const { idpToken, email, firstName, lastName, idpId } = this.state.authInfo;
      const { email: newEmail, firstName: newFirstName, lastName: newLastName } = values;

      // Pass email, fistName or lastName to Flex API only if user has edited them
      // sand they can't be fetched directly from idp provider (e.g. Facebook)

      const authParams = {
        ...(newEmail !== email && { email: newEmail }),
        ...(newFirstName !== firstName && { firstName: newFirstName }),
        ...(newLastName !== lastName && { lastName: newLastName }),
      };

      submitSinguoWithIdp({
        idpToken,
        idpId,
        ...authParams,
      });
    };

    const authWithFacebook = () => {
      const baseUrl = apiBaseUrl();

      if (from) {
        window.location.href = `${baseUrl}/api/auth/facebook?from=${from}`;
      } else {
        window.location.href = `${baseUrl}/api/auth/facebook`;
      }
    };

    const idp = this.state.authInfo ? this.state.authInfo.idpId : null;

    const showSocialLogins = !!process.env.REACT_APP_FACEBOOK_APP_ID;

    const socialLoginButtonsMaybe = showSocialLogins ? (
      <div className={css.idpButtons}>
        <SocialLoginButton onClick={() => authWithFacebook()}>
          <span className={css.buttonIcon}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.89.214C4.055 1.047 1.005 4.13.205 7.947c-.734 3.45.533 7.283 3.166 9.6.967.85 3.2 2.033 4.15 2.183l.617.1v-6.883H5.806v-3h2.283l.083-1.633c.134-2.417.717-3.534 2.3-4.25.617-.284 1.034-.35 2.3-.334.85.017 1.617.084 1.7.134.1.05.167.7.167 1.433v1.317h-.983c-1.484 0-1.75.283-1.817 1.983l-.067 1.35h1.45c1.284 0 1.434.033 1.35.283-.05.167-.133.667-.2 1.134-.216 1.55-.25 1.583-1.483 1.583h-1.083V19.914l.866-.234c1.684-.433 2.984-1.216 4.4-2.633 2.067-2.067 2.9-4.1 2.9-7.017 0-3.166-1.2-5.75-3.616-7.766C14.106.38 10.772-.42 7.889.214z"
                fill="#1877F2"
                fillRule="nonzero"
              />
            </svg>
          </span>
          <FormattedMessage id="AuthenticationPage.loginWithFacebook" />
        </SocialLoginButton>
        <center>
          <FormattedMessage id="AuthenticationPage.or" />
        </center>
      </div>
    ) : null;

    const formContent = isConfirm ? (
      <div className={css.content}>
        <h1 className={css.signupWithIdpTitle}>
          <FormattedMessage id="AuthenticationPage.confirmSignupWithIdpTitle" values={{ idp }} />
        </h1>

        <p className={css.confirmInfoText}>
          <FormattedMessage id="AuthenticationPage.confirmSignupInfoText" />
        </p>
        {confirmErrorMessage}
        <ConfirmSignupForm
          className={css.form}
          onSubmit={handleSubmitConfirm}
          inProgress={authInProgress}
          onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
          authInfo={this.state.authInfo}
        />
      </div>
    ) : (
      <div className={css.content}>
        <LinkTabNavHorizontal className={css.tabs} tabs={tabs} />
        {loginOrSignupError}
        {socialLoginButtonsMaybe}

        {isLogin ? (
          <LoginForm className={css.form} onSubmit={submitLogin} inProgress={authInProgress} />
        ) : (
          <SignupForm
            className={css.form}
            onSubmit={handleSubmitSignup}
            inProgress={authInProgress}
            onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
          />
        )}
      </div>
    );

    const name = user.attributes.profile.firstName;
    const email = <span className={css.email}>{user.attributes.email}</span>;

    const resendEmailLink = (
      <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
        <FormattedMessage id="AuthenticationPage.resendEmailLinkText" />
      </InlineTextButton>
    );
    const fixEmailLink = (
      <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
        <FormattedMessage id="AuthenticationPage.fixEmailLinkText" />
      </NamedLink>
    );

    const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
      sendVerificationEmailError
    )
      ? 'AuthenticationPage.resendFailedTooManyRequests'
      : 'AuthenticationPage.resendFailed';
    const resendErrorMessage = sendVerificationEmailError ? (
      <p className={css.error}>
        <FormattedMessage id={resendErrorTranslationId} />
      </p>
    ) : null;

    const emailVerificationContent = (
      <div className={css.content}>
        <NamedLink className={css.verifyClose} name="ProfileSettingsPage">
          <span className={css.closeText}>
            <FormattedMessage id="AuthenticationPage.verifyEmailClose" />
          </span>
          <IconClose rootClassName={css.closeIcon} />
        </NamedLink>
        <IconEmailSent className={css.modalIcon} />
        <h1 className={css.modalTitle}>
          <FormattedMessage id="AuthenticationPage.verifyEmailTitle" values={{ name }} />
        </h1>
        <p className={css.modalMessage}>
          <FormattedMessage id="AuthenticationPage.verifyEmailText" values={{ email }} />
        </p>
        {resendErrorMessage}

        <div className={css.bottomWrapper}>
          <p className={css.modalHelperText}>
            {sendVerificationEmailInProgress ? (
              <FormattedMessage id="AuthenticationPage.sendingEmail" />
            ) : (
              <FormattedMessage id="AuthenticationPage.resendEmail" values={{ resendEmailLink }} />
            )}
          </p>
          <p className={css.modalHelperText}>
            <FormattedMessage id="AuthenticationPage.fixEmail" values={{ fixEmailLink }} />
          </p>
        </div>
      </div>
    );

    const siteTitle = config.siteTitle;
    const schemaTitle = isLogin
      ? intl.formatMessage({ id: 'AuthenticationPage.schemaTitleLogin' }, { siteTitle })
      : intl.formatMessage({ id: 'AuthenticationPage.schemaTitleSignup' }, { siteTitle });

    const topbarClasses = classNames({
      [css.hideOnMobile]: showEmailVerification,
    });

    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          name: schemaTitle,
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer className={topbarClasses} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.layoutWrapperMain}>
            <div className={css.root}>
              {showEmailVerification ? emailVerificationContent : formContent}
            </div>
            <Modal
              id="AuthenticationPage.tos"
              isOpen={this.state.tosModalOpen}
              onClose={() => this.setState({ tosModalOpen: false })}
              usePortal
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <div className={css.termsWrapper}>
                <h2 className={css.termsHeading}>
                  <FormattedMessage id="AuthenticationPage.termsHeading" />
                </h2>
                <TermsOfService />
              </div>
            </Modal>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

AuthenticationPageComponent.defaultProps = {
  currentUser: null,
  loginError: null,
  signupError: null,
  confirmError: null,
  tab: 'signup',
  sendVerificationEmailError: null,
  showSocialLoginsForTests: false,
};

const { bool, func, object, oneOf, shape } = PropTypes;

AuthenticationPageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  isAuthenticated: bool.isRequired,
  loginError: propTypes.error,
  scrollingDisabled: bool.isRequired,
  signupError: propTypes.error,
  confirmError: propTypes.error,

  submitLogin: func.isRequired,
  submitSignup: func.isRequired,
  tab: oneOf(['login', 'signup', 'confirm']),

  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withRouter
  location: shape({ state: object }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated, loginError, signupError, confirmError } = state.Auth;
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  return {
    authInProgress: authenticationInProgress(state),
    currentUser,
    isAuthenticated,
    loginError,
    scrollingDisabled: isScrollingDisabled(state),
    signupError,
    confirmError,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  submitLogin: ({ email, password }) => dispatch(login(email, password)),
  submitSignup: params => dispatch(signup(params)),
  submitSinguoWithIdp: params => dispatch(signupWithIdp(params)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const AuthenticationPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(AuthenticationPageComponent);

export default AuthenticationPage;
