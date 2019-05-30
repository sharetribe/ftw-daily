import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Fees.css';

const Fees = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2017</p>
      <p>
        This is an overview of fees on Studiotime for creating a listing, accepting a booking request, and also booking fees by artists. These fees are also referenced in the Terms of Service (Service Agreement) and are accepted fees by using this platform.
      </p>
      <p>
        If you have questions at any time regarding fees, please email us at info@audiobarn.ca.
      </p>
      
      <h2>Studios' Fees</h2>
      <h3>1. Studio listing subscription fees</h3>
      <p>
        Studiotime is not a venture backed startup. We’re proud to say that we are a bootstrap and small company, which relies on the support of it’s marketplace members. We currently require a subscription to list your studio on Studiotime and the monthly subscriptions start at $20/month (pricing here). We value each and every studio part of our community and if you feel that we can not offer a service that you are willing to support with for $20/month, you can cancel your subscription at any time. If you have paid in advance using the semi-annual or annual billing options, we will refund you amount that was pre-paid in advance of the current date at the time of cancellation.
      </p>
      <h3>2. Studio booking transaction fees</h3> 
      <p>
        Studiotime retains 10% of each booking as a transaction fee. This amount is deducted from the booking total amount when you accept a booking request. Please make sure that you also included all local taxes, fees, and account for any other expenses in your hourly price offered, since Studiotime does not and is not liable to pay for these. You are also responsible for reporting all income generated from studio bookings per government and local regulations and codes. We may withhold a booking transaction in the event of a dispute or other event per the Services Agreement.
      </p>

      <h2>Artists' (Booking) Fees</h2>
      <p>
        Studiotime charges 10% for the total of each booking as a service fee. This amount is automatically added to the total amount shown on the booking total prior to a booking request being sent. This amount is charged to the account you entered for payment when a booking request is accepted. All booking requests will automatically expire 24 hours after sent if not accepted by the studio listing owner. In the event of a dispute or other event, the transaction amount may be withheld per the Services Agreement.
      </p>   

      <h2>Other Fees</h2>
      <h3>1. Overtime fees</h3>
      <p>
        In the event that a booking exceeds the timeframe of the original booking agreement, the studio is responsible for collecting additional payment for the studio usage, studio services, or other additional fees agreed upon. Since this is outside the booking agreement on the Studiotime platform, Studiotime is not liable for collecting this payment or any circumstances outside the original booking agreement.
      </p>
      <h3>2. Fines for damage</h3>    
      <p>
        We try to avoid all events of damage, but in the rare event that damage to the studio property, equipment, or other takes place during the time period of the booking agreement, the artist (user booking) is directly responsible for these fees. As defined in the Services Agreement, the artist is liable for this damage and Studiotime may collect this if required. It is encouraged for both the studio and artist to work through this directly since it is usually best between both parties directly. Studios are also encouraged and in some instances required to have their own General Liability (GL) insurance policies per our Service Agreement for this very reason. If you need to report damage to your studio, equipment, or other at any time, please take the proper action to first contact any local authorities if necessary, your insurance provider, and also notify us immediately at info@audiobarn.ca.
      </p>   
    </div>
  );
};

Fees.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Fees.propTypes = {
  rootClassName: string,
  className: string,
};

export default Fees;
