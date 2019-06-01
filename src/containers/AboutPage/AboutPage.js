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
import image from './Jam-Spaces.jpg';

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
        description: 'About JAMinTime by Audiobarn',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Experience a jam studio space that fits your needs</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Did you know there are many rehersal jam studios across town?</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                JAMinTime by Audiobarn gives you the fastest and easies way to find and book the right studio for your band or rehearsal needs. 
              </h2>

              <p>
                We collaborate directly with many different studio across town to provide to you a pleasant booking experience. 
              </p>

              <h3 className={css.subtitle}>Are you a jam space/studio/rehersal space owner?</h3>

              <p>
               JAMinTime by Audiobarn Booking System offers you an excellent way to earn online exposure and bring you more clients! 
               Our easy to use booking system will take care of all the booking flow required!
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
