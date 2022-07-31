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

import css from './FAQPage.module.css';
import image from './sio-v1-newbackground0.jpg';



const FAQPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Frequently Asked Questions"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FAQPage',
        description: 'Frequently Asked Questions',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Frequently Asked Questions</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Can't find what you're looking for? Please, <a href="mailto:admin@ridewithsio.com">send us an email</a>, and we will promptly respond. </p>
            </div>

            <div className={css.contentMain}>
              <h2>
        FAQ 1
              </h2>

              <p>
        FAQ 2
              </p>

              <h3 className={css.subtitle}>A title</h3>

              <p>
       FAQ 3
              </p>



            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FAQPage;
