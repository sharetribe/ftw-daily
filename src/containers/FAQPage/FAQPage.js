import React from 'react';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import StaticPage from '../../containers/StaticPage/StaticPage';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';

import css from './FAQPage.module.css';

const FAQPage = () => {
  // prettier-ignore
  return (
    <StaticPage>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
        <h1 className={css.pageTitle}>Frequently Asked Questions</h1>

        <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Fragen, die häufig gestellt werden und auch dir weiterhelfen können</p>
            </div>

            <div className={css.contentMain}>
              <h2>Ist die Buchung eines Termins für mich als Kunde kostenlos?</h2>
              <p>Antwort: Ja, als Kunde einer Werkstatt ist die Buchung kostenfrei.</p>

              <h2>Muss ich meine Zahlungsdaten angeben?</h2>
              <p>Antwort: Als Kunde ist die Buchung eines Werkstatttermins über die Plattform kostenlos und es müssen keine Zahlungsdaten angegeben werden.</p>

              <h2>Wo kann ich meine vergangenen Bestellungen sehen?</h2>
              <p>Antwort: Deine Bestellungen können unter dem Reiter "Verwaltung" und dem Punkt "Buchungen" abgerufen werden.</p>

              <h2>Wie läuft eine Stornierung ab?</h2>
              <p>Antwort: Über die Verwaltung und den gewünschten Termin kannst du den Button "Buchung stornieren" aufrufen. 
                Dieser kann bis ein Tag vor dem Termin von beiden Parteien storniert werden.</p>

              <h2>Kann ich auch als Gast buchen?</h2>
              <p>Antwort: Gäste können derzeit noch nicht buchen, jedoch kann man ohne Account nach einem geeigneten Anbieter suchen. Bei der Buchung wird man dann aufgefordert, 
                sich zu registrieren. Neben einer direkten Registrierung auf unserer Plattform, ist es auch möglich, sich mit einem Google- oder Facebook-Account zu registrieren.</p>

              <h2>Wie registriere ich mich?</h2>
              <p>Antwort: Rechts neben der Suchleiste findest du den Button "Registrieren". Neben einer direkten Registrierung auf unserer Plattform, ist es auch möglich, 
                sich mit einem Google- oder Facebook-Account zu registrieren.</p>
              
              <h2>Was tue ich, wenn ich mein Passwort vergessen habe?</h2>
              <p>Antwort: Wenn du dein Passwort vergessen hast, kannst du es über den Link "Passwort zurücksetzen" in der Anmeldemaske zurücksetzen.</p>

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

export default FAQPage;