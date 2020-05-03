import React from 'react';
import { StaticPage, TopbarContainer, ProfileSettingsPage } from '../../containers';
import { Player, BigPlayButton } from 'video-react';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
  
} from '../../components';

import css from './PresskitPage.css';
import angela from './team/angela.jpg';
import sinead from './team/sinead.jpg';
import shamus from './team/shamus.jpg';
import poster from './tmpsposter.png';
import video from './tmps.mp4';
import petsitter from './petsitter.mp4';
import download from './download.png';
import phone from './phone.png';
import follow from './follow.png';
import notes from './notes.png';
import arrow from './right-arrow.png';
import release from './release.pdf';
import petowner from './petowner.png';

const PresskitPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Presskit | Trust My Pet Sitter"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'PresskitPage',
        description: 'Presskit',
        name: 'Presskit',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
    <div className={css.sectionContent}>
      <h1 className={css.pressTitle}>The Pet Team</h1>
      <p className={css.pressSub}>
        Trust My Pet Sitter founders <strong>Angela Fagan</strong>, <strong>Sinead</strong> and <strong>Shamus Fitzsimons</strong> built a pet care app that connects pet owners with pet sitters based on what’s most important to them.
      </p>
<div className={css.container}>
  <ExternalLink className={css.card} href="https://www.linkedin.com/in/shamus-fitzsimons-trustmypetsitter/">
     <div className={css.card_image_container}>
       <img className={css.card_image} src={shamus} />
    </div>
      
      <svg className={css.card_svg} viewBox="0 0 800 500">

        <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#41a6df"/>
        <path className={css.card_line} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
      </svg>
    
     <div className={css.card_content}>
       <h1 className={css.card_title}>Shamus Fitzsimons</h1>
     <p>CCO and 
     Co- Founder</p>
    </div>
    </ExternalLink>

    <ExternalLink className={css.card} href="https://www.linkedin.com/in/angela-fagan/">
     <div className={css.card_image_container}>
       <img className={css.card_image} src={angela} />
    </div>
      
      <svg className={css.card_svg} viewBox="0 0 800 500">

        <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#41a6df"/>
        <path className={css.card_line} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
      </svg>
    
     <div className={css.card_content}>
       <h1 className={css.card_title}>Angela Fagan</h1>
     <p>CEO and Co-Founder</p>
    </div>
    </ExternalLink>

    <ExternalLink className={css.card} href="https://www.linkedin.com/in/sinead-fitzsimons-9249a9195/">
     <div className={css.card_image_container}>
       <img className={css.card_image} src={sinead} />
    </div>
      
      <svg className={css.card_svg} viewBox="0 0 800 500">

        <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#41a6df"/>
        <path className={css.card_line} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
      </svg>
    
     <div className={css.card_content}>
       <h1 className={css.card_title}>Sinead Fitzsimons</h1>
     <p>Co-Founder</p>
    </div>
    </ExternalLink>

</div>
    <div className={css.strike}>
      <h1 className={css.pressTitle2}>Our Story</h1>
     </div>
      <p className={css.pressSub}>
        Founders <strong>Angela Fagan</strong>, <strong>Shamus</strong> and <strong>Sinead Fitzsimons</strong> created Trust My Pet Sitter after struggling to find suitable care for their pets when travelling.  With 3 dogs and 2 cats it wasn’t always easy to find a family member or friend to watch them.  Often planned getaways were put on hold as suitable arrangement couldn’t be found - Kennels and Catteries were not an option, as the pets were too precious to be caged. They tried sending the dogs to a dog boarder, being looked after in someone else’s house, but that just left them unsettled in an unfamiliar environment with strange pets. The Cats had someone pop in to feed them, but they got lonely after a few days and were very grumpy on their return!
      </p>
      <p>
        They thought there must be a better way of doing this, could they find someone they trusted to come to their home and look after the pets? Being a pet lover is a way of life, the pet sitter would need to be experienced, be trustworthy and mindful of the routine, feeding and of course their home.  Combining a House Sitter with a Pet Sitter, their task was to find people like them. 
      </p>
      <p>
        They created Trust My Pet Sitter because they wanted to make Pet Sitting a profession people could choose to follow, travelling the world looking after other people’s pets.  A way of life for pet lovers who love to travel, from retirees to career break professionals to Millennials choosing a different career path.  The additional features on the app are available to search for Pet Owners and Pet Sitters by Country, Date, Pet Type and Price per night.  Coming soon features include connecting dog owners with local dog friendly businesses.
      </p>
      <p>
        Trust My Pet Sitter have teamed up with PawSquad which lets you video call or text chat with a UK-registered vet absolutely free at any time of day or night, 365 days a year. They have also teamed with YOTI to verify identity across 130 countries within minutes, helping to keep the Trust My Pet Sitter community safe and identifiable. 
      </p>
      <p className={css.nobttm}>
        Trust My Pet Sitter is a Scottish based company.  For press inquiries, please contact <a href="mailto:angela@trustmypetsitter.com">Angela Fagan</a>.
      </p>

      <div className={css.strike}>
      <h1 className={css.pressTitle2}>How it Works</h1>
      <div className={css.pressFlex}>

        <div className={css.videoSide}>
       <Player
      playsInline
      poster={poster}
      src={petsitter}>
      <BigPlayButton position="center" />
      </Player>
        </div>

        <div className={css.videoSide}>
       <Player
      playsInline
      poster={petowner}
      src={video}>
      <BigPlayButton position="center" />
      </Player>
        </div>        

      </div>

      <div className={css.linksFlex}>

        <div className={css.linkItem}>
        <div className={css.logo}>
          <img src={download} />
        </div>
          <ExternalLink href="https://drive.google.com/drive/folders/1K40b_P-YN6SdUFVSuG0IIcvxzRid7WsW?usp=sharing">Download our Logo</ExternalLink>
        </div>

        <div className={css.linkItem}>
        <div className={css.logo}>
          <img src={phone} />
        </div>
          <ExternalLink href="https://play.google.com/store/apps/details?id=com.trustmypetsitter&gl=GB">App Preview</ExternalLink>
        </div>

        <div className={css.linkItem}>
        <div className={css.logo}>
          <img src={follow} />
        </div>
          <ExternalLink href="https://www.instagram.com/trustmypetsitter/">Follow Us</ExternalLink>
        </div>

        <div className={css.linkItem}>
        <div className={css.logo}>
          <img src={notes} />
        </div>
          <ExternalLink href="https://drive.google.com/drive/folders/18zrQ-0DKNR52wzLiHGcGgVBwI2pfv9Ju?usp=sharing">Launch Posts</ExternalLink>
        </div>

      </div>

      <div className={css.strike}>
      <h1 className={css.pressTitle2}>Press Releases</h1>
      </div>

      <p className={css.release}>
        <ExternalLink href={release} download>
        Mother and Daughter Entrepreneurs 
        <img className={css.arr} src={arrow} />
        </ExternalLink>
      </p>

      <p className={css.release}>
        <ExternalLink href="https://www.scotsman.com/business/glasgow-entrepreneurs-seek-funding-to-take-airbnb-for-pets-service-global-1-5062999">
        Air Bnb for Pets 
        <img className={css.arr} src={arrow} />
        </ExternalLink>
      </p>

      <p className={css.release}>
        <ExternalLink href="https://www.insider.co.uk/news/airbnb-pets-start-up-launches-21117774">
        Glasgow-based Trust My Pet Sitter goes for global expansion
        <img className={css.arr} src={arrow} />
        </ExternalLink>
      </p>
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

export default PresskitPage;


