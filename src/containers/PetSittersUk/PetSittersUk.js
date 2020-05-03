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

import css from './PetSittersUk.css';

const PetSittersUk = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Pet Sitters UK | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PetSittersUk',
        description: 'PetSittersUk',
        name: 'PetSittersUk',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    <div className={css.sectionContent}>

    <h1 className={css.pawTitle}>Pet Sitters UK</h1>

    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default PetSittersUk;


