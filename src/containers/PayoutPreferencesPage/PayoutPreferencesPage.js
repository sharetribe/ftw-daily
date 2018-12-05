import React from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { stripeAccountClearError } from '../../ducks/user.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
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
  const { stripeConnected } = ensuredCurrentUser.attributes;

  const tabs = [
    {
      text: <FormattedMessage id="PayoutPreferencesPage.contactDetailsTabTitle" />,
      selected: false,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="PayoutPreferencesPage.passwordTabTitle" />,
      selected: false,
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
    {
      text: <FormattedMessage id="PayoutPreferencesPage.paymentsTabTitle" />,
      selected: true,
      linkProps: {
        name: 'PayoutPreferencesPage',
      },
    },
  ];

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

  const handlePayoutDetailsSubmit = values => {
    const { fname: firstName, lname: lastName, ...rest } = values;
    onPayoutDetailsFormSubmit({ firstName, lastName, ...rest });
  };

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
      onSubmit={handlePayoutDetailsSubmit}
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
        <LayoutWrapperSideNav tabs={tabs} />
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
  const { createStripeAccountError, currentUser } = state.user;
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
