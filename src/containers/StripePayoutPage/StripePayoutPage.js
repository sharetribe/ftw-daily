import React from 'react';
import { bool, func, oneOf, shape } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import routeConfiguration from '../../routeConfiguration';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  stripeAccountClearError,
  getStripeConnectAccountLink,
} from '../../ducks/stripeConnectAccount.duck';
import {
  NamedRedirect,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  StripeConnectAccountStatusBox,
  UserNav,
} from '../../components';
import { StripeConnectAccountForm } from '../../forms';
import { TopbarContainer } from '..';
import { savePayoutDetails, loadData } from './StripePayoutPage.duck';

import css from './StripePayoutPage.css';

const STRIPE_ONBOARDING_RETURN_URL_SUCCESS = 'success';
const STRIPE_ONBOARDING_RETURN_URL_FAILURE = 'failure';
const STRIPE_ONBOARDING_RETURN_URL_TYPES = [
  STRIPE_ONBOARDING_RETURN_URL_SUCCESS,
  STRIPE_ONBOARDING_RETURN_URL_FAILURE,
];

// Create return URL for the Stripe onboarding form
const createReturnURL = (returnURLType, rootURL, routes) => {
  const path = createResourceLocatorString(
    'StripePayoutOnboardingPage',
    routes,
    { returnURLType },
    {}
  );
  const root = rootURL.replace(/\/$/, '');
  return `${root}${path}`;
};

// Get attribute: stripeAccountData
const getStripeAccountData = stripeAccount => stripeAccount.attributes.stripeAccountData || null;

// Get last 4 digits of bank account returned in Stripe account
const getBankAccountLast4Digits = stripeAccountData =>
  stripeAccountData && stripeAccountData.external_accounts.data.length > 0
    ? stripeAccountData.external_accounts.data[0].last4
    : null;

// Check if there's requirements on selected type: 'past_due', 'currently_due' etc.
const hasRequirements = (stripeAccountData, requirementType) =>
  stripeAccountData != null &&
  stripeAccountData.requirements &&
  Array.isArray(stripeAccountData.requirements[requirementType]) &&
  stripeAccountData.requirements[requirementType].length > 0;

// Redirect user to Stripe's hosted Connect account onboarding form
const handleGetStripeConnectAccountLinkFn = (getLinkFn, commonParams) => type => () => {
  getLinkFn({ type, ...commonParams })
    .then(url => {
      window.location.href = url;
    })
    .catch(err => console.error(err));
};

