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

      <h2>Beschaffung und Bearbeitung von prozessbezogener Daten</h2>
      <p>
        Sie können unsere Seite besuchen, ohne Angaben zu Ihrer Person zu machen. Wir speichern lediglich 
        Zugriffsdaten ohne Personenbezug wie z.B. den Namen Ihres Internet Service Providers, die Seite, 
        von der aus Sie uns besuchen oder den Namen der angeforderten Datei. Diese Daten werden wir ausschliesslich 
        zur Verbesserung unseres Angebots auswerten und erlauben keinen Rückschluss auf Ihre Person.
        </br>
        Personendaten werden nur erhoben, wenn Sie uns diese im Rahmen Ihrer Warenbestellung, bei Eröffnung 
        eines Kundenkontos oder bei der Anmeldung für unseren Newsletter freiwillig mitteilen. Wir verwenden 
        die von Ihnen mitgeteilten Daten ohne Ihre gesonderte Einwilligung ausschliesslich zur Erfüllung und 
        Abwicklung Ihrer Bestellung. Mit vollständiger Abwicklung des Vertrags und vollständiger Kaufpreiszahlung 
        werden Ihre Daten für die weitere Verwendung gesperrt und nach Ablauf der gesetzlichen Aufbewahrungsfristen 
        gelöscht, sofern Sie nicht ausdrücklich in die weitere Nutzung Ihrer Daten eingewilligt haben. Bei Anmeldung 
        für den Newsletter wird Ihre E-Mail-Adresse für eigene Werbezwecke genutzt, bis Sie sich vom Newsletter abmelden. 
        Die Abmeldung ist jederzeit möglich.
      </p>

      <h2>Verwendung von Cookies</h2>
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

      <h2>3 At vero eos et accusamus</h2>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
        voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
        est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
        libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
        maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
        et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
        sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
        doloribus asperiores repellat
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
