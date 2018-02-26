import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
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
import { TopbarContainer } from '../../containers';

import css from './PayoutPreferencesPage.css';

export const PayoutPreferencesPageComponent = props => {
  const { currentUser, scrollingDisabled, intl } = props;

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;
  const { stripeConnected } = ensuredCurrentUser.attributes;

  const tabs = [
    {
      text: <FormattedMessage id="PayoutPreferencesPage.emailTabTitle" />,
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

  let content = (
    <p>
      <FormattedMessage id="PayoutPreferencesPage.loadingData" />
    </p>
  );

  if (currentUserLoaded && stripeConnected) {
    content = <p>Stripe connected: yes</p>;
  } else if (currentUserLoaded && !stripeConnected) {
    content = <p>Stripe connected: false</p>;
  }

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
            {content}
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
};

PayoutPreferencesPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { currentUser } = state.user;
  // const {} = state.PayoutPreferencesPage;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({});

const PayoutPreferencesPage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  PayoutPreferencesPageComponent
);

export default PayoutPreferencesPage;
