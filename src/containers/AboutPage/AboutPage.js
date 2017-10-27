import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink
} from '../../components';

import css from './AboutPage.css';
import image from './about-us.jpg';

const AboutPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="About Us"
      schema={`
        {
          "@context": "http://schema.org",
          "@type": "AboutPage",
          "description": "Description of this page",
          "name": "About page",
        }
      `}
    >
      <LayoutSingleColumn>

        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>It&#8217;s about Saunatime.</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>

            <div className={css.contentSide}>
              <p>"We built Saunatime because we didn't have a sauna in our apartment building."</p>
            </div>

            <div className={css.contentMain}>
              <h2>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</h2>

              <h3>Tortor mauris condimentum</h3>

              <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>

              <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

              <h3>Get in touch</h3>
              <p>We are happy to help you in anything you have in your mind.?Best way to reach us is by emailing us at <ExternalLink href="mailto:hello@saunatime.io?Subject=Hello%20friends">hello@saunatime.io</ExternalLink>.</p>
              <p>You can also checkout our <ExternalLink href="https://www.facebook.com/Sharetribe/">Facebook</ExternalLink> and <ExternalLink href="https://twitter.com/sharetribe">Twitter</ExternalLink>.</p>
            </div>
          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>

      </LayoutSingleColumn>
    </StaticPage>
  );
}

export default AboutPage;