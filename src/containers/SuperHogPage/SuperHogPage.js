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

import css from './SuperHogPage.css';
import pawsquad from './images/paw.png';
import pawexplanation from './images/pawexplanation.png';

const SuperHogPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Superhog | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'SuperHogPage',
        description: 'SuperHogPage',
        name: 'SuperHogPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    <div className={css.sectionContent}>

    <h1 className={css.pawTitle}>SUPERHOG</h1>

    <p className={css.pawSub}>Predict - Prevent - Protect</p>

    <h2>How it works</h2>

    <p>
    SUPERHOG provides a £1m SUPERGUARANTEE. SUPERHOG is a global trust tribe made up of verified and trusted home-sharers across multiple platforms from around the world. So far, members range from occasional Airbnber’s and holiday home exchangers to professional hosts and pet-sitters. We combat fraud and guest behaviour, while flagging potentially risky reservations.
    </p>

    <hr className={css.myHr} />

    <h2>SUPERHOG for Hosts</h2>

    <p>
    Each guest goes through a dynamic set of screens and checks that collect different types of information based on the guest’s experience and booking information.
    </p>

    <p>
    SUPERHOG identifies the guest using a digital footprint to make sure the guest is unique, identified and actually is who they say they are in the hosting ecosystem. We validate each of the guests bookings against our worldwide database.
    </p>

    <p>
    By doing this we will guarantee hosts that the following will not happen to you:
    </p>

    <p>Guest damages which include accidental, deliberate and malicious damage to yours or a 3rd parties property. Any claims brought against you for bodily injury caused to guests that your property is responsible for SUPERHOG for Pet-sitters</p>

    <hr className={css.myHr} />

    <h2>Globally protecting guests from property rental disasters</h2>

    <p>
    SUPERHOG carries out detailed checks on property owners and rental agencies who offer super short lets. All members have been approved as legitimate hosts and their properties validated so you can be sure you’re staying somewhere safe and secure.
    </p>

    <hr className={css.myHr} />

    <h2>We will guarantee the following will not happen to you:</h2>

    <ul className={css.superhogUl}>
      <li>Home failure</li>
      <li>Home misrepresentation</li>
      <li>Home fraud</li>
      <li>Host cancellation</li>
    </ul>

    <p>SUPERHOG’s SUPERGUARANTEE provides market-leading home-sharing protection to hosts and pet-sitters in case our prevention fails. Our comprehensive host, pet-sitter and property validation services enable us to guarantee our members against up to £1m of damage, legal liability and travel disasters.</p>
    
    <NamedLink name="SuperHogPage">Learn more about Superhog</NamedLink>

    <p className={css.joinNow}>
    <NamedLink name="SignupPage">Join Now</NamedLink>
    </p>
    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default SuperHogPage;


