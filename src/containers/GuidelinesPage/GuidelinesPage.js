import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer
} from '../../components';

import css from './GuidelinesPage.css';

const GuidelinesPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Community guidelines"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'GuidelinesPage',
        description: 'Community guidelines',
        name: 'Community guidelines',
      }}
    >
     <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>HotPatch Community Guidelines</h1>

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <p>Efficiency is nothing without trust. But trust is not just built on words.</p>
              <p>HotPatch is committed to provide a safe, trustworthy and honest environment, where Patch Hosts and Users always act in the best interest of our community.</p>
              <p>We hope that our Patch Hosts and Users will always act with the best interest for the HotPatch community, and just to be sure, below we have a few Community Guidelines for you to take a look at.</p>
              <h2 id="for-patch-hosts">For Patch Hosts</h2>
              <ul>
                  <li>Patch Hosts must comply with all laws and regulations.</li>
                  <li>Accurate representation of your Patch, including pricing, amenities, and pictures, helps to ensure that HotPatch remains a community of trust. Patches must be represented accurately. If a Patch Host misrepresents a Patch in any way, the Patch and the Host account may be removed.</li>
                  <li>Patch Hosts must have permission/authority to list a Patch. For example, If you are subletting a space, do not list it on HotPatch without the consent of the owner. If a Patch is listed without the consent of the owner, the Patch and the Host account will be removed.</li>
                  <li>Patch Hosts must respect the privacy of Patch Users for the duration of the booking.</li>
              </ul>
              <h2 id="for-patch-users">For Patch Users</h2>
              <ul>
                  <li>Patch Users must respect the rules set out by the Patch Host and use the Patch as intended.</li>
                  <li>When using a Patch, Patch Users must follow all laws and regulations.</li>
                  <li>Please use the Patch as intended. Patch Hosts have the right to notify appropriate authorities if a Patch has been misused.</li>
              </ul>
              <h2 id="remember-">Remember...</h2>
              <ul>
                  <li>It is vital that you comply with local laws, health and safety regulations, local authority orders and tax legislation at all times. HotPatch is not liable for ensuring compliance and it is the responsibility of Patch Hosts and Patch Users to ensure all local laws, health and safety regulations, local authority orders and tax legislation compliance are met.</li>
                  <li>You must legally report income generated to your business and it is your responsibility to do so. This includes income earned from HotPatch directly (Patch Host) and any income generated as a result of utilising workspace through HotPatch (Patch User). If you are responsible for charging local taxes on services, you must also comply with these regulations.</li>
                  <li>We urge Patch Hosts and Users to communicate freely, but please do not misrepresent your Patch or yourself.</li>
                  <li>Please host and use the Patch as intended. Misuse of a Patch, misrepresentation, or fraudulent intent may result in a Patch and HotPatch accounts being removed.</li>
              </ul>
              <p>Violations of these Community Guidelines pose a risk to the HotPatch community. In certain cases, we may have to suspend or cease an account for ongoing or serious violations. Any illegal activity may also be subject to legal action being taken. We also reserve the right to edit or remove content that breaches these Community Guidelines.</p>
              <p>If you have any questions about these Community Guidelines, or if you believe that a Host or User has violated these Community Guidelines, then please email us immediately at <a href="mailto:support@hotpatch.com.">support@hotpatch.com</a></p>
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

export default GuidelinesPage;