import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FacebookProvider, Page } from 'react-facebook';
import { Timeline } from 'react-twitter-widgets';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
  NamedRedirect,

} from '../../components';

import arrow from './arrow.png';
import css from './PetOwnerQuestions.css';
import logo from './logo.png';



const articles = [
  <div>
    <h2>
      What is a professional pet / housesitter?
</h2>
    <p>A professional pet and house sitter is someone who considers this role their primary job.  As part of their duties looking after your pets and your home they are paid a rate agreed before the Pet and House sit commences.</p><p>They should not be confused with pet boarders who look after dogs in their home, or drop in sitters who visit but do not stay overnight.  Trust My Pet Sitters always stay in the pets home and have a pre-agreement with the Pet Owners to the duties and expectations whilst in situ.</p>
  </div>,

  <div>
    <h2>
      How much should I pay someone to watch my pet?
</h2>
    <p>At Trust My Pet Sitter our sitters set their nightly rate, based on their skills and experience.</p><p>The average rate for Pet Sitters is from $20 to around $75 per night, but you can negotiate and choose the best pet sitter who matches your budget and expectations.</p>
  </div>,

  <div>
    <h2>
      What are your Service Fees?
</h2>
    <p>To help operate the Trust My Pet Sitter platform, including services like Pet Advice Line, Insurance,  customer support and credit card processing, we charge a service fee when a booking is confirmed.</p>

    <p><strong>Pet Owner Service Fee</strong></p>

    <p>This fee is 10% for Pet Owners which is charged in addition to the Pet Sitter fee.  For example, if your Pet Sitter charges $20 per night, then Trust My Pet Sitter will charge $22 per night. This fee is calculated from the booking subtotal and is automatically added to the booking total.</p>

  </div>,

  <div>
    <h2>
      Do pet sitters stay overnight?

</h2>
    <p>At Trust My Pet Sitter our Pet Sitters watch your pets at home. Our pets always stay at home, not in someone else’s!  Pet Sitters provide 1:1 care and attention looking after your pets in their own  space, in their own environment with familiar routines.</p>
  </div>,

  <div>
    <h2>
      Is pet sitting safe?
</h2>

    <p>At Trust My Pet Sitter we use Yoti to confirm the identity of both our Pet Sitters and Pet Owners</p>
    <p>We select the finest Pet Sitters for your pets. Only 20% of sitters who apply to Trust My Pet Sitter are successful.</p>
    <p>In addition, we provide 24/7/365 Virtual Vet Advice to every active Pet Sitter no matter where they are in the world – a Vet always on hand to provide help and assistance.</p>
    <p>Our safety pack is completed with an Insurance backed guarantee for your home.</p>
  </div>,

  <div>
    <h2>
      How Do I Find Pet Services near me?
</h2>
    <p>You can browse Pet Services who have placed a listing in area or country specific locations.</p>
    <p>Get started by clicking the link on the home page “Find Pet Services” and you will then be redirected to the Trust My Pet Sitter key search page.</p>
    <h3>The Key Search Page</h3>

    <p>The Key Search Page allows you to select single or multiple options to find the Pet Services you need. You can search by:</p>

    <ul className={css.mainUL}>
      <li><strong>Location</strong> – in the top search bar locate the magnifying glass search icon and free type if you want to find pet services who are in a specific location. </li>
      <li><strong>Category</strong> – Select the Category button from the top toolbar and choose Pet Services</li>
    </ul>

    <h3>Next choose your Service Type:</h3>

    <ul className={css.mainUL}>
      <li>Dog Walkers</li>
      <li>Veterinary Surgeons</li>
      <li>Pet Groomer</li>
      <li>Pet Store</li>
      <li>Drop in Sitters</li>
    </ul>

    <p><strong>Pet Types</strong> – You can choose to search by Pet Type, if none are chosen all Pet Types will be displayed in the search results and location map. Pet Types are Dog, Cat, Reptiles, Farm Animals, Rabbits, Pet Birds, Aquarium Fish, Horses or other.</p>
    <p><strong>Price Range</strong> – When Pet Services create their listing they are asked to provide their rates. You can choose to search Pet Services by rates by using the toggle to select the maximum rate you are prepared to pay.  For the widest display leave the search toggle at the default maximum.</p>

    <h3>Map Search</h3>

    <p>You can also search for Pet Services who are in a specific map location. The map is shown on the right hand of the listing displays. For example, click on a price and the listing will pop up as a thumbnail image, if the Pet Service is of interest you can click on the image and it will load the main listing for you to browse suitability.</p>

  </div>,

  <div>
    <h2>How much does it cost to join Trust My Pet Sitter?</h2>

    <p>Trust My Pet Sitter charges a small membership fee to cover our Insurance, Pet Support Advice Line and support staff.</p>

    <p>You can review the latest membership fees at: <NamedLink name="MembershipPage">Membership Page</NamedLink></p>
  </div>,

  <div>
    <h2>How do I know I can trust a pet sitter in my home?</h2>

    <p>At Trust My Pet Sitter we conduct ID verification provided by YOTI.com for all of our Pet Sitters.  In addition, Trust My Pet Sitter provides an Insurance backed guarantee for Pet Owners homes.</p>
  </div>,

  <div>
    <h2>What if my pet needs a vet when I am away from home?</h2>

    <p>At Trust My Pet Sitter all our Pet Sitters are provided with access to PawSquad a 24/7 Virtual Vet staffed with UK qualified Veterinary Surgeons for the duration of their pet sit.</p>

    <p>Our Vets offer advice no matter where our sitters are located. Visit this <ExternalLink href="https://www.trustmypetsitter.com/virtualvet">link</ExternalLink> to find out more.
</p>
  </div>,

  <div>
    <h2>How much do pet sitters charge per hour?</h2>

    <p>Professional Pet Sitters set their own nightly rate and can charge anywhere from $20 up to $75 per night depending upon their skills, experience and your requirements.</p>

    <p>If you like a Pet Sitters profile but consider their nightly price too high, you can always send them a message and find out if they will consider negotiating the price.  </p>
  </div>,

  <div>
    <h2>How do I create an account?</h2>

    <p>To create an account with Trust My Pet Sitter you must be at least 18 years old and be in possession of an ID verifiable document such as a Driving Licence, Passport or ID Card.</p>

    <p>To get started just select the “Sign Up” icon in the Navigation Bar and follow the steps shown on the screen:</p>

    <ul className={css.mainUL}>
      <li>Email Address</li>
      <li>First Name</li>
      <li>Last Name</li>
      <li>Password</li>
    </ul>

    <p>Click the Accept Terms and Conditions to join as a user.  You cannot send or receive messages from members until you complete the “Create a Post” user journey.</p>

    <p>To Create a Post select the “Create a Post” icon in the Navigation Bar and complete the steps for your chosen Category:</p>

    <ul className={css.mainUL}>
      <li>Pet Owner</li>
      <li>Pet Sitter</li>
      <li>Pet Services</li>
    </ul>

    <p>When you have completed the Post details you will be a full member of our community and able to converse using our secure messaging platform</p>

  </div>,

  <div>
    <h2>How do I find the right Pet Sitter near me?</h2>

    <p>You must be a premium member of Trust My Pet Sitter in order to contact Pet Sitters directly.  If you haven’t yet signed up, then follow the link on the navbar to “Create Post” and complete the steps.</p>

    <p>Once you are a verified premium member you can make contact directly with Pet Sitters you find on the platform, as well as receive messages from them in your inbox.</p>

    <p>If you want to search for a specific pet sitter or simply browse who is available on your dates you have several options.</p>

    <p>Get started by clicking the link on the home page “Find a Pet Sitter” and you will then be redirected to the Trust My Pet Sitter key search page.</p>
  </div>,

  <div>
    <h2>The Key Search Page</h2>

    <p>The Key Search Page allows you to select single or multiple options to find Pet Sitters. You can search by:</p>

    <ul className={css.mainUL}>
      <li><strong>Location</strong> – in the top search bar locate the magnifying glass search icon and free type if you want to find pet sitters who are in a specific location.</li>
      <li><strong>Types</strong> – this area allows you to search Pet Sitters by Pet type experience.  So, for example if you have a parrot who requires a pet sitter, you would select “Pet Birds”.</li>
      <li><strong>Price Range</strong> – When Pet Sitters create their listing they are asked to provide their rates. You can choose to search Pet Sitters by rates by using the toggle to select the maximum rate you are prepared to pay. For the widest display leave the search toggle at the default maximum.</li>
    </ul>

    <h3>Map Search</h3>

    <p>You can also search for Pet Sitters who are in a specific map location. The map is shown on the right hand of the listing displays. For example, click on a price and the listing will pop up as a thumbnail image, if the Pet Sitter is of interest you can click on the image and it will load the main listing for you to browse suitability.</p>
  </div>
];


