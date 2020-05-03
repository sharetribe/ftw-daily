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
  NamedRedirect

} from '../../components';

import arrow from './arrow.png';
import logo from './logo.png';
import css from './PetServicesQuestions.css';


const articles = [
  <div>
    <h2>How do I join Trust My Pet Sitter?</h2>

    <p>If you're interested in becoming a Pet Services Providers here are a few important things to know before you get started:</p>

    <ul className={css.mainUL}>
      <li>You must be at least 18 years old and hold a government issued ID like a passport or driving licence.</li>
      <li>Trust My Pet Sitter provides a platform to introduce you to Pet Owners and Pet Sitters and you are considered an independent contractor.</li>
    </ul>

  </div>,

  <div>
    <h2>
      Do you charge a service fee?
</h2>
    <p>Trust My Pet Sitter does not charge a service fee to Pet Services, which means you keep 100% of what you earn! All we ask is you pay our small monthly subscription fee to keep you membership active and you can use us as many times as you like without incurring any additional fees.</p>
  </div>,

  <div>
    <h2>Can Pet Owners contact me directly?</h2>

    <p>Pet Owners can contact you directly through our secure messaging platform. We do not charge to reply to messages, nor charge a service fee on any bookings you make.</p>
  </div>,

  <div>
    <h2>Do you provide Insurance?</h2>

    <p>As a Pet Service Independent contractor you are responsible for providing your own insurance and liability cover.</p>
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

  </div>
]

const PetServicesQuestions = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Pet Service Questions | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetServicesQuestions',
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
              <div><h3 className={css.helpTitle}>Pet Service Questions</h3></div>
              <div className={css.logoWrap}><img src={logo} /></div>
            </div>
          </div>

          <Tabs className={css.sectionContent}>
            <div className={css.goBack}>
              <NamedLink name="HelpCenter" className={css.backUrl}>Help Center</NamedLink> <img src={arrow} /> <span className={css.backUrl}>Pet Service Questions</span>
            </div>
            <div className={css.goFlex}>

              <div className={css.whatwedoLeft}>

                <TabList>

                  <label for="collapsible1" className={css.lblToggle}><span className={css.collapsibleTitle}>Pet Service Questions</span></label>

                  <Tab>
                    <NavLink to="/pet-service-questions/1" className={css.link} activeClassName={css.activeLink} >
                      <div className={css.collapseItem}>
                        <a>1. How do I join Trust My Pet Sitter?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-service-questions/2" className={css.link} activeClassName={css.activeLink} >
                      <div className={css.collapseItem}>
                        <a>2. Do you charge a service fee?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-service-questions/3" className={css.link} activeClassName={css.activeLink} >
                      <div className={css.collapseItem}>
                        <a>3. Can Pet Owners contact me directly?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-service-questions/4" className={css.link} activeClassName={css.activeLink} >
                      <div className={css.collapseItem}>
                        <a>4. Do you provide Insurance?</a>
                      </div>
                    </NavLink>
                  </Tab>

                  <Tab>
                    <NavLink to="/pet-service-questions/5" className={css.link} activeClassName={css.activeLink} >
                      <div className={css.collapseItem}>
                        <a>5. How do I create an account?</a>
                      </div>
                    </NavLink>
                  </Tab>

                </TabList>

              </div>

              <div className={css.whatwedoRight}>

                <Route path="/pet-service-questions/:id" render={(props) => {
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

export default PetServicesQuestions;


