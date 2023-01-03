import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.module.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Zuletzt aktualisiert: Jänner 2023</p>

      <p>
      Diese Datenschutzrichtlinie beschreibt unsere Richtlinien und Verfahren zur Erfassung, Verwendung und Offenlegung Ihrer Daten, 
      wenn Sie den Dienst nutzen, und informiert Sie über Ihre Datenschutzrechte und wie das Gesetz Sie schützt.
      </p>
      <p>
      Wir verwenden Ihre persönlichen Daten zur Bereitstellung und Verbesserung des Dienstes. 
      Durch die Nutzung des Dienstes erklären Sie sich mit der Sammlung und Nutzung von Informationen in 
      Übereinstimmung mit dieser Datenschutzrichtlinie einverstanden. Diese Datenschutzrichtlinie wurde von TermsFeed erstellt und von Sharetribe optimiert.
      </p>
      <p>
      Bitte lesen Sie diese Datenschutzrichtlinie sorgfältig durch, bevor Sie unseren Service nutzen.
      </p>

      <h2>1 - Auslegung und Definitionen</h2>
      <h3>1.1 - Auslegung</h3>
      <p>
      Die Wörter, deren Anfangsbuchstaben groß geschrieben werden, haben die unter den folgenden Bedingungen definierten Bedeutungen. 
      Die folgenden Definitionen haben dieselbe Bedeutung, unabhängig davon, ob sie im Singular oder im Plural stehen.
      </p>

      <h3>1.2 - Begriffsbestimmungen</h3>
      <p>
      Für die Zwecke dieser Datenschutzrichtlinie:
      </p>
      <p>
         • Konto bezeichnet ein einzigartiges Konto, das für Sie erstellt wurde, um auf unseren Dienst oder Teile unseres Dienstes zuzugreifen.</p>
      <p>• Verbundenes Unternehmen bedeutet eine Einheit, die eine Partei kontrolliert, von ihr kontrolliert wird oder unter gemeinsamer Kontrolle mit ihr steht, wobei "Kontrolle" den Besitz von 50 % oder mehr der Aktien, Anteile oder anderer Wertpapiere bedeutet, die zur Wahl von Direktoren oder anderen leitenden Angestellten berechtigt sind.</p>
      <p>• Anwendung bezeichnet das vom Unternehmen oder Betreiber bereitgestellte Softwareprogramm, das Sie auf ein beliebiges elektronisches Gerät mit dem Namen Carlo herunterladen.</p>
      <p>• Unternehmen bezieht sich auf das Unternehmen oder den Betreiber als die juristische Person, die die persönlichen Daten der Verbraucher sammelt und die Zwecke und Mittel der Verarbeitung der persönlichen Daten der Verbraucher bestimmt, oder in deren Namen solche Daten gesammelt werden und die allein oder gemeinsam mit anderen die Zwecke und Mittel der Verarbeitung der persönlichen Daten der Verbraucher bestimmt.</p>
      <p>• Unternehmen (in dieser Vereinbarung als "das Unternehmen", "wir", "uns" oder "unser" bezeichnet) bezieht sich auf Carlo, UNTERNEHMENSADRESSE, UNTERNEHMENS-ID. Für die Zwecke der DSGVO ist das Unternehmen oder der Betreiber der Datenverantwortliche.</p>
      <p>• Verbraucher, bezieht sich auf Sie.</p>
      <p>• Cookies sind kleine Dateien, die von einer Website auf Ihrem Computer, Ihrem Mobilgerät oder einem anderen Gerät abgelegt werden und die unter anderem Angaben zu Ihrem Surfverhalten auf dieser Website enthalten.</p>
      <p>• Land bezieht sich auf Österreich.</p>
      <p>• Datenverantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist das Unternehmen oder der Betreiber als die juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung personenbezogener Daten entscheidet.</p>
      <p>• Gerät ist jedes Gerät, das auf den Dienst zugreifen kann, wie z. B. ein Computer, ein Mobiltelefon oder ein digitales Tablet.</p>
      <p>• Do Not Track (DNT) ist ein Konzept, das von den US-Regulierungsbehörden, insbesondere der U.S. Federal Trade Commission (FTC), für die Internetbranche gefördert wurde, um einen Mechanismus zu entwickeln und zu implementieren, der es Internetnutzern ermöglicht, die Verfolgung ihrer Online-Aktivitäten über Websites hinweg zu kontrollieren.</p>
      <p>• Betreiber (in dieser Vereinbarung als "der Betreiber", "wir", "uns" oder "unser" bezeichnet) bezieht sich auf Carlo. Für die Zwecke der DSGVO ist das Unternehmen oder der Betreiber der für die Datenverarbeitung Verantwortliche.</p>
      <p>• Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen. Für die Zwecke der DSGVO sind personenbezogene Daten alle Informationen, die sich auf Sie beziehen, wie z. B. ein Name, eine Identifikationsnummer, Standortdaten, eine Online-Kennung oder ein oder mehrere Faktoren, die spezifisch für die physische, physiologische, genetische, mentale, wirtschaftliche, kulturelle oder soziale Identität sind. Im Sinne des CCPA sind personenbezogene Daten alle Informationen, die Sie identifizieren, sich auf Sie beziehen, Sie beschreiben oder mit Ihnen in Verbindung gebracht werden können, oder die vernünftigerweise direkt oder indirekt mit Ihnen in Verbindung gebracht werden könnten.</p>
      <p>• Verkauf bezeichnet den Verkauf, die Vermietung, die Freigabe, die Offenlegung, die Verbreitung, die Zurverfügungstellung, die Übertragung oder die anderweitige mündliche, schriftliche, elektronische oder sonstige Übermittlung der personenbezogenen Daten eines Verbrauchers an ein anderes Unternehmen oder einen Dritten gegen Geld oder eine andere wertvolle Gegenleistung.</p>
      <p>• Dienst bezieht sich auf die Anwendung oder die Website oder beides.</p>
      <p>• Dienstanbieter ist jede natürliche oder juristische Person, die die Daten im Auftrag des Unternehmens oder des Betreibers verarbeitet. Er bezieht sich auf Drittunternehmen oder Einzelpersonen, die von der Gesellschaft oder dem Betreiber angestellt werden, um den Dienst zu erleichtern, den Dienst im Namen der Gesellschaft oder des Betreibers bereitzustellen, Dienstleistungen im Zusammenhang mit dem Dienst zu erbringen oder die Gesellschaft oder den Betreiber bei der Analyse der Nutzung des Dienstes zu unterstützen. Für die Zwecke der DSGVO werden Dienstanbieter als Datenverarbeiter betrachtet.</p>
      <p>• Sozialer Mediendienst eines Drittanbieters bezieht sich auf jede Website oder jede Website eines sozialen Netzwerks, über die ein Nutzer sich anmelden oder ein Konto erstellen kann, um den Dienst zu nutzen.</p>
      <p>• Nutzungsdaten bezieht sich auf automatisch erfasste Daten, die entweder durch die Nutzung des Dienstes oder durch die Infrastruktur des Dienstes selbst erzeugt werden (z. B. die Dauer eines Seitenbesuchs).</p>
      <p>• Website bezieht sich auf Carlo, der über MARKETPLACE WEBSITE URL zugänglich ist.</p>
      <p>• Sie bezeichnet die Person, die auf den Dienst zugreift oder ihn nutzt, bzw. das Unternehmen oder eine andere juristische Person, in deren Namen eine solche Person auf den Dienst zugreift oder ihn nutzt. Gemäß der GDPR (General Data Protection Regulation) können Sie als Datensubjekt oder als Nutzer bezeichnet werden, da Sie die Person sind, die den Dienst nutzt.
      </p>

      <h2>2 - Kontaktieren Sie uns</h2>
      <p>
      Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, können Sie uns kontaktieren:
      </p>
      <p>
      • Per E-Mail: E-MAIL-ADRESSE
      </p>
      <p>
      • Indem Sie diese Seite auf unserer Website besuchen: URL KONTAKTSEITE
      </p>
      <h2>3 - Erfassung und Verwendung Ihrer persönlichen Daten</h2>
      <h3>3.1 - Arten von gesammelten Daten</h3>
      <h4>3.1.1 - Persönliche Daten</h4>
      <p>
      Während der Nutzung unseres Dienstes können wir Sie bitten, uns bestimmte personenbezogene Daten mitzuteilen, die dazu verwendet werden können,
      Sie zu kontaktieren oder zu identifizieren. Persönlich identifizierbare Informationen können unter anderem sein:
      </p>
      <p>• E-Mail Adresse</p>
      <p>• Vorname und Nachname</p>
      <p>• Telefonnummer</p>
      <p>• Adresse, Bundesland, Provinz, Postleitzahl, Ort</p>
      <p>• Bankkontoinformationen</p>
      <p>• Kreditkartennummer und Gültigkeitsdatum</p>
      <p>• Nutzungsdaten</p>

      <h4>3.1.2 – Nutzungsdaten</h4>
      <p>Nutzungsdaten werden automatisch erfasst, wenn Sie den Dienst nutzen.</p>
      <p>Zu den Nutzungsdaten können Informationen wie die Internetprotokolladresse Ihres Geräts (z. B. IP-Adresse), der Browsertyp, die Browserversion, 
        die von Ihnen besuchten Seiten unseres Dienstes, die Uhrzeit und das Datum Ihres Besuchs, die auf diesen Seiten verbrachte Zeit, eindeutige Gerätekennungen und andere 
        Diagnosedaten gehören.</p>
      <p>Wenn Sie mit oder über ein mobiles Gerät auf den Dienst zugreifen, können wir bestimmte Informationen automatisch erfassen, einschließlich, aber nicht beschränkt auf die 
        Art des von Ihnen verwendeten mobilen Geräts, die eindeutige ID Ihres mobilen Geräts, die IP-Adresse Ihres mobilen Geräts, Ihr mobiles Betriebssystem, die Art des von Ihnen 
        verwendeten mobilen Internetbrowsers, eindeutige Gerätekennungen und andere Diagnosedaten.</p>
      <p>Wir können auch Informationen sammeln, die Ihr Browser sendet, wenn Sie unseren Dienst besuchen oder wenn Sie über ein mobiles Gerät auf den Dienst zugreifen.</p>

      <h4>3.1.3 - Informationen von Social-Media-Diensten von Drittanbietern</h4>
      <p>Das Unternehmen oder der Betreiber kann Ihnen erlauben, ein Konto zu erstellen und sich anzumelden, um den Dienst über die folgenden Social-Media-Dienste Dritter zu nutzen. 
        Zu diesen Social-Media-Diensten von Drittanbietern gehören unter anderem:</p>
      <p>• Google</p>
      <p>• Facebook</p>
      <p>• Twitter</p>
      <p>• LinkedIn</p>
      <p>• Apple</p>
      <p>Wenn Sie sich entscheiden, sich über einen Social-Media-Dienst eines Drittanbieters zu registrieren oder uns anderweitig Zugang zu diesem Dienst zu gewähren, können wir personenbezogene 
        Daten erfassen, die bereits mit dem Konto Ihres Social-Media-Dienstes eines Drittanbieters verbunden sind, wie z. B. Ihren Namen, Ihre E-Mail-Adresse, Ihre Aktivitäten oder Ihre Kontaktliste, 
        die mit diesem Konto verbunden ist.</p>
      <p>Sie haben auch die Möglichkeit, dem Unternehmen oder dem Betreiber über Ihr Konto bei einem Social-Media-Dienst eines Drittanbieters zusätzliche Informationen mitzuteilen. Wenn Sie sich dafür entscheiden, 
        solche Informationen und persönlichen Daten bei der Registrierung oder anderweitig zur Verfügung zu stellen, erteilen Sie dem Unternehmen oder dem Betreiber die Erlaubnis, diese in Übereinstimmung 
        mit dieser Datenschutzrichtlinie zu verwenden, zu teilen und zu speichern.</p>

      <h4>3.1.4 - Tracking-Technologien und Cookies</h4>
      <p>Wir verwenden Cookies und ähnliche Tracking-Technologien, um die Aktivitäten auf unserem Dienst zu verfolgen und bestimmte Informationen zu speichern. Bei den verwendeten Tracking-Technologien handelt es sich um Beacons, 
        Tags und Skripte zur Erfassung und Verfolgung von Informationen sowie zur Verbesserung und Analyse Unseres Dienstes. Zu den von uns verwendeten Technologien können gehören:</p>
      <p>• Cookies oder Browser-Cookies. Ein Cookie ist eine kleine Datei, die auf Ihrem Gerät gespeichert wird. Sie können Ihren Browser anweisen, alle Cookies abzulehnen oder anzuzeigen, wenn ein Cookie gesendet wird. Wenn Sie jedoch 
        keine Cookies akzeptieren, können Sie möglicherweise einige Teile unseres Dienstes nicht nutzen. Sofern Sie Ihren Browser nicht so eingestellt haben, dass er Cookies ablehnt, kann unser Dienst Cookies verwenden.</p>
      <p>• Web Beacons. Bestimmte Bereiche unseres Dienstes und unserer E-Mails können kleine elektronische Dateien enthalten, die als Web Beacons (auch als Clear Gifs, Pixel Tags und Single-Pixel Gifs bezeichnet) bekannt sind und es dem Unternehmen 
        oder Betreiber beispielsweise ermöglichen, die Benutzer zu zählen, die diese Seiten besucht oder eine E-Mail geöffnet haben, sowie andere damit zusammenhängende Anwendungs- oder Website-Statistiken zu erstellen (z. B. Aufzeichnung 
        der Beliebtheit eines bestimmten Bereichs und Überprüfung der System- und Serverintegrität).</p>
      <p>Cookies können "dauerhafte" oder "Sitzungs"-Cookies sein. Dauerhafte Cookies verbleiben auf Ihrem Computer oder Mobilgerät, wenn Sie offline gehen, während Sitzungscookies gelöscht werden, sobald Sie Ihren Webbrowser schließen.</p>
      <p>Wir verwenden sowohl Sitzungscookies als auch dauerhafte Cookies für die unten aufgeführten Zwecke:</p>
      <p>• Notwendige / essentielle Cookies <br />
        Typ: Sitzungs-Cookies <br />
        Verwaltet von: Uns <br />
        Zweck: Diese Cookies sind unerlässlich, um Ihnen die über die Anwendung oder die Website verfügbaren Dienste zur Verfügung zu stellen und Ihnen die Nutzung einiger ihrer Funktionen zu ermöglichen. Sie helfen bei der Authentifizierung 
        von Benutzern und verhindern die betrügerische Nutzung von Benutzerkonten. Ohne diese Cookies können die von Ihnen angeforderten Dienste nicht bereitgestellt werden, und wir verwenden diese Cookies nur, um Ihnen diese Dienste zur Verfügung zu stellen.</p>
      <p>• Cookies Politik / Hinweis Akzeptanz Cookies <br />
      Typ: Dauerhafte Cookies <br />
      Verwaltet von: Uns <br />
      Zweck: Diese Cookies zeigen an, ob die Benutzer die Verwendung von Cookies auf der Anwendung oder der Website akzeptiert haben.</p>
      <p>• Funktionelle Cookies <br />
      Typ: Dauerhafte Cookies <br />
      Verwaltet von: Uns <br />
      Zweck: Diese Cookies ermöglichen es uns, die von Ihnen bei der Nutzung der Anwendung oder der Website getroffenen Entscheidungen zu speichern, z. B. Ihre Anmeldedaten oder Ihre Spracheinstellung. Der Zweck dieser Cookies besteht darin, Ihnen eine persönlichere 
      Erfahrung zu bieten und zu vermeiden, dass Sie Ihre Einstellungen jedes Mal neu eingeben müssen, wenn Sie die Anwendung oder die Website nutzen.</p>
      <p>• Tracking- und Leistungs-Cookies <br />
      Typ: Dauerhafte Cookies <br />
      Verwaltet von: Drittparteien <br />
      Zweck: Diese Cookies werden verwendet, um Informationen über den Verkehr mit der Anwendung oder der Website und die Art und Weise, wie die Benutzer die Anwendung oder die Website nutzen, zu verfolgen. Die über diese Cookies gesammelten Informationen 
      können Sie direkt oder indirekt als individuellen Besucher identifizieren. Dies liegt daran, dass die gesammelten Informationen in der Regel mit einer pseudonymen Kennung verknüpft sind, die mit dem Gerät verbunden ist, das Sie für den Zugriff auf die Anwendung 
      oder die Website verwenden. Wir können diese Cookies auch verwenden, um neue Seiten, Features oder neue Funktionen der Anwendung oder Website zu testen, um zu sehen, wie unsere Nutzer darauf reagieren.</p>
      
      <h3>3.2 - Verwendung Ihrer persönlichen Daten</h3>
      
      <p>Das Unternehmen oder der Betreiber kann personenbezogene Daten für die folgenden Zwecke verwenden:</p>
      <p>• Zur Bereitstellung und Wartung unseres Dienstes, einschließlich der Überwachung der Nutzung unseres Dienstes.<br />
      • Um Ihr Konto zu verwalten: um Ihre Registrierung als Nutzer des Dienstes zu verwalten. Die von Ihnen bereitgestellten persönlichen Daten können Ihnen Zugang zu verschiedenen Funktionen des Dienstes geben, die Ihnen als registriertem Nutzer zur Verfügung stehen.<br />
      • Zur Vertragserfüllung: zur Entwicklung, Einhaltung und Durchführung des Kaufvertrags für die von Ihnen erworbenen Produkte, Artikel oder Dienstleistungen oder eines anderen Vertrags mit uns über den Dienst.<br />
      • Um Sie zu kontaktieren: Um Sie per E-Mail, Telefonanrufe, SMS oder andere gleichwertige Formen der elektronischen Kommunikation zu kontaktieren, wie z. B. Push-Benachrichtigungen einer mobilen Anwendung in Bezug auf Aktualisierungen oder informative Mitteilungen im 
      Zusammenhang mit den Funktionen, Produkten oder vertraglich vereinbarten Dienstleistungen, einschließlich der Sicherheitsaktualisierungen, wenn dies für deren Umsetzung notwendig oder angemessen ist.<br />
      • Um Ihnen Neuigkeiten, Sonderangebote und allgemeine Informationen über andere von uns angebotene Waren, Dienstleistungen und Veranstaltungen zukommen zu lassen, die denen ähneln, die Sie bereits gekauft oder angefragt haben, es sei denn, Sie haben sich dagegen entschieden, solche Informationen zu erhalten.<br />
      • Um Ihre Anfragen zu verwalten: Zur Bearbeitung und Verwaltung Ihrer Anfragen an uns.<br />
      • Um Ihnen gezielte Werbung zukommen zu lassen: Wir können Ihre Daten verwenden, um Inhalte und Werbung zu entwickeln und anzuzeigen (und mit Drittanbietern zusammenzuarbeiten, die dies tun), die auf Ihre Interessen und/oder Ihren Standort zugeschnitten sind, und um deren Wirksamkeit zu messen.<br />
      • Für Geschäftsübertragungen: Wir können Ihre Daten verwenden, um eine Fusion, Veräußerung, Umstrukturierung, Reorganisation, Auflösung oder einen anderen Verkauf oder eine Übertragung einiger oder aller unserer Vermögenswerte zu bewerten oder durchzuführen, sei es als laufendes Unternehmen oder als Teil eines Konkurses, 
      einer Liquidation oder eines ähnlichen Verfahrens, bei dem persönliche Daten, die wir über unsere Dienstnutzer besitzen, zu den übertragenen Vermögenswerten gehören.<br />
      • Für andere Zwecke: Wir können Ihre Daten für andere Zwecke verwenden, wie z. B. zur Datenanalyse, zur Ermittlung von Nutzungstrends, zur Bestimmung der Wirksamkeit unserer Werbekampagnen und zur Bewertung und Verbesserung unseres Dienstes, unserer Produkte, Dienstleistungen, unseres Marketings und Ihrer Erfahrungen.</p>
      
      <p>Wir können Ihre persönlichen Daten in den folgenden Situationen weitergeben:</p>
      <p>• Mit Dienstanbietern: Wir können Ihre persönlichen Daten an Dienstanbieter weitergeben, um die Nutzung unseres Dienstes zu überwachen und zu analysieren, um auf den Websites Dritter für Sie zu werben, nachdem Sie unseren Dienst besucht haben, für die Zahlungsabwicklung, um Sie zu kontaktieren.<br />
      • Für Geschäftsübertragungen: Wir können Ihre persönlichen Daten in Verbindung mit oder während der Verhandlungen über eine Fusion, einen Verkauf des Unternehmens oder der Vermögenswerte des Betreibers, eine Finanzierung oder eine Übernahme unseres gesamten oder eines Teils unseres Unternehmens durch ein anderes Unternehmen weitergeben oder übertragen.<br />
      • Mit verbundenen Unternehmen: Wir können Ihre Daten an unsere verbundenen Unternehmen weitergeben; in diesem Fall verpflichten wir diese verbundenen Unternehmen, diese Datenschutzrichtlinie einzuhalten. Zu den verbundenen Unternehmen gehören unsere Muttergesellschaft und alle anderen Tochtergesellschaften, Joint-Venture-Partner oder andere Unternehmen, 
      die wir kontrollieren oder die unter gemeinsamer Kontrolle mit uns stehen.<br />
      • Mit Geschäftspartnern: Wir können Ihre Informationen an unsere Geschäftspartner weitergeben, um Ihnen bestimmte Produkte, Dienstleistungen oder Werbeaktionen anzubieten.<br />
      • Mit anderen Nutzern: Wenn Sie persönliche Informationen weitergeben oder auf andere Weise in den öffentlichen Bereichen mit anderen Nutzern interagieren, können diese Informationen von allen Nutzern eingesehen und öffentlich nach außen getragen werden. Wenn Sie mit anderen Nutzern interagieren oder sich über einen Social-Media-Dienst eines Dritten registrieren, 
      können Ihre Kontakte im Social-Media-Dienst eines Dritten Ihren Namen, Ihr Profil, Ihre Bilder und die Beschreibung Ihrer Aktivitäten sehen. In ähnlicher Weise können andere Nutzer Beschreibungen Ihrer Aktivitäten einsehen, mit Ihnen kommunizieren und Ihr Profil einsehen.<br />
      • Mit Ihrem Einverständnis: Mit Ihrer Zustimmung können wir Ihre personenbezogenen Daten für jeden anderen Zweck offenlegen.</p>

      <h3>3.3 - Aufbewahrung Ihrer persönlichen Daten</h3>
      <p>Das Unternehmen oder der Betreiber wird Ihre personenbezogenen Daten nur so lange aufbewahren, wie es für die in dieser Datenschutzrichtlinie genannten Zwecke erforderlich ist. Wir werden Ihre personenbezogenen Daten in dem Umfang aufbewahren und verwenden, der erforderlich ist, um unseren rechtlichen Verpflichtungen nachzukommen (z. B. wenn wir Ihre Daten aufbewahren müssen, 
        um geltende Gesetze einzuhalten), 
        Streitigkeiten beizulegen und unsere rechtlichen Vereinbarungen und Richtlinien durchzusetzen.</p>
      <p>Das Unternehmen oder der Betreiber speichert die Nutzungsdaten auch für interne Analysezwecke. Nutzungsdaten werden im Allgemeinen für einen kürzeren Zeitraum aufbewahrt, es sei denn, diese Daten werden verwendet, um die Sicherheit oder die Funktionalität unseres Dienstes zu verbessern, oder wir sind gesetzlich verpflichtet, diese Daten für längere Zeiträume aufzubewahren.</p>
      <p>Wenn Ihre persönlichen Daten nicht mehr durch das Gesetz oder durch Rechte oder Verpflichtungen von uns oder Ihnen benötigt werden, werden wir die persönlichen Daten löschen. In den meisten Fällen werden personenbezogene Daten bei Beendigung oder Ablauf des Vertrags zwischen Ihnen und dem Unternehmen oder Betreiber oder auf Ihre schriftliche Anfrage hin gelöscht.</p>

      <h3>3.4 - Weitergabe Ihrer persönlichen Daten</h3>
      <p>Ihre Informationen, einschließlich personenbezogener Daten, werden in den Betriebsbüros des Unternehmens oder des Betreibers und an anderen Orten verarbeitet, an denen sich die an der Verarbeitung beteiligten Parteien befinden. Das bedeutet, dass diese Daten an Computer außerhalb Ihres Staates, Ihrer Provinz, Ihres Landes oder einer anderen staatlichen Gerichtsbarkeit, 
        in der andere Datenschutzgesetze als in Ihrer Gerichtsbarkeit gelten, übertragen und dort gespeichert werden können.</p>
      <p>Mit Ihrer Zustimmung zu dieser Datenschutzrichtlinie und der anschließenden Übermittlung dieser Daten erklären Sie sich mit dieser Übertragung einverstanden.</p>
      <p>Das Unternehmen oder der Betreiber wird alle angemessenen Maßnahmen ergreifen, um sicherzustellen, dass Ihre Daten sicher und in Übereinstimmung mit dieser Datenschutzrichtlinie behandelt werden, und es wird keine Übermittlung Ihrer persönlichen Daten an eine Organisation oder ein Land stattfinden, wenn nicht angemessene Kontrollen vorhanden sind, 
        die die Sicherheit Ihrer Daten und anderer persönlicher Informationen einschließen.</p>

      <h3>3.5 - Löschen Ihrer persönlichen Daten</h3>
      <p>Sie haben das Recht, die persönlichen Daten, die wir über Sie gesammelt haben, zu löschen oder uns um Unterstützung bei der Löschung zu bitten.</p>
      <p>Unser Dienst kann Ihnen die Möglichkeit geben, bestimmte Informationen über Sie innerhalb des Dienstes zu löschen.</p>
      <p>Sie können Ihre Informationen jederzeit aktualisieren, ändern oder löschen, indem Sie sich bei Ihrem Konto anmelden, falls Sie eines haben, und den Abschnitt mit den Kontoeinstellungen besuchen, in dem Sie Ihre persönlichen Informationen verwalten können. Sie können sich auch mit uns in Verbindung setzen, um Zugang zu den von Ihnen zur Verfügung gestellten 
        personenbezogenen Daten zu erhalten, diese zu korrigieren oder zu löschen.</p>
      <p>Bitte beachten Sie jedoch, dass wir bestimmte Informationen aufbewahren müssen, wenn wir dazu gesetzlich verpflichtet sind oder eine rechtmäßige Grundlage haben.</p>

      <h3>3.6 - Offenlegung Ihrer persönlichen Daten</h3>
      <h4>3.6.1 - Geschäftstransaktionen</h4>
      <p>Wenn das Unternehmen oder der Betreiber an einer Fusion, einer Übernahme oder einem Verkauf von Vermögenswerten beteiligt ist, können Ihre persönlichen Daten übertragen werden. Wir werden Sie darüber informieren, bevor Ihre persönlichen Daten übertragen werden und einer anderen Datenschutzrichtlinie unterliegen.</p>

      <h4>3.6.2 - Strafverfolgung</h4>
      <p>Unter bestimmten Umständen kann das Unternehmen oder der Betreiber verpflichtet sein, Ihre personenbezogenen Daten offenzulegen, wenn dies gesetzlich vorgeschrieben ist oder als Reaktion auf berechtigte Anfragen von Behörden (z. B. einem Gericht oder einer Regierungsbehörde).</p>

      <h4>3.6.3 - Andere gesetzliche Anforderungen</h4>
      <p>Das Unternehmen oder der Betreiber kann Ihre persönlichen Daten in gutem Glauben offenlegen, dass eine solche Maßnahme notwendig ist, um </p>
      <p>
      • einer gesetzlichen Verpflichtung nachzukommen <br />
      • die Rechte oder das Eigentum des Unternehmens oder des Betreibers zu schützen und zu verteidigen <br />
      • Verhinderung oder Untersuchung von möglichem Fehlverhalten im Zusammenhang mit dem Dienst <br />
      • um die persönliche Sicherheit der Nutzer des Dienstes oder der Öffentlichkeit zu schützen <br />
      • vor rechtlicher Haftung zu schützen
      </p>

      <h3>3.7 - Sicherheit Ihrer persönlichen Daten</h3>
      <p>Die Sicherheit Ihrer persönlichen Daten ist uns wichtig, aber denken Sie daran, dass keine Methode der Übertragung über das Internet oder der elektronischen Speicherung 100% sicher ist. 
        Wir bemühen uns zwar, Ihre persönlichen Daten mit wirtschaftlich vertretbaren Mitteln zu schützen, können jedoch keine absolute Sicherheit garantieren.</p>

      <h2>4 - Detaillierte Informationen über die Verarbeitung Ihrer persönlichen Daten</h2>
      <p>Die von uns beauftragten Dienstleister können Zugang zu Ihren persönlichen Daten haben. Diese Drittanbieter sammeln, speichern, verwenden, verarbeiten und übertragen Informationen über Ihre Aktivitäten 
        auf unserem Dienst in Übereinstimmung mit ihren Datenschutzrichtlinien.</p>

      <h3>4.1 – Analytics</h3>
      <p>Wir können Drittanbieter einsetzen, um die Nutzung unseres Dienstes zu überwachen und zu analysieren. Dazu können unter anderem gehören:</p>
      <p>• Google Analytics<br />
        Google Analytics ist ein von Google angebotener Webanalysedienst, der den Website-Verkehr verfolgt und berichtet. Google verwendet die erfassten Daten, um die Nutzung unseres Dienstes zu verfolgen und zu überwachen. Diese Daten werden mit anderen Google-Diensten geteilt. Google kann die gesammelten Daten verwenden, um die Anzeigen des eigenen Werbenetzwerks zu kontextualisieren und zu personalisieren. <br />
        Sie können sich dagegen wehren, dass Ihre Aktivitäten auf dem Service Google Analytics zur Verfügung gestellt werden, indem Sie das Browser-Add-on Google Analytics opt-out installieren. Das Add-on verhindert, dass das Google Analytics-JavaScript (ga.js, analytics.js und dc.js) Informationen über die Besucheraktivitäten an Google Analytics weitergibt. <br />
        Sie können bestimmte Google Analytics-Funktionen über die Einstellungen Ihres Mobilgeräts deaktivieren, z. B. über die Werbeeinstellungen Ihres Geräts, oder indem Sie die von Google in den Datenschutzbestimmungen angegebenen Anweisungen befolgen: https://policies.google.com/privacy <br />
        Weitere Informationen über die Datenschutzpraktiken von Google finden Sie auf der Google-Webseite für Datenschutz und Nutzungsbedingungen: https://policies.google.com/privacy <br /> 
        • Matomo<br />
        Matomo ist ein Webanalysedienst. Sie können die Seite mit den Datenschutzbestimmungen hier besuchen: https://matomo.org/privacy-policy <br />
        • Fathom<br />
        Fathom ist ein Webanalysedienst. Sie können die Seite mit den Datenschutzrichtlinien hier besuchen: https://www.fathomhq.com/privacy</p>

      <h3>4.2 – E-Mail-Marketing</h3>
      <p>Wir können Ihre persönlichen Daten verwenden, um Ihnen Newsletter, Marketing- oder Werbematerialien und andere Informationen zukommen zu lassen, die für Sie von Interesse sein könnten. Sie haben die Möglichkeit, den Erhalt einer oder aller dieser Mitteilungen von uns abzulehnen, 
          indem Sie dem Abmeldelink oder den Anweisungen folgen, die in jeder von uns gesendeten E-Mail enthalten sind, oder indem Sie sich an uns wenden.</p>
      <p>Wir können E-Mail-Marketing-Dienstleister einsetzen, um E-Mails zu verwalten und an Sie zu senden. Dies können unter anderem sein:</p>
      <p>
          • Mailchimp <br />
            Mailchimp ist ein E-Mail-Marketing-Versanddienst, der von The Rocket Science Group LLC bereitgestellt wird. <br />
            Für weitere Informationen über die Datenschutzpraktiken von Mailchimp besuchen Sie bitte deren Datenschutzrichtlinie: https://mailchimp.com/legal/privacy/ </p>
        
      <h3>4.3 – Zahlungen</h3>
      <p>Wir können im Rahmen des Dienstes kostenpflichtige Produkte und/oder Dienstleistungen anbieten. In diesem Fall können wir für die Zahlungsabwicklung Dienstleistungen Dritter in Anspruch nehmen (z. B. Zahlungsabwickler).</p>
      <p>Wir werden Ihre Zahlungskartendaten nicht speichern oder erfassen. Diese Informationen werden direkt an unsere Drittanbieter-Zahlungsabwickler weitergegeben, deren Verwendung Ihrer persönlichen Daten durch deren Datenschutzrichtlinien geregelt ist. Diese Zahlungsabwickler halten sich an die vom PCI-DSS festgelegten Standards, die vom PCI Security Standards Council verwaltet werden, 
        einer gemeinsamen Initiative von Marken wie Visa, Mastercard, American Express und Discover. Die PCI-DSS-Anforderungen tragen dazu bei, den sicheren Umgang mit Zahlungsdaten zu gewährleisten.</p>
      <p>Dazu gehören unter anderem:<br />
        • Stripe<br />
        Ihre Datenschutzbestimmungen können unter https://stripe.com/us/privacy eingesehen werden.<br />

        • PayPal<br />
        Die Datenschutzrichtlinien können unter https://www.paypal.com/us/webapps/mpp/ua/privacy-full eingesehen werden.</p>
      
      <h3>4.4 - Verhaltensbasiertes Remarketing</h3>
      <p>Das Unternehmen oder der Betreiber nutzt Remarketing-Dienste, um Ihnen Werbung zukommen zu lassen, nachdem Sie unseren Dienst aufgerufen oder besucht haben. Wir und unsere Drittanbieter verwenden Cookies und Nicht-Cookie-Technologien, um Ihr Gerät zu erkennen und zu verstehen, wie Sie unseren Dienst nutzen, damit wir unseren Dienst verbessern können, um Ihre Interessen zu berücksichtigen 
        und Ihnen Werbung zu zeigen, die für Sie wahrscheinlich von größerem Interesse sein wird.</p>
      <p>Diese Drittanbieter sammeln, speichern, verwenden, verarbeiten und übertragen Informationen über Ihre Aktivitäten auf unserem Dienst in Übereinstimmung mit ihren Datenschutzrichtlinien und um uns zu ermöglichen:<br />
        • Messung und Analyse des Datenverkehrs und der Browsing-Aktivitäten auf unserem Dienst<br />
        • Ihnen Werbung für unsere Produkte und/oder Dienstleistungen auf Websites oder Apps von Dritten zu zeigen<br />
        • die Leistung unserer Werbekampagnen zu messen und zu analysieren</p>
      <p>Einige dieser Drittanbieter verwenden möglicherweise Nicht-Cookie-Technologien, die von Browsereinstellungen, die Cookies blockieren, nicht beeinträchtigt werden. Ihr Browser erlaubt Ihnen möglicherweise nicht, solche Technologien zu blockieren. Sie können die folgenden Tools von 
        Drittanbietern verwenden, um die Erfassung und Verwendung von Informationen zum Zwecke der Bereitstellung von interessenbezogener Werbung abzulehnen:<br />
        • Die Opt-out-Plattform der NAI: http://www.networkadvertising.org/choices/ <br />
        • Die Opt-Out-Plattform der EDAA: http://www.youronlinechoices.com/ <br />
        • Die Deaktivierungsplattform der DAA: http://optout.aboutads.info/?c=2&lang=EN </p>
      <p>Sie können alle personalisierten Werbemaßnahmen ablehnen, indem Sie Datenschutzfunktionen auf Ihrem Mobilgerät aktivieren, z. B. Limit Ad Tracking (iOS) und Opt Out of Ads Personalization (Android). 
        Weitere Informationen finden Sie im Hilfesystem Ihres Mobilgeräts.</p>
      <p>Wir können Informationen, wie z. B. gehashte E-Mail-Adressen (falls verfügbar) oder andere Online-Identifikatoren, die über unseren Dienst gesammelt wurden, mit diesen Drittanbietern teilen. Dies ermöglicht es unseren Drittanbietern, 
        Sie zu erkennen und Ihnen geräte- und browserübergreifend Werbung zu liefern. Weitere Informationen über die von diesen Drittanbietern verwendeten Technologien und ihre geräteübergreifenden Funktionen finden Sie in den Datenschutzrichtlinien der unten aufgeführten Anbieter.</p>
      <p>Zu den Drittanbietern, die wir möglicherweise nutzen, gehören unter anderem: <br />
          • Google Ads (AdWords)<br />
          Der Remarketing-Service von Google Ads (AdWords) wird von Google Inc. Bereitgestellt.<br />
          Sie können Google Analytics für Display-Werbung deaktivieren und die Anzeigen im Google Display-Netzwerk anpassen, indem Sie die Seite mit den Google Ads-Einstellungen besuchen: http://www.google.com/settings/ads 
          Google empfiehlt außerdem, das Google Analytics Opt-out Browser Add-on - https://tools.google.com/dlpage/gaoptout - für Ihren Webbrowser zu installieren. Das Google Analytics Opt-out Browser Add-on bietet Besuchern die Möglichkeit, die Erfassung und Nutzung ihrer Daten durch Google Analytics zu verhindern.<br />
          Weitere Informationen über die Datenschutzpraktiken von Google finden Sie auf der Webseite zu Datenschutz und Nutzungsbedingungen von Google: https://policies.google.com/privacy <br />
          • Twitter <br />
          Der Remarketing-Dienst von Twitter wird von Twitter Inc. Bereitgestellt. <br />
          Sie können die interessenbezogene Werbung von Twitter deaktivieren, indem Sie die Anweisungen befolgen: https://support.twitter.com/articles/20170405  <br />
          Weitere Informationen über die Datenschutzpraktiken und -richtlinien von Twitter finden Sie auf der Seite mit den Datenschutzrichtlinien: https://twitter.com/privacy <br />
          • Facebook/Meta <br />
          Der Remarketing-Service von Facebook oder Meta wird von Facebook Inc. und Meta Inc. Bereitgestellt. <br />
          Weitere Informationen über interessenbezogene Werbung von Facebook finden Sie auf dieser Seite: https://www.facebook.com/help/516147308587266  <br />
          Um die interessenbezogene Werbung von Facebook zu deaktivieren, folgen Sie bitte diesen Anweisungen von Facebook: https://www.facebook.com/help/568137493302217  <br />
          Facebook hält sich an die Selbstregulierungsgrundsätze für verhaltensbezogene Online-Werbung, die von der Digital Advertising Alliance aufgestellt wurden. Du kannst dich auch über die Digital Advertising Alliance in den USA http://www.aboutads.info/choices/, die Digital Advertising Alliance of Canada in Kanada http://youradchoices.ca/ oder die European Interactive Digital Advertising Alliance in Europa http://www.youronlinechoices.eu von Facebook und anderen teilnehmenden Unternehmen abmelden oder die Abmeldung über die Einstellungen deines Mobilgeräts vornehmen.<br />
          Weitere Informationen über die Datenschutzpraktiken von Facebook finden Sie in der Datenrichtlinie von Facebook: https://www.facebook.com/privacy/explanation  <br />
          • Pinterest <br />
          Der Remarketing-Dienst von Pinterest wird von der Pinterest Inc. Bereitgestellt. <br />
          Sie können die interessenbezogene Werbung von Pinterest deaktivieren, indem Sie die "Do Not Track"-Funktion Ihres Webbrowsers aktivieren oder den Anweisungen von Pinterest folgen: http://help.pinterest.com/en/articles/personalization-and-data <br />
          Weitere Informationen über die Datenschutzpraktiken und -richtlinien von Pinterest finden Sie auf der Seite mit den Datenschutzrichtlinien: https://about.pinterest.com/en/privacy-policy </p>
      
      <h3>4.5 - Nutzung, Leistung und Sonstiges</h3>
      <p>Wir können Drittanbieter nutzen, um unseren Service zu verbessern. Dazu können unter anderem gehören:<br />
          • Intercom<br />
          Deren Datenschutzrichtlinien können unter https://www.intercom.com/legal/privacy  eingesehen werden.<br />
          • Facebook Messenger<br />
          Deren Datenschutzrichtlinien können unter https://www.facebook.com/privacy/policy  eingesehen werden.<br />
          • Zendesk<br />
          Die Datenschutzrichtlinien können unter https://www.zendesk.com/company/agreements-and-terms/privacy-notice/  eingesehen werden.<br />
          • Tawk<br />
          Die Datenschutzrichtlinien des Unternehmens können unter https://www.tawk.to/privacy-policy/ eingesehen werden.</p>
      
      <h2>5 - Links zu anderen Websites</h2>
      <p>Unser Service kann Links zu anderen Websites enthalten, die nicht von uns betrieben werden. Wenn Sie auf einen Link einer dritten Partei klicken, werden Sie auf die Seite dieser dritten Partei weitergeleitet. Wir empfehlen Ihnen dringend, 
        die Datenschutzrichtlinien jeder von Ihnen besuchten Website zu lesen.</p>
      <p>Wir haben keine Kontrolle über und übernehmen keine Verantwortung für den Inhalt, die Datenschutzrichtlinien oder Praktiken von Websites oder Diensten Dritter.</p>

      <h2>6 - DSGVO-Datenschutz</h2>
      <h3>6.1 - Rechtsgrundlage für die Verarbeitung personenbezogener Daten gemäß DSGVO</h3>
      <p>Wir können personenbezogene Daten unter den folgenden Bedingungen verarbeiten:<br />
          • Einverständnis: Sie haben Ihre Zustimmung zur Verarbeitung personenbezogener Daten für einen oder mehrere bestimmte Zwecke gegeben. <br />
          • Vertragserfüllung: Die Bereitstellung personenbezogener Daten ist für die Erfüllung eines Vertrags mit Ihnen und/oder für vorvertragliche Verpflichtungen erforderlich. <br />
          • Gesetzliche Verpflichtungen: Die Verarbeitung personenbezogener Daten ist für die Erfüllung einer rechtlichen Verpflichtung erforderlich, der das Unternehmen oder der Betreiber unterliegt. <br />
          • Lebenswichtige Interessen: Die Verarbeitung personenbezogener Daten ist erforderlich, um Ihre lebenswichtigen Interessen oder die einer anderen natürlichen Person zu schützen. <br />
          • Öffentliche Interessen: Die Verarbeitung personenbezogener Daten ist mit einer Aufgabe verbunden, die im öffentlichen Interesse oder in Ausübung öffentlicher Gewalt erfolgt, die dem Unternehmen oder dem Betreiber übertragen wurde. <br />
          • Berechtigte Interessen: Die Verarbeitung personenbezogener Daten ist für die Zwecke der berechtigten Interessen des Unternehmens oder des Betreibers erforderlich.</p>
      <p>In jedem Fall ist das Unternehmen oder der Betreiber gerne bereit, bei der Klärung der konkreten Rechtsgrundlage für die Verarbeitung behilflich zu sein, insbesondere bei der Frage, ob die Bereitstellung personenbezogener Daten gesetzlich oder vertraglich 
        vorgeschrieben oder für den Abschluss eines Vertrags erforderlich ist.</p>

      <h3>6.2 - Ihre Rechte gemäß der DSGVO</h3>
      <p>Das Unternehmen bzw. der Betreiber verpflichtet sich, die Vertraulichkeit Ihrer personenbezogenen Daten zu wahren und zu gewährleisten, dass Sie Ihre Rechte ausüben können.<br />
        Sie haben gemäß dieser Datenschutzrichtlinie und per Gesetz, wenn Sie sich innerhalb der EU befinden, das Recht</p>
      <p>
        • Zugang zu Ihren persönlichen Daten zu verlangen. Das Recht, auf die Informationen, die wir über Sie haben, zuzugreifen, sie zu aktualisieren oder zu löschen. Wann immer es möglich ist, können Sie direkt in den Einstellungen Ihres Kontos auf Ihre persönlichen Daten zugreifen, sie aktualisieren oder deren Löschung beantragen. 
        Wenn Sie nicht in der Lage sind, diese Aktionen selbst durchzuführen, wenden Sie sich bitte an uns, um Ihnen zu helfen. Auf diese Weise können Sie auch eine Kopie der persönlichen Daten erhalten, die wir über Sie gespeichert haben.<br />
        • Sie können die Berichtigung der persönlichen Daten, die wir über Sie gespeichert haben, verlangen. Sie haben das Recht, unvollständige oder ungenaue Daten, die wir über Sie gespeichert haben, berichtigen zu lassen.<br />
        • Einspruch gegen die Verarbeitung Ihrer persönlichen Daten. Dieses Recht besteht, wenn wir uns auf ein berechtigtes Interesse als Rechtsgrundlage für unsere Verarbeitung berufen und es etwas an Ihrer besonderen Situation gibt, das Sie dazu veranlasst, der Verarbeitung Ihrer personenbezogenen Daten aus diesem Grund zu widersprechen. Sie haben auch das Recht, 
        Einspruch zu erheben, wenn wir Ihre personenbezogenen Daten für Direktmarketingzwecke verarbeiten.<br />
        • Sie können die Löschung Ihrer persönlichen Daten verlangen. Sie haben das Recht, uns aufzufordern, Ihre persönlichen Daten zu löschen oder zu entfernen, wenn es keinen triftigen Grund für uns gibt, sie weiter zu verarbeiten.<br />
        • Sie können die Übermittlung Ihrer persönlichen Daten verlangen. Wir werden Ihnen oder einem von Ihnen gewählten Dritten Ihre personenbezogenen Daten in einem strukturierten, allgemein verwendeten und maschinenlesbaren Format zur Verfügung stellen. Bitte beachten Sie, dass dieses Recht nur für automatisierte Informationen gilt, 
        deren Verwendung Sie ursprünglich zugestimmt haben, 
        oder wenn wir die Informationen zur Erfüllung eines Vertrags mit Ihnen verwendet haben.<br />
        • Rücknahme Ihrer Zustimmung. Sie haben das Recht, Ihre Zustimmung zur Verwendung Ihrer persönlichen Daten zu widerrufen. Wenn Sie Ihre Zustimmung zurückziehen, können wir Ihnen möglicherweise keinen Zugang zu bestimmten Funktionen des Dienstes gewähren.</p>
      
      <h3>6.3 - Ausübung Ihrer DSGVO-Datenschutzrechte</h3>
      <p>Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung und Widerspruch ausüben, indem Sie sich an uns wenden. Bitte beachten Sie, dass wir Sie möglicherweise bitten, Ihre Identität zu überprüfen, bevor wir auf solche Anfragen reagieren. Wenn Sie eine Anfrage stellen, werden wir unser Bestes tun, 
        um Ihnen so schnell wie möglich zu antworten.</p>
      <p>Sie haben das Recht, sich bei einer Datenschutzbehörde über die Erfassung und Verwendung Ihrer persönlichen Daten durch uns zu beschweren. Wenn Sie sich im Europäischen Wirtschaftsraum (EWR) befinden, wenden Sie sich für weitere Informationen bitte an Ihre lokale Datenschutzbehörde im EWR.</p>

      <h2>7 - CCPA, CalOPPA und kalifornische Datenschutzrechte</h2>
      <p>Dieser Abschnitt über den Datenschutz für Einwohner von Kalifornien ergänzt die in unserer Datenschutzrichtlinie enthaltenen Informationen und gilt ausschließlich für alle Besucher, Benutzer und andere Personen, die im Bundesstaat Kalifornien ansässig sind.</p>

      <h3>7.1 - Kategorien von gesammelten persönlichen Informationen</h3>
      <p>Wir sammeln Informationen, die einen bestimmten Verbraucher oder ein bestimmtes Gerät identifizieren, sich auf ihn beziehen, ihn beschreiben, auf ihn verweisen, mit ihm in Verbindung gebracht werden können oder vernünftigerweise direkt oder indirekt mit ihm in Verbindung gebracht werden könnten. Im Folgenden finden Sie eine Liste von Kategorien personenbezogener Daten, 
        die wir von in Kalifornien ansässigen Personen erheben können oder in den letzten zwölf (12) Monaten erhoben haben.</p>
      <p>Bitte beachten Sie, dass es sich bei den Kategorien und Beispielen in der nachstehenden Liste um diejenigen handelt, die im CCPA definiert sind. Dies bedeutet nicht, dass alle Beispiele dieser Kategorie personenbezogener Daten tatsächlich von uns erfasst wurden, sondern spiegelt unsere gutgläubige Annahme nach bestem Wissen und Gewissen wider, 
        dass einige dieser Daten aus der betreffenden Kategorie erfasst werden können und möglicherweise auch erfasst wurden. Bestimmte Kategorien personenbezogener Daten werden beispielsweise nur dann erfasst, wenn Sie uns diese personenbezogenen Daten direkt zur Verfügung stellen.</p>
      <p>
        • Kategorie A: Identifikatoren.<br />
          Beispiele: Ein echter Name, ein Pseudonym, eine Postanschrift, eine eindeutige persönliche Kennung, eine Online-Kennung, eine Internet-Protokoll-Adresse, eine E-Mail-Adresse, ein Kontoname, eine Führerscheinnummer, eine Reisepassnummer oder andere ähnliche Kennungen.<br />
          Gesammelt: Ja.<br />
        • Kategorie B: Persönliche Datenkategorien, die im kalifornischen Gesetz über Kundendaten (Cal. Civ. Code § 1798.80(e)).<br />
          Beispiele: Name, Unterschrift, Sozialversicherungsnummer, körperliche Merkmale oder Beschreibung, Adresse, Telefonnummer, Reisepassnummer, Führerschein- oder Personalausweisnummer, Nummer der Versicherungspolice, Ausbildung, Beschäftigung, Beschäftigungsgeschichte, Bankkontonummer, Kreditkartennummer, Debitkartennummer oder andere finanzielle Informationen, medizinische Informationen oder Krankenversicherungsinformationen. Einige der in dieser Kategorie enthaltenen personenbezogenen Daten können sich mit anderen Kategorien überschneiden.<br />
          Gesammelt: Ja.<br />
        • Kategorie C: Geschützte Klassifizierungsmerkmale nach kalifornischem oder bundesstaatlichem Recht.<br />
          Beispiele: Alter (40 Jahre oder älter), Rasse, Hautfarbe, Abstammung, nationale Herkunft, Staatsbürgerschaft, Religion oder Glaube, Familienstand, Gesundheitszustand, körperliche oder geistige Behinderung, Geschlecht (einschließlich Geschlecht, Geschlechtsidentität, Geschlechtsausdruck, Schwangerschaft oder Geburt und damit zusammenhängende medizinische Bedingungen), sexuelle Orientierung, Veteranen- oder Militärstatus, genetische Informationen (einschließlich familiärer genetischer Informationen).<br />
          Gesammelt: Nein.<br />
        • Kategorie D: Kommerzielle Informationen.<br />
          Beispiele: Aufzeichnungen und Historie von gekauften oder in Betracht gezogenen Produkten oder Dienstleistungen.<br />
          Gesammelt: Ja.<br />
        • Kategorie E: Biometrische Informationen.<br />
          Beispiele: Genetische, physiologische, verhaltensbezogene und biologische Merkmale oder Aktivitätsmuster, die zur Extraktion einer Schablone oder eines anderen Identifikators oder identifizierenden Informationen verwendet werden, wie z. B. Fingerabdrücke, Gesichts- und Stimmabdrücke, Iris- oder Netzhautscans, Tastenanschläge, Gang- oder andere physische Muster sowie Schlaf-, Gesundheits- oder Bewegungsdaten.<br />
          Gesammelt: Nein.<br />
        • Kategorie F: Internet- oder andere ähnliche Netzwerkaktivitäten.<br />
          Beispiele: Interaktion mit unserem Dienst oder Werbung.<br />
          Gesammelt: Ja.<br />
        • Kategorie G: Geolokalisierungsdaten.<br />
          Beispiele: Ungefährer physischer Standort.<br />
          Gesammelt: Nein.<br />
        • Kategorie H: Sensorische Daten.<br />
          Beispiele: Akustische, elektronische, visuelle, thermische, olfaktorische oder ähnliche Informationen.<br />
          Gesammelt: Nein.<br />
        • Kategorie I: Berufs- oder beschäftigungsbezogene Informationen.<br />
          Beispiele: Aktueller oder früherer beruflicher Werdegang oder Leistungsbeurteilungen.<br />
          Gesammelt: Nein.<br />
        • Kategorie J: Nicht-öffentliche Bildungsinformationen (gemäß dem Family Educational Rights and Privacy Act (20 U.S.C. Abschnitt 1232g, 34 C.F.R. Teil 99)).<br />
          Beispiele: Bildungsaufzeichnungen, die sich direkt auf einen Schüler beziehen und von einer Bildungseinrichtung oder einer in ihrem Namen handelnden Partei aufbewahrt werden, wie z. B. Noten, Abschriften, Klassenlisten, Stundenpläne, Schüleridentifikationscodes, finanzielle Informationen über Schüler oder Disziplinaraufzeichnungen über Schüler.<br />
          Gesammelt: Nein.<br />
        • Kategorie K: Aus anderen persönlichen Informationen gezogene Schlussfolgerungen.<br />
          Beispiele: Profil, das die Vorlieben, Eigenschaften, psychologischen Tendenzen, Veranlagungen, Verhaltensweisen, Einstellungen, Intelligenz, Fähigkeiten und Neigungen einer Person widerspiegelt.<br />
          Erhoben: Nein.</p>
      
      <p>Gemäß CCPA gehören zu den personenbezogenen Daten nicht:<br />
        • Öffentlich zugängliche Informationen aus staatlichen Aufzeichnungen<br />
        • Nicht identifizierte oder zusammengefasste Verbraucherinformationen<br />
        • Informationen, die vom Anwendungsbereich des CCPA ausgeschlossen sind, wie z. B.<br />
         ◦ Gesundheits- oder medizinische Informationen, die unter den Health Insurance
        Portability and Accountability Act von 1996 (HIPAA) und den California Confidentiality of Medical Information Act (CMIA) fallen, oder klinische Studiendaten<br />
         ◦ Persönliche Informationen, die unter bestimmte sektorspezifische Datenschutzgesetze fallen, einschließlich des Fair Credit Reporting Act (FRCA), des Gramm-Leach-Bliley Act (GLBA) oder des California Financial Information Privacy Act (FIPA) sowie des Driver's Privacy Protection Act von 1994</p>
      
      <h3>7.2 - Quellen für persönliche Informationen</h3>
      <p>Wir erhalten die oben aufgeführten Kategorien personenbezogener Daten aus den folgenden Kategorien von Quellen:<br />
        • Unmittelbar von Ihnen. Zum Beispiel von den Formularen, die Sie in unserem Service ausfüllen, von den Präferenzen, die Sie über unseren Service äußern oder angeben, oder von Ihren Einkäufen in unserem Service.<br />
        • Indirekt von Ihnen. Zum Beispiel durch die Beobachtung Ihrer Aktivitäten auf unserem Dienst.<br />
        • Automatisch von Ihnen. Zum Beispiel durch Cookies, die von uns oder unseren Dienstanbietern auf Ihrem Gerät gesetzt werden, während Sie durch unseren Dienst navigieren.<br />
        • Von Dienstanbietern. Zum Beispiel von Drittanbietern, um die Nutzung unseres Dienstes zu überwachen und zu analysieren, von Drittanbietern, um Ihnen gezielte Werbung zukommen zu lassen, von Drittanbietern für die Zahlungsabwicklung oder von anderen Drittanbietern, die wir nutzen, 
        um Ihnen den Dienst bereitzustellen.</p>
      
      <h3>7.3 - Verwendung personenbezogener Daten für geschäftliche oder kommerzielle Zwecke</h3>
      <p>Wir können die von uns erfassten personenbezogenen Daten für "geschäftliche Zwecke" oder "kommerzielle Zwecke" (gemäß der Definition im CCPA) verwenden oder offenlegen, wozu die folgenden Beispiele gehören können:</p>
      <p> • Um unseren Dienst zu betreiben und Ihnen unseren Dienst zur Verfügung zu stellen.<br />
          • Um Ihnen Support zu bieten und Ihre Anfragen zu beantworten, einschließlich der Untersuchung und Behebung Ihrer Probleme und der Überwachung und Verbesserung unseres Dienstes.<br />
          • Um den Zweck zu erfüllen, für den Sie die Informationen zur Verfügung gestellt haben. Wenn Sie uns beispielsweise Ihre Kontaktinformationen mitteilen, um eine Frage zu unserem Dienst zu stellen, werden wir diese persönlichen Informationen verwenden, um Ihre Anfrage zu beantworten. Wenn Sie Ihre persönlichen Daten zur Verfügung stellen, um ein Produkt oder eine Dienstleistung zu kaufen, werden wir diese Daten verwenden, um Ihre Zahlung zu bearbeiten und die Lieferung zu erleichtern.<br />
          • Zur Beantwortung von Anfragen der Strafverfolgungsbehörden und soweit dies durch geltendes Recht, Gerichtsbeschlüsse oder behördliche Vorschriften erforderlich ist.<br />
          • Wie Ihnen bei der Erfassung Ihrer persönlichen Daten beschrieben oder wie anderweitig im CCPA festgelegt.<br />
          • Für interne Verwaltungs- und Prüfungszwecke.<br />
          • Zur Aufdeckung von Sicherheitsvorfällen und zum Schutz vor böswilligen, betrügerischen oder illegalen Aktivitäten, einschließlich, falls erforderlich, zur strafrechtlichen Verfolgung der für solche Aktivitäten Verantwortlichen.</p>
      <p>Bitte beachten Sie, dass die oben angeführten Beispiele nur zur Veranschaulichung dienen und keinen Anspruch auf Vollständigkeit erheben. Weitere Einzelheiten darüber, wie wir diese Informationen verwenden, finden Sie im Abschnitt "Verwendung Ihrer personenbezogenen Daten".</p>
      <p>Wenn wir beschließen, weitere Kategorien personenbezogener Daten zu erfassen oder die von uns erfassten personenbezogenen Daten für wesentlich andere, nicht verwandte oder unvereinbare Zwecke zu verwenden, werden wir diese Datenschutzrichtlinie aktualisieren.</p>

      <h3>7.4 - Offenlegung personenbezogener Daten für Geschäftszwecke oder kommerzielle Zwecke</h3>
      <p>Wir können die folgenden Kategorien personenbezogener Daten für geschäftliche oder kommerzielle Zwecke verwenden oder offenlegen und haben sie möglicherweise in den letzten zwölf (12) Monaten verwendet oder offengelegt:</p>
      <p> • Kategorie A: Identifikatoren<br />
          • Kategorie B: Persönliche Datenkategorien, die im kalifornischen Gesetz über Kundendaten (Cal. Civ. Code § 1798.80(e)) gelistet sind<br />
          • Kategorie D: Kommerzielle Informationen<br />
          • Kategorie F: Internet- oder andere ähnliche Netzwerkaktivitäten</p>
      <p>Bitte beachten Sie, dass die oben aufgeführten Kategorien die im CCPA definierten Kategorien sind. Dies bedeutet nicht, dass alle Beispiele dieser Kategorie personenbezogener Daten tatsächlich offengelegt wurden, sondern spiegelt unsere gutgläubige Annahme nach bestem Wissen und Gewissen wider, 
        dass einige dieser Daten aus der entsprechenden Kategorie offengelegt werden können und möglicherweise auch wurden.</p>
      <p>Wenn wir personenbezogene Daten für einen geschäftlichen oder kommerziellen Zweck offenlegen, schließen wir einen Vertrag ab, in dem der Zweck beschrieben wird und der Empfänger verpflichtet wird, diese personenbezogenen Daten vertraulich zu behandeln und sie nicht für andere Zwecke als die Erfüllung des Vertrags zu verwenden.</p>
      
      <h3>7.5 - Verkauf von persönlichen Daten</h3>
      <p>Gemäß der Definition im CCPA bedeuten "Verkauf" und "Verkauf" den Verkauf, die Vermietung, die Freigabe, die Offenlegung, die Verbreitung, die Zurverfügungstellung, die Übertragung oder die anderweitige mündliche, schriftliche, 
        elektronische oder anderweitige Weitergabe der persönlichen Daten eines Verbrauchers durch das Unternehmen an einen Dritten gegen eine Gegenleistung. Das bedeutet, dass wir für die Weitergabe von personenbezogenen Daten eine Art von Gegenleistung erhalten haben, die jedoch nicht unbedingt in Geld bestehen muss.</p>
      <p>Bitte beachten Sie, dass die unten aufgeführten Kategorien die im CCPA definierten sind. Dies bedeutet nicht, dass alle Beispiele dieser Kategorie personenbezogener Daten tatsächlich verkauft wurden, sondern spiegelt unsere gutgläubige Annahme nach bestem Wissen und Gewissen wider, dass einige dieser Daten aus der entsprechenden Kategorie 
        gegen eine Gegenleistung weitergegeben werden können und wurden.</p>
      <p>Wir können die folgenden Kategorien personenbezogener Daten verkaufen und haben sie möglicherweise in den letzten zwölf (12) Monaten verkauft:<br />
          • Kategorie A: Identifikatoren<br />
          • Kategorie B: Persönliche Datenkategorien, die im kalifornischen Gesetz über Kundendaten (Cal. Civ. Code § 1798.80(e))<br />
          • Kategorie D: Kommerzielle Informationen<br />
          • Kategorie F: Internet oder andere ähnliche Netzwerkaktivitäten</p>
      
      <h3>7.6 - Weitergabe von persönlichen Informationen</h3>
      <p>Wir können Ihre persönlichen Daten, die in den oben genannten Kategorien identifiziert wurden, an die folgenden Kategorien von Dritten weitergeben:</p>
      <p>   • Dienstanbieter<br />
            • Zahlungsabwickler<br />
            • Unsere Tochtergesellschaften<br />
            • Unsere Geschäftspartner<br />
            • Drittanbieter, denen Sie oder Ihre Vertreter die Erlaubnis erteilen, Ihre persönlichen Daten in Verbindung mit Produkten oder Dienstleistungen, die wir Ihnen anbieten, weiterzugeben</p>
      
      <h3>7.7 - Verkauf von persönlichen Informationen von Minderjährigen unter 16 Jahren</h3>
      <p>Wir sammeln nicht wissentlich personenbezogene Daten von Minderjährigen unter 16 Jahren über unseren Service, obwohl bestimmte Websites Dritter, mit denen wir verlinkt sind, dies möglicherweise tun. Diese Websites Dritter haben ihre eigenen Nutzungsbedingungen und Datenschutzrichtlinien, und wir empfehlen Eltern und Erziehungsberechtigten, 
        die Internetnutzung ihrer Kinder zu überwachen und ihre Kinder anzuweisen, niemals ohne ihre Zustimmung Informationen auf anderen Websites anzugeben.</p>
      <p>Wir verkaufen keine persönlichen Daten von Verbrauchern, von denen wir wissen, dass sie unter 16 Jahre alt sind, es sei denn, wir erhalten eine ausdrückliche Genehmigung (das "Recht auf Zustimmung") entweder von dem Verbraucher, der zwischen 13 und 16 Jahre alt ist, oder von den Eltern oder dem Erziehungsberechtigten eines Verbrauchers, 
        der unter 13 Jahre alt ist. Verbraucher, die dem Verkauf personenbezogener Daten zugestimmt haben, können dies jederzeit für zukünftige Verkäufe widerrufen. Um dieses Recht auszuüben, können Sie (oder Ihr bevollmächtigter Vertreter) eine Anfrage an uns richten, indem Sie sich mit uns in Verbindung setzen.</p>
      <p>Wenn Sie Grund zu der Annahme haben, dass ein Kind unter 13 (oder 16) Jahren uns personenbezogene Daten zur Verfügung gestellt hat, wenden Sie sich bitte mit ausreichenden Angaben an uns, damit wir diese Daten löschen können.</p>

      <h3>7.8 - Ihre Rechte nach dem CCPA</h3>
      <p>Der CCPA räumt den in Kalifornien ansässigen Personen bestimmte Rechte in Bezug auf ihre persönlichen Daten ein. Wenn Sie in Kalifornien ansässig sind, haben Sie die folgenden Rechte:</p>
      <p> • Das Recht auf Benachrichtigung. Sie haben das Recht, darüber informiert zu werden, welche Kategorien personenbezogener Daten erfasst werden und für welche Zwecke die personenbezogenen Daten verwendet werden.<br />
          • Das Recht auf Anfrage. Gemäß CCPA haben Sie das Recht zu verlangen, dass wir Ihnen Informationen über die Erhebung, die Verwendung, den Verkauf, die Weitergabe zu Geschäftszwecken und die gemeinsame Nutzung personenbezogener Daten offenlegen. Sobald wir Ihre Anfrage erhalten und bestätigt haben, werden wir sie Ihnen offenlegen:<br />
          &ensp; ◦ Die Kategorien der persönlichen Daten, die wir über Sie gesammelt haben<br />
          &ensp; ◦ Die Kategorien der Quellen für die persönlichen Informationen, die wir über Sie gesammelt haben<br />
          &ensp; ◦ Unser geschäftlicher oder kommerzieller Zweck für die Sammlung oder den Verkauf dieser personenbezogenen Daten<br />
          &ensp; ◦ Die Kategorien von Dritten, mit denen wir diese personenbezogenen Daten teilen<br />
          &ensp; ◦ Die spezifischen persönlichen Daten, die wir über Sie gesammelt haben<br />
          &ensp; ◦ Wenn wir Ihre personenbezogenen Daten verkauft oder Ihre personenbezogenen Daten für einen geschäftlichen Zweck offengelegt haben, werden wir Sie darüber informieren:<br />
          &ensp;  &ensp;    ▪ Die Kategorien der verkauften personenbezogenen Daten<br />
          &ensp;  &ensp;    ▪ Die Kategorien der weitergegebenen personenbezogenen Daten<br />
          • Das Recht, dem Verkauf von personenbezogenen Daten zu widersprechen (Opt-out). Sie haben das Recht, uns anzuweisen, Ihre personenbezogenen Daten nicht zu verkaufen. Um eine Opt-out-Anfrage zu stellen, kontaktieren Sie uns bitte. <br />
          • Das Recht, persönliche Daten zu löschen. Sie haben das Recht, vorbehaltlich bestimmter Ausnahmen, die Löschung Ihrer personenbezogenen Daten zu verlangen. Sobald wir Ihren Antrag erhalten und bestätigt haben, werden wir Ihre personenbezogenen Daten aus unseren Aufzeichnungen löschen (und unsere Dienstanbieter anweisen, diese zu löschen), sofern keine Ausnahme vorliegt. Wir können Ihren Antrag auf Löschung ablehnen, wenn die Beibehaltung der Informationen für uns oder unsere Dienstanbieter notwendig ist, um: <br />
          &ensp; ◦ Die Transaktion abzuschließen, für die wir die persönlichen Daten gesammelt haben, eine Ware oder Dienstleistung bereitzustellen, die Sie angefordert haben, Maßnahmen zu ergreifen, die im Rahmen unserer laufenden Geschäftsbeziehung mit Ihnen vernünftigerweise erwartet werden, oder unseren Vertrag mit Ihnen anderweitig zu erfüllen. <br />
          &ensp; ◦ Aufdeckung von Sicherheitsvorfällen, Schutz vor böswilligen, täuschenden, betrügerischen oder illegalen Aktivitäten oder Verfolgung der für solche Aktivitäten Verantwortlichen. <br />
          &ensp; ◦ Produkte zu debuggen, um Fehler zu erkennen und zu beheben, die die vorgesehene Funktionalität beeinträchtigen. <br />
          &ensp; ◦ Ausübung des Rechts auf freie Meinungsäußerung, Gewährleistung des Rechts eines anderen Verbrauchers auf freie Meinungsäußerung oder Ausübung anderer gesetzlich vorgesehener Rechte. <br />
          &ensp; ◦ Einhaltung des California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.). <br />
          &ensp; ◦ Öffentliche oder von Experten begutachtete wissenschaftliche, historische oder statistische Forschung im öffentlichen Interesse betreiben, die alle anderen anwendbaren Ethik- und Datenschutzgesetze einhält, wenn die Löschung der Daten die Durchführung der Forschung wahrscheinlich unmöglich machen oder ernsthaft beeinträchtigen würde, sofern Sie zuvor eine informierte Zustimmung erteilt haben. <br />
          &ensp; ◦ Ausschließlich interne Verwendungszwecke ermöglichen, die vernünftigerweise mit den Erwartungen der Verbraucher auf der Grundlage Ihrer Beziehung zu uns übereinstimmen. <br />
          &ensp; ◦ Erfüllung einer gesetzlichen Verpflichtung. <br />
          &ensp; ◦ Andere interne und rechtmäßige Verwendungen dieser Informationen, die mit dem Kontext, in dem Sie sie bereitgestellt haben, vereinbar sind. <br />
          • Das Recht, nicht diskriminiert zu werden. Sie haben das Recht, nicht diskriminiert zu werden, wenn Sie eines Ihrer Verbraucherrechte ausüben, einschließlich durch: <br />
          &ensp; ◦ Verweigerung von Waren oder Dienstleistungen für Sie <br />
          &ensp; ◦ Berechnung unterschiedlicher Preise oder Tarife für Waren oder Dienstleistungen, einschließlich der Gewährung von Rabatten oder anderen Vergünstigungen oder der Verhängung von Strafen <br />
          &ensp; ◦ Bereitstellung eines anderen Niveaus oder einer anderen Qualität von Waren oder Dienstleistungen für Sie <br />
          &ensp; ◦ Vorschlagen, dass Sie einen anderen Preis oder Tarif für Waren oder Dienstleistungen oder ein anderes Niveau oder eine andere Qualität von Waren oder Dienstleistungen erhalten werden </p>
      
      <h3>7.9 - Ausübung Ihrer CCPA-Datenschutzrechte</h3>
      <p>Wenn Sie in Kalifornien ansässig sind, können Sie sich mit uns in Verbindung setzen, um eines Ihrer Rechte gemäß CCPA auszuüben.</p>
      <p>Nur Sie oder eine beim California Secretary of State registrierte Person, die Sie bevollmächtigt haben, in Ihrem Namen zu handeln, können eine überprüfbare Anfrage in Bezug auf Ihre persönlichen Daten stellen.</p>
      <p>Ihre Anfrage an uns muss:<br />
        • Ausreichende Informationen bereitstellen, die es uns ermöglichen, in angemessener Weise zu überprüfen, ob Sie die Person sind, über die wir persönliche Daten gesammelt haben, oder ein bevollmächtigter Vertreter <br />
        • Ihre Anfrage so detailliert beschreiben, dass wir sie richtig verstehen, bewerten und beantworten können.</p>
      <p>Wir können nicht auf Ihre Anfrage reagieren oder Ihnen die erforderlichen Informationen zur Verfügung stellen, wenn wir nicht in der Lage sind: <br />
        • Ihre Identität oder Befugnis, die Anfrage zu stellen, überprüfen können <br />
        • und bestätigen können, dass sich die persönlichen Informationen auf Sie beziehen</p>
      <p>Wir werden die erforderlichen Informationen innerhalb von 45 Tagen nach Erhalt Ihrer überprüfbaren Anfrage kostenlos zur Verfügung stellen. Die Frist für die Bereitstellung der angeforderten Informationen kann einmalig um weitere 45 Tage verlängert werden, wenn dies vernünftigerweise erforderlich ist, 
        und mit vorheriger Ankündigung.</p>
      <p>Alle von uns bereitgestellten Informationen beziehen sich nur auf den Zeitraum von 12 Monaten vor dem Eingang der überprüfbaren Anfrage.</p>
      <p>Bei Anfragen zur Datenübertragbarkeit wählen wir ein Format für die Bereitstellung Ihrer persönlichen Daten, das leicht zu verwenden ist und Ihnen die ungehinderte Übermittlung der Daten von einer Stelle zu einer anderen Stelle ermöglichen sollte.</p>
      
      <h3>7.10 - Verkaufen Sie meine persönlichen Daten nicht</h3>
      <p>Sie haben das Recht, den Verkauf Ihrer persönlichen Daten abzulehnen. Sobald wir eine nachprüfbare Verbraucheranfrage von Ihnen erhalten und bestätigen, werden wir den Verkauf Ihrer persönlichen Daten einstellen. Um Ihr Recht auf Ablehnung auszuüben, 
        kontaktieren Sie uns bitte.</p>
      <p>Die Dienstanbieter, mit denen wir zusammenarbeiten (z. B. unsere Analyse- oder Werbepartner), können im Rahmen des Dienstes Technologien verwenden, die personenbezogene Daten im Sinne des CCPA-Gesetzes verkaufen. Wenn Sie die Verwendung Ihrer personenbezogenen Daten für interessenbezogene Werbung und diese potenziellen Verkäufe im Sinne des CCPA-Gesetzes ablehnen möchten, können Sie dies tun, 
        indem Sie die nachstehenden Anweisungen befolgen.</p>
      <p>Bitte beachten Sie, dass jede Abmeldung spezifisch für den von Ihnen verwendeten Browser ist. Es kann sein, dass Sie sich in jedem Browser, 
        den Sie verwenden, abmelden müssen.</p>
      
      <h4>7.10.1 – Website</h4>
      <p>Sie können den Erhalt von personalisierter Werbung, wie sie von unseren Dienstanbietern bereitgestellt wird, deaktivieren, 
        indem Sie unsere Anweisungen auf dem Dienst befolgen:</p>
      <p>   • Die Opt-out-Plattform der NAI: http://www.networkadvertising.org/choices/ <br />
            • Die Opt-Out-Plattform der EDAA: http://www.youronlinechoices.com/ <br />
            • Die Deaktivierungsplattform der DAA: http://optout.aboutads.info/?c=2&lang=EN</p>
      <p>Bei der Abmeldung wird ein Cookie auf Ihrem Computer platziert, das eindeutig dem Browser zugeordnet ist, den Sie zur Abmeldung verwenden. Wenn Sie den Browser wechseln oder die von Ihrem Browser gespeicherten Cookies löschen, 
        müssen Sie sich erneut abmelden.</p>
      
      <h4>7.10.2 - Mobile Geräte</h4>
      <p>Ihr Mobilgerät bietet Ihnen möglicherweise die Möglichkeit, die Verwendung von Informationen über die von Ihnen genutzten Apps abzulehnen, 
        um Ihnen auf Ihre Interessen abgestimmte Werbung zu präsentieren:</p>
      <p>   • Ablehnung von interessenbezogener Werbung" oder "Ablehnung der Personalisierung von Werbung" auf Android-Geräten <br />
            • "Anzeigenverfolgung einschränken" auf iOS-Geräten</p>
      <p>Sie können auch die Erfassung von Standortinformationen von Ihrem Mobilgerät stoppen, indem Sie die Einstellungen auf Ihrem Mobilgerät ändern.</p>
      
      <h3>7.11 - "Do Not Track"-Richtlinie gemäß dem California Online Privacy Protection Act (CalOPPA)</h3>
      <p>Unser Dienst reagiert nicht auf "Do Not Track"-Signale.</p>
      <p>Einige Websites von Drittanbietern verfolgen jedoch Ihre Browsing-Aktivitäten. Wenn Sie solche Websites besuchen, können Sie Ihre Einstellungen in Ihrem Webbrowser so vornehmen, dass Sie den Websites mitteilen, dass Sie nicht verfolgt werden möchten. Sie können DNT aktivieren oder deaktivieren, 
        indem Sie die Voreinstellungen oder die Einstellungsseite Ihres Webbrowsers aufrufen.</p>
      
      <h3>7.12 - Ihre kalifornischen Datenschutzrechte (das kalifornische Gesetz "Shine the Light")</h3>
      <p>Gemäß California Civil Code Section 1798 (California's Shine the Light law) können Einwohner Kaliforniens, die eine Geschäftsbeziehung mit uns unterhalten, 
        einmal im Jahr Informationen über die Weitergabe ihrer persönlichen Daten an Dritte für deren Direktmarketingzwecke anfordern.</p>
      <p>Wenn Sie weitere Informationen im Rahmen des kalifornischen Shine the Light-Gesetzes anfordern möchten und in Kalifornien ansässig sind, 
        können Sie uns über die unten angegebenen Kontaktinformationen kontaktieren.</p>
      
      <h2>8 - Datenschutzrechte von Kindern und minderjährigen Nutzern</h2>
      <h3>8.1 - Allgemeine Datenschutzrechte für Kinder</h3>
      <p>Unser Service richtet sich nicht an Personen unter 13 Jahren. Wir sammeln nicht wissentlich personenbezogene Daten von Personen unter 13 Jahren. Wenn Sie ein Elternteil oder Erziehungsberechtigter sind und wissen, 
        dass Ihr Kind uns personenbezogene Daten zur Verfügung gestellt hat, kontaktieren Sie uns bitte. Wenn wir feststellen, 
        dass wir personenbezogene Daten von Personen unter 13 Jahren ohne Überprüfung der elterlichen Zustimmung erfasst haben, 
        ergreifen wir Maßnahmen, um diese Daten von unseren Servern zu entfernen.</p>
      <p>Wenn wir uns auf die Zustimmung als Rechtsgrundlage für die Verarbeitung Ihrer Daten stützen müssen und Ihr Land die Zustimmung eines Elternteils erfordert, 
        können wir die Zustimmung Ihres Elternteils verlangen, bevor wir diese Daten erfassen und verwenden.</p>
      
      <h2>9 - Änderungen an dieser Datenschutzrichtlinie</h2>
      <p>Wir können unsere Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über alle Änderungen informieren, 
        indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen.</p>
      <p>Wir informieren Sie per E-Mail und/oder durch einen auffälligen Hinweis in unserem Service, bevor die Änderung in Kraft tritt, 
        und aktualisieren das Datum der letzten Aktualisierung" oben in dieser Datenschutzrichtlinie.</p>
      <p>Wir empfehlen Ihnen, diese Datenschutzrichtlinie regelmäßig auf Änderungen zu überprüfen. Änderungen an dieser Datenschutzrichtlinie treten in Kraft, 
        wenn sie auf dieser Seite veröffentlicht werden.</p>










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
