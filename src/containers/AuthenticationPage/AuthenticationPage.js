import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { apiBaseUrl } from '../../util/api';
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
  SocialButton,
  IconClose,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
  TermsOfService,
} from '../../components';
import { LoginForm, SignupForm, ConfirmForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import { login, authenticationInProgress, signup, signupWithIdp } from '../../ducks/Auth.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';

import css from './AuthenticationPage.css';

const showFacebookLogin = !!config.facebookAppId;
const showGoogleLogin = !!config.googleClientId;
const showSocialLogins = showFacebookLogin || showGoogleLogin;

export class AuthenticationPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tosModalOpen: false,
      authError: Cookies.get('autherror')
        ? JSON.parse(Cookies.get('autherror').replace('j:', ''))
        : null,
      authInfo: Cookies.get('authinfo')
        ? JSON.parse(Cookies.get('authinfo').replace('j:', ''))
        : null,
    };
  }

  componentDidMount() {
    Cookies.remove('autherror');
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
      tab,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
      onManageDisableScrolling,
      confirmError,
      onCreateWithIdp,
    } = this.props;

    const isConfirm = tab === 'confirm';
    const isLogin = tab === 'login';
    const from = location.state && location.state.from ? location.state.from : null;

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

    const confirmErrorMessage = (
      <div className={css.error}>
        {isSignupEmailTakenError(confirmError) ? (
          <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="AuthenticationPage.signupFailed" />
        )}
      </div>
    );

    // eslint-disable-next-line no-confusing-arrow
    const errorMessage = (error, message) => (error ? message : null);

    const loginOrSignupError = isLogin
      ? errorMessage(loginError, loginErrorMessage)
      : errorMessage(signupError, signupErrorMessage);

    const confirmErrorMsg = errorMessage(confirmError, confirmErrorMessage);

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
      const { idpToken, email, firstName, lastName, source } = this.state.authInfo;
      const { email: newEmail, firstName: newFirstName, lastName: newLastName } = values;

      // Pass email, fistName or lastName to Flex API only if user has edited them
      // sand they can't be fetched directly from idp provider (e.g. Facebook)

      const authParams = {
        ...(newEmail !== email && { email: newEmail }),
        ...(newFirstName !== firstName && { firstName: newFirstName }),
        ...(newLastName !== lastName && { lastName: newLastName }),
      };

      onCreateWithIdp({
        idpToken,
        source,
        ...authParams,
      });
    };

    const authWithFacebook = () => {
      const baseUrl = apiBaseUrl();
      window.location.href = `${baseUrl}/api/auth/facebook`;
    };

    const authWithGoogle = () => {
      const baseUrl = apiBaseUrl();
      window.location.href = `${baseUrl}/api/auth/google`;
    };

    const formContent = (
      <div className={css.content}>
        {isConfirm ? (
          <>
            <h1 className={css.signupWithIdpTitle}>
              <FormattedMessage
                id="AuthenticationPage.confirmSignupWithIdpTitle"
                values={{ idp: this.state.authInfo.source }}
              />
            </h1>

            <p className={css.confirmInfoText}>
              <FormattedMessage id="AuthenticationPage.confirmSignupInfoText" />
            </p>
            {confirmErrorMsg}
            <ConfirmForm
              className={css.form}
              onSubmit={handleSubmitConfirm}
              inProgress={authInProgress}
              onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
              authInfo={this.state.authInfo}
            />
          </>
        ) : (
          <>
            <LinkTabNavHorizontal className={css.tabs} tabs={tabs} />
            {loginOrSignupError}
            {showSocialLogins ? (
              <div className={css.idpButtons}>
                {showFacebookLogin ? (
                  <SocialButton onClick={() => authWithFacebook()}>
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
                  </SocialButton>
                ) : null}

                {showGoogleLogin ? (
                  <SocialButton onClick={() => authWithGoogle()}>
                    <span className={css.buttonIcon}>
                      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
                            fill="#4285F4"
                          />
                          <path
                            d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
                            fill="#34A853"
                          />
                          <path
                            d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977z"
                            fill="#EA4335"
                          />
                          <path d="M0 0h20v20H0z" />
                        </g>
                      </svg>
                    </span>
                    <FormattedMessage id="AuthenticationPage.loginWithGoogle" />
                  </SocialButton>
                ) : null}

                <center>
                  <FormattedMessage id="AuthenticationPage.or" />
                </center>
              </div>
            ) : null}

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
          </>
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
};

const { bool, func, object, oneOf, shape } = PropTypes;

AuthenticationPageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  isAuthenticated: bool.isRequired,
  loginError: propTypes.error,
  scrollingDisabled: bool.isRequired,
  signupError: propTypes.error,
  confirmError: object,
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
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    confirmError,
  };
};

const mapDispatchToProps = dispatch => ({
  submitLogin: ({ email, password }) => dispatch(login(email, password)),
  submitSignup: params => dispatch(signup(params)),
  onCreateWithIdp: params => dispatch(signupWithIdp(params)),
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
