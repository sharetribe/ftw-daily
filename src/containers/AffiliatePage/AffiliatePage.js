import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  ContactForm,
  GoogleMap,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  // ExternalLink,
} from '../../components';

import css from './AffiliatePage.css';
import dogs from './dogs.jpg';
import affiliate from './affiliate.png';
import paw from './paw.png';
import img from './sitters.jpg';

const AffiliatePage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Affiliate | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AffiliatePage',
        description: 'Affiliate',
        name: 'AffiliatePage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
          <div className={css.affiliateWrapper}>
            <img src={dogs} />
            <div className={css.imgOverlay}>
              <h1 className={css.pageTitle}>Join the <i>Trust My Pet Sitter</i><br />Affiliate Program</h1></div>
          </div>

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
           <div className={css.wrapFlex}>
             <div className={css.wrapCol}>
              <div className={css.imgHolder}>
                <img src={affiliate} />
              </div>
              <h2>What is an affiliate program?</h2>
              <p className={css.wrapP}>The <strong>Trust My Pet Sitter</strong> affiliate programme is a great way for other website owners to introduce their customers to the world of pet sitting.</p>
                <p>Maybe we have similar customers <i>(pet owners)</i> and non-competing products? 
                It’s a great way to add value to your site and to your customers.</p>
                
<section className={css.flexSection}>
  <div className={css.flex}>
    <div className={css.circle}>1</div>
    <span className={css.textpadding}>Sign up for free</span>
  </div>
  <div className={css.flex}>
    <div className={css.circle}>2</div>
    <span className={css.textpadding}>Choose what to advertise</span>
  </div>
  <div className={css.flex}>
    <div className={css.circle}>3</div>
    <span className={css.textpadding}>Up to 30% commission for all sales</span>
  </div>
</section>

<p className={css.jNow}><ExternalLink href="https://www.shareasale.com/shareasale.cfm?merchantID=86799">Join Now »</ExternalLink></p>


             </div>

             <div className={css.wrapCol}>
             <div className={css.imgHolder}>
                <img src={paw} />
              </div>
               <h2>What does Trust My Pet Sitter do?</h2>
               <p className={css.wrapP}>If you imagine an Air Bnb for pets, that’s pretty much us in a nutshell! We make the introduction between <strong>Pet Owners</strong> and <strong>Pet Sitters</strong> and <strong>Services</strong>. If you are a <strong>Pet Owner</strong> who wants their pet to stay in their own home whilst they are away, you can find an ID verified Pet Sitter with us.</p>
              <p>If you are a <strong>Pet Sitter</strong> you can travel the world getting paid to look after other people’s pets in their own home. One week you could be in Paris, the next London!</p>
              <p>We’ve also opened up a whole new directory for <strong>Pet Services</strong> to showcase their products to the Pet Owner market.  Maybe you are a pet groomer or dog walker who appeals to a local market, or a pet food supplier who has national reach.</p>
             </div>
           </div>
          </div>
        </div>

        <div className={css.affiliateSecond}>
          <div className={css.sectionContent}>
            <h1>What do we look for in an affiliate?</h1>
            <p>We are always looking to build exciting new partnerships to help us introduce <strong>Trust My Pet Sitter</strong> to a new audience, and especially those who share our passion for pets and travel.</p>
            <p>The <strong>Trust My Pet Sitter</strong> affiliate programme is a great way to earn a commission, simply by sharing your passion. </p>
            <p>You can enjoy the rewards that come from being part of the <strong>Trust My Pet Sitter</strong> Community —  you can get started straight away!</p>
          </div>
        </div>

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
            <h1>What Can I Earn?</h1>
            <h2 className={css.byJoin}>By joining our affiliate programme you can benefit from the following:</h2>
            <ul className={css.affUl}>
              <li>Up to 30% commission for all sales</li>
              <li>£40 ($55) average order value, with a strong website conversion rate</li>
              <li>Additional incentives for driving leads, as well as sales</li>
              <li>Regular, reliable commission payments</li>
              <li>A broad selection of banners and text links</li>
              <li>Regular updates from Trust My Pet Sitter</li>
              <li>A dedicated affiliate management team to help</li>
            </ul>
          </div>
        </div>

        <div className={css.affiliateSecond}>
          <div className={css.sectionContent}>
            <h1>How Do I Sign Up?</h1>
            <p>The <strong>Trust My Pet Sitter</strong> affiliate programme is managed via <strong>Shareasale.com</strong> (Part of AWIN.com)</p>
            <p className={css.difMar}>Just click on the button below to register and request to become a <strong>Trust My Pet Sitter</strong> affiliate.</p>
            <div>
            <ExternalLink href="https://www.shareasale.com/shareasale.cfm?merchantID=86799">
            <button className={css.start}>Start Now</button>
            </ExternalLink>
            </div>
          </div>
        </div>

        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
            <h1>What Happens then?</h1>
            <p>Once you’ve successfully signed up to become a <strong>Trust My Pet Sitter</strong> affiliate, you’ll be able to download our creatives and make your own unique tracking links.</p>
            <h2 className={css.bestPlace}>Where are the best places for my links?</h2>
            <ul className={css.affUl}>
              <li>Place or Embed them into your website — they tend to work best within a blog post or any piece of content related to pets, travel, houses, pet sitting and pet services.</li>
              <li>Include the links in your newsletter with a few lines of content</li>
              <li>Share on a Facebook post, share us with your followers</li>
              <li>Add to your Instagram bio or include in a story</li>
              <li>Pinterest link – could be great places to travel watching pets!</li>
              <li>Post a Tweet</li>
            </ul>
          </div>
        </div>

        <div className={css.affiliateLast}>
          <div className={css.sectionContent}>
            <h1>It’s that Easy!</h1>
            <p>Now, whenever someone clicks your tracking link and chooses to join <strong>Trust My Pet Sitter</strong> you will earn a 30% commission.  It’s one of the highest commissions you will see and it's really that easy.</p>
            <p>Go find those Pet People!</p>
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

export default AffiliatePage;

