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

import css from './PortugalCategoryPage.css';
import image from './about-us-1056.jpg';
import json from './PortugalCategoryPage.json';

const PortugalCategoryPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const title = json.title;
  const description = json.description;
  const videoEmbed = json.videoEmbed;
  const ingress = json.ingress;
  const content = json.content;
  const sidecontent = json.sidecontent;
  const altText = json.altText;



  // prettier-ignore
  return (
    <StaticPage
      title={title}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Portugal',
        description: {description},
        name: {title},
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>{title}</h1>
          <img className={css.coverImage} src={image} alt="{altText}" />


          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>{sidecontent}</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                {ingress}
              </h2>
              
              {content.map(s => (<p>{s}</p>))}
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

export default PortugalCategoryPage;
