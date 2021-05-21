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
                Your Workspace, Unleashed!
              </h2>

              <p>
                Around the world, we are seeing more and more professionals looking for flexible working space
                on their own terms and business owners who want to make sure they are getting the best use out of their space.  
              </p>
              <p>
                There’s currently a huge gap between those seeking this independence and those with the space
                available. At HotPatch, we are working hard to fix that.
              </p>

              <h2>Make Space Work</h2>

              <p>Discover HotPatch, the space-sharing platform for the modern workforce.</p>

              <p>HotPatch brings Patch Users and Patch Hosts together. Our ambition is to remove
              the disconnect between those with space and those who need it, by offering a
              trustworthy platform that’s easy to use and transparent.</p>

              <p>Maybe you’re a fitness professional or a hairdresser? Maybe you are a tattoo artist
              or beautician? Perhaps a business owner who wants to make the most of their
              awesome space?</p>

              <p>HotPatch has you covered.</p>

              <p>Forget empty and underused workspaces for your business. Forget hours wasted
              on Craigslist and GumTree looking for the ideal Patch to work from. It’s time to
              Make Space Work!</p>

              <p>Have any questions about Making Space Work? Head over to our FAQ or reach out
              to the HotPatch team at <a href="mailto:hello@hotpatch.com.">hello@hotpatch.com.</a></p>

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
