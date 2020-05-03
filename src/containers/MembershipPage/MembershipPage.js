import React from 'react';
import { StaticPage, TopbarContainer, ProfileSettingsPage } from '../../containers';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import css from './MembershipPage.css';
import check from './check.png';
import premium from './premium.png';
import paw from './paw.png';

import why1 from '../LandingPage/select.png';
import why2 from '../LandingPage/shield.png';
import why3 from '../LandingPage/network.png';
import why4 from './pet.png';
import why5 from './money.png';
import why6 from './airplane.png';
import why7 from './maps-and-location.png';
import why8 from './target.png';
import why9 from './facebook.png';

import axios from 'axios';

class MembershipPage extends React.Component {
  state = { country: false };

  componentDidMount() {
    axios.get('https://ipapi.co/json/').then(response => {
      this.setState({ country: response.data.country });
    });
  }

  render() {
    const currency = this.state.country == 'GB' ? '£' : '$';
    // prettier-ignore
    return (
      <StaticPage
        title="Membership | Trust My Pet Sitter"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'MembershipPage ',
          description: 'MembershipPage ',
          name: 'MembershipPage ',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
  
          <LayoutWrapperMain>
  
    
  <div id="mTabs">
    <div className={css.mBanner}>
      <div className={css.extend}>
      <h1>Discover a new standard of Pet Care</h1>
      <p>Our Membership Packages</p>
      </div>
    </div>
      <div className={css.sectionContent}>
  
    <Tabs>
      <TabList>
        <Tab><span className={css.mobNo}>Pet </span>Owner<img className={css.activePaw} src={paw} /></Tab>
        <Tab><span className={css.mobNo}>Pet </span>Sitter<img className={css.activePaw} src={paw} /></Tab>
        <Tab><span className={css.mobNo}>Pet </span>Service<img className={css.activePaw} src={paw} /></Tab>
    </TabList>
  
  <TabPanel>
        
         <div className={css.mMain}>
           <div className={css.mWrapper}>
            <div>
              <h3>Basic</h3>
              <p>Plans for all pet owners</p>
              <div className={css.price}>
               <span className={css.currency}>
                {currency}
               </span>
               <span className={css.bigNum}>
                 119
               </span>
               <span className={css.month}>
                 /year
               </span>
              </div>
              <p className={css.offer}>Send messages, post listings...</p>
              <div className={css.block}></div>
              <ul className={css.plans}>
              <li><img src={check} /> <span data-tip="" data-for="insurance">Home Insurance</span></li>
                <ReactTooltip id="insurance" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    £1m insurance back guarantee
                  </span>
                </ReactTooltip>
                <li><img src={check} /> <span data-tip="" data-for="care">Virtual Vet (during sit)</span></li>
                <ReactTooltip id="care" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    24/7 virtual vet care
                  </span>
                </ReactTooltip>
                <li><img src={check} /> <span>Discount Pet Insurance</span></li>
                <li><img src={check} /> Email Alert</li>
                <li><img src={check} /> <span data-tip="" data-for="cover">Home Contents Cover</span></li>
                <ReactTooltip id="cover" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    Covers up to £100,000
                  </span>
                </ReactTooltip>
                <li><img src={check} /> Send messages</li>
                <li><img src={check} /> Receive Messages</li>
                <li><img src={check} /> Secure Payments</li>
                <li className={css.mDisabled}><img src={check} /> <span>Social Media Listing</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Account Manager</span></li>
                <li><img src={check} /> Pet 1:1 Care</li>
                <li><img src={check} /> Newsletter</li>
                <li><img src={check} /> 24/7 email support</li>
                <li><img src={check} /> Live Chat</li>
                <li><img src={check} /> Online Profile</li>
                <li className={css.mDisabled}><img src={check} /> <span>Pet Sitter Membership</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Featured listing</span></li>
                <li><img src={check} /> <span>Discount Pet Food</span></li>
                <li><img src={check} /> <span>Discount on Dog Activity Monitor</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Discount Pet Treats</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Discount Vet Care</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Discount Pet Toys</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Discount Travel</span></li>
              </ul>
              <div className={css.getPlan}>
              <NamedLink name={!this.state.country ? "MembershipPage" : "PaymentOwnerPage"}  state={{ currency, planType: "basic", planId: this.state.country == "GB" ? "copy_of_owners_basic_plan" : "owners_basic_plan" }}>Start with Basic</NamedLink>
              </div>
            </div>
            <div>
              <h3>Premium</h3>
              <p>Plans for all pet owners</p>
              <div className={css.price}>
               <span className={css.currency}>
                {currency}
               </span>
               <span className={css.bigNum}>
                 199
               </span>
               <span className={css.month}>
                 /year
               </span>
              </div>
              <p className={css.offer}>Create profile, online messaging...</p>
              <div className={css.block}></div>
              <ul className={css.plans}>
              <li><img src={check} /> <span data-tip="" data-for="insurance">Home Insurance</span></li>
                <ReactTooltip id="insurance" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    £1m insurance back guarantee
                  </span>
                </ReactTooltip> 
                <li><img src={check} /> <span data-tip="" data-for="care">Virtual Vet (during sit)</span></li>
                <ReactTooltip id="care" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    24/7 virtual vet care
                  </span>
                </ReactTooltip>
                <li><img src={check} /> <span>Discount Pet Insurance</span></li>
                <li><img src={check} /> Email Alert</li>
                <li><img src={check} /> <span data-tip="" data-for="cover">Home Contents Cover</span></li>
                <ReactTooltip id="cover" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    Covers up to £100,000
                  </span>
                </ReactTooltip>
                <li><img src={check} /> Send messages</li>
                <li><img src={check} /> Receive Messages</li>
                <li><img src={check} /> Secure Payments</li>
                <li><img src={check} /> Social Media Listing</li>
                <li><img src={check} /> Account Manager</li>
                <li><img src={check} /> Pet 1:1 Care</li>
                <li><img src={check} /> Newsletter</li>
                <li><img src={check} /> 24/7 email support</li>
                <li><img src={check} /> Live Chat</li>
                <li><img src={check} /> Online Profile</li>
                <li><img src={check} /> <span data-tip="" data-for="sitters">Pet Sitter Membership</span></li>
                <ReactTooltip id="sitters" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    Worth £89
                  </span>
                </ReactTooltip>
                <li><img src={check} /> Featured listing</li>
                <li><img src={check} /> Discount Pet Food</li>
                <li><img src={check} /> Discount Pet Accessories</li>
                <li><img src={check} /> Discount Pet Treats</li>
                <li><img src={check} /> Discount Vet Care</li>
                <li><img src={check} /> Discount Pet Toys</li>
                <li><img src={check} /> Discount Travel</li>
              </ul>
              <div className={css.getPlan}>
              <NamedLink name={!this.state.country ? "MembershipPage" : "PaymentOwnerPage"} state={{ currency, planType: "premium", planId: this.state.country == "GB" ? "copy_of_owner_members_plan" : "owner_members_plan" }}><img src={premium}  />Go Premium</NamedLink>
              </div>
            </div>
            </div>
         </div>
      <div className={css.whyWrapper}>
      <div className={css.whyContent}>
        <h3 className={css.whyTitle}>We've raised the bar</h3>
        <div className={css.whyFlex}>
          <div>
            <img src={why1} />
            <p>We provide a wide choice of Pet Sitters,<br className={css.budiNesto} /> to help you choose the one that's right<br className={css.budiNesto} /> for you and your pets</p>
          </div>
          <div className={css.flexHr}></div>
          <div>
            <img src={why2} />
            <p>Peace of mind with our Insurance backed<br className={css.budiNesto} /> guarantee covering your home for<br className={css.budiNesto} /> up to £1 million</p>
          </div>
          <div className={css.flexHr}></div>
          <div>
            <img src={why3} />
            <p>Our trusted partners provide you with the<br className={css.budiNesto} /> knowledge that we've got your home and<br className={css.budiNesto} /> your pet covered when you're not there</p>
          </div>
        </div>
      </div>
    </div>
         </TabPanel>
         <TabPanel>
         <div className={css.mMain}>
           <div className={css.mWrapper}>
            <div>
              <h3>Basic</h3>
              <p>Plan for all pet sitters</p>
              <div className={css.price}>
               <span className={css.currency}>
                {currency}
               </span>
               <span className={css.bigNum}>
                89
               </span>
               <span className={css.month}>
                 /year
               </span>
              </div>
              <p className={css.offer}>Send messages, post listings...</p>
              <div className={css.block}></div>
              <ul className={css.plans}>
                <li><img src={check} /> Home Insurance</li>
                <li><img src={check} /> <span data-tip="" data-for="care">Virtual Vet (during sit)</span></li>
                <ReactTooltip id="care" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    24/7 virtual vet care
                  </span>
                </ReactTooltip>
                <li><img src={check} /> Trip Breakdown Cover</li>
                <li><img src={check} /> Email Alert</li>
                <li><img src={check} /> Send messages</li>
                <li><img src={check} /> Receive Messages</li>
                <li><img src={check} /> Secure Payments</li>
                <li><img src={check} /> Social Media Listing</li>
                <li><img src={check} /> 24/7 email support</li>
                <li><img src={check} /> Live Chat</li>
                <li><img src={check} /> Online Profile</li>
                <li className={css.mDisabled}><img src={check} /> <span>Featured Listing</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Discount Travel</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Accomodation Cover</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Home Failure</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Home Fraud</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Host Cancellation</span></li>
                <li className={css.mDisabled}><img src={check} /> <span>Home Representation</span></li>
              </ul>
              <div className={css.getPlan}>
              <NamedLink name={!this.state.country ? "MembershipPage" : "PaymentSitterPage"} state={{ currency, planType: "basic", planId: this.state.country == "GB" ? "copy_of_Standard_pet_sitters_plan" : "Standard_pet_sitters_plan" }}>Start with Basic</NamedLink>
              </div>
            </div>
            <div>
              <h3>Premium</h3>
              <p>Plan for all pet sitters</p>
              <div className={css.price}>
               <span className={css.currency}>
                {currency}
               </span>
               <span className={css.bigNum}>
                 129
               </span>
               <span className={css.month}>
                 /year
               </span>
              </div>
              <p className={css.offer}>Create profile, online messaging...</p>
              <div className={css.block}></div>
              <ul className={css.plans}>
              <li><img src={check} /> Home Insurance</li>
              <li><img src={check} /> <span data-tip="" data-for="care">Virtual Vet (during sit)</span></li>
                <ReactTooltip id="care" className={css.memberTip} effect="solid">
                  <span className={css.tipColor}>
                    24/7 virtual vet care
                  </span>
                </ReactTooltip>
                <li><img src={check} /> Trip Breakdown Cover</li>
                <li><img src={check} /> Email Alert</li>
                <li><img src={check} /> Send messages</li>
                <li><img src={check} /> Receive Messages</li>
                <li><img src={check} /> Secure Payments</li>
                <li><img src={check} /> Social Media Listing</li>
                <li><img src={check} /> 24/7 email support</li>
                <li><img src={check} /> Live Chat</li>
                <li><img src={check} /> Online Profile</li>
                <li><img src={check} /> Featured Listing</li>
                <li><img src={check} /> Discount Travel</li>
                <li><img src={check} /> Accomodation Cover</li>
                <li><img src={check} /> Home Failure</li>
                <li><img src={check} /> Home Fraud</li>
                <li><img src={check} /> Host Cancellation</li>
                <li><img src={check} /> Home Representation</li>
              </ul>
              <div className={css.getPlan}>
              <NamedLink name={!this.state.country ? "MembershipPage" : "PaymentSitterPage"} state={{ currency, planType: "premium", planId: this.state.country == "GB" ? "copy_of_Platinum_annual_plan" : "Platinum_annual_plan" }}><img src={premium}  />Go Premium</NamedLink>
              </div>
            </div>
            </div>
         </div>
    <div className={css.whyWrapper}>
      <div className={css.whyContent}>
        <h3 className={css.whyTitle}>Lifestyle Choice</h3>
        <div className={css.whyFlex}>
          <div>
            <img src={why4} />
            <p>Spend more time<br />with animals and meet pets</p>
          </div>
          <div className={css.flexHr}></div>
          <div>
            <img src={why5} />
            <p>Better Pay and<br />set your own rates</p>
          </div>
          <div className={css.flexHr}></div>
          <div>
            <img src={why6} />
            <p>Stay in fantastic locations<br />and meet amazing pets</p>
          </div>
        </div>
      </div>
    </div>
         </TabPanel>
         <TabPanel>
         <div className={css.mMain}>
           <div className={css.mWrapper}>
            <div>
              <h3>Business</h3>
              <p>Plan for all pet services</p>
              <div className={css.price}>
               <span className={css.currency}>
                {currency}
               </span>
               <span className={css.bigNum}>
                 10
               </span>
               <span className={css.month}>
                 /month
               </span>
              </div>
              <p className={css.offer}>Send messages, post listings...</p>
              <div className={css.block}></div>
              <ul className={css.plans}>
                <li><img src={check} /> Live Chat</li>
                <li><img src={check} /> Online Profile</li>
                <li><img src={check} /> Social Media </li>
                <li><img src={check} /> Newsletter</li>
                <li><img src={check} /> 24/7 email support</li>
                <li><img src={check} /> Account Manager</li>
                <li><img src={check} /> Local advertising</li>
                <li><img src={check} /> Nationwide advertising</li>
                <li><img src={check} /> Global advertising</li>
                <li><img src={check} /> Contact details</li>
                <li><img src={check} /> Partner Opportunities</li>
                <li><img src={check} /> Optional Extras</li>
                <li><img src={check} /> Targeted email campaigns</li>
                <li><img src={check} /> Featured listings</li>
                <li><img src={check} /> Newsletter advertising</li>
  
              </ul>
              <div className={css.getPlan}>
              <NamedLink name={!this.state.country ? "MembershipPage" : "PaymentServicePage"} state={{ currency , planId: this.state.country == "GB" ? "copy_of_services_members_plan" : "services_members_plan" }}>Start with Business</NamedLink>
              </div>
            </div>
            </div>
         </div>
    <div className={css.whyWrapper}>
      <div className={css.whyContent}>
        <h3 className={css.whyTitle}>For Services</h3>
        <div className={css.whyFlex}>
          <div>
            <img src={why7} />
            <h2>Sector/location specific Profile</h2>
            <p className={css.serviceP}>Increase your client<br />attraction in the local area</p>
          </div>
          <div className={css.flexHr}></div>
          <div>
            <img src={why8} />
            <h2>Targeted Audience of Pet Members</h2>
            <p className={css.serviceP} >Local, national and worldwide </p>
          </div>
          <div className={css.flexHr}></div>
          <div>
            <img src={why9} />
            <h2>Social media advertising</h2>
            <p className={css.serviceP}>Advertise for free to our<br />social media accounts For Services</p>
          </div>
        </div>
      </div>
    </div>
         </TabPanel>
         </Tabs>
      </div>
    </div>
  
        </LayoutWrapperMain>
  
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
}

export default MembershipPage;
