import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './CancellationPolicy.css';

const   CancellationPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: May 31, 2019</p>
      <p>
        In the event that a confirmed booking needs to be cancelled either by an artist booking a studio or the studio, the following Booking Cancellation Policy applies. We encourage both artists and studios to communicate directly in the event of a cancellation as soon as possible and also immediately notify <a href="mailto:info@audiobarn.ca">info@audiobarn.ca</a> to initiate a booking cancellation.
      </p>
      <p>
        <strong>You must agree to this Booking Cancellation Policy as part of the <a href="/terms-of-service">Terms of Service (Services Agreement)</a> and <a href="/community-guidelines">Community Guidelines</a> in order to use the JamInTime platform. If you do not agree to this policy, you must not use the platform.</strong>
      </p>
      <p>
        JamInTime will initiate all refunds, fees, or applicable payments in accordance with this policy. We also reserve the right to collect any fees for cancellations in accordance with this Booking Cancellation Policy.
      </p>

      <h2>Cancellations</h2>                          
      <table>
        <tr>
          <th>Cancellation Date</th>
          <th>Refund Amount</th>
        </tr>
        <tr>
          <td>Booking request pending</td>
          <td>Full refund and all platform fees refunded</td>                    
        </tr>
        <tr>
          <td>30+ days prior to booking start time</td>          
          <td>100%, minus platform fees</td>
        </tr>      
        <tr>
          <td>7 calendar days or less to booking start time</td>
          <td>50%, minus platform fees</td>          
        </tr>
        <tr>
          <td>Within 48 hours of booking start time</td>        
          <td>Non-refundable</td>
        </tr>                  
      </table>
      <p>
        The only time the above Cancellation Policy fees may be waived or exemptions made is when mutually agreed upon by both parties in the booking agreement and JamInTime. We encourage both parties in booking agreements to communicate and work through any potential scheduling issues or cancellations directly and immediately. This ensures the a mutually beneficial outcome in a timely manner. In the event that a cancellation needs to be made, please also immediately notify <a href="mailto:info@audiobarn.ca">info@audiobarn.ca</a>.
      </p>

      <h3>JamInTime Initiated Cancellations</h3>
      <p>
        In the event of extenuating circumstances, JamInTime may decide to cancel a booking and initiate a refund to both parties in accordance with the Booking Cancellation Policy outlined above. These circumstances may include knowledge of potential illegal activity or harm, risk or safety concerns, violation of <a href="/community-guidelines">Community Guidelines</a>, or any other extenuating circumstance.
      </p>
    </div>
  );
};

CancellationPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

CancellationPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default CancellationPolicy;
