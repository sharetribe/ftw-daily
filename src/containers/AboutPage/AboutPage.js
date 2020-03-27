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
          <h1 className={css.pageTitle}>Support vor Ort</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Wusstest du dass es Deutschland mehr als 3 Millionen Kleinunternehmer gibt - 
                jeder davon mit einer eigenen Geschichte den es zu supporten gilt!</p>
            </div>

            <div className={css.contentMain}>
              <h2>
Support vor Ort möchte lokale Kleinunternehmer und deren Kunden zusammenbringen um so virtuellen Handel zu 
ermöglichen. Steht das analoge Geschäft still, können Gutscheine über unsere Plattform verkauft werden.
So bieten wir Dir eine Möglichkeit, deine Lieblingsgeschäfte zu unterstützen und vereinfachen es Unternehmen, 
diese Krise zu überleben. Hierbei fungieren wir lediglich als Mittelsmann und das selbstverständlich auf 
ehrenamtlicher Basis.
              </h2>

              <p>
              Die Corona-Krise hat schwerwiegende betriebswirtschaftliche Folgen - durch die nötigen Ausgangssperren und 
verkürzten Öffnungszeiten erleben vor allem kleine Geschäfte fallende oder sogar ganz ausbleibende Einkünfte.
              </p>

              <h3 className={css.subtitle}>Keine Kunden = Kein Verkauf.</h3>

              <p>
              Jedoch müssen weiter Mieten und Löhne bezahlt werden. So kann es zu Engpässen kommen, eventuell müssen sogar einige Läden schließen. Doch wir können helfen! 
Stellt es euch vor wie eine Urlaubsreise, die wir Monate im Voraus buchen. Nur fliegen wir hier nicht in die Sonne,
sondern trinken einen Kaffee. Wenn niemand bucht, gibt es keinen Flug. Genauso ist es nun mit unserem Café - 
da sie aktuell nichts verkaufen können, haben sie keine Einkünfte und müssen eventuell schließen. 
Doch „buchen“ wir bereits jetzt unseren Kaffee für den Sommer haben sie eine Chance zu überleben. 
Können wir das überhaupt schaffen? Bucht nur eine Person einen Flug, muss man höchstwahrscheinlich die Maschine 
chartern - das wird teuer. Doch tun sich mehrere mit kleineren Beträgen zusammen, kann man die Last schultern!
So funktioniert auch Support vor Ort. Wir alle haben „unser“ Café oder „unsere“ Buchhandlung. Gemeinsam können 
wir ihnen helfen diese schwierige Phase durchzustehen!
              </p>
              <p>
                Schaut bei uns vorbei auf {' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> und{' '}
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

export default AboutPage;
