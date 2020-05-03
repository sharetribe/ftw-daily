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

import css from './CatSitting.css';
import logo from './paw.png';

const CatSitting = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Cat Sitting | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CatSitting',
        description: 'CatSitting',
        name: 'CatSitting',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    
  <div className={css.questionMain}>
    <div className={css.pageContent}>
      <div><h3 className={css.helpTitle}>Cat Sitting</h3></div>
      <div className={css.logoWrap}><img src={logo} /></div>
    </div>
  </div>

    <div className={css.sectionContent}>

    <h1 className={css.pawTitle}>Cat Sitting</h1>

    <p>Whoever said Cats didn’t like human company didn’t have cats! Whenever we went on holiday our two cats Ted and Harvey were always extremely aloof for at least a week on our return.</p>
    <p>We thought cat sitting would involve someone (neighbour or family) popping in to feed them and perhaps spend an hour or so hanging out with them.  The cats had different ideas - they were most put out that their routine was changed and didn’t mind showing the family on our return.</p>
    <p>That’s when we thought about Cat Sitting, maybe the cats really did need a human after all, maybe they even quite liked us!</p>
    <p>Are you looking for a trusted Cat Sitter to watch your babies? At <strong>Trust My Pet Sitter</strong> we have a community of loving cat sitters that are waiting to meet you and your cats!</p>
    <p>The founding team at <strong>Trust My Pet Sitter</strong> set up our Cat Sitting Solution as we hated leaving our cats when we went on holiday or had to go away because of work.  If this is you, you are not alone.</p>
    <p><strong>Trust My Pet Sitter</strong> helps owners find a cat sitting solution that suits them, finding suitable care for cats when they are travelling.  Most cat owners now want a cat sitting result that allows their cats to stay in a safe and familiar environment - their own home.</p>
    <p>As Cat Parents we said no thanks to the old cat sitting solutions which had made us feel guilty and our cats miserable.  We waved goodbye to catteries and cat hotels.</p>
    <p>At <strong>Trust My Pet Sitter</strong> you can simplify your search for a cat sitting professional who suits you and your cat.  Just browse and choose by category , then choose your city and be presented with a choice of cat sitters who match your criteria. Many of our cat sitting professionals may travel from other parts of your city, country or even continent!  What you can be sure of is that every one of our cat sitting professionals will be YOTI ID verified, be backed with 24/7 Vet Advice and come with an insurance backed guarantee.</p>
    <p>Every day cat owners can browse through the profiles to decide if they want to contact cat sitters using the secure messaging platform. Alternatively they can put up their own profile and allow cat sitting professionals to contact them.</p>
    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default CatSitting;


