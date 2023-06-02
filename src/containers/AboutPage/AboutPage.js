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

import css from './AboutPage.module.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Erfahren Sie mehr über unsere Plattform!</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Wussten Sie, dass es allein in Wien über 500 Kfz-Werkstätten gibt? </p>
            </div>

            <div className={css.contentMain}>
              <h2>
              Carlo bietet Autofahrern in Österreich die Möglichkeit, ihre Werkstatttermine 
              bequem und einfach online zu buchen. Wir bieten eine schnelle und unkomplizierte Lösung, 
              um Zeit und Mühe zu sparen. Unser Ziel ist es, sowohl Autofahrern als auch Werkstätten 
              einen besseren Service zu bieten.
              </h2>

              <p>
              Sie möchten den richtigen Anbieter finden, um Ihren Werkstatttermin zu buchen? Mit unserer 
              Plattform können Sie aus einer Vielzahl verschiedener Werkstätten wählen und den besten Service 
              für Sie finden. Buchen Sie Ihren Werkstatttermin bequem und kostenlos online und sparen Sie Zeit und Mühe!

              </p>

              <h3 className={css.subtitle}>Betreiben Sie ein Werkstatt?</h3>

              <p>
              Unsere Plattform bietet Werkstätten viele Vorteile. 
              Sie ermöglicht es ihnen, mehr Kunden zu erreichen und ihren Service zu verbessern. 
              Außerdem können sie ihre Termine online verwalten und Kunden eine bequeme Möglichkeit bieten, 
              Termine zu buchen. Dadurch können sie Zeit und Mühe sparen und mehr Umsatz generieren.
              </p>
              
              <p> <b>&ensp;Verbessern Sie Ihren Service </b></p>
              <p> <b>&ensp;Erreichen Sie mehr Kunden </b></p>
              <p> <b>&ensp;Sparen Sie Zeit und Mühe </b></p>
              <p> <b>&ensp;Generieren Sie mehr Umsatz </b></p>
              
              
              <p><em>
              Registrieren Sie sich jetzt!
              </em></p>
      
              
              <p>
                Sie können uns auch auf{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> und{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink> besuchen.
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

export default AboutPage;
