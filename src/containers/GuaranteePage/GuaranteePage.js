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
  CrowdFundingForm,
  NamedLink,
  Button,
  // ExternalLink,
} from "../../components";

import css from "./GuaranteePage.css";
import banner from "./banner.jpg";
import pawsquad from "./pawsquad.png";
import superhog from "./superhog.jpg";
import yoti from "./yoti.jpg";

const GuaranteePage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="What makes us different | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'GuaranteePage',
        description: 'Affiliate',
        name: 'GuaranteePage',
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
              <h1 className={css.pageTitle}>We’ve Raised the Bar</h1>
              <p>We don't let just anyone watch our pets</p>
              </div>
            </div>
          </div>

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
            <h1 className={css.pageTitle}>Our Guarantees</h1>
            <p className={css.HowWeDoIt}>We looked at what safeguards we’d need to protect our owners their pets and our sitters.</p>
            <p>We teamed up with the best partners, who shared a common vision of being the best at what they do, helping to protect you and offer peace of mind for all pet sitting experiences - on both sides.</p>
          </div>
        </div>

        <div className={css.affiliateSecond}>
          <div className={css.sectionContent}>
          <h1>Key Points</h1>
            <ul>
              <li>£1m property damage and £1m public liability protection</li>
              <li>Damages deposit up to £1000 per pet sit</li>
              <li>Secure PCI Level 1 Payment Gateway to protect your transactions</li>
              <li>Free ID check – Fast, accurate and free ID verification tool</li>
              <li>24/7 Virtual Vet Advice for all Pet Sitters staffed by UK qualified Veterinary Surgeons</li>
            </ul>
          </div>
        </div>

<hr className={css.myHr} />

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
            <h1>Our Trusted Partners</h1>
            <div className={css.partnersGrid}>
            <div className={css.partnersItem}>
                <div className={css.partnersImg}>
                  <img src={yoti} />
                </div>
                <div className={css.partnersContent}>
                  <p><h2>YOTI</h2></p>
                  <p>YOTI works by allowing you to set<br />up a trusted, genuine and verified<br />digital identity.</p>
                  <p><NamedLink className={css.learnMore} name="YotiPage">Learn more →</NamedLink></p>
                </div>
              </div>
              <div className={css.partnersItem}>
                <div className={css.partnersImg}>
                  <img src={superhog} />
                </div>
                <div className={css.partnersContent}>
                  <p><h2>Superhog</h2></p>
                  <p>An Insurance backed guarantee<br />working to protect your home and<br />contents for up to £1 million.</p>
                  <p><NamedLink className={css.learnMore} name="SuperHogPage">Learn more →</NamedLink></p>
                </div>
              </div>
              <div className={css.partnersItem}>
                <div className={css.partnersImg}>
                  <img src={pawsquad} />
                </div>
                <div className={css.partnersContent}>
                  <p><h2>Pawsquad</h2></p>
                  <p>PawSquad lets you video call or<br />text chat with a qualified vet free at any<br />time or day or night, 365 days a year.</p>
                  <p><NamedLink className={css.learnMore} name="PawSquadPage">Learn more →</NamedLink></p>
                </div>
              </div>
            </div>
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

export default GuaranteePage;
