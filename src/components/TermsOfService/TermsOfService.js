import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <h1 className={css.mainHeading}> Saunatime Platform Terms and Conditions </h1>
      <p className={css.lastUpdated}>Last updated: October 5th, 2017</p>
      <p>
        Welcome to Saunatime.io, a peer-to-peer water sports equipment rental marketplace and online
        service provided by Sharetribe Oy. ("Saunatime," "we," or "us"). This Terms of Service
        Agreement ("Agreement") describes the terms and conditions that govern your use of and
        participation in Saunatime services. By accessing or using the Service, you signify that you
        have read, understood, and agree to be bound by this Agreement.  If you do not agree to any
        of these terms or any future amendments, do not use or access (or continue to access) the
        Service. This Agreement applies to all visitors, users, and others who access the Service
        ("Users").
      </p>
      <p>
        Please read this agreement carefully to ensure that you understand each provision.  You
        understand and agree that Saunatime is not a party to any agreements entered into between
        renters and owners, nor is Saunatime an agent or insurer.  Saunatime has no control over the
        conduct of renters or other users of the service and disclaims all liability in this
        regard.  This agreement contains a mandatory arbitration of disputes provision that requires
        the use of arbitration on an individual basis to resolve disputes, rather than jury trials
        or class actions, and also limits the remedies available to you in the event of a dispute.
      </p>

      <h2 className={css.sectionHeading}>Eligibility</h2>

      <p>
        This Service is intended solely for people eighteen (18) years of age or older, and any
        registration, use or access to the Service by anyone under 18 is strictly prohibited.
        Saunatime reserves the right to limit or restrict access by any person, in our sole
        discretion.
      </p>
      <h2 className={css.sectionHeading}>End User License</h2>
      <p>
        Subject to the terms and conditions of this Agreement, you are hereby granted a
        non-exclusive, limited, non-transferable, freely revocable, license to use the Service for
        your personal, noncommercial use only. Saunatime may terminate this license at any time for
        any reason or no reason.
      </p>
      <h2 className={css.sectionHeading}>Indemnity</h2>
      <p>
        You agree to defend, indemnify and hold harmless Saunatime and its subsidiaries, agents,
        licensors, managers, and other affiliated companies, and their employees, contractors,
        agents, officers and directors, from and against any and all claims, damages, obligations,
        losses, liabilities, costs or debt, and expenses (including but not limited to attorney's
        fees) arising from: (i) your use of and access to the Service or Products; (ii) your
        violation of any term of this Agreement, including without limitation your breach of any of
        the representations and warranties; (iii) your violation of any third-party right, including
        without limitation any right of privacy, publicity rights or Intellectual Property Rights;
        (iv) your violation of any law, rule or regulation of the United States or any other
        country; (v) any claim or damages that arise as a result of any of your User Content or any
        that is submitted via your account; or (vi) any other party’s access and use of the Service
        with your unique username, password or other appropriate security code.
      </p>
      <h2 className={css.sectionHeading}>No Warranty</h2>
      <p>
        If you choose to use the service and/or participate in a rental, you do so at your own
        risk.  The service and any products are provided on an “as is” and “as available” basis.  To
        the maximum extent permitted by applicable law, the service is provided without warranties
        of any kind, whether express or implied, including, but not limited to implied warranties of
        merchantability, fitness for a particular purpose, or non-infringement.  No advice or
        information, whether oral or written, obtained by you from Saunatime or through the service
        will create any warranty not expressly stated herein.  Without limiting the foregoing,
        Saunatime, its subsidiaries, and its licensors do not warrant that the content is accurate,
        reliable or correct; that the service or any rental will meet your requirements; that the
        service will be available at any particular time or location, uninterrupted or secure; that
        any defects or errors will be corrected; or that the service is free of viruses or other
        harmful components.  You will be solely responsible for any damage or loss that results from
        your use of the service or products.
      </p>
      <h2 className={css.sectionHeading}>Limitation of Liability</h2>
      <p>
        Except as expressly provided in the insurance provision, to the maximum extent permitted by
        applicable law, in no event shall Saunatime, its affiliates, agents, directors, employees,
        supplier, or its licensors be liable for any direct, indirect, punitive, incidental,
        special, consequential, or exemplary damages, including without limitation damages for loss
        of profits, goodwill, use, data or other intangible losses, that result from the use of, or
        inability to use this service, including without limitation any rental.
      </p>
      <p>
        To the maximum extent permitted by applicable law, Saunatime assumes no liability or
        responsibility for any (I) Errors, mistakes, or inaccuracies of content; (II) Personal
        injury or property damage of any nature whatsoever, resulting from your access to or use of
        our service or products; (III) Any unauthorized access to or use of our secure servers
        and/or any and all personal information stored therein; (IV) Any interruption or cessation
        of transmission to or from the service; (V) Any bugs, viruses, or the like that may be
        transmitted to or through our service by any third party; (IV) Any errors or omissions in
        any content or for any loss or damage incurred as a result of the us of any content posted,
        emailed, transmitted, or otherwise made available through the service; and/or (VII) User
        content or the defamatory, offensive, or illegal conduct of any third party.  In no event
        shall Saunatime, its affiliates, agents, directors, employees, suppliers, or licensors be
        liable to you for any claims, proceedings, liabilities, obligations, damages, losses or
        costs in an amount exceeding the greater of either (a) The amounts paid by Saunatime to you
        in the twelve (12) month period prior to the event giving rise to the liability; or (b) One
        hundred dollars ($100).  The limitations of damages set forth above are fundamental elements
        of the basis of the bargain between Saunatime and you.  This limitation of liability section
        applies whether the alleged liability is based on contract, tort, negligence, strict
        liability, or any other basis, even if Saunatime has been advised of the possibility of such
        damage.  The forgoing limitation of liability shall apply to the fullest extent permitted by
        law in the applicable jurisdiction.
      </p>
      <h2 className={css.sectionHeading}>Assignment</h2>
      <p>
        This Agreement, and any rights and licenses granted hereunder, may not be transferred or
        assigned by you, but may be assigned by Saunatime without restriction.  Any attempted
        transfer or assignment in violation hereof shall be null and void.
      </p>
      <h2 className={css.sectionHeading}>Termination</h2>
      <p>
        We may terminate your participation in the Service at any time, for any reason or no reason,
        without explanation. We maintain sole discretion to bar your use of the Service in the
        future, for any reason that we determine or for no reason. This Agreement will remain in
        effect after your participation in the Service terminates.
      </p>
      <h2 className={css.sectionHeading}>Governing Law</h2>
      <p>
        You agree that: (i) the Service shall be deemed solely based in New York; and (ii) the
        Service shall be deemed a passive one that does not give rise to personal jurisdiction over
        Saunatime, either specific or general, in jurisdictions other than New York. This Agreement
        shall be governed by the internal substantive laws of the State of New York. You agree to
        submit to the personal jurisdiction of a state court located in New York County, New York or
        the U.S. District Court for the Southern District of New York for any actions for which we
        retain the right to seek injunctive or other equitable relief in a court of competent
        jurisdiction to prevent the actual or threatened infringement, misappropriation or violation
        of a our copyrights, trademarks, trade secrets, patents, or other intellectual property or
        proprietary rights, as set forth in the Arbitration provision below.
      </p>
      <h2 className={css.sectionHeading}>Arbitration</h2>
      <p>
        In the unlikely event that Saunatime has not been able to resolve a dispute it has with you
        after attempting to do so informally, we each agree to resolve any claim, dispute, or
        controversy (excluding any Saunatime claims for injunctive or other equitable relief)
        arising out of or in connection with or relating to this Agreement, or the breach or alleged
        breach thereof (collectively, "Claims"), by binding arbitration in the county of New York.
        The award rendered by the arbitrator shall include costs of arbitration, reasonable
        attorney's fees and reasonable costs for expert and other witnesses, and any judgment on the
        award rendered by the arbitrator may be entered in any court of competent jurisdiction.
        Nothing in this Section shall be deemed as preventing Saunatime from seeking injunctive or
        other equitable relief from the courts as necessary to protect any of Saunatime’s
        proprietary interests. All claims must be brought in the party’s individual capacity, and
        not as a class member in any purported class or representative proceeding.  You agree that,
        by entering into this agreement, you and Saunatime are each waiving the right to a trial by
        jury or to participate in a class action.
      </p>
      <h2 className={css.sectionHeading}>Entire Agreement/Severability</h2>
      <p>
        This Agreement, together with all amendments, all documents referenced in this Agreement,
        and any other legal notices and agreements published by Saunatime via the Service, shall
        constitute the entire agreement between you and Saunatime concerning the Service. If a court
        of competent jurisdiction deems any provision of this Agreement invalid, the invalidity of
        such provision shall not affect the validity of the remaining provisions of this Agreement,
        which shall remain in full force and effect.
      </p>
      <h2 className={css.sectionHeading}>No Waiver</h2>
      <p>
        No waiver of any term of this Agreement shall be deemed a further or continuing waiver of
        such term or any other term, and Quiver’s failure to assert any right or provision under
        this Agreement shall not constitute a waiver of such right or provision.
      </p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
