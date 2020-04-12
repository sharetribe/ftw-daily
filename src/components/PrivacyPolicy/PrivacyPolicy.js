import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Letztes Update: 12.04.2020</p>

      <p>
        Vielen Dank für Ihr Interesse an unserer Website. Der Schutz Ihrer persönlichen Daten ist uns 
        ein wichtiges Anliegen. Nachfolgend informieren wir Sie umfassend über den Umgang mit Ihren Daten.
      </p>

      <h3>Beschaffung und Bearbeitung von prozessbezogener Daten</h3>
      <p>
        Sie können unsere Seite besuchen, ohne Angaben zu Ihrer Person zu machen. Wir speichern lediglich 
        Zugriffsdaten ohne Personenbezug wie z.B. den Namen Ihres Internet Service Providers, die Seite, 
        von der aus Sie uns besuchen oder den Namen der angeforderten Datei. Diese Daten werden wir ausschliesslich 
        zur Verbesserung unseres Angebots auswerten und erlauben keinen Rückschluss auf Ihre Person.
    
        Personendaten werden nur erhoben, wenn Sie uns diese im Rahmen Ihrer Warenbestellung, bei Eröffnung 
        eines Kundenkontos oder bei der Anmeldung für unseren Newsletter freiwillig mitteilen. Wir verwenden 
        die von Ihnen mitgeteilten Daten ohne Ihre gesonderte Einwilligung ausschliesslich zur Erfüllung und 
        Abwicklung Ihrer Bestellung. Mit vollständiger Abwicklung des Vertrags und vollständiger Kaufpreiszahlung 
        werden Ihre Daten für die weitere Verwendung gesperrt und nach Ablauf der gesetzlichen Aufbewahrungsfristen 
        gelöscht, sofern Sie nicht ausdrücklich in die weitere Nutzung Ihrer Daten eingewilligt haben. Bei Anmeldung 
        für den Newsletter wird Ihre E-Mail-Adresse für eigene Werbezwecke genutzt, bis Sie sich vom Newsletter abmelden. 
        Die Abmeldung ist jederzeit möglich.
      </p>

      <h3>Verwendung von Cookies</h3>
      <p>
        Auf verschiedenen Seiten verwenden wir Cookies, um den Besuch unserer Website attraktiver zu gestalten 
        und die Nutzung bestimmter Funktionen zu ermöglichen. Hierbei handelt es sich um kleine Textdateien, die auf 
        Ihrem Computer abgelegt werden. Die meisten der von uns verwendeten Cookies werden nach Ende der Browser-Sitzung 
        wieder von Ihrer Festplatte gelöscht (sog. Sitzungs- oder Session-Cookies). Andere Cookies verbleiben auf Ihrem 
        Computer und ermöglichen uns, Sie bei Ihrem nächsten Besuch wieder zu erkennen (sog. dauerhafte Cookies). Unseren 
        Partnerunternehmen ist es nicht gestattet, über unsere Website Personendaten mittels Cookies zu beschaffen oder zu bearbeiten.
          
        Sie können die Speicherung von Cookies in Ihrem Browser verhindern, indem Sie über die Menüleiste „Extras > Internetoptionen > Datenschutz“ 
        (Internet Explorer) bzw. „Einstellungen > Datenschutz“ (Firefox) die Speicherung und das Lesen von Cookies einschränken oder ausschalten. 
        Bitte beachten Sie, dass Sie gewisse Funktionen unserer Website ohne Cookies nicht nutzen können.
      </p>

      <h3>Bekanntgabe personenbezogener Daten an Dritte</h3>
      <p>
        Ihre Daten werden an unsere Lieferunternehmen bekanntgegeben, soweit dies zur Lieferung der Waren notwendig ist. 
        Zur Abwicklung der Zahlung geben wir Ihre Zahlungsdaten an unsere Zahlungsanbieter weiter. Diese bearbeitet Ihre Daten 
        nur in dem Umfang, in dem wir sie selbst bearbeiten dürften. Darüber hinaus werden Ihre persönlichen Daten nicht an Dritte 
        bekanntgegeben.
      </p>
  
      <h3>Recht auf Auskunft und Berichtigung</h3>
      <p>
        Nach dem Bundesgesetz über den Datenschutz (DSG) haben Sie ein Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
        Daten (Art. 8 DSG) sowie ein Recht auf Berichtigung (Art. 5 Abs. 2 DSG). Darüber hinaus können Sie verlangen, dass Ihre 
        Daten gelöscht werden, so weit diese nicht mehr zur Vertragsab wicklung benötigt werden und auch die Sperrung Ihrer Daten 
        verlangen. Auskunftsbegehren und Sperrungs- bzw. Löschungverlangen können auch in elektronischer Form an die zuständige 
        Stelle gerichtet werden. Bei Fragen zur Beschaffung und Bearbeitung Ihrer personenbezogenen Daten und für Auskunfts- und 
        Berichtigungsanfragen wenden Sie sich an uns:
  
        <strong>Per E-Mail:</strong>
        office@horsedeal24.com
        
        <strong>Per Brief:</strong>
        HorseDeal24
        Horseplanet GmbH 
        Bösch 80a
        6331 Hünenberg
      </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
