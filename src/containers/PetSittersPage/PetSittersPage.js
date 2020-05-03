import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,

} from '../../components';

import css from './PetSittersPage.css';
import image from './signup.jpg';

const PetSittersPage = () => {
  

  // prettier-ignore
  return (
    <StaticPage
      title="Pet Sitters FAQ | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetSittersPage',
        description: 'Frequently Asked Questions',
        name: 'PetSittersPage',
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
         <span>Pet Sitters Corner</span>
        </div>
        
        <div>
         <span><span id="bread-active"><a id="bread-back" href="/faq">Faq</a></span> <span className={css.breadArrow}>></span> <span id="bread-active"><a href="/pet-sitter-faq">Pet Sitters</a></span></span>

         <span>Last updated July 7,2019</span>
        </div>

       </div>
        <div className={css.faqRow}>

      <div className={css.leftAnchors}>
        <div className={css.stickyAnchors}>
          <ul id="stickyul">
            <li>1. <a href="#openOne">How do I become a Pet Sitter Member?</a></li>
            <li>2. <a href="#openTwo">Is Trust My Pet Sitter free??</a></li>
            <li>3. <a href="#openThree">What is the difference between a paid and free Pet Sitter?</a></li>
            <li>4. <a href="#openFour">Is Trust My Pet Sitter just for dogs?</a></li>
            <li>5. <a href="#openFive">Where do you advertise Pet Sits?</a></li>
            <li>6. <a href="#openSix">Can I be both a Pet Sitter and Pet Owner?</a></li>
            <li>7. <a href="#openSeven">Do I Get Paid as a Pet Sitter?</a></li>
            <li>8. <a href="#openEight">Do I get free accommodation as a Pet Sitter?</a></li>
            <li>9. <a href="#openNine">Can I accept booking in other cities while travelling?</a></li>
            <li>10. <a href="#openTen">How much do I charge for Pet Sit?</a></li>
            <li>11. <a href="#openEleven">How do I pick what pets I am happy to Pet Sit?</a></li>
            <li>12. <a href="#openTwelve">What are the service fees for Trust My Pet Sitter?</a></li>
            <li>13. <a href="#openThirteen">Do I need any qualifications or licences to be a Pet Sitter?</a></li>
          </ul>
        </div>
      </div>

        <div className={css.rightContent}>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>


          <div id="openOne" className={css.wrapCollabsible}>
            <input id="collapsible1" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible1" className={css.lblToggle}><span className={css.collapsibleTitle}>1. How do I become a Pet Sitter Member?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Just click the "Sign Up" button below or the link on the Navigation Bar above.
                </p>

                <p>
                  You'll land on our Sign Up page and can choose to sign up with Facebook, Linkedin or by Email.
                </p>

                <img className={css.coverImage} src={image} alt="Sign up image." />

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
                  Trust My Pet Sitter is free to register where you can view Pet Sitters and Owners profiles.
                </p>

                <p>
                  If you want to correspond using our secure messaging, apply for a Pet Sit or Post your Profile then you need to join up. It's simple and easy and we even give you the opportunity to try us out for free for 7 days.
                </p>

                <p>
                  We offer a flexible membership where Pet Sitters can choose to join for the time period that best suits them from 3 months to 12 months.
                </p>

              </div>
            </div>
          </div>

           <div id="openThree" className={css.wrapCollabsible}>
            <input id="collapsible3" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible3" className={css.lblToggle}><span className={css.collapsibleTitle}>3. What is the difference between a paid and free Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Trust My Pet Sitter gives you the opportunity to offer your services as either a Paid or Sits for Free Pet Sitter
                </p>

                <p>
                  So, what's the difference? (apart from the paid part!)
                </p>

                <p>
                  Sits for Free Pet Sitters offer their services in exchange for free accommodation around the world. For example you may be a professional taking some time out to travel, a retiree ticking off your bucket list, or simply someone who loves pets and the opportunity to travel doing such a fantastic job! So you could choose to travel your way around the UK, USA, Europe or even Australia watching other people's pets in their own home.
                </p>

                <p>
                  Paid Pet Sitters offer their services to look after pets in their own home, often travelling from nearby (although we also welcome members who love to travel) and with a local knowledge of the area. Often our paid pet sitters have chosen to turn their love of pets into a lifestyle choice and paid job, and can often offer grooming, training and other services.
                </p>

              </div>
            </div>
          </div>

          <div id="openFour" className={css.wrapCollabsible}>
            <input id="collapsible4" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible4" className={css.lblToggle}><span className={css.collapsibleTitle}>4. Is Trust My Pet Sitter just for dogs?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                 Trust My Pet Sitter is for a variety of Pets, not just dogs (although we do love our dogs!) When you sign up at Trust My Pet Sitter we have a section which collects information about your pets, and as a Pet Sitter what Pets you have experience in looking after.
                </p>

                <p>
                  Dog | Cat | Horses| Pet Birds | Exotic Breeds | Farm Animals | Aquarium Fish and Rabbits
                </p>

              </div>
            </div>
          </div>

          <div id="openFive" className={css.wrapCollabsible}>
            <input id="collapsible5" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible5" className={css.lblToggle}><span className={css.collapsibleTitle}>5. Where do you advertise Pet Sits?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  When a new pet sitting position is posted at Trust My Pet Sitter it is automatically seen on our website, our social media platforms and included in our Newsletter to all subscribed Pet Members.
                </p>

              </div>
            </div>
          </div>

           <div id="openSix" className={css.wrapCollabsible}>
            <input id="collapsible6" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible6" className={css.lblToggle}><span className={css.collapsibleTitle}>6. Can I be both a Pet Sitter and Pet Owner?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Yes, you can be both! At Trust My Pet Sitter our Pet Owner Annual Members are automatically awarded Pet Member status.
                </p>

                <p>
                  As a Pet Owner you could watch someone else's pets in a country you've always wanted to visit and get free accommodation. While at home your fur babies are being looked after by a Pet Sitting member of our community!
                </p>

              </div>
            </div>
          </div>


          <div id="openSeven" className={css.wrapCollabsible}>
            <input id="collapsible7" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible7" className={css.lblToggle}><span className={css.collapsibleTitle}>7. Do I Get Paid as a Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  At Trust My Pet Sitter we give sitters the opportunity to choose whether or not to charge for their services. It is up to the Pet Owner to choose who makes the best match for their pets.
                </p>

                <p>
                  A retired couple may be ticking off their bucket list and happy to travel the world looking after other people's pets, in return for free accommodation. Whilst an experienced pet sitter may have chosen a lifestyle choice to get paid looking after other peoples pets and homes securely and safely.
                </p>

                <p>
                  We leave the decision of whether to charge or not entirely with our members.
                </p>

              </div>
            </div>
          </div>

          <div id="openEight" className={css.wrapCollabsible}>
            <input id="collapsible8" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible8" className={css.lblToggle}><span className={css.collapsibleTitle}>8. Do I get free accommodation as a Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Yes, you always get free accommodation looking after other peoples homes and pets whether you choose to charge for your services as a pet sitter, or not.
                </p>

              </div>
            </div>
          </div>

          <div id="openNine" className={css.wrapCollabsible}>
            <input id="collapsible9" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible9" className={css.lblToggle}><span className={css.collapsibleTitle}>9. Can I accept booking in other cities while travelling?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Absolutely! That is the cornerstone of Trust My Pet Sitter.
                </p>

                <p>
                   At Trust My Pet Sitter, our sitters can travel to care for pets worldwide without any geographical restrictions. Unlike other well known sites where you need to have a local address to apply for a sit.
                </p>

                <p>
                  At Trust My Pet Sitter you can sit in New York one week and be in Paris the next - it's up to you!
                </p>

                <p>
                  Once you've signed up as a Member you can apply for as many Pet Sitting Opportunities as you like during your membership period. So if you love pets and love to travel, what are you waiting for!
                </p>

                <p>
                  Please note that Trust My Pet Sitter does not handle travel arrangements for sitters so please check flights etc before accepting sits.
                </p>

              </div>
            </div>
          </div>

           <div id="openTen" className={css.wrapCollabsible}>
            <input id="collapsible10" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible10" className={css.lblToggle}><span className={css.collapsibleTitle}>10. How much do I charge for Pet Sit?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Deciding how much to charge for a sit will depend on a number of factors including your reasons for becoming a pet sitter and your level of experience, reviews etc.
                </p>

                <p>
                   You may be travelling the world and happy to accept free accommodation in exchange for looking after pets, or have chosen this path as a lifestyle choice and get paid to look after homes and pets.
                </p>

                <p>
                  The average rate for an overnight pet sit for 1 dog (12 hours) is between $25.00-$50.00.
                </p>

                <p>
                  It's really up to you to decide what you'd be happy to accept in exchange for looking after pets in exchange for free accommodation. Most Pet Owners will consider who to choose for their ideal Pet Sitter based on a number of factors, including your experience, location, reviews, time of year, charge and availability.
                </p>

              </div>
            </div>
          </div>

          <div id="openEleven" className={css.wrapCollabsible}>
            <input id="collapsible11" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible11" className={css.lblToggle}><span className={css.collapsibleTitle}>11. How do I pick what pets I am happy to Pet Sit?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  When you create your profile listing at Trust My Pet Sitter there is a Pet Type Selection Box to choose which pets you are experienced and happy to Pet Sit for. Our Pet Types are:
                </p>

                <ul>
                 <li>Dogs</li>
                 <li>Cats</li>
                 <li>Horses</li>
                 <li>Farm Animals</li>
                 <li>Exotic Breeds</li>
                 <li>Pet Birds</li>
                 <li>Aquarium Fish</li>
                 <li>Rabbits</li>
                 <li>Reptiles</li>
                </ul>

                <p>
                   You can amend your pet choices anytime you wish by logging in to your account and choosing "Profile Info"
                </p>

              </div>
            </div>
          </div>

          <div id="openTwelve" className={css.wrapCollabsible}>
            <input id="collapsible12" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible12" className={css.lblToggle}><span className={css.collapsibleTitle}>12. What are the service fees for Trust My Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  Trust My Pet Sitter has been set up to allow pet lovers the flexibility to enjoy a family/fur family balance. Running and improving the business is a 24/7 task and requires a team of staff from the Helpdesk to IT, Social Media and our service fees help us to achieve this.
                </p>

                <p>
                  Unlike other sites who will charge you in excess of 20% per pet sit, we believe that 10% is enough to power this business going forward and hope this will continue to be the case.
                </p>

                <p>
                  We have a transparent business model and very clearly state our commission and fees, you don't have to dig around for it. Pet owners only pay a Membership fee and there are NO charges per sit unlike other well known pet sites who charge up to 7% each time you book a pet sitter.
                </p>

                <p>
                  We have a transparent business model and very clearly state our commission and fees, you don't have to dig around for it. Pet owners only pay a Membership fee and there are NO charges per sit unlike other well known pet sites who charge up to 7% each time you book a pet sitter. Pet Sitters who choose to charge for their services will pay the standard 10%.
                </p>

              </div>
            </div>
          </div>

          <div id="openThirteen" className={css.wrapCollabsible}>
            <input id="collapsible13" className={css.toggle} type="checkbox" defaultChecked />
            <label for="collapsible13" className={css.lblToggle}><span className={css.collapsibleTitle}>13. Do I need any qualifications or licences to be a Pet Sitter?</span></label>
            <div className={css.collapsibleContent}>
              <div className={css.contentInner}>

                <p>
                  To be a member of the Trust My Pet Sitter Pet Sitting Community, first and foremost you must love pets as much as our pet owners do. A background in owning or caring for say German Shepherds means you can handle dogs of all sizes where someone with skills around Chihuahuas will not necessarily have the ability to care for bigger dogs.
                </p>

                <p>
                  We can only offer our opinion on this but this decision is between you and the owner.
                </p>

                <p>
                  Of course it it far easier to care for a cat then say a tank of tropical fish so only take on sits where both you and the owner are happy.
                </p>

                <p>
                  If unsure, follow local laws and regulations regarding licensing and other requirements. Requirements may vary by location, so check with your local government to learn about the regulations where you will be sitting.
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

export default PetSittersPage;
