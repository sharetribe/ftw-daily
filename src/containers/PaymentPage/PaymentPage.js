import React from 'react';
import { StaticPage, TopbarContainer, ProfileSettingsPage } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  NamedLink,
  
} from '../../components';

import line from './images/sketch.svg';
import crown from './images/crown.png';
import card from './images/card.png';
import vet from './images/vet2.png';
import listing from './images/checklist.png';
import checkmark from './images/checkmark.png';
import css from './PaymentPage.css';

const PaymentPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Buy Membership and Go Premium | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PaymentPage',
        description: 'PawSquad',
        name: 'PaymentPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

  <LayoutWrapperMain className={css.PaymentWrapper}>
  
    <div className={css.sectionContent}>

    <div className={css.gridContainer}>
      <div className={css.item1}>
        <div className={css.firstRow}>
           <img src={crown} />
           <h2>Go Premium now</h2>
           <img className={css.lineImg} src={line} />
        </div>
           <p>just <span>$10</span> per month</p>
           <p>(cancel anytime)</p>

           <div className={css.Chargebee}>
            <img src={card} />Pay with card
           </div>

           <div className={css.getHelp}>
              <p>Need help? <NamedLink name="ContactPage">Send us a message</NamedLink></p>
           </div>

      </div>  
     <div className={css.item2}>
           <h2>Pet Services – Go Premium</h2>

<div className={css.whybuy}>
  <ul>
     <li><img src={checkmark} /> Create your profile</li>
     <li><img src={checkmark} /> Show in local pet listing searches</li>
     <li><img src={checkmark} /> Show in Category search listings</li>
     <li><img src={checkmark} /> Receive Messages from Pet Parents</li>
     <li><img src={checkmark} /> Send Messages to Pet Parents</li>
     <li><img src={checkmark} /> Secure online messaging</li>
     <li><img src={checkmark} /> No additional fees</li>
  </ul>
</div>

     </div>
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

export default PaymentPage;


