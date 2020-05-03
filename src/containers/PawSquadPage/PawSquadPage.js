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

import css from './PawSquadPage.css';
import pawsquad from './images/paw.png';
import pawexplanation from './images/pawexplanation.png';

const PawSquadPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Pet Sitting with Confidence | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PawSquadPage',
        description: 'PawSquad',
        name: 'PawSquadPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    <div className={css.sectionContent}>

    <h1 className={css.pawTitle}>Pet Sitting with Confidence</h1>

    <p className={css.pawSub}>24/7 Vet Advice by
    <img src={pawsquad} className={css.pawImg} />
    </p>

    <h2>Peace of Mind</h2>

    <p>
    When you join the Trust My Pet Sitter Community all Pet Sitter bookings are covered by our 24/7 Vet Advice Line.  Trust My Pet Sitter have teamed up with PawSquad, the UK’s leading online veterinary consultation service.
    </p>

    <hr className={css.divLine} />
    
    <div className={css.pawEx}>
    <img src={pawexplanation} />
    </div>

    <h2>How it Works</h2>

    <p>
    PawSquad lets you video call or text chat with a UK-registered vet free at any time or day or night, 365 days a year. Our Pet Sitters enjoy the peace of mind of always having a ‘vet in their pocket’, during every  Pet Sitting experience, no matter where they are in the world!
    </p>

    <h2>Getting Started</h2>

    <p>
    As soon as the Pet Sit starts then our Pet Sitters will be automatically covered by the PawSquad service for the duration of the booking. 
    </p>

    <p>
    <ExternalLink href="https://www.pawsquad.com/trustmypetsitter">Learn more about PawSquad</ExternalLink>
    </p>
    
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

export default PawSquadPage;


