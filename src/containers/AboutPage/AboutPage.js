import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';

import css from './AboutPage.module.css';

const AboutPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Hotpatch',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
      </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About us</h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <h2>
                Discover HotPatch, the space-sharing platform that allows you to book the space you need, whenever you need it.
              </h2>

              <p>
                More and more, we’re seeing that people from around the world are wanting to rent space on their own terms, in a place that best suits them. Meanwhile space owners and operators are looking to make the most out of their underused space.  
              </p>
              <p>
                At HotPatch, we work hard to bridge the gap between those seeking flexible space on demand and those with space available.
              </p>

              <h2>Make Space Work for You</h2>

              <p>In order to remove the disconnect between those with space and those who need it, HotPatch offers a dependable platform that’s easy to use and transparent.</p>

              <p>There’s no multi-page enquiry shenanigans here. Get straight to browsing the incredible offering of Patches and booking them as quickly as possible. HotPatch is dedicated to making space work for you with as few obstacles as possible.</p>

              <p>Maybe you’re a fitness professional or a hairdresser? An events planner, artist, or photographer? Perhaps a business owner who wants to bring in more income from their awesome space? We’re here to help.</p>

              <p>Have any questions? Head over to our <a href="https://www.hotpatch.com/faq">FAQ</a> or reach out to the HotPatch team at <a href="mailto:hello@hotpatch.com.">hello@hotpatch.com</a>.</p>

              <br></br>

              <NamedLink
                name="LandingPage"
                className={css.heroButton}
              >
                Get started now
              </NamedLink>

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
