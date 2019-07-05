import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './FaqPage.css';

const FaqPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="FAQ | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FaqPage',
        description: 'Frequently Asked Questions',
        name: 'FaqPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

    <LayoutWrapperMain className={css.staticPageWrapper}>
      <div className={css.sectionContent}>

     <div className={css.mainTitle}>
      <h2>Find the answers to your questions <span>Frequently Asked Questions</span></h2>
       <hr />
     </div>

      <a href="/pet-owner-faq"> 
       <div className={css.faqBg}>
        <div className={css.spanContainer}>
         <span>Pet <span className={css.spanMain}>Owners</span> Corner</span>
        </div>
       </div>
      </a>

      <a href="/pet-sitter-faq"> 
       <div className={css.faqBg2}>
        <div className={css.spanContainer2}>
         <span>Pet <span className={css.spanMain}>Sitter</span> Corner</span>
        </div>
       </div>
      </a>

      <a href="/pet-services-faq"> 
       <div className={css.faqBg3}>
        <div className={css.spanContainer3}>
         <span>Pet <span className={css.spanMain}>Services</span> Corner</span>
        </div>
       </div>
      </a>
       
       </div>
      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FaqPage;
