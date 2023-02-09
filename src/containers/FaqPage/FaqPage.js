import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from '../../components';

import css from './FaqPage.module.css';

const FaqPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="FAQ"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FaqPage',
        description: 'Common questions and answers about Hotpatch',
        name: 'FAQ page',
      }}
    >
     <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>HotPatch FAQ</h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <h2>
                What is HotPatch?
              </h2>

              <p>
               Great Question! HotPatch is a platform for people to list and rent space. HotPatch connects space owners and operators with people seeking access to flexible space on demand.
              </p>
              <p>
                HotPatch allows its Users and Hosts to access and share any space on demand, from rental chairs in hair salons to fitness studios, photography studios and anything else in between!
              </p>

              <br></br>

              <h2 id="why-should-i-list-or-book-through-hotpatch-">
                Why should I use HotPatch?
              </h2>

              <p>
                Where do we start?
              </p>
              <p>Listing and booking through HotPatch protects you under our <a href="/terms-of-service">Terms of Service</a>, <a href="/cancellations">cancellation and refund</a> policies.</p>
              <p>Additionally, booking and listing through HotPatch means that you will provide and receive a review. A review is an important way of building trust and improves the likelihood of being chosen to host or access a space.</p>
              <p>And, if that wasn’t enough.... HotPatch uses a dedicated and trusted payment platform meaning that all transactions are secure. Using HotPatch means that you are at a lower risk of fraud or other security issues!
              </p>
              <br></br>
              <h2>How does HotPatch build trust between users and hosts?</h2>
              <p>Building trust between users and hosts is our number one priority.</p>
              <p>To achieve that, we have a first-class support system, including a 24-hour direct chat, unfiltered review sections, and a strong social media presence. We are building a loyal community of active users and hosts that frequently use the platform.</p>
              <p>Additionally, booking and listing through HotPatch means that you will provide and receive a review. A review is an important way of building trust and improves the likelihood of being chosen to host or access a space.</p>
              <br></br>
              <h1 id="hosts">Hosts</h1>
              <h2 id="who-can-list-space-on-hotpatch-">Who can list space on HotPatch?</h2>
              <p>Anybody with a space that fits our requirements can list on HotPatch. All you need to do is make a free account and you'll be able to start listing! It’s completely free to join and list, and you will only be charged when you receive payment for a confirmed booking.</p>
              <br></br>
              <h2 id="how-do-i-list-my-space-on-hotpatch-">How do I list my space on HotPatch?</h2>
              <p>To start, just click the 'Become a Patch Host' button on the on the navbar. After completing a basic signup, you’ll be asked to follow an easy step-by-step process providing the details of your space.</p>
              <p>The more details you can provide, such as type, photos, and amenities, the easier it will be for people to find and book your Patch!</p>
              <br></br>
              <h2 id="what-category-does-my-patch-go-under-">What category does my Patch go under?</h2>
              <p>You can assign as many categories and subcategories to your Patch as you feel are relevant. These will let interested users discover your Patch more easily.
              </p>
              <br></br>
              <h2 id="what-if-i-have-more-than-one-patch-">What if I have more than one Patch?</h2>
              <p>That isn’t a problem! There’s no limit to how many spaces you can list on HotPatch. In addition, you can list different facilities within the same space (such as a nail station or a tattoo chair inside a salon) as independent Patches.
              </p>
              <p>Please get in touch with us if you need help splitting up your Patch.
              </p>
              <br></br>
              <h2 id="is-there-a-cost-to-list-my-space-on-hotpatch-">Is there a cost to list my space on HotPatch?</h2>
              <p>Not a penny! Listing a space is completely free.</p>
              <p>HotPatch only charges a small transaction fee of 10% on all bookings which we deduct from the payment made by the user.</p>
              <br></br>
              <h2 id="how-much-should-i-charge-for-my-patch-">How much should I charge for my Patch?</h2>
              <p>When deciding on your rate, we suggest you look at similar spaces available on HotPatch and base yours accordingly. You can also update your pricing depending on the level of demand you are seeing for your Patch.</p>
              <p>Amongst other things, you should take into account whether you’ll be renting your space on an
              hourly, daily, or weekly basis.</p>
              <p>Remember that your price should be all-inclusive of any charges and taxes (such as VAT).</p>
              <p>If you have any questions about rates, feel free to contact us directly!</p>
              <br></br>
              <h2 id="how-soon-can-my-patch-be-listed-on-hotpatch-">How soon can my Patch be listed on HotPatch?</h2>
              <p>As soon as your details are verified, your space can be listed immediately.</p>
              <br></br>
              <h2 id="what-user-information-can-i-view-">What user information can I view?</h2>
              <p>Patch Hosts have access to users’ summary statement, bio, past reviews, experience and any
              listed qualifications.</p>
              <br></br>
              <h2 id="how-do-i-know-when-somebody-wants-to-book-">How will I know when somebody wants to book my Patch?</h2>
              <p>You will receive a message in your inbox whenever somebody wants to book or inquire about your Patch. You will also get notifications by email and (if you’ve registered a phone number) text to make sure you don’t miss any requests. From there you will be able to message the user back and confirm any booking requests.</p>
              <br></br>
              <h2 id="how-do-i-get-paid-">How do I get paid?</h2>
              <p>HotPatch uses Stripe, the most complete and reliable e-commerce payment platform.</p>
              <p>To ensure that both the space and the user are as expected, payments are held for 24 hours
              after the start of a booking.</p>
              <p>Money is then sent directly into your bank account.</p>
              <br></br>
              <h1 id="users">Users</h1>
              <h2 id="who-can-rent-space-on-hotpatch-">Who can rent space on HotPatch?</h2>
              <p>Anybody can rent a space on HotPatch.</p>
              <p>Once the host confirms, the space is yours!</p>
              <br></br>
              <h2 id="how-do-i-search-for-a-space-on-hotpatch-">How do I search for a space on HotPatch?</h2>
              <p>Searching for space on HotPatch couldn’t be easier: simply click "Find a Patch" or search by keyword, activity or location in the search bar.</p>
              <p>Afterwards, you can add more filters (space type, amenities, price range, dates, etc.) to refine your search. You can also use the map to view nearby Patches.</p>
              <br></br>
              <h2 id="how-do-i-book-with-hotpatch-">How do I book with HotPatch?</h2>
              <p>Once you’ve found your Patch, simply request a booking.</p>
              <p>Your host will then be able to view your profile and confirm that you can go ahead with the
              booking.</p>
              <p>All you have to do now is confirm payment and you’re all set.</p>
              <br></br>
              <h2 id="can-i-view-a-patch-">Can I view a Patch before booking it?</h2>
              <p>If you’re interested in taking a look at a Patch before booking it, you can Contact the Host on the Patch listing page.</p>
              <br></br>
              <h2 id="how-much-does-it-cost-to-rent-on-hotpatch-">How much does it cost to rent on HotPatch?</h2>
              <p>Rent will vary depending on the type of space, location and dates, as well as hourly, daily and weekly rates.</p>
              <p>Look out for potential discounts on extended renting periods!</p>
              <br></br>
              <h2 id="what-if-I-have-questions-for-the-Host-about-the-Patch?">What if I have questions for the Host about the Patch?</h2>
              <p>No problem!</p>
              <p>Users can contact hosts through HotPatch’s direct chat feature. Always be sure to take a look at the Patch’s description and available times first, your questions may already be answered!</p>
              <br></br>
              <h2 id="when-is-payment-taken">When is payment taken for my HotPatch booking?</h2>
              <p>Payment is collected once the host accepts your booking.</p>
              <p>To ensure that both the space and the user are as expected, payments are held for 24 hours
              after the start of a booking.</p>
              <br></br>
              <h2 id="more-questions-">Have any more questions?</h2>
              <p>Reach out to our awesome team anytime, We’re here to help! You can contact us by email at <a href="mailto:support@hotpatch.com">support@hotpatch.com.</a> 
              or by clicking the Chat icon on the bottom right of the screen. You can also find us on our social media:</p>
              <p>Instagram: <a href="https://www.instagram.com/hotpatch_/?hl=en" target="_blank">@HotPatch_</a> | Twitter: <a href="https://twitter.com/hotpatch_?lang=en" target="_blank">@HotPatch_</a> | 
              Linkedin: <a href="https://www.linkedin.com/company/hotpatchmakespacework/" target="_blank">HotPatch</a>
              </p>



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

export default FaqPage;