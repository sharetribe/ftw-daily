import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: <span className={css.datecolor}>August 8, 2019</span></p>

      <p>
        We are committed to protecting and respecting your privacy. This Privacy Policy applies to your use of our site and applies and should be read in conjunction with our Terms of Use. The same definitions apply.
      </p>

      <p>
        This Privacy Policy sets out the basis on which any personal data we collect from you, or that you provide to us including personal information (together, "Information"), will be processed by us. Please read the following carefully to understand our practices regarding your personal Information and how we will treat it. If you do not agree with this Privacy Policy, please do not use our site.
      </p>

      <h2>Data Controller:</h2>
      <p>
        For the purposes of the Data Protection Act 1998 (the Act), the data controller is TrustMyPetSitter.com Ltd.
      </p>

      <h2>Information we may collection from you: Please do not submit your personal information to us if you are not agreeable to our collection of it. By using our site you are agreeing that we may collect and process the following Information about you (without limitation):</h2>
      
      <ul className={css.privacyul}>
        <li className={css.privacyli}>Personal information such as name, address and contact details, property information, housesitting requirements, dates of availability etc that you provide by filling in forms on our site and otherwise by corresponding with us via or in connection with our site;</li>
        <li className={css.privacyli}>Other details of your visits to our site including, but not limited to, traffic data, search criteria, location data, weblogs and other communication data, and the resources that you access; and</li>
        <li className={css.privacyli}>Automatically collected data from your visits to the site, which may involve the use of cookies and web beacons which allow us to facilitate your convenient use of our site and to enhance user experience developments. (Please note that you may refuse to accept cookies by activating the setting on your browser which allows you to refuse the use of cookies. However, if you select this setting you may be unable to access certain parts of our site)</li>
      </ul>

      <h2>Uses made of your Information: We use Information held about you in the following ways:</h2>
      <ul className={css.privacyul}>
         <li className={css.privacyli}>To operate our site and carry out our obligations arising from our site.</li>
         <li className={css.privacyli}>To allow you to participate in interactive features of our site.</li>
         <li className={css.privacyli}>To provide you with information about us, our pet owners and pet sitting assignments that may be of interest to you, where you have consented to be contacted for such purposes.</li>
         <li className={css.privacyli}>To ensure that content from our site is presented in the most effective manner for you and for your computer.</li>
         <li className={css.privacyli}>To notify you about changes to our site.</li>
         <li className={css.privacyli}>As required in order to facilitate your use of any new services, applications or uses for any of your Information via our site, provided that we have obtained your opt-in consent before using the Information in that manner.</li>
      </ul>

      <p>
        Unless you opt to do so, we do not disclose information about identifiable individuals to our advertisers, but we may provide them with aggregate information about our users. We may also use such aggregate information to help us reach the kind of audience we want to target. We may make use of the Information we have collected from you to enable us to target our audience appropriately for specific services and other information connected with our site. We will always obtain your specific consent to being contacted for targeted advertising or research purposes.
      </p>
      
      <h2>Data Security and Protections:</h2>
      <p>
        All Information you provide to us may be stored on our servers. We endeavour to encrypt information during transit; however, the transmission of Information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our site; any transmission by you is at your own risk. Once we have received your Information, we will use strict procedures and security features to try to prevent unauthorised access. In addition to these safeguards, your personal information is protected in the UK under the Data Protection Act 1998. This obliges us to ensure that your Information should be processed fairly and lawfully, should be accurate, relevant and not excessive, not be retained for longer than is necessary and, if applicable, be kept up to date. Your statutory rights are not affected.
      </p>

      <h2>Disclosure of your Information: We may only disclose your personal Information to third parties subject to the same restrictions as contained in this Privacy Policy to any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries. We may also disclose your Information to third parties:</h2>
      <ul className={css.privacyul}>
         <li className={css.privacyli}>In the event that we sell or buy any business or assets, in which case we may disclose your Information in confidence to the prospective seller or buyer of such business or assets.</li>
         <li className={css.privacyli}>If we or substantially all of our assets are transferred to or acquired by a third party, in which case personal data held by us about our customers will be one of the transferred assets subject to the terms of this Privacy Policy.</li>
         <li className={css.privacyli}>If we are under a duty to disclose or share your Information in order to comply with any legal obligation, or in order to enforce or apply our terms and conditions other agreements; or to protect the rights, property, or safety of us, our customers, or others. This includes exchanging Information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</li>
      </ul>

      <h2>Your rights:</h2>
      <p>
        You have the right to ask us not to use your Information for ongoing reasons, such as emailing you. Please contact us with your request to unsubscribe from our mailing list or use the unsubscribe link on our marketing emails. We will do our best to process your request within a reasonable time and subject to practical limitations. In particular, backup copies of your Information may exist for a time after receipt of your request.
      </p>

      <h2>Email Marketing:</h2>
      <p>
         We agree not to sell, distribute, or otherwise share the information we receive from the email extension with anyone. The only exception is that we may share the information with a parent, subsidiary, or third-party vendor solely for the administrative purpose of completing the transaction that the user has specifically requested and only then if the parent, subsidiary, or vendor also has agreed to abide by this agreement. We clearly communicate to users what information will be collected and how and why it will be used. Our website and any marketing materials clearly communicate to users how they can unsubscribe or opt of receiving further marketing communications from us.
      </p>

      <h2>Third party privacy policies:</h2>
      <p>
        Our site may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any Information to these websites.
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
