import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  TermsOfService,
} from '../../components';

import css from './TermsOfServicePage.css';

const TermsOfServicePageComponent = props => {
  const { logoutError, scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.tosTabTitle' }),
      selected: true,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
  ];
  const title = intl.formatMessage({ id: 'TermsOfServicePage.title' });
  return (
    <Page title={title} logoutError={logoutError} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="TermsOfServicePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="TermsOfServicePage.heading" />
            </h1>
            <TermsOfService />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

TermsOfServicePageComponent.defaultProps = {
  logoutError: null,
};

const { bool } = PropTypes;

TermsOfServicePageComponent.propTypes = {
  logoutError: propTypes.error,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { logoutError } = state.Auth;
  return {
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const TermsOfServicePage = compose(connect(mapStateToProps), injectIntl)(
  TermsOfServicePageComponent
);

export default TermsOfServicePage;
