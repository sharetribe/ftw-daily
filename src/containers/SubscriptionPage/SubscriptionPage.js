import React, {Component} from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './SubscriptionPage.css';

export default class SubscriptionPage extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      billing: 'semiannual',
      types: {
        monthly: {
          basic: 10,
          premium: 20
        },
        semiannual: {
          basic: 29,
          premium: 49
        },
        annual: {
          basic: 50,
          premium: 60
        }
      }
    }
    this.change = this.change.bind(this)
  }

  change(e) {
    this.setState({ billing: e.target.value })
  }

  render() {

    const { billing, types } = this.state

    // prettier-ignore
    return (
      <StaticPage
        title="Subscription"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'SubscriptionPage',
          description: 'HorseDeal24 Subscription',
          name: 'Subscription page',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
  
          <LayoutWrapperMain className={css.staticPageWrapper}>
            <div className={css.sectionOffer}>
              <div className={css.sectionOfferContent}>
                <h1 className={css.pageHeader}>Wähle Dein passendes Paket</h1>
                <p className={css.pageSubheader}>nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed</p>
                <div className={css.plansContainer}>
                  <div className={css.billingOptions}> 
                    <button onClick={() => this.setState({ billing: 'semiannual' })} className={css.linkBillingSwitch + ' ' + (billing === 'semiannual' ? css.activeBilling : '')}>20% Aktion bis 29.03.2020</button>         
                  </div>
                  <div className={css.billingOptionsMobile}>
                    <h3>Choose billing period</h3>
                    <select onChange={this.change} value={this.state.billing}>
                      <option value="monthly">Monthly Billing</option>
                      <option value="semiannual">20% Aktion bis zum 29.03.2020</option>
                      <option value="annual">Yearly billing - save 30%</option>
                    </select>
                  </div>
                  <div className={css.columns}>
                    <div className={css.linkBillingSwitch}className={css.leftColumn}>
                      <div className={css.planContainer}>
                        <div className={css.planName}>Standard Suche</div>
                        <div className={css.price}>
                          <span className={css.priceValue}>${types[billing].basic}</span> /Monat

                        </div>
                        <ul className={css.features}>
                          <li className={css.feature}>
                            <b>One Horse</b> Listing
                          </li>
                          <li className={css.feature}>
                            <b>Booking Tools</b>
                          </li>
                          <li className={css.feature}>
                            <b>Horse Messaging</b> System
                          </li>
                          <li className={css.feature}>
                            <b>Secure Payments &amp; Payouts</b>
                          </li>
                        </ul>
                        <div className={css.actions}>
                          <div className={css.buttonContainer}>
                            <a href="plans/basic-semi-annual" className={css.buyButton}>Kostenlos testen</a>
                          </div>
                          <div className={css.priceDetails}>14 Tage kostenlos testen</div>
                        </div>
                      </div>
                    </div>
                    <div className={css.rightColumn}>
                      <div className={css.planContainer + ' ' + css.highlightedPlan}>
                        <div className={css.planName}>Premium Suche</div>
                        <div className={css.price}>
                          <span className={css.priceValue}>${types[billing].premium}</span> /Monat
                        </div>
                        <ul className={css.features}>
                          <li className={css.feature}>
                            <b>All Basic Features</b>
                          </li>
                          <li className={css.feature}>
                            <b>Premium Verified</b> Tag
                          </li>
                          <li className={css.feature}>  
                            <b>Priority</b> Search Results
                          </li>
                          <li className={css.feature}>
                            <b>Multiple Horse</b> Listings
                          </li>
                          <li className={css.feature}>
                            <b>Marketing</b> Reach
                          </li>
                          <li className={css.feature}>
                            <b>Social Media</b> Reach
                          </li>
                          <li className={css.feature}>
                            <b>VIP</b> Service &amp; Support
                          </li>
                        </ul>
                        <div className={css.actions}>
                          <div className={css.buttonContainer}>
                            <a href="plans/premium-semi-annual" className={css.premiumButton}>Kostenlos testen</a>
                          </div>
                          <div className={css.priceDetails}>14 Tage kostenlos testen</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.sectionHowItWorks}>
              <div className={css.sectionHowItWorksContent}>
                <h2 className={css.sectionHeader}>ultrices dui sapien eget mi proin</h2>
                <p className={css.subheader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className={css.reasons}>
                  <div className={css.reason}>
                    <div className={css.reasonLowestFees}></div>
                    <h3 className={css.reasonTitle}>Lorem ipsum dolor</h3>
                    <p className={css.reasonDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum arcu vitae elementum curabitur vitae nunc sed. Phasellus faucibus scelerisque eleifend donec pretium vulputate. Cras adipiscing enim eu turpis egestas pretium aenean pharetra. Pulvinar pellentesque habitant morbi tristique senectus et.</p>
                  </div>
                  <div className={css.reason}>
                    <div className={css.reasonCommunication}></div>
                    <h3 className={css.reasonTitle}>Arcu bibendum at</h3>
                    <p className={css.reasonDescription}>Arcu bibendum at varius vel pharetra vel turpis nunc. Ultricies integer quis auctor elit sed vulputate mi sit. In arcu cursus euismod quis viverra. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.</p>
                  </div>
                  <div className={css.reason}>
                    <div className={css.reasonControl}></div>
                    <h3 className={css.reasonTitle}>Accumsan sit</h3>
                    <p className={css.reasonDescription}>Accumsan sit amet nulla facilisi morbi. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Non odio euismod lacinia at quis. Amet purus gravida quis blandit turpis cursus in hac.</p>
                  </div>
                  <div className={css.reason}>
                    <div className={css.reasonCare}></div>
                    <h3 className={css.reasonTitle}>Tellus molestie</h3>
                    <p className={css.reasonDescription}>Tellus molestie nunc non blandit. Elit eget gravida cum sociis. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Ac turpis egestas integer eget aliquet nibh. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Sodales neque sodales ut etiam sit amet nisl purus.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.sectionQuote}>
              <div className={css.sectionQuoteContent}>
                <div className={css.sectionQuoteWrapper}>
                  <img className={css.quoteImage} src="https://dummyimage.com/338x431/aaa/fff" alt="Placeholder" />
                    <div className={css.quoteWrapper}>
                      <p className={css.quote}>“Sapien pellentesque habitant morbi tristique. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Tellus cras adipiscing enim eu turpis. Maecenas sed enim ut sem viverra aliquet. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Nisl purus in mollis nunc sed.”</p>
                      <p className={css.author}>
                        <span className={css.authorName}>loremipsum,</span>
                        <br/> Gener Rator
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            <div className={css.sectionFAQ}>
              <div className={css.sectionFAQContent}>
                <h2 className={css.sectionHeader + ' ' + css.faqHeader}>Frequently Asked Questions</h2>
                <h3 className={css.faqQuestion}>Turpis tincidunt id aliquet risus feugiat in ante?</h3>
                <p className={css.faqAnswer}>Eu sem integer vitae justo eget magna fermentum iaculis. Odio pellentesque diam volutpat commodo. Ut lectus arcu bibendum at varius vel pharetra vel. Vitae semper quis lectus nulla at volutpat. Morbi non arcu risus quis. Ipsum nunc aliquet bibendum enim facilisis gravida neque.</p>
                <p className={css.faqAnswer}>Nam at lectus urna duis convallis convallis tellus id interdum. Ultrices tincidunt arcu non sodales.</p>
                
                <h3 className={css.faqQuestion}>Id diam maecenas ultricies mi eget?</h3>
                <p className={css.faqAnswer}>Tellus orci ac auctor augue mauris augue neque. Et odio pellentesque diam volutpat commodo sed egestas egestas.</p>
                <p className={css.faqAnswer}>Auctor eu augue ut lectus arcu bibendum at. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.</p>
                <p className={css.faqAnswer}>Dui accumsan sit amet nulla facilisi morbi. Tincidunt arcu non sodales neque sodales ut etiam sit amet. Non diam phasellus vestibulum lorem sed risus.</p>
                  
                <h3 className={css.faqQuestion}>Mi proin sed libero enim sed faucibus turpis?</h3><p className={css.faqAnswer}>Nec dui nunc mattis enim ut tellus elementum. Morbi leo urna molestie at elementum. In aliquam sem fringilla ut morbi tincidunt. Sit amet volutpat consequat mauris nunc congue nisi vitae. Lectus arcu bibendum at varius vel pharetra vel. Eget mi proin sed libero enim sed faucibus turpis.</p>
                <a className={css.faqLink} target="" href="/help">View all FAQ</a>
              </div>
            </div>
            <div className={css.sectionGetStarted}>
              <div className={css.sectionGetStartedContent}>
                <div className={css.getStartedWrapper}>
                  <h2 className={css.sectionHeader}>Aliquam eleifend mi in nulla posuere sollicitudin.</h2>
                  <a className={css.getStartedLink + ' ' + css.buyButton} target="" href="/l/new">GET STARTED</a>
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

}
