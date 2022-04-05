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
                More and more, we’re seeing that professionals from around the world are wanting to work on their own terms, in a place that best suits them. Meanwhile business owners are looking to make the most out of their underused space.  
              </p>
              <p>
                At HotPatch, we work hard to bridge the gap between those seeking a flexible space to work from and those with space available. Whether you’re a flexible worker, or a business looking to benefit from the burgeoning space-sharing economy, this is where we come in.
              </p>

              <h2>Make Space Work for You</h2>

              <p>In order to remove the disconnect between those with space and those who need it, we are offering a dependable platform that’s easy to use and completely transparent.</p>

              <p>There’s no multi-page enquiry shenanigans here, we let users get straight to browsing our incredible offering of Patches and booking them as quickly as possible. HotPatch are dedicated to making space work for you with as few obstacles as possible.</p>

              <p>Maybe you’re a fitness professional or a hairdresser? An events planner, artist, or photographer? Perhaps a business owner who wants to bring in more income from their awesome space? We’re here to help.</p>

              <p>Have any questions? Head over to our <a href="https://www.hotpatch.com/faq">FAQ</a> or reach out to the HotPatch team at <a href="mailto:hello@hotpatch.com.">hello@hotpatch.com</a>.</p>

              <h2>Our Story</h2>

              <p>In 2019 we realised that many professionals who rented or owned space only required it on a flexible basis, but were stuck with paying high monthly or even yearly costs for the space they want.</p>

              <p>HotPatch was born as a way of giving people access to space on far more flexible terms, and likewise helping space owners earn additional income by making their space available to others when they aren’t using it.</p>

              <p>Now more than 2 years old, HotPatch has helped people find spaces to work from all over the country.</p>

              <p>We have big ambitions for the future; we're looking to continuously add new, exciting Patches and expand to as many locations as possible around the country to ensure there is a perfect Patch near you, for whatever you need.</p>

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
