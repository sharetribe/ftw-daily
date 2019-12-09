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
        description: 'About öogo',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>öogo</h1>
          <img className={css.coverImage} src={image} alt="öogo" />

          <div className={css.contentWrapper}>
             <div className={css.contentSide}>
              <p className={css.contentQuote}>Book the Right-Fit Childcare, every time</p>
            </div> 

            <div className={css.contentMain}>
              {/* <h2>
                What is öogo?
              </h2>
              <p>
                öogo is a trusted, intuitive, referral-driven platform for booking childcare.
              </p>
              <h2>
                Why öogo?
              </h2>
              <p>
                öogo was founded by parents who worked across a range of industries from childcare to hospitality so trust is the cornerstone of everything we do and we understand the pressures involved behind the scenes to ensure exceptional guest experiences every time.
              </p>
              <h2>
                Why now?
              </h2>
              <p>
                Young families are increasingly bringing their children on work trips, on multiple holidays and to weddings and conferences. Accessing trusted, reliable childcare locally, which enhances the guest experience, is becoming more important for the hospitality sector.             
              </p>              
              <h2>
                The benefits to hotels:
              </h2>
              <p>
                <b>No more texting and calling to see who is free</b> - select the day and see who is free with one click
              </p>
              <p>
              <b>Flexible Booking</b> - Pre-approve pre-selected minders and babysitters or direct guests to the application and let them chose themselves see who is free with one click
              </p>
              <p>
              <b>No upfront fee</b> - a booking fee is taken once the right-fit babysitter is selected and the job completed to the satisfaction of the guests and the hote
                see who is free with one click
              </p>
              <p>
              <b>Fully insured</b> - öogo’s platform and jobs booked through it are fully insured giving parents, minders and hotels piece of mind
              </p>
              <p>
                <b>24 hour customer care</b> - if something does go wrong, there is a trained network of experienced minders on hand to pick up the phone
              </p>
              <p>
                <b>Onsite Training</b> - Two week trial available with on-site guidance to ensure a smooth transition to the öogo platform
              </p>
              <p>
                <b>Make öogo work for you</b> - tell öogo what you want - you know your guests best so give öogo the right profile of minders for your hotel and öogo will find and vet them for you
              </p>
              <p>
                <b>Make babysitting a strength</b> - Suggest to guests and event coordinators at the time of booking that there is exceptional babysitting available to enhance the guest experience and use triggers to notify parents of this service if a family room is booked or a cot requested            
              </p>              
              <h2>How does öogo work?</h2>
              <p>Select the the day you need a baby-sitter for by location, browse available babysitters and book the right-fit person for the job</p>
              <ol className={css.contentListNumbered}>
                <li><p>
                  <b>Browse:</b> vetted minders - see only who is available and use the smart-filters for targeted searching</p>
                </li>
                <li><p><b>Book:</b> the right-fit minder with instant book or send them a message if you have a question</p></li>
                <li><p><b>Pay:</b> online - no having to remember cash or tips</p></li>
                <li><p><b>Review:</b> leave a review for the next guest</p></li>
              </ol>
              <h2>Events</h2>
              <ul className={css.contentList}>
                <li><p>See what minders are available for a wedding or event with just one click</p></li>
                <li><p>Send event coordinators or wedding parties a link to available minders</p></li>
                <li><p>No more emailing lists of mobile numbers or calling around to see who is free</p></li>
                <li><p>Choose from minders that do overnights and look after large groups of children with activities</p></li>
              </ul>
              <h2>Trust is everything</h2>
              <p>
              <ul className={css.contentList}>
                <li><p>öogo minders are öogo vetted</p></li>
                <li><p>öogo minders are rated and reviewed after each job</p></li>
                <li><p>öogo minders represent a wide range of personalities from students to grandmothers and maternity nurses to montessori teachers</p></li>
                <li><p>öogo is minder focused. If the minders are well looked after, the children are well looked after which means happy parents and, ultimately, happy hotels.</p></li>
              </ul>
              </p>
              <blockquote className={css.contentQuote}><p>
                “our business is to enhance your guest’s experience”
                it’s not enough that the baby-sitting job goes well - öogo sets out to match the right-fit minders for each job ensuring the babysitting service becomes a positive talking point after the stay.
                </p>
              </blockquote>
              <p>The öogo platform is fully GDPR compliant and is hosted through Finish company, ShareTribe’s, platform with data securely stored on AWS.</p>
              <p id="contact">
                <ExternalLink href="https://öogo.me">öogo.me</ExternalLink> / <ExternalLink href="mailto:hello@öogo.me">hello@öogo.me</ExternalLink> / <ExternalLink href="help@öogo.me">help@öogo.me</ExternalLink> / <ExternalLink href="tel:18000000000">1800 xxx xxx</ExternalLink>
              </p> */}
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
