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

import css from './DogSitting.css';
import logo from './paw.png';

const DogSitting = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Dog Sitting | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'DogSitting',
        description: 'DogSitting',
        name: 'DogSitting',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>

  <div className={css.questionMain}>
    <div className={css.pageContent}>
      <div><h3 className={css.helpTitle}>Dog Sitting</h3></div>
      <div className={css.logoWrap}><img src={logo} /></div>
    </div>
  </div>

    <div className={css.sectionContent}>

    <h1 className={css.pawTitle}>Dog Sitting</h1>

    <p>Are you looking for a trusted Dog Sitter to watch your fur babies? At <strong>Trust My Pet SItter</strong> we have a community of loving dog sitters that are waiting to meet you and your dogs!</p>

    <p>The founding team at <strong>Trust My Pet SItter</strong> set up our Dog Sitting Solution as we hated leaving our dogs when we went on holiday or had to go away for a few days because of work.  If this is you, you are not alone.</p>

    <p><strong>Trust My Pet SItter</strong> helps owners find a dog sitting solution that suits them, finding suitable care for dogs when they are travelling.  Most dog owners now want a dog sitting result that allows their dogs to stay in a safe and familiar environment - their own home.</p>

    <p>As Dog Owners we said no thanks to the old dog sitting solutions which had made us feel guilty and our dogs miserable.  We waved goodbye to dog  kennels, dog hotels and even dog boarders.</p>

    <p>At <strong>Trust My Pet SItter</strong> you can simplify your search for a dog sitting professional who suits you and your dog.  Just browse and choose by category , then choose your dog size and city and be presented with a choice of dog sitters who match your criteria. Many of our dog sitting professionals may travel from other parts of your city, country or even continent!  What you can be sure of is that every one of our dog sitting professionals will be YOTI ID verified, be backed with 24/7 Vet Advice and come with an insurance backed guarantee.</p>

    <p>Every day dog owners can browse through the profiles to decide if they want to contact dog sitters using the secure messaging platform. Alternatively they can put up their own profile and allow dog sitting professionals to contact them.</p>

    <p>If your requirement is for dog sitting during the day when you are at work, you can search our Pet Services section and find a dog walker, doggy daycare or even a drop in dog sitter. We’ve even got dog groomers and vets in your local area.</p>

    </div>

      </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default DogSitting;


