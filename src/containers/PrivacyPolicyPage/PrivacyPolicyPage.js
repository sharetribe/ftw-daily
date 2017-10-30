import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

const PrivacyPolicyPage = () => {
  const tabs = [
    {
      text: <FormattedMessage id="TermsOfServicePage.privacyTabTitle" />,
      selected: true,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: <FormattedMessage id="TermsOfServicePage.tosTabTitle" />,
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
  ];
  return (
    <StaticPage title="Privacy policy">
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="TermsOfServicePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <p>TODO: Privacy policy</p>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </StaticPage>
  );
};

export default PrivacyPolicyPage;
