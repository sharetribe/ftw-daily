import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import routeConfiguration from '../../routeConfiguration';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { pathByRouteName } from '../../util/routes';
import { isTooManyEmailVerificationRequestsError } from '../../util/errors';
import { IconEmailAttention, InlineTextButton, Modal, NamedLink } from '../../components';

import css from './ModalMissingInformation.css';

const MISSING_INFORMATION_MODAL_WHITELIST = [
  'LoginPage',
  'SignupPage',
  'ContactDetailsPage',
  'EmailVerificationPage',
  'PasswordResetPage',
  'PayoutPreferencesPage',
];

const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
const STRIPE_ACCOUNT = 'STRIPE_ACCOUNT';

class ModalMissingInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMissingInformationReminder: null,
      hasSeenMissingInformationReminder: false,
    };
    this.handleMissingInformationReminder = this.handleMissingInformationReminder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, currentUserHasListings, currentUserHasOrders, location } = nextProps;
    const user = ensureCurrentUser(currentUser);
    this.handleMissingInformationReminder(
      user,
      currentUserHasListings,
      currentUserHasOrders,
      location
    );
  }

  handleMissingInformationReminder(
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    newLocation
  ) {
    const routes = routeConfiguration();
    const whitelistedPaths = MISSING_INFORMATION_MODAL_WHITELIST.map(page =>
      pathByRouteName(page, routes)
    );

    // Is the current page whitelisted?
    const isPageWhitelisted = whitelistedPaths.includes(newLocation.pathname);

    // Track if path changes inside Page level component
    const pathChanged = newLocation.pathname !== this.props.location.pathname;
    const notRemindedYet =
      !this.state.showMissingInformationReminder && !this.state.hasSeenMissingInformationReminder;

    // Is the reminder already shown on current page
    const showOnPathChange = notRemindedYet || pathChanged;

    if (!isPageWhitelisted && showOnPathChange) {
      // Emails are sent when order is initiated
      // Customer is likely to get email soon when she books something
      // Provider email should work - she should get an email when someone books a listing
      const hasOrders = currentUserHasOrders === true;
      const hasListingsOrOrders = currentUserHasListings || hasOrders;

      const emailUnverified = !!currentUser.id && !currentUser.attributes.emailVerified;
      const emailVerificationNeeded = hasListingsOrOrders && emailUnverified;

      const stripeAccountMissing = !!currentUser.id && !currentUser.attributes.stripeConnected;
      const stripeAccountNeeded = currentUserHasListings && stripeAccountMissing;

      // Show reminder
      if (emailVerificationNeeded) {
        this.setState({ showMissingInformationReminder: EMAIL_VERIFICATION });
      } else if (stripeAccountNeeded) {
        this.setState({ showMissingInformationReminder: STRIPE_ACCOUNT });
      }
    }
  }

  render() {
    const {
      rootClassName,
      className,
      containerClassName,
      currentUser,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onManageDisableScrolling,
      onResendVerificationEmail,
    } = this.props;

    const user = ensureCurrentUser(currentUser);
    const classes = classNames(rootClassName || css.root, className);

    const email = user.id ? <span className={css.email}>{user.attributes.email}</span> : '';

    const resendEmailLink = (
      <InlineTextButton className={css.helperLink} onClick={onResendVerificationEmail}>
        <FormattedMessage id="ModalMissingInformation.resendEmailLinkText" />
      </InlineTextButton>
    );

    const fixEmailLink = (
      <NamedLink className={css.helperLink} name="ContactDetailsPage">
        <FormattedMessage id="ModalMissingInformation.fixEmailLinkText" />
      </NamedLink>
    );

    const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
      sendVerificationEmailError
    )
      ? 'ModalMissingInformation.resendFailedTooManyRequests'
      : 'ModalMissingInformation.resendFailed';
    const resendErrorMessage = sendVerificationEmailError ? (
      <p className={css.error}>
        <FormattedMessage id={resendErrorTranslationId} />
      </p>
    ) : null;

    const closeButtonMessage = (
      <FormattedMessage id="ModalMissingInformation.closeVerifyEmailReminder" />
    );

    const emailVerificationMissingContent = (
      <div className={classes}>
        <IconEmailAttention className={css.modalIcon} />
        <p className={css.modalTitle}>
          <FormattedMessage id="ModalMissingInformation.verifyEmailTitle" />
        </p>
        <p className={css.modalMessage}>
          <FormattedMessage id="ModalMissingInformation.verifyEmailText" />
        </p>
        <p className={css.modalMessage}>
          <FormattedMessage id="ModalMissingInformation.checkInbox" values={{ email }} />
        </p>
        {resendErrorMessage}

        <div className={css.bottomWrapper}>
          <p className={css.helperText}>
            {sendVerificationEmailInProgress ? (
              <FormattedMessage id="ModalMissingInformation.sendingEmail" />
            ) : (
              <FormattedMessage
                id="ModalMissingInformation.resendEmail"
                values={{ resendEmailLink }}
              />
            )}
          </p>
          <p className={css.helperText}>
            <FormattedMessage id="ModalMissingInformation.fixEmail" values={{ fixEmailLink }} />
          </p>
        </div>
      </div>
    );

    const stripeAccountMissingContent = (
      <div className={classes}>
        <p className={css.modalTitle}>
          <FormattedMessage id="ModalMissingInformation.missingStripeAccountTitle" />
        </p>
        <p className={css.modalMessage}>
          <FormattedMessage id="ModalMissingInformation.missingStripeAccountText" />
        </p>
        <div className={css.bottomWrapper}>
          <NamedLink className={css.reminderModalLinkButton} name="PayoutPreferencesPage">
            <FormattedMessage id="ModalMissingInformation.gotoPaymentSettings" />
          </NamedLink>
        </div>
      </div>
    );

    const currentUserLoaded = user && user.id;
    let content = null;

    if (currentUserLoaded && this.state.showMissingInformationReminder === EMAIL_VERIFICATION) {
      content = emailVerificationMissingContent;
    } else if (currentUserLoaded && this.state.showMissingInformationReminder === STRIPE) {
      content = stripeAccountMissingContent;
    }

    return (
      <Modal
        id="MissingInformationReminder"
        containerClassName={containerClassName}
        isOpen={!!this.state.showMissingInformationReminder}
        onClose={() => {
          this.setState({
            showMissingInformationReminder: null,
            hasSeenMissingInformationReminder: true,
          });
        }}
        onManageDisableScrolling={onManageDisableScrolling}
        closeButtonMessage={closeButtonMessage}
      >
        {content}
      </Modal>
    );
  }
}

ModalMissingInformation.defaultProps = {
  className: null,
  rootClassName: null,
  currentUser: null,
};

ModalMissingInformation.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  containerClassName: string,

  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  sendVerificationEmailError: propTypes.error,
  sendVerificationEmailInProgress: bool.isRequired,
};

ModalMissingInformation.displayName = 'ModalMissingInformation';

export default ModalMissingInformation;
