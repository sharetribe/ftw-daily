import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from '../../components';

import css from './FaqPage.css';

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
                Great Question! HotPatch is a peer-to-peer platform for people to list and rent space.
              </p>
              <p>
                It allows users and hosts to access and share any space: rental chairs in hair salons, fitness
                studios, offices, and anything else in between!
              </p>

              <br></br>

              <h2>
                How does HotPatch build trust between users and hosts?
              </h2>

              <p>
                Building trust between users and hosts is our number one priority.
              </p>

              <p>
                To achieve that, we have a first-class support system, including a 24-hour direct chat,
                unfiltered review sections, as well as a strong social media presence.
              </p>
              <br></br>
              <h2 id="why-should-i-list-or-book-through-hotpatch-">Why should I list or book through HotPatch?</h2>
              <p>Where do we start?</p>
              <p>Listing and booking through HotPatch protects you under our Terms of Service, cancellation
              and refund policies.</p>
              <p>Additionally, booking and listing through HotPatch means that you will provide and receive a
              review. A review is an important way of building trust and improves the likelihood of being
              chosen to host or access a space.</p>
              <p>And, if that wasn’t enough.... HotPatch uses a dedicated and trusted payment platform
              meaning that all transactions are secure. Using HotPatch means that you are at a lower risk of
              fraud or other security issues!</p>
              <br></br>
              <h1 id="hosts">Hosts</h1>
              <h2 id="who-can-list-space-on-hotpatch-">Who can list space on HotPatch?</h2>
              <p>Anybody with a space that fits our requirements can list on HotPatch.</p>
              <br></br>
              <h2 id="how-do-i-list-my-space-on-hotpatch-">How do I list my space on HotPatch?</h2>
              <p>After completing a basic signup, you’ll be asked to follow an easy step-by-step process
              providing the details of your space.</p>
              <br></br>
              <h2 id="is-there-a-cost-to-list-my-space-on-hotpatch-">Is there a cost to list my space on HotPatch?</h2>
              <p>Not a penny! Listing a space is completely free.</p>
              <p>HotPatch only charges a small transaction fee of 10% on all bookings to help us maintain all
              the awesome tools you need to Make Space Work!</p>
              <br></br>
              <h2 id="how-much-should-i-charge-for-my-patch-">How much should I charge for my Patch?</h2>
              <p>When deciding on your rate, we suggest you look at similar spaces available on HotPatch and
              base yours accordingly.</p>
              <p>Amongst other things, you should take into account whether you’ll be renting your space on an
              hourly, daily, or weekly basis.</p>
              <p>If you have any questions about rates, feel free to contact us directly!</p>
              <br></br>
              <h2 id="how-soon-can-my-patch-be-listed-on-hotpatch-">How soon can my Patch be listed on HotPatch?</h2>
              <p>As soon as your details are verified, your space can be listed immediately.</p>
              <br></br>
              <h2 id="what-user-information-can-i-view-">What user information can I view?</h2>
              <p>Patch Hosts have access to users’ summary statement, bio, past reviews, experience and any
              listed qualifications.</p>
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
              <p>If a host is happy with your profile, then the space is yours!</p>
              <br></br>
              <h2 id="how-do-i-search-for-a-space-on-hotpatch-">How do I search for a space on HotPatch?</h2>
              <p>Searching for space on HotPatch couldn’t be easier: simply set your filters (space type,
              location, price range, dates, etc.) and you’re ready to go.</p>
              <br></br>
              <h2 id="how-much-does-it-cost-to-rent-on-hotpatch-">How much does it cost to rent on HotPatch?</h2>
              <p>Rents vary depending on the type of space, location, dates, as well as hourly, daily, or weekly
              rates.</p>
              <p>Look out for potential discounts on extended renting periods.</p>
              <p>What if I have questions for the host about the Patch?</p>
              <p>No problem!</p>
              <p>Users can contact hosts through HotPatch’s direct chat.</p>
              <br></br>
              <h2 id="how-do-i-book-with-hotpatch-">How do I book with HotPatch?</h2>
              <p>Once you’ve found your Patch, simply request a booking.</p>
              <p>Your host will then be able to view your profile and confirm that you can go ahead with the
              booking.</p>
              <p>All you have to do now is confirm payment and you’re all set.</p>
              <p>When is payment taken for my HotPatch booking?
              Payment is collected once the host accepts your booking.</p>
              <p>To ensure that both the space and the user are as expected, payments are held for 24 hours
              after the start of a booking.</p>
              <br></br>
              <h2 id="more-questions-">More questions?</h2>
              <p>Reach out to our awesome team anytime.
              We’re here to help, <a href="mailto:support@hotpatch.com">support@hotpatch.com.</a></p>



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