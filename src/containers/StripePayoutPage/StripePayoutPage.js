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
import { TopbarContainer } from '..';
import { savePayoutDetails, loadData } from './StripePayoutPage.duck';

import css from './StripePayoutPage.css';

export const StripePayoutPageComponent = props => {
  const {
    currentUser,
    scrollingDisabled,
    // createStripeAccountError,
    // onPayoutDetailsFormChange,
    // onPayoutDetailsFormSubmit,
    // payoutDetailsSaveInProgress,
    // payoutDetailsSaved,
    intl,
  } = props;

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;
  const stripeConnected =
    currentUserLoaded &&
    !!ensuredCurrentUser.stripeAccount &&
    !!ensuredCurrentUser.stripeAccount.id;

  const title = intl.formatMessage({ id: 'StripePayoutPage.title' });

  let message = <FormattedMessage id="StripePayoutPage.loadingData" />;

  if (currentUserLoaded && stripeConnected) {
    message = <p>TODO: show edit verification information</p>;
  } else if (currentUserLoaded && !stripeConnected) {
    message = <FormattedMessage id="StripePayoutPage.stripeNotConnected" />;
  }

  const form = <p>TODO: Connect Onboarding flow</p>;
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
};

StripePayoutPageComponent.propTypes = {
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
  const { payoutDetailsSaveInProgress, payoutDetailsSaved } = state.StripePayoutPage;
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

const StripePayoutPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(StripePayoutPageComponent);

StripePayoutPage.loadData = loadData;

export default StripePayoutPage;
