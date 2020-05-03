import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,

} from '../../components';

import css from './PetServicesPage.css';
import image from './signup.jpg';

const PetServicesPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Pet Services FAQ | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetServicesPage',
        description: 'Frequently Asked Questions',
        name: 'PetServicesPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

    <LayoutWrapperMain className={css.staticPageWrapper}>
      <div className={css.sectionContent}>
       <div className={css.pageInfo}>

        <div>
         <span>Pet Services Corner</span>
        </div>

        <div>
         <span><span id="bread-active"><a id="bread-back" href="/faq">Faq</a></span> <span className={css.breadArrow}>></span> <span id="bread-active"><a href="pet-services-faq">Pet Services</a></span></span>

         <span>Last updated July 7,2019</span>
        </div>

       </div>
        <div className={css.faqRow}>

      <div className={css.leftAnchors}>
        <div className={css.stickyAnchors}>
          <ul id="stickyul">
            <li>1. <a href="#openOne">How do I become a Pet Services Member?</a></li>
            <li>2. <a href="#openTwo">Is Trust My Pet Sitter free?</a></li>
            <li>3. <a href="#openThree">What Pet Services do you accept?</a></li>
            <li>4. <a href="#openFour">Where do you advertise Pet Services?</a></li>
          </ul>
        </div>
      </div>

        <div className={css.rightContent}>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>


          <div id="openOne" className={css.wrapCollabsible}>
            <input id="collapsible1" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible1" className={css.lblToggle}><span className={css.collapsibleTitle}>1. How do I become a Pet Services Member?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  It's free to get started as a Pet Services Member. Just click the "Sign Up" button below or the link on the Navigation Bar above.
                </p>

                <p>
                  You can choose to Login with Facebook, Linkedin or by Email.
                </p>

                <img className={css.coverImage} src={image} alt="Sign up image." />
                
                <p>
                  You'll land on our Sign Up page and can choose to sign up with Facebook, Linkedin or by Email.
                </p>

              </div>
            </div>
          </div>

          <div id="openTwo" className={css.wrapCollabsible}>
            <input id="collapsible2" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible2" className={css.lblToggle}><span className={css.collapsibleTitle}>2. Is Trust My Pet Sitter free?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Yes! Signing up for a Trust My Pet Sitter account is absolutely free.
                </p>

                <p>
                  Once you begin earning money by providing Pet Services to Trust My Pet Sitter pet parents, you'll take home 90% of your earnings from each booking. The fees deducted from your rate cover our IT Infrastructure, Support Teams and Advertising.
                </p>

              </div>
            </div>
          </div>

           <div id="openThree" className={css.wrapCollabsible}>
            <input id="collapsible3" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible3" className={css.lblToggle}><span className={css.collapsibleTitle}>3. What Pet Services do you accept?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  The Pet Services advertised at Trust My Pet Sitter are Dog Walking, Dog Training, Pet Grooming and Drop-in Pet Sitting.
                </p>

                <p>
                  Sorry, we don't accept Dog Boarding Services where pets go to another persons home.
                </p>

              </div>
            </div>
          </div>

          <div id="openFour" className={css.wrapCollabsible}>
            <input id="collapsible4" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible4" className={css.lblToggle}><span className={css.collapsibleTitle}>4. Where do you advertise Pet Services?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  When you add a new pet listing at Trust My Pet Sitter it is automatically seen on our website as well as inclusion in our Newsletter to all subscribed Pet Members.
                </p>

                <p>
                  Any new Pet Service members will be automatically seen on our social media platforms.
                </p>

              </div>
            </div>
          </div>

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

export default PetServicesPage;
