import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: January, 2020</p>

      <p>
        This Privacy Policy applies to the processing of personal data concerning the users ("
        <b>Users</b>") of services provided by öogo ("<b>Service(s)</b>"), including but not limited
        to the creation of profiles, browsing of profiles, booking of services, reviewing of
        services, expensing of services and buying vouchers. This policy explains what personal data
        we collect and how we use it. The Users can be öogo's customers ("<b>Customer</b>"), who
        create a profile to connect with others or Partners (“<b>Partner</b>”), who leverage öogo on
        behalf of their own customers or employees. Öogo leverages third party technologies by
        Stripe, Sharetribe, MapBox and MailChimp which are all subject to their own privacy
        policies. Öogo does not take any responsibility for third parties' privacy policies or the
        processing of personal data in third parties' operations.
      </p>

      <h2>Data Controller</h2>
      <p>
        The data controller in accordance with the applicable data protection law is öogo Piccolo
        Limited ("<b>öogo</b>", "<b>we</b>", "<b>us</b>", "<b>our</b>"). öogo is responsible for
        ensuring that the processing of personal data complies with this Privacy Policy and the
        applicable data protection laws.
      </p>
      <p>Contact details of the data controller:</p>
      <ul>
        <li>öogo Piccolo Limited</li>
        <li>Business ID (Ireland): 659891</li>
        <li>Address: Unit 8, Boyne Business Park, Drogheda, Co. Louth, Ireland</li>
        <li>
          Internet: 
          <a href="https://oogo.me" title="öogo">
            www.oogo.me
          </a>
        </li>
        <li>
          Email: 
          <a href="mailto:kate@oogo.me" title="Email us">
            kate@oogo.me
          </a>
        </li>
      </ul>

      <h2>Collection of Personal Data</h2>
      <p>We collect Users' personal data through different means, which are explained below:</p>

      <p>
        Most of the personal data we process is collected directly from the Users. öogo may collect
        following personal data in the process of providing the Service:
      </p>

      <p>Basic information such as name, age, postal address, email address and phone number</p>

      <p>
        Details about User’s employer (name, address, phone number, ID and VAT ID) should such
        information be considered to be personal data
      </p>

      <p>
        Authentication information such as oogo.me username and password, and if any third party
        service (e.g. Facebook) is used to sign in, the user ID of that service
      </p>

      <p>
        Information relating to the customer relationship such as booked services, their start and
        end times and information on their use billing information
      </p>

      <p>
        Following data is processed by öogo's payments processor (currently Stripe, subject to
        change):
      </p>
      <p>öogo automatically collects and processes the following technical data about the User:</p>
      <ul>
        <li>Payment data, such as credit card number and expiration date</li>
        <li>IP address</li>
        <li>Geographical location data based on the IP address</li>
        <li>Service access times</li>
        <li>Statistics on page views</li>
        <li>Any other automatically collected technical data</li>
        <li>
          Furthermore, &ouml;ogo may also collect other anonymized statistics about the way the User
          uses the Services provided by &ouml;ogo
        </li>
      </ul>

      <p>
        <b>Legal basis and purpose of processing personal data</b>
      </p>
      <p>&ouml;ogo processes personal data for three main purposes:</p>

      <h2>(1) Service</h2>

      <p>
        The primary purpose of collecting personal data is to provide the website &ouml;ogo.me and
        associated Services, to issue accurate charges for the use of the Services and to manage the
        customer relationship. The processing of personal data in this case is based on the
        agreement between the Customer and &ouml;ogo. This concerns, for example, the data collected
        during the signing up for the Service, during the use of the Service and the technical data
        needed to run the Service in a secure manner and communications with Users.
      </p>
      <h2>(2) Marketing and other communications</h2>
      <p>
        &ouml;ogo may occasionally send its Customers and Partners an email to inform about new
        features, solicit feedback, or provide information on what is going on with &ouml;ogo and
        its products, as well as the various promotions being used by &ouml;ogo Partners. We base
        this on our legitimate interest to provide Users with relevant information as part of the
        Services and to promote our Services.
      </p>
      <h2>(3) Service development and research</h2>
      <p>
        We always work to make our Services better. Therefore, we may use the User's data to improve
        the Services. We base this processing on our legitimate interest to grow and develop.
        &ouml;ogo may also collect technical data for statistical purposes to compile anonymous,
        aggregated statistics, such as about the most popular criteria for successful bookings.
        &ouml;ogo may display information publicly to others in an aggregate format that does not
        reveal statistics of any single marketplace. &ouml;ogo does not disclose personal data other
        than as described below.
      </p>
      <p>
        <strong>Disclosures of Personal Data</strong>
      </p>
      <p>We may disclose personal data to third parties in the following cases:</p>
      <p>
        &ouml;ogo may use subcontractors when providing its Services. Our trusted subcontractors
        work on our behalf, and do not have an independent right to use the personal data we
        disclose to them. &ouml;ogo discloses personal data to its subcontractors on a need to know
        basis when necessary to process such data on &ouml;ogo&rsquo;s behalf in order to provide
        Services.
      </p>
      <p>Subcontractors are subject to appropriate security and confidentiality requirements.</p>
      <p>
        When required by law such as to comply with requests by competent authorities or in response
        to a subpoena, court order or other governmental request;
      </p>
      <p>
        When we believe in good faith that disclosure is necessary to protect our rights,
        investigate fraud or to protect our Users&rsquo; safety or rights.
      </p>
      <p>
        If &ouml;ogo, or substantially all of its assets, are acquired, or in the unlikely event
        that &ouml;ogo goes out of business or enters bankruptcy, User information would be one of
        the assets that is transferred or acquired by a third party. You acknowledge that such
        transfers may occur, and that any acquirer of &ouml;ogo may continue to use your personal
        data as set forth in this Privacy Policy.
      </p>
      <p>
        <strong>Transfer of personal data outside of EU/EEA</strong>
      </p>
      <p>
        When necessary and to the extent required for the successful provision of the Services,
        personal data may be transferred to third parties outside of EU/EEA. &ouml;ogo or its
        subcontractors shall not transfer personal data outside of EU/EEA without adequate
        safeguards required by applicable data protection law, such as standard contractual clauses.
      </p>
      <p>
        &ouml;ogo may also use Privacy Shield-certified subcontractors located in the U.S. For more
        information about the Privacy Shield framework developed by the U.S. Department of Commerce
        and the EU Commission and the related principles concerning processing of personal data,
        please see&nbsp;Contact Us.
      </p>
      <h1>Cookies</h1>
      <p>
        Cookies are pieces of data which are received and transmitted by a User's device when the
        User is using &ouml;ogo's Services or website. &ouml;ogo may use cookies and similar
        techniques to provide functionality of the Services, to enhance the user experience and to
        identify Users and how they use the Services. We use cookies, for example, to login and
        logout authentication, to remember session allowing Users to continue the session in case of
        time-out and to prevent unauthorized use of the Services. The User may prohibit the use of
        cookies or remove cookies from the browser settings. However, cookies are important part of
        how the Service works, so limiting the use of cookies may affect the functionality of the
        Service.
      </p>
      <p>
        &ouml;ogo uses third party cookies for various purposes. We may use third party cookies for
        statistical purposes to compile anonymous, aggregated statistics, such as to estimate number
        of Users and detect which parts of the Service Users find most useful, and to identify
        features that could be improved. For such purposes, we use third party cookies, such as
        Google Analytics, to help analyze how our Users use the Service. The technical usage
        information (including IP address) generated by the cookie about use of the Service is
        transmitted to such third parties to compile statistical reports.
      </p>
      <p>
        &ouml;ogo may also use third party cookies for marketing purposes to collect information
        about Users' browsing habits and to remember visits in order to make advertising more
        relevant to that User and to his or her interests. These cookies are usually placed by third
        party advertising networks and social media providers, such as Doubleclick, Google Adwords
        and Twitter. A list of used third parties is available upon request.
      </p>
      <p>
        <strong>Retention of personal data</strong>
      </p>
      <p>
        The User's personal data will be retained only for as long as necessary to fulfil the
        purposes defined in this Privacy Policy. When the User's personal data is no longer required
        by law or rights or obligations by us or the User, we will delete the personal data. In most
        cases, personal data will be deleted upon termination or expiry of the agreement between the
        Customer and &ouml;ogo or upon the Customer&rsquo;s written request. Please note that
        &ouml;ogo may have a right to retain some data even after termination of the agreement for
        billing purposes.
      </p>
      <p>
        Exceptionally, &ouml;ogo may retain personal data for a longer period if we have a
        legitimate reason or an obligation to store data for the purposes of criminal investigation
        or other corresponding reason.
      </p>
      <p>
        <strong>Users' rights</strong>
      </p>
      <p>
        A User has the right to access the data on him/her and upon request, obtain a copy of the
        data. Such request shall include information that is necessary for retrieving the data and
        shall be made using a personally signed document which can be addressed to the contact
        person provided in this Privacy Policy. &ouml;ogo rectifies, erases or supplements possibly
        erroneous, unnecessary, incomplete or obsolete personal data at its own initiative or at the
        request of User concerned. The User is advised to contact &ouml;ogo&rsquo;s contact person
        provided in this Privacy Policy to correct any possibly erroneous data.
      </p>
      <p>
        Users have the right to prohibit &ouml;ogo to process personal data for purposes of direct
        marketing. &ouml;ogo advises the Users to notify &ouml;ogo&rsquo;s contact person provided
        in this Privacy Policy of such possible prohibitions in writing. Users also have a right to
        data portability to the extent granted by applicable data protection rules. Data portability
        refers to a right to receive own personal data in a structured, commonly used
        machine-readable format and transmit your personal data to another data controller.
      </p>
      <p>
        If a User thinks there is a problem with the way &ouml;ogo is processing personal data, the
        User has a right to file in a complaint to a data protection authority in the EU. In Ireland
        the competent authority is the Data Protection Commission. The User may contact the Irish
        Data Protection Commission to raise a concern through&nbsp;
        <a href="https://forms.dataprotection.ie/contact" target="_blank">
          this link
        </a>
        .
      </p>
      <p>
        <strong>Privacy Policy Changes</strong>
      </p>
      <p>
        &ouml;ogo may change this Privacy Policy from time to time. &ouml;ogo recommends that the
        Users regularly access the Privacy Policy to obtain knowledge of any possible changes to it.
        We will provide the date of the Privacy Policy to allow Users to see changes. &ouml;ogo will
        inform Users of possible changes by using reasonable and available channels.
      </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
