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

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Bunji boards',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Making adventure accessible to all.</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Did you know the average surfer has 4 surfboards!</p>
            </div>

            <div className={css.contentMain}>
              <h2>
              Hi We’re Bunji Boards, an online community of adventurers, sharing gear with our peers.
              </h2>

              <p>
              Our mission is to create the biggest international community of adventurers who support local and environmental organisations.
              </p>
              <p>
              Why ‘Bunji’?
              </p>
              <p>
              Bunji is aboriginal slang for ‘mate’.  As an Australian founded company we believe celebrating and learning from indigenous practices and culture is crucial in finding solutions to our current environmental crisis.
              </p>

              <h3 className={css.subtitle}>Our values</h3>

              <p>
              o	Responsibility: Here at Bunji Boards we believe everybody has a responsibility to mother nature and we actively embrace this responsibility by raising our voice on the issues that matter.
             </p>
             <p>
              o	Community: Bunji boards was founded on the concept of forming an international community of adventurers worldwide.
              </p>
              <p>
              o	Fun: Having fun is really important. So have fun, be spontaneous, seize the day
              </p>

              <h3 id="contact" className={css.subtitle}>
                Get involved
              </h3>
              <p>
              </p>
              <p>
                You can also checkout our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink>.
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

export default AboutPage;
