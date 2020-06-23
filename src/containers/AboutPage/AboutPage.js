import React from 'react';
import config from '../../config';
import { InstagramPageURL } from '../../util/urlHelpers';
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
          <h1 className={css.pageTitle}>Schön, bist du hier gelandet. <br className={css.pageTitleBreak}/>Es ist Zeit, uns kennen zu lernen.</h1>
          <img className={css.coverImage} src={image1} alt="Team Foto" />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Wir suchen Dich! Werde ein teil von uns & bewerbe dich <a href="/bewerbung" onclick="return false;">hier</a>!</p>
            </div>

            <div className={css.contentMain}>
              <h3>
                Wir sind angetreten, um mit unserer Pferde-Sharing Plattform den Pferdesport digital zu revolutionieren.
              </h3>

              <p>
                Ein Pferd zu kaufen und über längere Zeit zu unterhalten kann ganz schön teuer sein -
                das finden wir auch und haben die erste Schweizer Pferde-Sharing Plattform ins Leben gerufen.
                Wir finden, wenn man Fahrräder, Autos und sogar Wohnungen miteinander teilen kann, warum nicht auch
                einfach ein Pferd teilen?
              </p>

              <h3 className={css.subtitle}>Ideal für Reiter & Pferdebesitzer</h3>

              <p>
                Horsedeal24 bietet Reitern und Pferdebesitzern eine einfache, schnelle und
                vorallem sichere Möglichkeit, sich über unsere Plattform kennen zu lernen und
                ein Pferd über einen längeren Zeitraum hinweg gemeinsam zu Reiten.
                Die Suche, Kommunikation und Abrechnung werden dabei komplett über unsere Plattform abgewickelt,
                sodass das Reiten schon fast zu einem Kinderspiel wird - und nicht in einem bürokratischen Chaos endet.
              </p>

              <img className={css.coverImage} src={image2} alt="Benjamin Kröni" />
              <strong>Benjamin Kröni</strong>, Founder & CEO<br/>
              <p>
                Die geniale Idee, eine Pferde-Sharing Plattform zu gründen kam Benjamin im Jahr 2018 als er sich durch seine Freundin, eine erfolgreiche Reiterin, inspirieren liess.
                Er nutzte seine Technik-Expertise, um nur kurze Zeit später den ersten Prototypen zu bauen. Intern kümmert er sich bei uns um
                das operative Geschäft und betreut unsere Partner & den reibungslosen Betrieb unserer Plattform.
              </p>

              <img className={css.coverImage} src={image3} alt="Manissa Reichner" />
              <strong>Manissa Reichner</strong>, Community Manager<br/>
              <p>
                Manissa ist eine echte Pferdefanatikerin. Sie ist bei uns das Social Media Brain und kümmert
                sich um unsere Community auf Facebook und Instagram.

              </p>

              <h3 id="contact" className={css.subtitle}>
                Melde dich noch heute kostenlos an!
              </h3>
              <p>
                Eine Anmeldung auf {' '} <ExternalLink href="https://www.horsedeal24.com">HorseDeal24</ExternalLink> ist
                und bleibt für Reiter und Pferdebesitzer kostenlos. Zudem erhältst du von uns bei jeder
                erfolgreichen Anmeldung eine kleine Überraschung - also los!
              </p>
              <p>
                Besuche uns auch gerne auf {' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> und{' '}
                <ExternalLink href="https://www.instagram.com/horsedeal24/">Instagram</ExternalLink>
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
