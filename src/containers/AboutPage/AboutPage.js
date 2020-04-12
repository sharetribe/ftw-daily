import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image1 from './horsedeal24-banner.png';
import image2 from './benjamin-kroeni.png';
import image3 from './manissa-reichner.png';
import { string } from 'prop-types';

const AboutPage = ({ title }) => {

  /* 
  Title is a temporary prop which is used by HelpPage, FAQPage, KontaktPage, CommunityPage at routeConfiguration.
  These pages have not been created yet, so AboutePage is used instead as a temporary component.
  After befomentioned pages are created title prop have to be deleted.
  */
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  
  // prettier-ignore
  return (
    <StaticPage
      title={ title || "About Us" }
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About HorseDeal24',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
         <h1 className={css.pageTitle}>Hallo! Wir sind HorseDeal24<br/>Das ist ein Test</h1>
          <img className={css.coverImage} src={image1} alt="Team Foto" />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Wir suchen Dich! nd has 3.2 million saunas - almost one sauna per person!</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                Wir sind angetreten, um mit unserer Horse-Sharing Plattform den Pferdesport digital zu revolutionieren.
              </h2>

              <p>
                Ein Pferd zu kaufen und über längere Zeit zu unterhalten kann ganz schön teuer sein - 
                das finden wir auch und haben die erste Schweizer Horsesharing Plattform ins Leben gerufen. 
                Wir finden, wenn man Fahrräder, Autos und sogar Wohnungen miteinander teilen kann, dann muss
                das auch mit Pferden funktionieren.
              </p>

              <h3 className={css.subtitle}>Ideal für Reiter & Pferdebesitzer</h3>

              <p>
                Horsedeal24 bietet Reitern und Pferdebesitzern eine einfache, schnelle und 
                vorallem sichere Möglichkeit, sich über unsere Plattform kennen zu lernen. 
                Die Suche, Kommunikation und Abrechnung laufen komplett über uns - so wird 
                Reiten fast schon zu einem Kinderspiel.
              </p>
    
              <img className={css.coverImage} src={image2} alt="Benjamin Kröni" />
              <h3 className={css.subtitle}>Benjamin Kröni</h3>

              <p>
                Benjamin ist der Gründer und Geschäftsführer der Onlineplattform HorseDeal24. Die Idee
                Pferde-Sharing Plattform kam ihm 2018 durch seine Freundin. Er liess sich vom Pferdesport inspirieren
                und nutzte seine Technik-Expertise, um nur kurze Zeit später den ersten Prototypen zu bauen. 
              </p>
    
              <img className={css.coverImage} src={image3} alt="Manissa Reichner" />
              <h3 className={css.subtitle}>Manissa Reichner</h3>

              <p>
                Manissa ist eine echte Pferdefanatikerin. Sie ist bei uns das Social Media Brain und kümmert
                sich um unsere Community auf Facebook und Instagram. 
                
              </p>

              <h3 id="contact" className={css.subtitle}>
                Create your own marketplace like HorseDeal24
              </h3>
              <p>
                HorseDeal24 is brought to you by the good folks at{' '}
                <ExternalLink href="http://sharetribe.com">Sharetribe</ExternalLink>. Would you like
                to create your own marketplace platform a bit like HorseDeal24? Or perhaps a mobile
                app? With Sharetribe it's really easy. If you have a marketplace idea in mind, do
                get in touch!
              </p>
              <p>
                You can also checkout our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink>.
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

AboutPage.defaultProps = {
  title: null
};

AboutPage.propTypes = {
  title: string
};

export default AboutPage;
