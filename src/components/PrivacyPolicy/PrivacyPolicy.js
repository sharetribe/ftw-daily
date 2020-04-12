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
      <p className={css.lastUpdated}>Letztes Update: 12. April 2020</p>

      <p>
        Vielen Dank für Ihr Interesse an unserer Website. Der Schutz Ihrer persönlichen Daten ist uns 
        ein wichtiges Anliegen. Nachfolgend informieren wir Sie umfassend über den Umgang mit Ihren Daten.
      </p>
      <br/>

      <h3>Beschaffung und Bearbeitung von prozessbezogener Daten</h3>
      <p>
        Sie können unsere Seite besuchen, ohne Angaben zu Ihrer Person zu machen. Wir speichern lediglich 
        Zugriffsdaten ohne Personenbezug wie z.B. den Namen Ihres Internet Service Providers, die Seite, 
        von der aus Sie uns besuchen oder den Namen der angeforderten Datei. Diese Daten werden wir ausschliesslich 
        zur Verbesserung unseres Angebots auswerten und erlauben keinen Rückschluss auf Ihre Person.<br/>
        <br/>
        Personendaten werden nur erhoben, wenn Sie uns diese im Rahmen Ihrer Warenbestellung, bei Eröffnung 
        eines Kundenkontos oder bei der Anmeldung für unseren Newsletter freiwillig mitteilen. Wir verwenden 
        die von Ihnen mitgeteilten Daten ohne Ihre gesonderte Einwilligung ausschliesslich zur Erfüllung und 
        Abwicklung Ihrer Bestellung. Mit vollständiger Abwicklung des Vertrags und vollständiger Kaufpreiszahlung 
        werden Ihre Daten für die weitere Verwendung gesperrt und nach Ablauf der gesetzlichen Aufbewahrungsfristen 
        gelöscht, sofern Sie nicht ausdrücklich in die weitere Nutzung Ihrer Daten eingewilligt haben. Bei Anmeldung 
        für den Newsletter wird Ihre E-Mail-Adresse für eigene Werbezwecke genutzt, bis Sie sich vom Newsletter abmelden. 
        Die Abmeldung ist jederzeit möglich.
      </p>
      <br/>
      <h3>Verwendung von Cookies</h3>
      <p>
        Auf verschiedenen Seiten verwenden wir Cookies, um den Besuch unserer Website attraktiver zu gestalten 
        und die Nutzung bestimmter Funktionen zu ermöglichen. Hierbei handelt es sich um kleine Textdateien, die auf 
        Ihrem Computer abgelegt werden. Die meisten der von uns verwendeten Cookies werden nach Ende der Browser-Sitzung 
        wieder von Ihrer Festplatte gelöscht (sog. Sitzungs- oder Session-Cookies). Andere Cookies verbleiben auf Ihrem 
        Computer und ermöglichen uns, Sie bei Ihrem nächsten Besuch wieder zu erkennen (sog. dauerhafte Cookies). Unseren 
        Partnerunternehmen ist es nicht gestattet, über unsere Website Personendaten mittels Cookies zu beschaffen oder zu bearbeiten.<br/>
        <br/>
        Sie können die Speicherung von Cookies in Ihrem Browser verhindern, indem Sie über die Menüleiste „Extras > Internetoptionen > Datenschutz“ 
        (Internet Explorer) bzw. „Einstellungen > Datenschutz“ (Firefox) die Speicherung und das Lesen von Cookies einschränken oder ausschalten. 
        Bitte beachten Sie, dass Sie gewisse Funktionen unserer Website ohne Cookies nicht nutzen können.
      </p>
      <br/>
      <h3>Bekanntgabe personenbezogener Daten an Dritte</h3>
      <p>
        Ihre Daten werden an unsere Lieferunternehmen bekanntgegeben, soweit dies zur Lieferung der Waren notwendig ist. 
        Zur Abwicklung der Zahlung geben wir Ihre Zahlungsdaten an unsere Zahlungsanbieter weiter. Diese bearbeitet Ihre Daten 
        nur in dem Umfang, in dem wir sie selbst bearbeiten dürften. Darüber hinaus werden Ihre persönlichen Daten nicht an Dritte 
        bekanntgegeben.
      </p>
      <br/>
      <h3>Recht auf Auskunft und Berichtigung</h3>
      <p>
        Nach dem Bundesgesetz über den Datenschutz (DSG) haben Sie ein Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
        Daten (Art. 8 DSG) sowie ein Recht auf Berichtigung (Art. 5 Abs. 2 DSG). Darüber hinaus können Sie verlangen, dass Ihre 
        Daten gelöscht werden, so weit diese nicht mehr zur Vertragsab wicklung benötigt werden und auch die Sperrung Ihrer Daten 
        verlangen. Auskunftsbegehren und Sperrungs- bzw. Löschungverlangen können auch in elektronischer Form an die zuständige 
        Stelle gerichtet werden. Bei Fragen zur Beschaffung und Bearbeitung Ihrer personenbezogenen Daten und für Auskunfts- und 
        Berichtigungsanfragen wenden Sie sich an uns:<br/>
        <br/>
        <strong>Per E-Mail:</strong><br/>
        office@horsedeal24.com<br/>
        <br/>
        <strong>Per Brief:</strong><br/>
        HorseDeal24<br/>
        Horseplanet GmbH<br/>
        Bösch 80a<br/>
        6331 Hünenberg<br/>
      </p>
      <br/>
      <h3>Nutzung von Facebook-Plugins</h3>
      <p>
        Auf unserer Website werden sogenannte Social Plugins („Plugins“) des sozialen Netzwerkes Facebook verwendet, das von der 
        Facebook Inc., 1601 S. California Ave, Palo Alto, CA 94304, USA („Facebook“) betrieben wird. Die Plugins sind mit einem 
        Facebook-Logo oder dem Zusatz „Soziales Plug-in von Facebook“ bzw. „Facebook Social Plugin“ gekennzeichnet. Eine Übersicht 
        über die Facebook Plugins und deren Aussehen finden Sie hier: https://developers.facebook.com/plugins <br/>
        <br/>
        Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält, stellt Ihr Browser eine direkte Verbindung 
        zu den Servern von Facebook her. Der Inhalt des Plugins wird von Facebook direkt an Ihren Browser übermittelt und in die Seite 
        eingebunden. Durch diese Einbindung erhält Facebook die Information, dass Ihr Browser die entsprechende Seite unseres Webauftritts 
        aufgerufen hat, auch wenn Sie kein Facebook-Profil besitzen oder gerade nicht bei Facebook eingeloggt sind. Diese Information 
        (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an einen Server von Facebook in die USA übermittelt und dort gespeichert.<br/>
        <br/>
        Sind Sie bei Facebook eingeloggt, kann Facebook den Besuch unserer Website Ihrem Facebook-Profil unmittelbar zuordnen. Wenn Sie mit den 
        Plugins interagieren, zum Beispiel den „Gefällt mir“-Button betätigen oder einen Kommentar abgeben, wird diese Information ebenfalls direkt 
        an einen Server von Facebook übermittelt und dort gespeichert. Die Informationen werden außerdem auf Ihrem Facebook- Profil veröffentlicht 
        und Ihren Facebook-Freunden angezeigt.<br/>
        <br/>
        Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Facebook sowie Ihre diesbezüglichen Rechte und 
        Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den Datenschutzhinweisen von Facebook: http://www.facebook.com/policy.php <br/>
        <br/>
        Wenn Sie nicht möchten, dass Facebook die über unseren Webauftritt gesammelten Daten unmittelbar Ihrem Facebook-Profil zuordnet, müssen Sie sich vor 
        Ihrem Besuch unserer Website bei Facebook ausloggen. Sie können das Laden der Facebook Plugins auch mit Add-Ons für Ihren Browser komplett verhindern, 
        z.B. mit dem „Facebook Blocker“ (http://webgraph.com/resources/facebookblocker/).<br/>
      </p>
      <br/>                                    
      <h3>Nutzung von Twitter-Plugins</h3>
      <p>
        Auf unserer Website werden sogenannte Social Plugins („Plugins“) des Mikroblogging-Dienstes Twitter verwendet, der von der Twitter Inc., 1355 Market St, Suite 
        900, San Francisco, CA 94103, USA („Twitter“) betrieben wird. Die Plugins sind mit einem Twitter-Logo beispielsweise in Form eines blauen „Twitter- Vogels“ gekennzeichnet. 
        Eine Übersicht über die Twitter Plugins und deren Aussehen finden Sie hier: https://twitter.com/about/resources/buttons <br/>
        <br/>
         Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält, stellt Ihr Browser eine direkte Verbindung zu den Servern von Twitter her. Der Inhalt des
         Plugins wird von Twitter direkt an Ihren Browser übermittelt und in die Seite eingebunden. Durch die Einbindung erhält Twitter die Information, dass Ihr Browser die entsprechende
         Seite unseres Webauftritts aufgerufen hat, auch wenn Sie kein Profil bei Twitter besitzen oder gerade nicht bei Twitter eingeloggt sind. Diese Information (einschließlich Ihrer IP-Adresse)
         wird von Ihrem Browser direkt an einen Server von Twitter in die USA übermittelt und dort gespeichert.<br/>
         <br/>
         Sind Sie bei Twitter eingeloggt, kann Twitter den Besuch unserer Website Ihrem Twitter-Account unmittelbar zuordnen. Wenn Sie mit den Plugins interagieren, zum Beispiel den „Twittern“-Button betätigen, 
         wird die entsprechende Information ebenfalls direkt an einen Server von Twitter übermittelt und dort gespeichert. Die Informationen werden außerdem auf Ihrem Twitter-Account veröffentlicht und dort 
         Ihren Kontakten angezeigt.<br/>
         <br/>
         Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Twitter sowie Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen 
         Sie bitte den Datenschutzhinweisen von Twitter: https://twitter.com/privacy <br/>
         <br/>
         Wenn Sie nicht möchten, dass Twitter die über unseren Webauftritt gesammelten Daten unmittelbar Ihrem Twitter-Account zuordnet, müssen Sie sich vor Ihrem Besuch unserer Website bei Twitter ausloggen. 
         Sie können das Laden der Twitter Plugins auch mit Add-Ons für Ihren Browser komplett verhindern, z. B. mit dem Skript-Blocker „NoScript“ (http://noscript.net/).
       </p>
      <br/>                                                                                                                                          
      <h3>Verwendung von Google Analytics</h3>
      <p>
        Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem 
        Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung 
        dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IPAnonymisierung auf dieser 
        Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen 
        Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers 
        dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit 
        der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte 
        IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir 
        weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. <br/>
        <br/>
        Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser 
        Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: http://tools.google.com/dlpage/gaoptout?hl=de
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
