import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.module.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: January 29, 2020</p>
      <div className="{css.policyContainer}">
        <p>HotPatch is committed to protecting and respecting your privacy. This privacy policy sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it.</p>
        <p>The Website <a href="/">www.hotpatch.com</a> is operated by Hotpatch Limited (we, us, our, HotPatch), a company incorporated in England &amp; Wales. Where we decide the purpose or means for the processing of the personal data that you provide when using our service, we are the “data controller” for the purposes of the GDPR. As data controller, we will comply with all applicable data protection laws.</p>
        <p>This policy should be read together with our Terms of Service. </p>
        <p>Our Website may contain hyperlinks to third party websites. These websites operate fully independently from us, and we cannot accept any responsibility or liability for the privacy practices of such third parties nor the availability of these external sites or resources. The appearance of such links on our Website is not an endorsement. Should you use any of these websites, such use is at your own risk and we would recommend that you review their respective privacy policies.</p>
        <p>If you have any questions or comments about this privacy policy, please let us know by emailing <strong><a href="mailto:support@hotpatch.com">support@hotpatch.com.</a></strong></p>
        <h2 id="what-personal-information-are-we-likely-to-collect-about-you-">What personal information are we likely to collect about you?</h2>
        <p>In order to enable you to reserve a Patch via hotpatch.com, we will need to collect and process information about you.</p>
        <h3 id="information-provided-by-you">Information provided by you</h3>
        <p>When you use our Website, you will be asked to fill in forms to create your own account. We will ask you to provide us with the following information:</p>
        <ul>
            <li>your first and last name</li>
            <li>your email address</li>
            <li>telephone number</li>
            <li>your username (if applicable)</li>
            <li>your password</li>
        </ul>
        <p>If you decide to make a reservation, we will also ask you to provide:</p>
        <ul>
            <li>your payment card details; and</li>
            <li>your billing address </li>
        </ul>
        <h3 id="analytics">Analytics</h3>
        <p>Our Website uses cookies and other mechanisms, such as third party pixels, to collect analytical information, such as your internet protocol (IP) address, to help analyse how visitors use the Website. Such information includes:</p>
        <ul>
            <li>number of visitors to our Website</li>
            <li>pages visited while at the Website and time spent per page</li>
            <li>page interaction information, such as scrolling, clicks and browsing methods</li>
            <li>websites where visitors have come from and where they go afterwards</li>
            <li>page response times and any download errors</li>
            <li>other technical information relating to end user device, such as IP address or browser plug-in</li>
        </ul>
        <p>You can always choose to enable or disable cookies in your internet browser. By default, most internet browsers accept cookies but this can be changed. For further details, please consult the help menu in your internet browser. For further information about cookies, please see: www.allaboutcookies.org, and how to adjust your browser settings here: <a href="https://allaboutcookies.org/how-to-manage-cookies">www.allaboutcookies.org/managecookies</a>. </p>
        <p>We use Google Analytics on our Website for anonymous reporting of Website usage. If you would like to opt-out of Google Analytics monitoring your behaviour on our Website please use this link: (<a href="https://tools.google.com/dlpage/gaoptout/">https://tools.google.com/dlpage/gaoptout/</a>). </p>
        <h3 id="financial-transaction">Financial Transaction</h3>
        <p>All financial transactions via our Website are handled directly by our payment service provider, Stripe. We only share that information as is necessary to conclude the transaction and will not share any personal information with this third-party provider, nor will we receive the financial information that you provide to them except for the last 4 digits of your payment card.</p>
        <h2 id="how-do-we-use-your-personal-data-and-on-what-basis-">How do we use your personal data and on what basis?</h2>
        <p>When you visit our Website, whether to browse our content or make a reservation (the Service), we may use the personal information that you provide for the following purposes:</p>
        

        <table className={css.pureTable}>
            <thead>
                <tr>
                    <td>
                        <p><strong>Processing</strong></p>
                    </td>
                    <td>
                        <p><strong>Purpose</strong></p>
                    </td>
                    <td>
                        <p><strong>Basis</strong></p>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p>Account creation &amp; administration</p>
                    </td>
                    <td>
                        <p>To enable you to use the Service, to contact you with information about your account and the Service, to enable you to make reservations and to enable you to raise support queries.</p>
                    </td>
                    <td>
                        <p>To allow us to perform our Service contract with you.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><span>Transactional correspondence</span></p>
                    </td>
                    <td>
                        <p>To notify you that your registration for an account is successful, and to provide information in relation to your use of the Service, including confirmation of reservations.</p>
                    </td>
                    <td>
                        <p>To allow us to perform our Service contract with you.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Customer support</p>
                    </td>
                    <td>
                        <p>To respond to your support queries.</p>
                    </td>
                    <td>
                        <p>>To allow us to perform our Service contract with you.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Service usage monitoring (including Analytics)</p>
                    </td>
                    <td>
                        <p>To monitor performance of the Service, identify errors, and improve the Service.</p>
                    </td>
                    <td>
                        <p>Legitimate interests of our own to operate our business</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Lead Generation</p>
                    </td>
                    <td>
                        <p>To market the Service to prospective customers and business partners.</p>
                    </td>
                    <td>
                        <p>Legitimate interests of our own or of third parties to operate our business</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Marketing</p>
                    </td>
                    <td>
                        <p>To market the Service to prospective customers and business partners.</p>
                    </td>
                    <td>
                        <p>Legitimate interests of our own or of third parties to operate our business</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>Targeted Marketing</p>
                    </td>
                    <td>
                        <p>To understand your interests so that we can render more relevant advertisements to you [through online advertising platforms including social media].</p>
                    </td>
                    <td>
                        <p>Consent</p>
                    </td>
                </tr>
            </tbody>
        </table>




        <p>Where we rely on legitimate interests as a lawful basis for processing your personal data, we will always consider whether or not our interests are overridden by your rights and freedoms.</p>
        <h2 id="do-we-share-your-personal-information-with-anyone-else-">Do we share your personal information with anyone else?</h2>
        <p>We will only ever share your information with third parties in the ways that are described in this privacy policy.</p>
        <h3>Personnel, Suppliers and Subcontractors</h3> 
        <p>We keep your information confidential but may disclose it to our personnel (including personnel in our group companies), suppliers or subcontractors (including our cloud-based data processing, data analytics and payment service providers) insofar as it is reasonably necessary for the purposes set out in this privacy policy, provided that they do not make independent use of the information. In some instances, this data sharing may involve the transfer of information outside the EU. Please see our section on International Data Transfers below. </p>
        <p>We will provide your personal information to third party service providers such as:</p>
        <ul>
            <li>Sendgrid (based in the US), who will deliver emails to you in connection with your reservations made through the Website, such as confirmation of registration for an account, and confirmation of reservations.</li>
        </ul>
        <p>If we are involved in a merger, acquisition, sale of all or a portion of our business or assets, the information we hold may be included as part of that sale, in which case you will be notified via email and/or a prominent notice on the Website of any changes in ownership or use of your information, as any choices you may have regarding that information. </p>
        <p>By group company, we mean our subsidiaries, our ultimate holding company and its subsidiaries, as defined with reference to the definitions of &quot;holding undertaking&quot; and &quot;subsidiary undertaking&quot; in section 1162 of the UK Companies Act 2006.</p>
        <p>We will not pass your information on to third parties for marketing purposes unless you have provided your consent, in which event the advertisements that appear when you visit our Website will be targeted to provide you with more relevant advertising content and you may receive communications from third parties offering similar or related services to us.</p>
        <h2 id="your-choices-and-rights-in-relation-to-personal-data-which-we-process-relating-to-you">Your choices and rights in relation to personal data which we process relating to you</h2>
        <p>You have the following rights over the way we process personal data relating to you. We aim to comply without undue delay, and within one month at the latest:</p>
        <ul>
            <li>to ask for a copy of data we are processing about you and have inaccuracies corrected;</li>
            <li>to ask us to restrict, stop processing, or to delete your personal data;</li>
            <li>to request a machine-readable copy of your personal data, which you can use with another service provider. Where it is technically feasible, you can ask us to send this information directly to another provider if you prefer; and</li>
            <li>to make a complaint to a data protection regulator. You may contact them at: <a href="https://ico.org.uk/concerns/">https://ico.org.uk/concerns/</a></li>
        </ul>
        <p>To make a request in relation to any of the aforementioned rights, please email us at <strong><a href="mailto:support@hotpatch.com">support@hotpatch.com.</a></strong> </p>
        <p>You are under no statutory or contractual obligation to provide any of your personal data to us. However, if you do not provide the personal information requested, we will not be able to provide you with the services that we offer. </p>
        <p>If you are unhappy with the way that we are processing your personal data or if you’d prefer not to receive certain marketing information or limit the use of your personal information to a particular purpose, please let us know. The best way to bring this to our attention is by emailing us at <strong><a href="mailto:support@hotpatch.com">support@hotpatch.com.</a></strong></p>
        <h2 id="children">Children</h2>
        <p>We do not knowingly use the Website to solicit data from or market to children. </p>
        <p>If a parent or guardian becomes aware that his or her child has provided us with information or may be receiving communications from us without consent of a parent or guardian, we ask that this be brought to our immediate attention. We will make it our priority to address this situation and delete information relating to a child as soon as practicable. In such an event, please contact us at <strong><a href="mailto:support@hotpatch.com">support@hotpatch.com.</a> </strong></p>
        <h2 id="security">Security</h2>
        <p>We will take appropriate technical and organisational measures to ensure a level of security appropriate to the risk that could be encountered via the use of our Website and services.</p>
        <p>All information you provide to us is stored on our secure servers. Where we have given you (or where you have chosen) a password which enables you to access certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share a password with anyone. </p>
        <p>Please be aware that, while we make the security of our Website and your personal information a high priority, no security system can prevent all security breaches. </p>
        <p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our site. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access.</p>
        <h2 id="retention">Retention</h2>
        <p>In accordance with data protection laws and good commercial practice, we do not retain data in a form that permits identification of the person(s) to whom it relates for any longer than is necessary. Once the purpose for which information has been collected has been fulfilled, we will either permanently delete your personal information or remove all identifiers within it so that it is no longer personal data. We may use such anonymised data for research and/or business analysis purposes. </p>
        <p>Where you have provided us with personal information in order to set up an account with us, we will retain those details for as long as your account remains active. </p>
        <p>Where we obtain your personal data in relation to the use or purchase of our services, including VAT or invoicing information, we are obligated by law to keep this for a minimum of 6 years.</p>
        <h2 id="international-data-transfers">International data transfers</h2>
        <p>Our servers are located in the European Union and the information that we collect directly from you will be stored in these servers.</p>
        <p>We may also transfer your personal data to our third-party service providers, many of whom may be located outside of the EU, operate from multiple locations including non-EU based operations or engage sub-processors located outside the EU, including Sendgrid (based in the US). </p>
        <p>There are agreements in place with all of our third-party service providers to ensure that those parties process personal data using appropriate safeguards that meet the requirements of data protection laws.</p>
        <h2 id="changes-to-this-policy">Changes to this policy</h2>
        <p>This policy may be updated from time to time. We will notify you of any changes to our policy by posting the new policy on our Website. You are advised to consult this webpage regularly for any changes to the policy.</p>
        <h2 id="contact-us">Contact us</h2>
        <p>Questions, comments and requests in relation to this policy are welcome and should be sent to <strong><a href="mailto:support@hotpatch.com">support@hotpatch.com.</a></strong></p>
      </div>
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
