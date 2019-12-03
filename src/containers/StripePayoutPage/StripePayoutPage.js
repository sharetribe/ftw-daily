import React from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import routeConfiguration from '../../routeConfiguration';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { stripeAccountClearError } from '../../ducks/stripe.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  UserNav,
} from '../../components';
import { StripePayoutForm } from '../../forms';
import { TopbarContainer } from '..';
import { savePayoutDetails, getVerificationLink, loadData } from './StripePayoutPage.duck';

import css from './StripePayoutPage.css';

export const StripePayoutPageComponent = props => {
  const {
    currentUser,
    scrollingDisabled,
    createStripeAccountError,
    updateStripeAccountError,
    stripeAccountFetched,
    onPayoutDetailsFormChange,
    onPayoutDetailsFormSubmit,
    onGetVerificationLink,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    verificationFailed,
    verificationSuccess,
    intl,
  } = props;

  const handleGetVerificationLink = values => {
    onGetVerificationLink(values).then(url => {
      console.log('url', url);

      window.location.href = url;
    });
  };

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;
  const stripeConnected =
    currentUserLoaded &&
    !!ensuredCurrentUser.stripeAccount &&
    !!ensuredCurrentUser.stripeAccount.id;

  const stripeAccountId = stripeConnected ? ensuredCurrentUser.stripeAccount.id : null;

  const title = intl.formatMessage({ id: 'StripePayoutPage.title' });

  const formDisabled = false; //TODO

  const canonicalRootURL = config.canonicalRootURL;
  const successUrl = `${canonicalRootURL}${createResourceLocatorString(
    'StripePayoutVerificationSuccessPage',
    routeConfiguration(),
    {},
    {}
  )}`;
  const failureUrl = `${canonicalRootURL}${createResourceLocatorString(
    'StripePayoutVerificationFailedPage',
    routeConfiguration(),
    {},
    {}
  )}`;

  const message = !currentUserLoaded ? (
    <FormattedMessage id="StripePayoutPage.loadingData" />
  ) : null;

  const form = currentUserLoaded ? (
    <StripePayoutForm
      disabled={formDisabled}
      inProgress={payoutDetailsSaveInProgress}
      ready={payoutDetailsSaved}
      submitButtonText={intl.formatMessage({ id: 'PayoutPreferencesPage.submitButtonText' })}
      stripeAccountError={createStripeAccountError || updateStripeAccountError}
      stripeAccountFetched={stripeAccountFetched}
      onChange={onPayoutDetailsFormChange}
      onSubmit={onPayoutDetailsFormSubmit}
      onGetVerificationLink={handleGetVerificationLink}
      stripeConnected={stripeConnected}
      stripeAccountId={stripeAccountId}
      currentUserId={ensuredCurrentUser.id}
      verificationFailed={verificationFailed}
      verificationSuccess={verificationSuccess}
      successUrl={successUrl}
      failureUrl={failureUrl}
    />
  ) : null;

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="StripePayoutPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="StripePayoutPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav currentTab="StripePayoutPage" />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="StripePayoutPage.heading" />
            </h1>
            {message}
            {form}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

StripePayoutPageComponent.defaultProps = {
  currentUser: null,
  createStripeAccountError: null,
  verificationFailed: null,
  verificationSuccess: null,
};

StripePayoutPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  payoutDetailsSaveInProgress: bool.isRequired,
  createStripeAccountError: propTypes.error,
  payoutDetailsSaved: bool.isRequired,

  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsFormSubmit: func.isRequired,
  onGetVerificationLink: func.isRequired,
  verificationFailed: bool,
  verificationSuccess: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { createStripeAccountError, updateStripeAccountError, stripeAccountFetched } = state.stripe;
  const { currentUser } = state.user;
  const { payoutDetailsSaveInProgress, payoutDetailsSaved } = state.StripePayoutPage;
  return {
    currentUser,
    createStripeAccountError,
    updateStripeAccountError,
    stripeAccountFetched,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onPayoutDetailsFormChange: () => dispatch(stripeAccountClearError()),
  onPayoutDetailsFormSubmit: values => dispatch(savePayoutDetails(values)),
  onGetVerificationLink: params => dispatch(getVerificationLink(params)),
});

const StripePayoutPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(StripePayoutPageComponent);

StripePayoutPage.loadData = loadData;

export default StripePayoutPage;
