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

import css from './HouseSittersUk.css';

const HouseSittersUk = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="House Sitters UK | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HouseSittersUk',
        description: 'HouseSittersUk',
        name: 'HouseSittersUk',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    <div className={css.sectionContent}>

    <h1 className={css.pawTitle}>House Sitters UK</h1>

    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HouseSittersUk;


