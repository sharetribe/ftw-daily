import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.module.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Zuletzt aktualisiert: Jänner 2023</p>

      <p>

      Bitte lesen Sie diese Allgemeine Geschäftsbedingungen sorgfältig durch, bevor Sie unseren Service nutzen.

      </p>

      <h2>1 - Auslegung und Definitionen</h2>
      <h3>1.1 - Auslegung</h3>
      <p>
      Die Wörter, deren Anfangsbuchstaben groß geschrieben sind, haben die unter den nachstehenden Allgemeine Geschäftsbedingungen definierte Bedeutung. 
      Die folgenden Definitionen haben dieselbe Bedeutung, unabhängig davon, ob sie im Singular oder im Plural stehen.
      </p>

      <h3>1.2 - Begriffsbestimmungen</h3>
      <p>
      Für die Zwecke der vorliegenden Allgemeine Geschäftsbedingungen:
      </p>
      <p>
        • Konto bedeutet ein einzigartiges Konto, das für Sie erstellt wurde, um auf unseren Service oder Teile davon zuzugreifen. <br />
        • Ein verbundenes Unternehmen ist ein Unternehmen, das eine Partei kontrolliert, von ihr kontrolliert wird oder mit ihr unter gemeinsamer Kontrolle steht, 
        wobei "Kontrolle" den Besitz von 50 % oder mehr der Aktien, Kapitalanteile oder anderer Wertpapiere bedeutet, die zur Wahl von Direktoren oder anderen leitenden Angestellten berechtigt sind.<br />
        • Anwendung bezeichnet das vom Unternehmen oder Betreiber bereitgestellte Softwareprogramm mit dem Namen Carlo, das Sie auf ein beliebiges elektronisches Gerät herunterladen.<br />
        • Der Begriff "Käufer" bezieht sich auf Benutzer des Dienstes, die Bestellungen für Waren aufgeben.<br />
        • Land bezieht sich auf Österreich.<br />
        • Unternehmen (in dieser Vereinbarung als "das Unternehmen", "wir", "uns" oder "unser" bezeichnet) bezieht sich auf Carlo, UNTERNEHMENSADRESSE, UNTERNEHMENS-ID.<br />
        • Inhalt bezieht sich auf Inhalte wie Text, Bilder oder andere Informationen, die von Ihnen gepostet, hochgeladen, verlinkt oder anderweitig verfügbar gemacht werden können, unabhängig von der Form dieses Inhalts.<br />
        • Gerät ist jedes Gerät, das auf den Dienst zugreifen kann, wie z. B. ein Computer, ein Mobiltelefon oder ein digitales Tablet.<br />
        • Feedback bedeutet Rückmeldungen, Innovationen oder Vorschläge, die von Ihnen in Bezug auf die Eigenschaften, die Leistung oder die Funktionen unseres Dienstes gesendet werden.<br />
        • Der Begriff "Ware" bezieht sich auf Gegenstände oder Dienstleistungen, die im Rahmen des Dienstes zum Verkauf, zur Vermietung, zur Versteigerung, zur Kontaktaufnahme oder auf andere Weise zum Handel angeboten werden.<br />
        • Betreiber (in dieser Vereinbarung entweder als "der Betreiber", "wir", "uns" oder "unser" bezeichnet) bezieht sich auf Carlo.<br />
        • Bestellung bedeutet eine Anfrage von Ihnen, Waren über die Anwendung oder die Website zu kaufen oder mit ihnen zu handeln.<br />
        • Der Begriff "Verkäufer" bezieht sich auf Nutzer des Dienstes, die Waren anbieten und sie auf beliebige Weise für den Handel verfügbar machen.<br />
        • Dienst bezieht sich auf die Anwendung oder die Website oder beides.<br />
        • Allgemeine Geschäftsbedingungen (auch als "AGB" bezeichnet) bezeichnen diese Allgemeine Geschäftsbedingungen, die die gesamte Vereinbarung zwischen Ihnen und dem Unternehmen oder Betreiber bezüglich der Nutzung des Dienstes bilden. Diese Allgemeine Geschäftsbedingungen wurden von TermsFeed erstellt und von Sharetribe abgestimmt.<br />
        • Sozialer Mediendienst eines Dritten bezeichnet alle Dienste oder Inhalte (einschließlich Daten, Informationen, Produkte oder Dienste), die von einem Dritten bereitgestellt werden und durch den Dienst angezeigt, einbezogen oder verfügbar gemacht werden können.<br />
        • Website bezieht sich auf Carlo, erreichbar über MARKTPLATZ-URL.<br />
        • Sie sind die natürliche Person, die auf den Dienst zugreift oder ihn nutzt, oder das Unternehmen oder eine andere juristische Person, in deren Namen eine solche Person auf den Dienst zugreift oder ihn nutzt, je nach Fall.<br />
      </p>

      <h2>2 - Kontakt</h2>
      <p>Wenn Sie Fragen zu diesen Allgemeine Geschäftsbedingungen haben, können Sie uns kontaktieren:</p>
      <p>• Per E-Mail: E-MAIL-ADRESSE<br />
         • Indem Sie diese Seite auf unserer Website besuchen: URL KONTAKTSEITE</p>
      
      <h2>3 - Danksagung</h2>
      <p>Dies sind die Allgemeinen Geschäftsbedingungen, die die Nutzung dieses Dienstes regeln und die Vereinbarung zwischen Ihnen und dem Unternehmen oder dem Betreiber darstellen. Diese Allgemeine Geschäftsbedingungen legen die Rechte und Pflichten 
        aller Nutzer in Bezug auf die Nutzung des Dienstes fest.</p>
      <p>Ihr Zugriff auf und Ihre Nutzung des Dienstes setzt voraus, dass Sie diese Allgemeine Geschäftsbedingungen akzeptieren und einhalten. Diese Allgemeine Geschäftsbedingungen gelten für alle Besucher, 
        Nutzer und andere, die auf den Dienst zugreifen oder ihn nutzen.</p>
      <p>Indem Sie auf den Dienst zugreifen oder ihn nutzen, erklären Sie sich mit den vorliegenden Allgemeine Geschäftsbedingungen einverstanden. Wenn Sie mit irgendeinem Teil dieser Allgemeine Geschäftsbedingungen nicht einverstanden sind, 
        dürfen Sie nicht auf den Dienst zugreifen.</p>
      <p>Sie versichern, dass Sie nach den Gesetzen Ihres Landes oder des Landes, je nachdem, was höher ist, volljährig sind. Das Unternehmen oder der 
        Betreiber erlaubt es Personen unter diesem Alter nicht, den Dienst zu nutzen.</p>
      <p>Ihr Zugang zu und Ihre Nutzung des Dienstes ist auch davon abhängig, dass Sie die Datenschutzrichtlinie des Unternehmens oder des Betreibers akzeptieren und einhalten. Unsere Datenschutzrichtlinie beschreibt unsere Richtlinien und Verfahren für die Erfassung, 
        Verwendung und Offenlegung Ihrer persönlichen Daten, wenn Sie die Anwendung oder die Website nutzen, und informiert Sie über Ihre Datenschutzrechte und darüber, wie das Gesetz Sie schützt. Bitte lesen Sie unsere Datenschutzrichtlinie sorgfältig durch, bevor Sie unseren Dienst nutzen.</p>
      
      <h2>4 - Geltendes Recht</h2>
      <p>Für diese AGB und Ihre Nutzung des Dienstes gelten die Gesetze des jeweiligen Landes, mit Ausnahme der Kollisionsnormen. Ihre Nutzung der Anwendung oder der Website kann auch anderen lokalen, 
        staatlichen, nationalen oder internationalen Gesetzen unterliegen.</p>
      <h3>4.1 - Für Benutzer aus der Europäischen Union (EU)</h3>
      <p>Wenn Sie ein Verbraucher aus der Europäischen Union sind, gelten für Sie die zwingenden Bestimmungen des Rechts des Landes, in dem Sie Ihren Wohnsitz haben.</p>
      <h3>4.2 - Einhaltung der Gesetze der Vereinigten Staaten</h3>
      <p>Sie sichern zu und gewährleisten, dass (i) Sie nicht in einem Land ansässig sind, das einem Embargo der US-Regierung unterliegt oder von der US-Regierung als "terroristenunterstützendes" Land eingestuft wurde, 
        und (ii) Sie nicht auf einer Liste der US-Regierung mit verbotenen oder eingeschränkten Parteien stehen.</p>
      <h3>4.3 - Trennbarkeit</h3>
      <p>Sollte eine Bestimmung dieser AGB für nicht durchsetzbar oder ungültig befunden werden, wird diese Bestimmung so geändert und ausgelegt, 
        dass die Ziele dieser Bestimmung so weit wie möglich unter dem anwendbaren Recht erreicht werden, und die übrigen Bestimmungen bleiben in vollem Umfang in Kraft und wirksam.</p>
      <h3>4.4 - Verzicht</h3>
      <p>Sofern hierin nichts anderes bestimmt ist, hat das Versäumnis, ein Recht auszuüben oder die Erfüllung einer Verpflichtung im Rahmen dieser AGB zu verlangen, keine Auswirkungen auf die Fähigkeit einer Partei, 
        ein solches Recht auszuüben oder eine solche Erfüllung zu einem späteren Zeitpunkt zu verlangen, 
        noch stellt der Verzicht auf einen Verstoß einen Verzicht auf einen späteren Verstoß dar.</p>
        
      <h2>5 - Benutzerkonten</h2>
      <h3>5.1 - Kontoerstellung</h3>
      <p>Wenn Sie ein Konto bei uns erstellen, müssen Sie uns Informationen zur Verfügung stellen, die jederzeit korrekt, vollständig und aktuell sind. Wenn Sie dies nicht tun, stellt dies einen Verstoß gegen die AGB dar, 
        der zur sofortigen Kündigung Ihres Kontos bei unserem Service führen kann.</p>
      <p>Sie dürfen als Benutzernamen nicht den Namen einer anderen natürlichen oder juristischen Person oder einen Namen verwenden, der nicht rechtmäßig zur Verfügung steht, einen Namen oder eine Marke, 
        der/die ohne entsprechende Genehmigung den Rechten einer anderen natürlichen oder juristischen Person als Ihnen unterliegt, oder einen Namen, der anderweitig beleidigend, vulgär oder obszön ist.</p>
      <h3>5.2 - Kontoinformationen</h3>
      <p>Sie können aufgefordert werden, bestimmte Informationen, die für Ihr Konto relevant sind, anzugeben, einschließlich, aber nicht beschränkt auf Ihren Namen, 
        Ihre E-Mail-Adresse, Ihre Telefonnummer und Ihre Adresse.</p>
      <p>Möglicherweise müssen Sie Dokumente vorlegen, um die Identitätsprüfung durchzuführen.</p>
      <p>Vor oder während des Versands von Waren können Sie aufgefordert werden, 
        unter anderem Ihre Bankverbindung und Ihre Ausweispapiere anzugeben.</p>
      <p>Vor oder während der Aufgabe einer Bestellung werden Sie unter Umständen aufgefordert, Ihre Kreditkartennummer, das Ablaufdatum Ihrer Kreditkarte, 
        Ihre Rechnungsadresse und Ihre Versandinformationen anzugeben.</p>
      <h3>5.3 - Überprüfung des Kontos</h3>
      <p>Sofern es nicht Teil einer Funktion des Dienstes ist, führen wir keine Hintergrundüberprüfungen durch und empfehlen keine Benutzer. Wir übernehmen keine Verantwortung für die Zuverlässigkeit, 
        Richtigkeit und Vollständigkeit der von den Nutzern bereitgestellten Informationen.</p>
      <h3>5.4 - Konto-Passwort</h3>
      <p>Sie sind verantwortlich für den Schutz des Passworts, das Sie für den Zugriff auf den Dienst verwenden, und für alle Aktivitäten oder Handlungen unter Ihrem Passwort, unabhängig davon, 
        ob Ihr Passwort für unseren Dienst oder einen Social-Media-Dienst eines Dritten verwendet wird.</p>
      <p>Sie verpflichten sich, Ihr Passwort nicht an Dritte weiterzugeben. Sie müssen uns sofort benachrichtigen, 
        wenn Sie von einer Verletzung der Sicherheit oder einer unbefugten Nutzung Ihres Kontos erfahren.</p>
      <h3>5.5 - Kontokündigung</h3>
      <p>Wir können Ihr Konto sofort und ohne Vorankündigung oder Haftung kündigen oder aussetzen, aus welchem Grund auch immer, einschließlich und ohne Einschränkung, wenn Sie gegen diese Allgemeine Geschäftsbedingungen verstoßen. 
        Mit der Kündigung erlischt Ihr Recht zur Nutzung des Dienstes sofort.</p>
      <p>Wenn Sie Ihr Konto auflösen möchten, können Sie einfach die Nutzung des Dienstes einstellen oder Ihr Konto aus dem Dienst löschen oder uns um Hilfe bitten.</p>

      <h2>6 - Inhalt</h2>
      <h3>6.1 - Ihr Recht, Inhalte zu veröffentlichen</h3>
      <p>Unser Dienst ermöglicht es Ihnen, Inhalte zu veröffentlichen. Sie sind für die Inhalte verantwortlich, die Sie in den Dienst einstellen, 
        einschließlich ihrer Rechtmäßigkeit, Zuverlässigkeit und Angemessenheit.</p>
      <p>Durch das Einstellen von Inhalten in den Dienst gewähren Sie uns das Recht und die Lizenz, diese Inhalte im und über den Dienst zu verwenden, zu ändern, öffentlich aufzuführen, öffentlich anzuzeigen, zu reproduzieren und zu verbreiten. 
        Sie behalten alle Ihre Rechte an allen Inhalten, die Sie im oder über den Dienst einreichen, veröffentlichen oder anzeigen, und Sie sind für den Schutz dieser Rechte verantwortlich. Sie erklären sich damit einverstanden, dass diese Lizenz uns das Recht einräumt, 
        Ihre Inhalte anderen Nutzern des Dienstes zur Verfügung zu stellen, die Ihre Inhalte ebenfalls gemäß diesen AGB nutzen können.</p>
      <p>Sie erklären und garantieren, dass: (i) der Inhalt Ihnen gehört (Sie sind Eigentümer) oder Sie das Recht haben, ihn zu nutzen und uns die in diesen AGB vorgesehenen Rechte und Lizenzen zu gewähren, und (ii) die Veröffentlichung Ihres Inhalts auf oder über 
        den Dienst nicht die Datenschutzrechte, Veröffentlichungsrechte, Urheberrechte, Vertragsrechte oder andere Rechte einer Person verletzt.</p>
      
      <h3>6.2 - Inhaltliche Beschränkungen</h3>
      <p>Das Unternehmen oder das Unternehmen oder der Betreiber ist nicht für die Inhalte der Nutzer des Dienstes verantwortlich. Sie verstehen ausdrücklich und stimmen zu, dass Sie allein für den Inhalt und für alle Aktivitäten verantwortlich sind, die unter Ihrem Konto stattfinden, 
        unabhängig davon, ob diese von Ihnen oder einer dritten Person, die Ihr Konto nutzt, durchgeführt werden.</p>
      <p>Sie dürfen keine Inhalte übermitteln, die ungesetzlich, beleidigend, anstößig, abstoßend, bedrohend, verleumderisch, diffamierend, obszön oder anderweitig anstößig sind. Beispiele für solche anstößigen Inhalte sind unter anderem die folgenden:</p>
      <p> • Rechtswidrig oder Förderung rechtswidriger Handlungen.<br />
          • Diffamierende, diskriminierende oder böswillige Inhalte, einschließlich Verweise oder Kommentare über Religion, Rasse, sexuelle Orientierung, Geschlecht, nationale/ethnische Herkunft oder andere Zielgruppen.<br />
          • Spam, maschinell oder nach dem Zufallsprinzip erzeugte, unerlaubte oder unaufgeforderte Werbung, Kettenbriefe, jede andere Form von unerlaubter Aufforderung oder jede Form von Lotterie oder Glücksspiel.<br />
          • Viren, Würmer, Malware, trojanische Pferde oder andere Inhalte zu enthalten oder zu installieren, die dazu bestimmt sind, das Funktionieren von Software, Hardware oder Telekommunikationsgeräten zu stören, 
          zu beschädigen oder einzuschränken oder Daten oder andere Informationen einer dritten Person zu beschädigen oder sich unbefugt Zugang zu ihnen zu verschaffen.<br />
          • Verletzung von Eigentumsrechten Dritter, einschließlich Patent-, Marken-, Geschäftsgeheimnis-, Urheber-, Veröffentlichungsrechten oder anderen Rechten.<br />
          • Sich als irgendeine Person oder Einrichtung auszugeben, einschließlich des Unternehmens oder des Betreibers und seiner Mitarbeiter oder Vertreter.<br />
          • Verletzung der Privatsphäre einer dritten Person.<br />
          • Falsche Informationen und Merkmale.</p>
      <p>Das Unternehmen oder der Betreiber behält sich das Recht, aber nicht die Pflicht vor, nach eigenem Ermessen zu entscheiden, ob ein Inhalt angemessen ist und mit diesen AGB übereinstimmt, diesen Inhalt abzulehnen oder zu entfernen. 
        Das Unternehmen oder der Betreiber behält sich ferner das Recht vor, Formatierungen und Bearbeitungen vorzunehmen und die Art und Weise der Inhalte zu ändern. Das Unternehmen oder der Betreiber kann auch die Nutzung des Dienstes einschränken oder widerrufen, 
        wenn Sie solche anstößigen Inhalte veröffentlichen. Da das Unternehmen oder der Betreiber nicht alle Inhalte kontrollieren kann, die von Nutzern und/oder Dritten in den Dienst eingestellt werden, erklären Sie sich damit einverstanden, den Dienst auf eigenes Risiko zu nutzen. 
        Sie sind sich darüber im Klaren, dass Sie durch die Nutzung des Dienstes Inhalten ausgesetzt sein können, die Sie als beleidigend, unanständig, unrichtig oder anstößig empfinden, und Sie erklären sich damit einverstanden, dass das Unternehmen oder der Betreiber unter keinen Umständen für Inhalte, 
        einschließlich etwaiger Fehler oder Auslassungen in Inhalten, oder für Verluste oder Schäden jeglicher Art, die durch die Nutzung von Inhalten entstehen, haftbar gemacht werden können.</p>
      
      <h3>6.3 - Backups von Inhalten</h3>
      <p>Obwohl regelmäßig Sicherungskopien der Inhalte erstellt werden, kann das Unternehmen oder der Betreiber nicht garantieren, dass es nicht zu Datenverlusten oder -beschädigungen kommt.</p>
      <p>Beschädigte oder ungültige Sicherungspunkte können unter anderem durch Inhalte verursacht werden, die vor der Sicherung beschädigt wurden oder die sich während der Durchführung einer Sicherung ändern.</p>
      <p>Das Unternehmen oder der Betreiber bieten Unterstützung an und versuchen, alle bekannten oder entdeckten Probleme zu beheben, die sich auf die Sicherungen der Inhalte auswirken können. Sie erkennen jedoch an, 
        dass das Unternehmen oder der Betreiber keine Haftung in Bezug auf die Integrität der Inhalte oder das Scheitern der erfolgreichen Wiederherstellung von Inhalten in einen nutzbaren Zustand übernimmt.</p>
      <p>Sie verpflichten sich, eine vollständige und genaue Kopie aller Inhalte an einem vom Dienst unabhängigen Ort aufzubewahren.</p>
      
      <h3>6.4 - Geistiges Eigentum anderer und Urheberrechtsverletzungen</h3>
      <p>Wir respektieren das geistige Eigentum und die Urheberrechte anderer. Sie können für Schadenersatz (einschließlich Kosten und Anwaltsgebühren) haftbar gemacht werden, wenn Sie fälschlicherweise behaupten, dass ein Inhalt Ihr Urheberrecht verletzt. 
        Es gehört zu unseren Grundsätzen, auf jede Behauptung zu reagieren, dass im Dienst veröffentlichte Inhalte das Urheberrecht oder andere geistige Eigentumsrechte einer Person verletzen.</p>
      <p>Wir sind bereit, die lokalen Vorschriften in dieser Angelegenheit einzuhalten (Digital Millennium Copyright Act (DMCA), EU-Urheberrechtsrichtlinie, ...).</p>
      <p>Wenn Sie ein Urheberrechtsinhaber oder in seinem Namen bevollmächtigt sind und glauben, dass Ihr urheberrechtlich geschütztes Werk in einer Weise kopiert wurde, die eine Urheberrechtsverletzung darstellt, die durch den Dienst erfolgt, 
        müssen Sie Ihre Mitteilung schriftlich per E-Mail zu Händen unseres Urheberrechtsvertreters einreichen (siehe 3 - Kontakt) und in Ihrer Mitteilung die folgenden Informationen in Bezug auf die angebliche Verletzung enthalten:</p>
      <p>   • Eine elektronische oder physische Unterschrift der Person, die befugt ist, im Namen des Inhabers des Urheberrechts zu handeln.<br />
            • Eine Beschreibung des urheberrechtlich geschützten Werks, das Ihrer Ansicht nach verletzt wurde, einschließlich der URL (d. h. der Adresse der Webseite) des Ortes, an dem das urheberrechtlich geschützte Werk oder eine Kopie des urheberrechtlich geschützten Werks existiert.<br />
            • Angabe der URL oder einer anderen spezifischen Stelle des Dienstes, an der sich das Material befindet, das Sie als rechtsverletzend bezeichnen.<br />
            • Ihre Adresse, Telefonnummer und E-Mail Adresse.<br />
            • Eine Erklärung von Ihnen, dass Sie in gutem Glauben davon ausgehen, dass die strittige Nutzung nicht durch den Urheberrechtsinhaber, seinen Vertreter oder das Gesetz genehmigt ist.<br />
            • Eine eidesstattliche Erklärung von Ihnen, dass die oben genannten Informationen in Ihrer Mitteilung korrekt sind und dass Sie der Urheberrechtsinhaber sind oder befugt sind, im Namen des Urheberrechtsinhabers zu handeln.</p>
      <p>Nach Erhalt einer Benachrichtigung ergreift das Unternehmen oder der Betreiber nach eigenem Ermessen die Maßnahmen, die es für angemessen hält, einschließlich der Entfernung des beanstandeten Inhalts aus dem Dienst.</p>
      
      <h2>7 - Warenbestellungen</h2>
      <p>Indem Sie eine Warenbestellung über den Service aufgeben, garantieren Sie, dass Sie rechtlich in der Lage sind, verbindliche Verträge zu schließen.</p>

      <h3>7.1 - Stellung des Dienstes in den Aufträgen</h3>
      <p>Unsere Rolle ist die eines Vermittlers zwischen Ihnen und den Verkäufern, die den Service nutzen. Wir sind daher eine dritte Partei bei Bestellungen, was unsere Haftung bei Streitigkeiten zwischen Ihnen und den Verkäufern begrenzt.</p>
      <p>Wir sind keine Partei einer Vereinbarung, die Sie mit den Verkäufern haben. Jede Vereinbarung, die Sie mit den Verkäufern eingehen, ist nicht Teil einer Vereinbarung, die wir mit Ihnen haben.</p>

      <h3>7.2 - Ihre Informationen als Käufer</h3>
      <p>Wenn Sie eine Bestellung für Waren aufgeben möchten, die im Rahmen des Dienstes verfügbar sind, werden Sie möglicherweise aufgefordert, bestimmte für Ihre Bestellung relevante Informationen anzugeben, einschließlich, aber nicht beschränkt auf Ihren Namen, 
        Ihre E-Mail-Adresse, Ihre Telefonnummer, Ihre Kreditkartennummer, das Ablaufdatum Ihrer Kreditkarte, Ihre Rechnungsadresse und Ihre Versandinformationen.</p>
      <p>Sie erklären und garantieren, dass: (i) Sie rechtlich befugt sind, Kredit- oder Debitkarten oder andere Zahlungsmittel in Verbindung mit einer Bestellung zu verwenden, und dass (ii) die von Ihnen gemachten Angaben wahrheitsgemäß, korrekt und vollständig sind.</p>
      <p>Durch die Übermittlung solcher Informationen gewähren Sie uns das Recht, die Informationen an Dritte weiterzugeben, die die Zahlung bearbeiten, um die Abwicklung Ihrer Bestellung zu erleichtern.</p>

      
      <h3>7.3 - Verfügbarkeit, Irrtümer und Ungenauigkeiten</h3>
      <p>Wir und die Verkäufer aktualisieren ständig unser Angebot an Waren im Service. Die im Service verfügbaren Waren können falsch bepreist, ungenau beschrieben oder nicht verfügbar sein, und Verkäufer und wir können Verzögerungen bei der Aktualisierung von Informationen 
        über die Waren im Service und in unserer Werbung auf anderen Websites erfahren.</p>
      <p>Wir und die Verkäufer können nicht für die Richtigkeit oder Vollständigkeit von Informationen, einschließlich Preisen, Produktbildern, Spezifikationen, Verfügbarkeit und Dienstleistungen, garantieren und tun dies auch nicht. Wir behalten uns das Recht vor, 
        Informationen zu ändern oder zu aktualisieren und Fehler, Ungenauigkeiten oder Auslassungen jederzeit und ohne vorherige Ankündigung zu korrigieren.</p>

      
      <h3>7.4 - Preispolitik</h3>
      <p>Das Unternehmen bzw. der Betreiber und der Verkäufer behalten sich das Recht vor, ihre Preise vor der Annahme einer Bestellung jederzeit zu ändern.</p>
      <p>Die angegebenen Preise können von der Gesellschaft oder dem Betreiber nach der Annahme einer Bestellung geändert werden, wenn die Lieferung durch behördliche Maßnahmen, veränderte Zölle, erhöhte Versandkosten, höhere Devisenkosten oder andere Umstände, 
        die außerhalb der Kontrolle der Gesellschaft oder des Betreibers oder des Verkäufers liegen, beeinträchtigt wird. In diesem Fall haben Sie das Recht, Ihre Bestellung zu stornieren.</p>

      <h3>7.5 - Zahlungen</h3>
      <p>Die Zahlung kann über verschiedene Zahlungsmethoden erfolgen, die uns zur Verfügung stehen. Wir verlassen uns auf Zahlungsgateways, die ihre eigenen Allgemeinen Geschäftsbedingungen und Einschränkungen haben.</p>
      <p>Zahlungskarten (Kredit- oder Debitkarten) unterliegen der Validierungsprüfung und Autorisierung durch Ihren Kartenaussteller. Wenn wir die erforderliche Autorisierung nicht erhalten, 
        haften wir nicht für eine Verzögerung oder Nichtlieferung Ihrer Bestellung.</p>

      <h3>7.6 - Gebühren für Dienstleistungen</h3>
      <p>Für das Recht, den Dienst zu nutzen, können wir Ihnen bestimmte Gebühren (und Steuern) in Rechnung stellen. Weitere Informationen darüber, wann Servicegebühren anfallen und wie sie berechnet werden, werden während Ihrer Bestellung angezeigt. 
        Wir behalten uns das Recht vor, die Servicegebühren jederzeit zu ändern.</p>

      <h3>7.7 - Änderung der Bestellung</h3>
      <p>Sie und die Verkäufer sind für alle Auftragsänderungen verantwortlich, die Sie über den Service vornehmen, und stimmen zu, alle zusätzlichen Beträge, Gebühren oder Steuern im Zusammenhang mit einer Auftragsänderung zu zahlen.</p>

      <h3>7.8 - Stornierung der Bestellung</h3>
      <h4>7.8.1 - Unser Recht auf Stornierung der Bestellung</h4>
      <p>Wir behalten uns das Recht vor, Ihre Bestellung jederzeit aus bestimmten Gründen abzulehnen oder zu stornieren, einschließlich, aber nicht beschränkt auf:</p>
      <p>   • Verfügbarkeit von Waren
            • Fehler in der Beschreibung oder den Preisen für Waren
            • Fehler in Ihrer Bestellung
            • Fehler des Verkäufers</p>
      <p>Wir behalten uns das Recht vor, Ihre Bestellung abzulehnen oder zu stornieren, 
        wenn der Verdacht auf Betrug oder eine nicht autorisierte oder illegale Transaktion oder Handel besteht.</p>

      <h4>7.8.2 - Stornierung der Bestellung durch den Käufer</h4>
      <p>Wenn Sie als Käufer eine Bestellung stornieren, wird der von Ihnen bezahlte Betrag (einschließlich der Servicegebühren) nicht zurückerstattet.</p>
      <p>Wenn Sie aufgrund von Umständen, die sich Ihrer Kontrolle entziehen, eine Bestellung stornieren müssen oder wenn Sie der Meinung sind, dass Ihre Bestellung zurückerstattet werden sollte, 
        kontaktieren Sie uns.</p>

      <h4>7.9 - Streit über die Bestellung</h4>
      <p>Wenn ein Käufer oder ein Verkäufer eine Bestellung bestreitet, sollte das Unternehmen oder der Betreiber benachrichtigt werden. Der Streitfall wird nach unserem alleinigen Ermessen gelöst.</p>
      
      
      <h2>8 - Gewährleistungsausschluss und Haftungsbeschränkung</h2>
      <h3>8.1 - Haftungsbeschränkung</h3>
      <p>Ungeachtet etwaiger Schäden, die Ihnen entstehen könnten, ist die gesamte Haftung des Unternehmens oder des Betreibers und seiner Zulieferer gemäß den Bestimmungen dieser AGB und Ihr 
        ausschließlicher Rechtsbehelf in Bezug auf alle vorgenannten Punkte auf den Betrag beschränkt, den Sie tatsächlich über den Dienst bezahlt haben, oder auf 100 USD (oder den entsprechenden Gegenwert in der Landeswährung des Dienstes), wenn Sie nichts über den Dienst gekauft haben.</p>
      <p>Soweit dies nach geltendem Recht zulässig ist, haften das Unternehmen oder der Betreiber oder seine Zulieferer in keinem Fall für besondere, zufällige, 
        indirekte oder Folgeschäden (einschließlich, aber nicht beschränkt auf Schäden durch entgangenen Gewinn, Verlust von Daten oder anderen Informationen, Geschäftsunterbrechung, Personenschäden, 
        Verlust der Privatsphäre, die sich aus der Nutzung oder der Unmöglichkeit der Nutzung des Dienstes, der Software Dritter und/oder der Hardware Dritter, die mit dem Dienst verwendet wird, oder anderweitig 
        in Verbindung mit einer Bestimmung dieser AGB ergeben oder in irgendeiner Weise damit zusammenhängen), selbst wenn das Unternehmen oder der Betreiber oder ein Lieferant auf die Möglichkeit solcher Schäden hingewiesen wurde und selbst wenn die Abhilfe ihren wesentlichen Zweck verfehlt.</p>
      <p>In einigen Gerichtsbarkeiten ist der Ausschluss stillschweigender Garantien oder die Beschränkung der Haftung für Neben- oder Folgeschäden nicht zulässig, was bedeutet, dass einige der oben genannten Beschränkungen möglicherweise nicht gelten. 
        In diesen Gerichtsbarkeiten ist die Haftung jeder Partei auf den größtmöglichen gesetzlich zulässigen Umfang beschränkt.</p>

      <h3>8.2 - "AS IS" und "AS AVAILABLE" Haftungsausschluss</h3>
      <p>Der Dienst wird Ihnen "WIE BESEHEN" und "WIE VERFÜGBAR" und mit allen Fehlern und Mängeln ohne jegliche Garantie zur Verfügung gestellt. Im größtmöglichen nach geltendem Recht zulässigen 
        Umfang lehnt das Unternehmen oder der Betreiber in seinem eigenen Namen und im Namen seiner verbundenen Unternehmen und seiner und ihrer jeweiligen Lizenzgeber und Dienstleistungsanbieter 
        ausdrücklich alle ausdrücklichen, stillschweigenden, gesetzlichen oder sonstigen Gewährleistungen in Bezug auf den Dienst ab, einschließlich aller stillschweigenden Gewährleistungen der Marktgängigkeit, 
        der Eignung für einen bestimmten Zweck, des Eigentumsrechts und der Nichtverletzung von Rechten sowie Gewährleistungen, die sich aus dem Handelsverlauf, der Leistung, der Nutzung oder der Handelspraxis ergeben können. 
        Ohne Einschränkung des Vorstehenden übernimmt das Unternehmen oder der Betreiber keine Garantie oder Verpflichtung und gibt keine Zusicherung irgendeiner Art, dass der Dienst Ihren Anforderungen entspricht, die beabsichtigten Ergebnisse erzielt, 
        mit anderer Software, Anwendungen, Systemen oder Diensten kompatibel ist oder zusammenarbeitet, ohne Unterbrechung funktioniert, Leistungs- oder Zuverlässigkeitsstandards erfüllt oder fehlerfrei ist oder dass Fehler oder Defekte korrigiert werden können oder werden.</p>
      <p>Ohne das Vorstehende einzuschränken, geben weder das Unternehmen noch der Betreiber noch einer der Anbieter des Unternehmens eine ausdrückliche oder stillschweigende Zusicherung oder Gewährleistung jeglicher Art: (i) in Bezug auf den Betrieb oder die Verfügbarkeit des Dienstes 
        oder der darin enthaltenen Informationen, Inhalte und Materialien oder Produkte; (ii) dass der Dienst ununterbrochen oder fehlerfrei ist; (iii) in Bezug auf die Genauigkeit, Zuverlässigkeit oder Aktualität von Informationen oder Inhalten, die über den Dienst bereitgestellt werden; 
        oder (iv) dass der Dienst, seine Server, der Inhalt oder E-Mails, die von oder im Namen des Unternehmens oder des Betreibers gesendet werden, frei von Viren, Skripten, Trojanern, Würmern, Malware, Zeitbomben oder anderen schädlichen Komponenten sind.</p>
      <p>Einige Gerichtsbarkeiten lassen den Ausschluss bestimmter Arten von Garantien oder Einschränkungen der anwendbaren gesetzlichen Rechte eines Verbrauchers nicht zu, so dass einige oder alle der oben genannten Ausschlüsse und Einschränkungen möglicherweise nicht auf Sie zutreffen. 
        In einem solchen Fall werden die in diesem Abschnitt dargelegten Ausschlüsse und Beschränkungen jedoch im größtmöglichen Umfang angewendet, der nach geltendem Recht durchsetzbar ist.</p>
      <p></p>

      <h3>8.3 - Links zu anderen Websites</h3>
      <p>Unser Service kann Links zu Websites oder Diensten Dritter enthalten, die sich nicht im Besitz oder unter der Kontrolle des Unternehmens oder des Betreibers befinden.</p>
      <p>Das Unternehmen oder der Betreiber hat keine Kontrolle über den Inhalt, die Datenschutzrichtlinien oder die Praktiken von Websites oder Diensten Dritter und übernimmt keine Verantwortung dafür. Sie erkennen ferner an und erklären sich damit einverstanden, 
        dass das Unternehmen oder der Betreiber weder direkt noch indirekt für Schäden oder Verluste verantwortlich oder haftbar ist, die durch oder in Verbindung mit der Nutzung von oder dem Vertrauen auf solche Inhalte, Waren oder Dienste, die auf oder über solche Websites oder Dienste verfügbar sind, 
        verursacht wurden oder angeblich verursacht wurden.</p>
      <p>Wir empfehlen Ihnen dringend, die Allgemeinen Geschäftsbedingungen und Datenschutzrichtlinien der von Ihnen besuchten Websites oder Dienste Dritter zu lesen.</p>

      <h3>8.4 - Übersetzung Dolmetschen</h3>
      <p>Diese Allgemeinen Geschäftsbedingungen können übersetzt worden sein, wenn wir sie Ihnen in unserem Dienst zur Verfügung gestellt haben. Sie erklären sich damit einverstanden, dass im Falle eines Rechtsstreits der englische Originaltext maßgebend ist.</p>
      
      <h2>9 - Beilegung von Streitigkeiten über den Dienst</h2>
      <p>Sollten Sie Bedenken oder Streitigkeiten bezüglich des Dienstes haben, erklären Sie sich damit einverstanden, zunächst zu versuchen, die Streitigkeit informell zu lösen, indem Sie sich an das Unternehmen oder den Betreiber wenden.</p>
     
      <h2>10 - Geistiges Eigentum des Dienstes</h2> 
      <p>Der Dienst und seine ursprünglichen Inhalte (mit Ausnahme der von Ihnen oder anderen Nutzern bereitgestellten Inhalte), Merkmale und Funktionen sind und bleiben das ausschließliche Eigentum des Unternehmens oder des Betreibers und seiner Lizenzgeber.</p>
      <p>Der Dienst ist durch Urheberrecht, Markenrecht und andere Gesetze des Landes und anderer Länder geschützt.</p>
      <p>Unsere Warenzeichen und Aufmachungen dürfen ohne die vorherige schriftliche Zustimmung des Unternehmens oder des Betreibers nicht in Verbindung mit einem Produkt oder einer Dienstleistung verwendet werden.</p>

      <h2>11 - Ihr Feedback an uns</h2>
      <p>Sie übertragen dem Unternehmen oder dem Betreiber alle Rechte, Titel und Interessen an den von Ihnen bereitgestellten Rückmeldungen. Sollte eine solche Abtretung aus irgendeinem Grund unwirksam sein, erklären Sie sich damit einverstanden, dem Unternehmen oder dem Betreiber ein nicht ausschließliches, 
        unbefristetes, unwiderrufliches, gebührenfreies, weltweites Recht und eine Lizenz zur uneingeschränkten Nutzung, Vervielfältigung, Offenlegung, Unterlizenzierung, Verbreitung, Änderung und Verwertung solcher Rückmeldungen zu gewähren.</p>
      
      <h2>12 - Änderungen an diesen Servicebedingungen</h2>
      <p>Wir behalten uns das Recht vor, diese AGB jederzeit nach unserem alleinigen Ermessen zu ändern oder zu ersetzen. Wenn eine Änderung wesentlich ist, werden wir uns angemessen bemühen, Sie mindestens 30 Tage vor Inkrafttreten der neuen AGB zu informieren. 
        Was eine wesentliche Änderung darstellt, wird nach unserem alleinigen Ermessen bestimmt.</p>
      <p>Indem Sie nach Inkrafttreten dieser Änderungen weiterhin auf unseren Dienst zugreifen oder ihn nutzen, erklären Sie sich damit einverstanden, an die überarbeiteten AGB gebunden zu sein. Wenn Sie mit den neuen AGB ganz oder teilweise nicht einverstanden sind, 
        beenden Sie bitte die Nutzung der Anwendung oder der Website und des Dienstes.</p>
     



    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
