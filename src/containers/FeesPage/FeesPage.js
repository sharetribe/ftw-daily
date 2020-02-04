import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './FeesPage.css';

const FeesPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Fees"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FeesPage',
        description: 'Fees associated with Hotpatch',
        name: 'Fees page',
      }}
    >
     <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>HotPatch Fees</h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <h2 id="patch-hosts">Patch Hosts</h2>
              <p>HotPatch retains 10% of each booking as a transaction fee. This amount is deducted from the
              booking total amount when a booking request is confirmed and accepted.</p>
              <p>Please remember to include all local taxes, fees, and account for any other expenses in your
              pricing offered, since HotPatch does not and is not liable to pay for these. </p>
              <h2 id="patch-hosts">Patch Users</h2>
              <p>HotPatch retains 10% of each booking as a Patch service fee. This amount is added to the total
              amount shown on the booking total before a request is sent. This will be charged to the account
              you entered for payment.</p>
              <p>Booking requests will automatically expire 24 hours after sent if not accepted or responded to by
              the Host.</p>
              <p>In the event of a dispute or other event, the transaction amount may be withheld per the Services
              Agreement.</p>
              <p>You must legally report income generated to your business and it is your responsibility to do so.
              This includes income earned from HotPatch directly (Patch Host) and any income generated as a
              result of utilising workspace through HotPatch (Patch User). If you are responsible for charging
              local taxes on services, you must also comply with these regulations.</p>
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

export default FeesPage;