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

import css from "./WeVetPage.css";
import banner from "./banner.jpg";
import pawsquad from "./pawsquad.png";
import superhog from "./superhog.jpg";
import yoti from "./yoti.jpg";

const WeVetPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="What makes us different | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WeVetPage',
        description: 'Affiliate',
        name: 'WeVetPage',
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
            <h1 className={css.pageTitle}>We are Pet People first and foremost,<br />not Tech People</h1>
            <p className={css.HowWeDoIt}>You could say that’s what sets up out from the crowd. What makes us different.</p>
            <p>When we were creating Trust My Pet Sitter we didn’t want just anyone to watch our pets, we wanted to be sure Pet Sitters were right for us – and our pets. So how did we do that?</p>
            <p className={css.HowWeDoItP}>We looked at what safeguards we’d need to protect our owners their pets and our sitters. We teamed up with the best partners, who shared a common vision of being the best at what they do, helping to protect you and offer peace of mind for all pet sitting experiences - on both sides.</p>
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

        
        <div className={css.affiliateFirst}>
          <div className={css.sectionContent}>
            <div className={css.weSec}>
            <h1>What makes us Different?</h1>
            <h2>Backup</h2>
            <p>Choosing Pet Sitting as a career means professionals are familiar with a wide variety of pets and unlike non-professionals or family and friends, they have the proper experience to handle different situations. We back them up with Virtual Vet available 24/7 to answer questions and provide advice, in addition to our Property, Public Liability and Damage Insurance. They’ve also got a member of our team at the end of a phone when they need us.</p>
            <hr />
            <h2>Responsibility</h2>
            <p>Professional Pet Sitters have a responsibility to look after their clients’ property and be on the front line, should an emergency occur. That’s why we provide an Insurance backed guarantee and Public Liability for up to £1m</p>
            <hr />
            <h2>Professional</h2>
            <p>Some new clients are worried about letting a stranger into their home. This is a legitimate concern, but it’s good to keep in mind that Professional Pet Sitters are like Home Cleaners, Nanny’s, Real Estate Agents, Trade workers, and Contractors. It is an intricate part of their job to visit and enter people’s homes, and part of what they do every day. We provide the added peace of mind with Digital ID Verification and an Insurance backed guarantee for up to £1m. A Professional Pet Sitter will always be respectful of their clients’ property and belongings.</p>
            <hr />
            <h2>Personal Approval</h2>
            <p>We don’t just rely on computer algorithms; a member of our team personally approves every Pet Sitter and we keep a close eye on reviews too.</p>
            <hr />
            <h2>Reliability</h2>
            <p>Some people still believe that asking friends, neighbours or a family member is a better option. The truth is, not a lot of people enjoy driving across town after work, on the weekends or on special days like Christmas to go scoop the litter box of someone else’s cat.</p>
            <p>But let’s say you did manage to secure a friend or family member to care for your pets and are certain they won’t bail on you. You think your pets are in good hands. Are you sure?</p>
            <p>Does your home insurance cover you for damages? Do they have 24/7 Vet Advice? Are they able to fulfil the schedule your pet needs?</p>
            <p>Our Professional Pet Sitters come with all the advantages and none of the disadvantages. You tell them when you need them, what you need them to do, and you get peace of mind by taking advantage of our Insurance backed guarantees.</p>
            <hr />
            <h2>Insured</h2>
            <p><strong><i>“If you think hiring a professional is expensive, wait until you hire an amateur”</i>, Red Adair</strong></p>
            <p>If you are looking for the least expensive service you can find, then we are not for you. The girl next door, a close neighbour or a browse through Facebook you will certainly find a cheaper option.</p>
            <p>You’ll get what you pay for, by way of peace of mind, professional quality service, experience and accountability. Our Professional Pet Sitters are fully insured and come with a £1m guarantee.</p>
            <p>Have we been able to convince you to hire a Professional Pet Sitter?
If not, tell us why! To us, there’s no substitute for the quality of pet care and peace of mind our clients receive by signing a professional. If you’re still hesitant, <NamedLink name="ContactPage">let us know</NamedLink>, we’d love to talk to you about it.</p>
            </div>
<div className={css.weV}>
  <NamedLink name="SignupPage">
    <Button>Join Now</Button>
  </NamedLink>
</div>
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

export default WeVetPage;
