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
  CommunityGuidelines,
  Footer,
} from '../../components';
import config from '../../config';

import css from './CommunityGuidelinesPage.css';

const CommunityGuidelinesPageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.communityguidelinesTabTitle' }),
      selected: false,
      linkProps: {
        name: 'CommunityGuidelinesPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.feesTabTitle' }),
      selected: true,
      linkProps: {
        name: 'FeesPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.cancellationpolicyTabTitle' }),
      selected: true,
      linkProps: {
        name: 'CancellationPolicyPage',
      },
    },        
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.privacyTabTitle' }),
      selected: true,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.tosTabTitle' }),
      selected: true,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'CommunityGuidelinesPage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="CommunityGuidelinesPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="CommunityGuidelinesPage.heading" />
            </h1>
            <CommunityGuidelines />
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

CommunityGuidelinesPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const CommunityGuidelinesPage = compose(
  connect(mapStateToProps),
  injectIntl
)(CommunityGuidelinesPageComponent);

export default CommunityGuidelinesPage;
