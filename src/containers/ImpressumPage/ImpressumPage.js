import React from 'react';
import { TopbarContainer } from '../../containers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Impressum,
} from '../../components';

import css from '../TermsOfServicePage/TermsOfServicePage.css';


const ImpressumPageComponent = ({intl, scrollingDisabled}) => {
  const siteTitle = "Impressum";
  const schemaTitle = intl.formatMessage({ id: 'PrivacyPolicyPage.schemaTitle' }, { siteTitle });
  
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  const tabs = [
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.tosTabTitle' }),
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'Impressum.Impressum' }),
      selected: true,
      linkProps: {
        name: 'ImpressumPage',
      }
    }
  ];

  return (
    <Page title={"Impressum"} schema={schema} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="ImpressumPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="Impressum.Impressum" />
            </h1>
           <Impressum />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};
const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const ImpressumPage = compose(
    injectIntl,
    connect(mapStateToProps)
  )
  (ImpressumPageComponent);

export default ImpressumPage;