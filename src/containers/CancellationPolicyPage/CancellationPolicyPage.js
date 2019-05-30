import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  CancellationPolicy,
  Footer,
} from '../../components';
import config from '../../config';

import css from './CancellationPolicyPage.css';

const CancellationPolicyPageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'CancellationPolicyPage.communityguidelinesTabTitle' }),
      selected: true,
      linkProps: {
        name: 'CommunityGuidelinesPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CancellationPolicyPage.feesTabTitle' }),
      selected: true,
      linkProps: {
        name: 'FeesPage',
      },
    },    
    {
      text: intl.formatMessage({ id: 'CancellationPolicyPage.cancellationpolicyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'CancellationPolicyPage',
      },
    },    
    {
      text: intl.formatMessage({ id: 'CancellationPolicyPage.privacyTabTitle' }),
      selected: true,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CancellationPolicyPage.tosTabTitle' }),
      selected: true,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'CancellationPolicyPage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="CancellationPolicyPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="CancellationPolicyPage.heading" />
            </h1>
            <CancellationPolicy />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

CancellationPolicyPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const CancellationPolicyPage = compose(
  connect(mapStateToProps),
  injectIntl
)(CancellationPolicyPageComponent);

export default CancellationPolicyPage;
