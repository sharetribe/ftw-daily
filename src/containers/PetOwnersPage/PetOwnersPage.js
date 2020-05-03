import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  
} from '../../components';

import css from './PetOwnersPage.css';
import image from './signup.jpg';

const PetOwnersPage = () => {
  

  // prettier-ignore
  return (
    <StaticPage
      title="Pet Owners FAQ | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetOwnersPage',
        description: 'Frequently Asked Questions',
        name: 'PetOwnersPage',
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
         <span>Pet Owners Corner</span>
        </div>

        <div>
         <span><span id="bread-active"><a id="bread-back" href="/faq">Faq</a></span> <span className={css.breadArrow}>></span> <span id="bread-active"><a href="pet-owner-faq">Pet Owners</a></span></span>

         <span>Last updated July 7,2019</span>
        </div>

       </div>
        <div className={css.faqRow}>

      <div className={css.leftAnchors}>
        <div className={css.stickyAnchors}>
          <ul id="stickyul">
            <li>1. <a href="#openOne">How do I become a Pet Owner Member?</a></li>
            <li>2. <a href="#openTwo">Is Trust My Pet Sitter free?</a></li>
            <li>3. <a href="#openThree">Dog Walking | Dog Grooming | Drop-in Pet Sitter</a></li>
            <li>4. <a href="#openFour">Are you registered Pet Sitters ID verified?</a></li>
            <li>5. <a href="#openFive">Do you accept all Pets, and not just Dogs?</a></li>
            <li>6. <a href="#openSix">Where you advertise Pet Sits?</a></li>
            <li>7. <a href="#openSeven">Can I be both a Pet Owner and a Pet Sitter?</a></li>
            <li>8. <a href="#openEight">What if I have specific skills or experience to ask of my Pet Sitter?</a></li>
            <li>9. <a href="#openNine">Is Trust My Pet Sitter right for my pet?</a></li>
          </ul>
        </div>
      </div>

        <div className={css.rightContent}>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>


          <div id="openOne" className={css.wrapCollabsible}>
            <input id="collapsible1" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible1" className={css.lblToggle}><span className={css.collapsibleTitle}>1. How do I become a Pet Owner Member?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Just click the "Sign Up" button below or the link on the Navigation Bar above.
                </p>

                <img className={css.coverImage} src={image} alt="Sign up image." />

                <p>
                  You'll land on our Sign Up page and can choose to sign up with Facebook, Linkedin or by Email.
                </p>

                <p>
                  We'll send you an email to guide you through the process. It's easy and only takes a few minutes from start to finish.
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
                  If you want to correspond using our secure messaging, apply for a Pet Sit or Post your Profile then you need to join up. It's simple and easy and we even give you the opportunity to try us our for free for 7 days.
                </p>

                <p>
                  If you want to correspond using our secure messaging, apply for a Pet Sit or Post your Profile then you need to join up. It's simple and easy and we even give you the opportunity to try us our for free for 7 days.
                </p>

                <p>
                  We offer a flexible membership where Pet Owners can choose to join for the time period that best suits them from 1 month to 1 year.
                </p>

              </div>
            </div>
          </div>

           <div id="openThree" className={css.wrapCollabsible}>
            <input id="collapsible3" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible3" className={css.lblToggle}><span className={css.collapsibleTitle}>3. Dog Walking | Dog Grooming | Drop-in Pet Sitter</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  List your Pet Services Business at Trust My Pet Sitter and let us help give you the tools to success. You set your work schedule, set your rates and concentrate on running your business.
                </p>

                <p>
                  We'll ensure you are continually advertised helping to attract new clients and build great relationships.
                </p>

                <p>
                  Trust My Pet Sitter can help to connect you with local pet owners looking for Daily Drop-in Pet Sitters, and Dog Walkers.
                </p>

              </div>
            </div>
          </div>

          <div id="openFour" className={css.wrapCollabsible}>
            <input id="collapsible4" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible4" className={css.lblToggle}><span className={css.collapsibleTitle}>4. Are you registered Pet Sitters ID verified?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Yes! At Trust My Pet Sitter we ID verify all of our Pet Sitters Members.
                </p>

                <p>
                  New members cannot create a listing on our site unless they have passed ID verification.
                </p>

                <p>
                  Trust My Pet Sitter ID Verification software is used by financial service organizations and leading brands to create trust for safe user authentication.
                </p>

                 <p>
                  We provide Pet Owners complete peach of mind that their chosen Pet Sitter is identity checked to the highest standards by an industry leading provider.
                </p>

              </div>
            </div>
          </div>

          <div id="openFive" className={css.wrapCollabsible}>
            <input id="collapsible5" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible5" className={css.lblToggle}><span className={css.collapsibleTitle}>5. Do you accept all Pets, and not just Dogs?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Trust My Pet Sitter is for a variety of Pets, not just dogs (although we do love our dogs!)
                </p>

                <p>
                  When you sign up at Trust My Pet Sitter we have a section which collects information about your pets.
                </p>

                <p>
                  Dog | Cat | Horses | Pet Birds | Exotic Breeds | Farm Animals | Aquarium Fish and Rabbits
                </p>

              </div>
            </div>
          </div>

           <div id="openSix" className={css.wrapCollabsible}>
            <input id="collapsible6" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible6" className={css.lblToggle}><span className={css.collapsibleTitle}>6. Where you advertise Pet Sits?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Any new pet sits will be automatically seen on our social media platforms.
                </p>

                <p>
                  When you sign up at Trust My Pet Sitter we have a section which collects information about your pets.
                </p>

              </div>
            </div>
          </div>


          <div id="openSeven" className={css.wrapCollabsible}>
            <input id="collapsible7" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible7" className={css.lblToggle}><span className={css.collapsibleTitle}>7. Can I be both a Pet Owner and a Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Yes!
                </p>

                <p>
                  Pet Owner Annual Members are are automatically awarded Pet Sitter Member status. If you have chosen a partial year membership you simply choose the Pet Sitter Membership that best suits you.
                </p>

                <p>
                  As a Pet Owner you could watch someone else's pets in a country you've always wanted to visit, while at home your fur babies are being looked after by a Pet Sitting member of our community!
                </p>

              </div>
            </div>
          </div>

          <div id="openEight" className={css.wrapCollabsible}>
            <input id="collapsible8" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible8" className={css.lblToggle}><span className={css.collapsibleTitle}>8. What if I have specific skills or experience to ask of my Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  If you require a pet sitter with a certain set of skills or previous experience be sure to stipulate this on your listing, so you get the right applicants with Trust My Pet Sitter. Complete all the sections of your listing in detail and outline the qualities your ideal sitter will possess.
                </p>

                <p>
                  You should also include your special requirement for example administering medication or looking after an elderly pet who needs special attention.
                </p>

                <p>
                  Be clear and upfront about the needs of your pet and you'll hear from suitable pet sitters and find a match!
                </p>

              </div>
            </div>
          </div>

          <div id="openNine" className={css.wrapCollabsible}>
            <input id="collapsible9" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible9" className={css.lblToggle}><span className={css.collapsibleTitle}>9. Is Trust My Pet Sitter right for my pet?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Pets are happiest at home in their own environment with familiar sounds and smells. If you take them away from this to a pet boarders home, kennels or cattery many pets become stressed due to the changes in routine and close proximity to strange people and other animals.
                </p>

                <p>
                  As the main humans in your pets life when you are away they will miss you, but if their routine stays as close as possible to their "normal" then they are much more likely to feel safe and secure until your return.
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

export default PetOwnersPage;