export const StripePayoutPageComponent = props => {
  const {
    currentUser,
    scrollingDisabled,
    getAccountLinkInProgress,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccountFetched,
    stripeAccount,
    onPayoutDetailsFormChange,
    onPayoutDetailsFormSubmit,
    onGetStripeConnectAccountLink,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    params,
    intl,
  } = props;

  const { returnURLType } = params;
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;
  const stripeConnected = currentUserLoaded && !!stripeAccount && !!stripeAccount.id;

  const title = intl.formatMessage({ id: 'StripePayoutPage.title' });

  const formDisabled = getAccountLinkInProgress;

  const rootURL = config.canonicalRootURL;
  const routes = routeConfiguration();
  const successURL = createReturnURL(STRIPE_ONBOARDING_RETURN_URL_SUCCESS, rootURL, routes);
  const failureURL = createReturnURL(STRIPE_ONBOARDING_RETURN_URL_FAILURE, rootURL, routes);

  const accountId = stripeConnected ? stripeAccount.id : null;
  const stripeAccountData = stripeConnected ? getStripeAccountData(stripeAccount) : null;
  const requirementsMissing =
    stripeAccount &&
    (hasRequirements(stripeAccountData, 'past_due') ||
      hasRequirements(stripeAccountData, 'currently_due'));

  const savedCountry = stripeAccountData ? stripeAccountData.country : null;

  const handleGetStripeConnectAccountLink = handleGetStripeConnectAccountLinkFn(
    onGetStripeConnectAccountLink,
    {
      accountId,
      successURL,
      failureURL,
    }
  );

  const returnedNormallyFromStripe = returnURLType === STRIPE_ONBOARDING_RETURN_URL_SUCCESS;
  const showVerificationError = returnURLType === STRIPE_ONBOARDING_RETURN_URL_FAILURE;
  const showVerificationNeeded = stripeConnected && requirementsMissing;

  // Redirect from success URL to basic path for StripePayoutPage
  if (returnedNormallyFromStripe && stripeConnected && !requirementsMissing) {
    return <NamedRedirect name="StripePayoutPage" />;
  }

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
            {!currentUserLoaded ? (
              <FormattedMessage id="StripePayoutPage.loadingData" />
            ) : (
              <StripeConnectAccountForm
                disabled={formDisabled}
                inProgress={payoutDetailsSaveInProgress}
                ready={payoutDetailsSaved}
                stripeBankAccountLastDigits={getBankAccountLast4Digits(stripeAccountData)}
                savedCountry={savedCountry}
                submitButtonText={intl.formatMessage({
                  id: 'StripePayoutPage.submitButtonText',
                })}
                stripeAccountError={
                  createStripeAccountError || updateStripeAccountError || fetchStripeAccountError
                }
                stripeAccountFetched={stripeAccountFetched}
                onChange={onPayoutDetailsFormChange}
                onSubmit={onPayoutDetailsFormSubmit}
                onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink}
                stripeConnected={stripeConnected}
              >
                {stripeConnected && (showVerificationError || showVerificationNeeded) ? (
                  <StripeConnectAccountStatusBox
                    type={showVerificationError ? 'verificationError' : 'verificationNeeded'}
                    inProgress={getAccountLinkInProgress}
                    onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink(
                      'custom_account_verification'
                    )}
                  />
                ) : stripeConnected && savedCountry ? (
                  <StripeConnectAccountStatusBox
                    type="verificationSuccess"
                    inProgress={getAccountLinkInProgress}
                    disabled={payoutDetailsSaveInProgress}
                    onGetStripeConnectAccountLink={handleGetStripeConnectAccountLink(
                      'custom_account_update'
                    )}
                  />
                ) : null}
              </StripeConnectAccountForm>
            )}
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
  updateStripeAccountError: null,
  fetchStripeAccountError: null,
  stripeAccount: null,
  params: {
    returnURLType: null,
  },
};

StripePayoutPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  getAccountLinkInProgress: bool.isRequired,
  payoutDetailsSaveInProgress: bool.isRequired,
  createStripeAccountError: propTypes.error,
  updateStripeAccountError: propTypes.error,
  fetchStripeAccountError: propTypes.error,
  stripeAccount: propTypes.stripeAccount,
  payoutDetailsSaved: bool.isRequired,

  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsFormSubmit: func.isRequired,
  onGetStripeConnectAccountLink: func.isRequired,
  params: shape({
    returnURLType: oneOf(STRIPE_ONBOARDING_RETURN_URL_TYPES),
  }),

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    getAccountLinkInProgress,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccount,
    stripeAccountFetched,
  } = state.stripeConnectAccount;
  const { currentUser } = state.user;
  const { payoutDetailsSaveInProgress, payoutDetailsSaved } = state.StripePayoutPage;
  return {
    currentUser,
    getAccountLinkInProgress,
    createStripeAccountError,
    updateStripeAccountError,
    fetchStripeAccountError,
    stripeAccount,
    stripeAccountFetched,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onPayoutDetailsFormChange: () => dispatch(stripeAccountClearError()),
  onPayoutDetailsFormSubmit: (values, isUpdateCall) =>
    dispatch(savePayoutDetails(values, isUpdateCall)),
  onGetStripeConnectAccountLink: params => dispatch(getStripeConnectAccountLink(params)),
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
