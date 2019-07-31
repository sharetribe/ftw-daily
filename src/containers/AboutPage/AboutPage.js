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
        description: 'About FindaCrashPad.com',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Find or list the best crash pads in the best places.</h1>
          <img className={css.coverImage} src={image} alt="Finding the best crash pad." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Crash Pads are the go-to solution when you need a cost-effective place to stay when you are reassigned to a new base.</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                FindaCrashPad.com was built by flight crew, for flight crew.
              </h2>

              <p>
                We understand the inconvenience and difficulty that comes along with finding and booking a crash pad when you get assigned to a new base. Crash Pads let you stay comfortably nearby, but they can be difficult to find, book and rent. FindaCrashPad.com was designed to make this process easier for crew members and crash pad owners by facilitating connections and securing the payment process.
              </p>

              <h3 className={css.subtitle}>Have a Crash Pad you want to list?</h3>

              <p>
                Owning a crash pad is a great way to work with flight crew and responsibly act as a landlord [See page on HOW TO]. But it is not without challenges. Keeping fluctuations in vacancy to a minimum is crucial to maintaining your bottom line. List with FindaCrashPad.com and minimize the number of empty beds and logistics problems.
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