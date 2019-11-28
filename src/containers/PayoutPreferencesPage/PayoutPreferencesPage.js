/** NOTE: This code will not be updated!
 * If you want to use this form you need to add the import back to `containers/index.js` and use this page in the routeConfiguration.js and reducers.js instead of StripePayoutPage.
 *
 * We are currently using Connect Onboarding flow provided by Stripe.
 * You can read more from Stripe documentation: https://stripe.com/docs/connect/connect-onboarding
 * If you want to handle creating user's Stripe account and passing the required information to Stripe manually, you can use this page with PayoutDetailsForm as a starting point.
 *
 * Keep in mind that this code might be outdated so make sure you check the current requirements from Stripe and modify the code accordingly.
 *  You can read more about required information from Stripe documentation: https://stripe.com/docs/connect/required-verification-information
 *
 */

import React from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
import { PayoutDetailsForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import { savePayoutDetails, loadData } from './PayoutPreferencesPage.duck';

import css from './PayoutPreferencesPage.css';

export const PayoutPreferencesPageComponent = props => {
  const {
    currentUser,
    scrollingDisabled,
    createStripeAccountError,
    onPayoutDetailsFormChange,
    onPayoutDetailsFormSubmit,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    intl,
  } = props;

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;
  const stripeConnected =
    currentUserLoaded &&
    !!ensuredCurrentUser.stripeAccount &&
    !!ensuredCurrentUser.stripeAccount.id;

  const title = intl.formatMessage({ id: 'PayoutPreferencesPage.title' });
  const formDisabled = !currentUserLoaded || stripeConnected || payoutDetailsSaved;

  let message = <FormattedMessage id="PayoutPreferencesPage.loadingData" />;

  if (currentUserLoaded && payoutDetailsSaved) {
    message = <FormattedMessage id="PayoutPreferencesPage.payoutDetailsSaved" />;
  } else if (currentUserLoaded && stripeConnected) {
    message = <FormattedMessage id="PayoutPreferencesPage.stripeAlreadyConnected" />;
  } else if (currentUserLoaded && !stripeConnected) {
    message = <FormattedMessage id="PayoutPreferencesPage.stripeNotConnected" />;
  }

  const showForm =
    currentUserLoaded && (payoutDetailsSaveInProgress || payoutDetailsSaved || !stripeConnected);
  const form = showForm ? (
    <PayoutDetailsForm
      disabled={formDisabled}
      inProgress={payoutDetailsSaveInProgress}
      ready={payoutDetailsSaved}
      submitButtonText={intl.formatMessage({ id: 'PayoutPreferencesPage.submitButtonText' })}
      createStripeAccountError={createStripeAccountError}
      onChange={onPayoutDetailsFormChange}
      onSubmit={onPayoutDetailsFormSubmit}
      currentUserId={ensuredCurrentUser.id}
    />
  ) : null;

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="PayoutPreferencesPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="PayoutPreferencesPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav currentTab="PayoutPreferencesPage" />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="PayoutPreferencesPage.heading" />
            </h1>
            <p>{message}</p>
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

PayoutPreferencesPageComponent.defaultProps = {
  currentUser: null,
  createStripeAccountError: null,
};

PayoutPreferencesPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  payoutDetailsSaveInProgress: bool.isRequired,
  createStripeAccountError: propTypes.error,
  payoutDetailsSaved: bool.isRequired,

  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsFormSubmit: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { createStripeAccountError } = state.stripe;
  const { currentUser } = state.user;
  const { payoutDetailsSaveInProgress, payoutDetailsSaved } = state.PayoutPreferencesPage;
  return {
    currentUser,
    createStripeAccountError,
    payoutDetailsSaveInProgress,
    payoutDetailsSaved,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onPayoutDetailsFormChange: () => dispatch(stripeAccountClearError()),
  onPayoutDetailsFormSubmit: values => dispatch(savePayoutDetails(values)),
});

const PayoutPreferencesPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(PayoutPreferencesPageComponent);

PayoutPreferencesPage.loadData = loadData;

export default PayoutPreferencesPage;
