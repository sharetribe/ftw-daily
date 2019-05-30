import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './CommunityGuidelines.css';

const   CommunityGuidelines = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2017</p>
      <p> 
        JamInTime is the most trusted online marketplace to rent music studios for a reason, which is the outstanding community that we have of both artists and studios. We’re built on the foundation of trust, best interest of our community, and thus we do have Community Guidelines that we’ve created and actively enforce. We take violations of these Community Guidelines seriously and may suspend or terminate an Account for ongoing or serious violations. Fraudulent or illegal activity may also be subject to legal action taken. We reserve the right to also edit or remove content on our site that violates these Community Guidelines or if we believe it adversely affects the integrity of the JamInTime marketplace or it’s users.
      </p>

      <p> 
        These Community Guidelines are part of and use words and phrases that are identified in our
        Terms of Service (Services Agreement). If you have any questions about these Community
        Guidelines or if you believe that a user has violated these Community Guidelines, please
        email us immediately at admin@JamInTime.io.
      </p>

      <h2>Studios Must:</h2>
      <h3>1. Comply with local laws, zoning ordinances, and tax laws at all times.</h3>
      <p> 
        JamInTime is not liable for ensuring compliance and it is the responsibility of studios and each listing owner to ensure all local laws, zoning ordinance, and also tax compliance are met. You must also legally report income generated from JamInTime to your business and it is your responsibility to do so. If you are responsible for charging local taxes on services, you must also comply with these regulations.
      </p>

      <h3>2. Accurate representation of the studios, pricing, and services of each studio.</h3> 
      <p> 
        Most artists and those looking to book your space have not seen the studio in person, so be honest and clearly represent the studio and the services that you are offering. Do not misrepresent pricing or dishonestly make claims by any means. We will take proactive action if it is reported or discovered that you are misrepresenting your studio or the services that you offer.
      </p>

      <h3>3. Only list and offer a studio that you are permissioned to offer.</h3> 
      <p>
        Only list the studio that you are permissioned to offer and have the authority to do so for. If you are subletting a space and are not permitted to then further offer it, do not offer it on JamInTime without consent by the owner to do so. If it is discovered that you are offering a studio on JamInTime that you do not have permission to offer, the listing will be immediately removed and your account is subject to be removed from our site.
      </p>

      <h2>Artists must:</h2>
      <h3>1. Comply with all studio rules, policies, and booking agreement.</h3> 
      <p> 
        All artists and those that have booked a studio through JamInTime must only use the studio as described by the studio listing owner, and as agreed upon in the booking agreement. Studios take pride in their space, the equipment, and their profession and will be expecting the same professional respect and courtesy that they are providing.
      </p>

      <h3>2. Never engage in illegal or prohibited activity on studio premises.</h3>
      <p> 
        All local laws are enforceable and studio owners can notify authorities if laws are being broken on their property or on their studio premises. Never engage in any illegal activity on studio property or premises.
      </p> 

      <h2>Everyone must:</h2>
      <h3>1. Communicate honestly with others.</h3>
      <p> 
        JamInTime is a trusted marketplace and depends on the honesty, integrity, and best interest of everyone that uses the platform. Only message others with the best intent in mind, do not make false claims, misrepresentations, do not engage in fraudulent activity, and do not willingly be deceitful.
      </p>

      <h3>2. Transact honestly and with the intended use of JamInTime.</h3> 
      <p> 
        JamInTime is intended to be a marketplace for artists to book music studios and studios to offer their studios. Any transactions that are not intended for this purpose, are misrepresented, have fraudulent intent, or otherwise deemed harmful to either user will be immediately reviewed and if fraudulent, legal action will be taken by JamInTime if deemed necessary. All users and transactions are also applicable to the Terms of Service that is agreed upon by using the platform.
      </p>

      <h3>Use of Information</h3>
      <p> 
        We may use personal information for various purposes, including to do the following: 
      </p> 

      <h3>3. Respect others privacy and information.</h3>
      <p> 
        Many studios are owned and operated by world-renowned professionals. Some studios may also have well-known artists present at the studio during your booking. It is professional and common courtesy to respect the privacy of the studios, others on the premise, and the information of both the studios and professionals that may be offering studio services. In some cases, studios may require artists to sign a Non-Disclosure Agreement (NDA) at the studio prior to their booking. If there is ever an issue with privacy, studio security, or studio rules, please send us an email immediately at admin@JamInTime.io.
      </p>
    </div>
  );
};

CommunityGuidelines.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

CommunityGuidelines.propTypes = {
  rootClassName: string,
  className: string,
};

export default CommunityGuidelines;
