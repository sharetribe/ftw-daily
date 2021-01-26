import React from 'react';
import config from '../../config';
import { InstagramPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './MobilePage.css';

import { string } from 'prop-types';

const MobilePage = ({ title }) => {

  /*
  Title is a temporary prop which is used by HelpPage, FAQPage, KontaktPage, CommunityPage at routeConfiguration.
  These pages have not been created yet, so AboutePage is used instead as a temporary component.
  After befomentioned pages are created title prop have to be deleted.
  */
  const { siteTwitterHandle, siteFacebookPage } = config;

  // prettier-ignore
  return (
    <StaticPage
      title={ title || "About Us" }
      schema={{
        '@context': 'http://schema.org',
        '@type': 'MobilePage',
        description: 'Mobile page for HorseDeal24',
        name: 'Mobile page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Mobile page</h1>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

MobilePage.defaultProps = {
  title: null
};

MobilePage.propTypes = {
  title: string
};

export default MobilePage;
