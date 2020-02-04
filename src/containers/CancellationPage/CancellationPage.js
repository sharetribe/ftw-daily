import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './CancellationPage.css';

const CancellationPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Cancellation policy"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CancellationPage',
        description: 'What happens with cancellations',
        name: 'Cancellation page',
      }}
    >
     <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Cancellation policy</h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <p>We know that unfortunately, cancellations can happen. In the event that a booking needs to be
              canceled either by a User or Host, the below Booking Cancellation Policy applies. We encourage
              our Members to communicate directly in the event of a cancellation as soon as possible and also
              immediately notify support@hotpatch.com to initiate the booking cancellation process.</p>
              <p>You must agree to this Booking Cancellation Policy as part of the HotPatch Terms of Service
              (Service Agreement) and our Community Guidelines in order to use the HotPatch platform.
              HotPatch will initiate all refunds, fees, or applicable payments in accordance with the Booking
              Cancellation Policy. HotPatch also reserves the right to collect any fees for cancellations in
              accordance with this Booking Cancellation Policy.</p>
              <h2 id="cancellations">Cancellations</h2>
              <table className={css.pureTable}>
                <thead>
                  <tr>
                  <th>Cancellation Date</th>
                  <th>Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Booking request awaiting confirmation</td>
                    <td>Full refund including all Platform fees</td>
                  </tr>
                  <tr>
                    <td>1+ month ahead of booking start time</td>
                    <td>100% refund, less Platform fees</td>
                  </tr>
                  <tr>
                    <td>7+ days or less to booking start time</td>
                    <td>50% refund, less Platform fees</td>
                  </tr>
                  <tr>
                    <td>7+ days or less to booking start time</td>
                    <td>50% refund, less Platform fees</td>
                  </tr>
                  <tr>
                    <td>Within 48 hours of booking start time</td>
                    <td>Non-refundable</td>
                  </tr>
                </tbody>
              </table>
              <p>There may be some cases where HotPatch needs to cancel a booking and initiate a refund to both
              parties in accordance with the Booking Cancellation Policy outlined above. These circumstances
              may include knowledge of potential illegal activity or harm, risk or safety concerns, violation of
              Community Guidelines, or any other extenuating circumstance.</p>
              <h2 id="rescheduling">Rescheduling</h2>
              <p>When approved by HotPatch and the involved parties in the booking, a booking may be
              rescheduled if mutually agreed upon. This must be agreed upon in a time period that complies
              with the Booking Cancellation Policy.</p>
              <h2 id="cancellation-policy-exemptions">Cancellation Policy Exemptions</h2>
              <p>When approved by both parties and HotPatch, the cancellation policy fees may be waived. We
              encourage parties in booking agreements to communicate and work through any potential
              scheduling issues or cancellations directly and immediately.</p>
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

export default CancellationPage;