const PetOwnerQuestions = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Pet Owner Questions | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetOwnerQuestions',
        description: 'About Trust My Pet Sitter',
        name: 'Help Center',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>

          <div className={css.questionMain}>
            <div className={css.pageContent}>
              <div><h3 className={css.helpTitle}>Pet Owner Questions</h3></div>
              <div className={css.logoWrap}><img src={logo} /></div>
            </div>
          </div>

          <Tabs className={css.sectionContent}>
            <div className={css.goBack}>
              <NamedLink name="HelpCenter" className={css.backUrl}>Help Center</NamedLink> <img src={arrow} /> <span className={css.backUrl}>Pet Owner Questions</span>
            </div>
            <div className={css.goFlex}>

              <div className={css.whatwedoLeft}>

                <TabList>

                  <label for="collapsible1" className={css.lblToggle}><span className={css.collapsibleTitle}>Pet Owner Questions</span></label>

                  <Tab>

                    <NavLink to="/pet-owner-questions/1" className={css.link} activeClassName={css.activeLink} >
                      <div className={css.collapseItem}>
                        <a>1. What is a professional pet / housesitter?</a>
                      </div>
                    </NavLink>

                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/2" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>2. How much should I pay someone to watch my pet?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/3" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>3. What are your Service Fees?</a>
                      </div>
                    </NavLink>

                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/4" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>4. Do Pet Sitters stay overnight?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/5" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>5. Is Pet Sitting safe?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/6" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>6. How Do I Find Pet Services near me?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/7" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>7. How much does it cost to join Trust My Pet Sitter?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/8" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>8. How do I know I can trust a pet sitter in my home?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/9" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>9. What if my pet needs a vet when I am away from home?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab><NavLink to="/pet-owner-questions/10" className={css.link} activeClassName={css.activeLink}>
                    <div className={css.collapseItem}>
                      <a>10. How much do pet sitters charge per hour?</a>
                    </div>
                  </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/11" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>11. How do I create an account?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/12" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>12. How do I find the right Pet Sitter near me?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-owner-questions/13" className={css.link} activeClassName={css.activeLink}>
                      <div className={css.collapseItem}>
                        <a>13. The Key Search Page</a>
                      </div>
                    </NavLink>
                  </Tab>

                </TabList>

              </div>

              <div className={css.whatwedoRight}>

                <Route path="/pet-owner-questions/:id" render={(props) => {
                  return articles[props.match.params.id - 1] ? articles[props.match.params.id - 1] : <NamedRedirect name="NotFoundPage"></NamedRedirect>
                }}>
                </Route>


              </div>

            </div>

          </Tabs>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default PetOwnerQuestions;


