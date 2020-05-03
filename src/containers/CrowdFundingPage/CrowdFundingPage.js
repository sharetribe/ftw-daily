import React from "react";
import { StaticPage, TopbarContainer } from "../../containers";
import {
  ContactForm,
  GoogleMap,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  CrowdFundingForm
  // ExternalLink,
} from "../../components";

import css from "./CrowdFundingPage.css";
import banner from "./banner.jpg";
import affiliate from "./affiliate.png";
import paw from "./paw.png";
import img from "./sitters.jpg";

const CrowdFundingPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="We're crowdfunding! | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CrowdFundingPage',
        description: 'Affiliate',
        name: 'CrowdFundingPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
          <div className={css.affiliateWrapper}>
            <img src={banner} />
            <div className={css.imgOverlay}>
              <div className={css.crowdTitle}>
              <h1 className={css.pageTitle}>We’re <i>Crowdfunding</i></h1>
              <p>Pre-register for exclusive early access</p>
              </div>
            </div>
          </div>

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
           <div className={css.wrapFlex}>
             <div className={css.wrapCol}>
              <h1>Don't miss out...</h1>
              <p className={css.wrapP}>
                Over 50% of UK adults own at least one pet, that’s more than 26 million people!
              </p> 
              <p>
                In the USA this figures is almost 67% - a whopping 180 million people!
              </p>
              <p>
                We beta tested our model on over 600 users across 3 continents, and feedback was both Pet Owners and Sitters were wowed! They loved the site – and the concept.
              </p> 
              <p><i><strong>
                “We had a great 2 weeks in Scotland looking after Willow, we loved the walks in the great outdoors and can’t wait for our next pet-sit!” John and Lucy, USA
              </strong></i></p>
              <p>We are now crowdfunding our seed round and would love you to join our tribe.</p>
             </div>

             <div className={css.wrapCol}>
               <h1>Get started now!</h1>
                <CrowdFundingForm />
             </div>
           </div>
          </div>
        </div>

        <div className={css.affiliateSecond}>
          <div className={css.sectionContent}>
            <h1>Pre-register for exclusive early access</h1>
            <h2 className={css.byJoin}>We have big plans for 2020, we’re going to:</h2>
            <ul className={css.affUl}>
              <li>Undertake targeted customer acquisition strategies</li>
              <li>Invest in SEO-boosting, authority building and trust enhancing</li>
              <li>Build brand storytelling that fosters credibility and awareness</li>
              <li>Add new acquisition channels</li>
              <li>Add new industry partnerships</li>
            </ul>
          </div>
        </div>

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
          <h1>Our Partners</h1>
            <h2>Yoti</h2>
            <p>YOTI works by allowing you to set up a trusted, genuine and verified digital identity.</p>
            <h2>Superhog</h2>
            <p>An Insurance backed guarantee working to protect your home and contents for up to £1 million.</p>
            <h2>PawSquad</h2>
            <p>PawSquad lets you video call or text chat with a qualified vet free at any time or day or night, 365 days a year.</p>
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

export default CrowdFundingPage;
