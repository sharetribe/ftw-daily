import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Letztes Update: 15. Mai 2020</p>

      <p>
        HorseDeal24 ist die grösste Sharing Plattform für Reiter & Pferdebesitzer, auf dem Sie als Reiter 
        Pferde über unsere Messaging-Plattform entdecken und über einen längeren Zeitraum hinweg mit einem 
        Pferdebesitzer teilen können. Wir bieten Pferdebesitzern die Möglichkeit, ihr Pferd für Reiter anzubieten 
        und dabei Kosten zu sparen. Bitte lesen Sie unsere untenstehende Dienstleistungsvereinbarung sorgfältig durch,
        bevor Sie unseren Online-Marktplatz und dessen Dienstleistungen nutzen, da diese Ihre Nutzung unserer Plattform
        regeln.<br/>
        <br/>
        Wichtig ist, dass diese Nutzungsvereinbarung einen Verzicht auf Sammelklagen und Gerichtsverfahren sowie eine Vereinbarung 
        zur Einreichung aller Ansprüche und Streitigkeiten bei einem verbindlichen Schiedsverfahren in Abschnitt 4 enthält. Wenn Sie
        nicht allen Bedingungen dieser Nutzungsvereinbarung zustimmen, einschliesslich jener, die Streitigkeiten in Abschnitt 4 regeln,
        dürfen Sie unsere Plattform oder Dienstleistungen nicht nutzen.
      </p>
      <br/>

      <h3>Dienstleistungsvereinbarung</h3>
      <p>
        Diese HorseDeal24-Dienstleistungsvereinbarung („Vereinbarung“) ist ein Vertrag zwischen der Horseplanet GmbH („HorseDeal24“ oder „wir“)
        und der/den Person(en), die bei HorseDeal24 registriert ist/sind („Benutzer“ oder „Sie“). Diese Vereinbarung beschreibt die Geschäftsbedingungen,
        die für Ihre Nutzung des HorseDeal24-Marktplatzes zum Buchen oder Auflisten von Pferden oder anderen Dienstleistungen über unsere Website oder Apps
        gelten, und legt die Verpflichtungen fest, die zwischen Ihnen und HorseDeal24 sowie zwischen Ihnen und anderen Benutzern entstehen.<br/>
        <br/>
        In dieser Vereinbarung bedeutet der Begriff „Dienstleistung“ die Dienstleistung, mit der Sie ein Pferd über einen bestimmten Zeitraum buchen oder
        Ihr Pferd und Ihre Dienstleistungen über unsere Website oder Apps (die „Plattform“) anderen anbieten können. Der Begriff Dienstleistung umfasst keine 
        Dienstleistungen, die von Dritten bereitgestellt werden. Die Begriffe „Reiter“ und „Pferd“ beziehen sich jeweils auf die Buchung bzw. Auflistung eines
        Pferdes auf unserem Marktplatz.<br/>
        <br/>
        Ein „Pferd“ ist das physische Tier, das einem Reiter zur Nutzung zu bestimmten Zeiten zur Verfügung gestellt wird und bestimmten Gebühren und
        ortsspezifischen Bedingungen, Gesetzen oder Einschränkungen unterliegt. Ein Pferdebesitzer kann ein Pferd „auflisten“, indem es bestimmte Details
        zum Pferd bereitstellt, einschliesslich Verfügbarkeit, Preisgestaltung und Nutzungsbedingungen oder -beschränkungen; dieser Beitrag über ein Pferd
        wird als „Listing“ bezeichnet.<br/>
        <br/>
        Ein Reiter kann ein Pferd „buchen“, indem er eine Uhrzeit, ein Datum sowie zusätzliche Dienstleistungen anfordert und einen Pferdebesitzer direkt
        über unsere Messaging-Plattform kontaktiert. Eine „Buchung“ ist keine vertragliche Vereinbarung oder rechtliche Verpflichtung einer der zwei Parteien.
        Denken Sie daran, HorseDeal24 ist keine Partei dieser Vereinbarung oder jeglicher anderen, wir sind lediglich eine Plattform, die Reitern hilft, Pferde
        zu entdecken, und den Reitern hilft, mit Pferdebesitzern zu kommunizieren. Alle im Buchungsprozess angegebenen Gebühren, einschliesslich der Listinggebühr,
        der Servicegebühren und aller anderen Gebühren (zusammen „Gesamtgebühren“), werden Ihnen vor dem Absenden einer Buchungsanfrage angezeigt. Dies sind vom Pferdebesitzer
        festgelegte Gebührenparameter. Sie müssen vom Pferdebesitzer bestätigt werden und HorseDeal24 ist keine Partei davon. Mit Ihrer Buchungsanfrage geben Sie Ihr Interesse an,
        die Gesamtgebühren für jede im Zusammenhang mit Ihrem HorseDeal24-Konto angeforderte Buchung zu zahlen. Der tatsächliche Abschluss eines Vertrags und etwaige Zahlungen zwischen
        Parteien fallen nicht in das Leistungsspektrum von HorseDeal24. HorseDeal24 erhebt oder verarbeitet keine Gebühren für Verträge zwischen Mitgliedern.<br/>
        <br/>
        Diese Vereinbarung ist in 5 Abschnitte unterteilt:<br/>
        <br/>
        •	Abschnitt 1: Allgemeine Geschäftsbedingungen enthält allgemeine Geschäftsbedingungen, die Ihr Konto beschreiben, einschliesslich der Erstellung eines Kontos, der Annahme
        oder Durchführung von Buchungsanfragen und der Beschreibung, wie wir mit Ihnen kommunizieren.<br/>
        <br/>
        •	Abschnitt 2: Plattform und Dienstleistung beschreibt, wie Sie die Plattform und die Dienstleistung nutzen dürfen und wie nicht, und beschreibt auch, wie wir Daten verwenden.<br/>
        <br/>
        •	Abschnitt 3: HorseDeal24-Dienstleistungen legt die Verpflichtungen von Pferdebesitzern fest, einschliesslich dem Listing eines Pferdes und der Erwartungen an ein über die
        Dienstleistung gelistetes Pferd, und die Verpflichtungen der Reiter, einschliesslich der Buchung eines Pferdes, des erwarteten Verhaltens, der Verantwortung für das Sammeln
        von Gebührenzahlungen und der Buchung anderer Dienstleistungen.<br/>
        <br/>
        •	Abschnitt 4: Kündigung, Streitigkeiten und verbindliche Schiedsverfahren beschreibt die Kündigung oder Aussetzung dieser Vereinbarung oder Ihres Kontos sowie den Prozess der
        Beilegung von Streitigkeiten. Dieser Abschnitt enthält den Verzicht auf Sammelklagen und Gerichtsverfahren sowie eine Vereinbarung, alle Ansprüche und Streitigkeiten einem verbindlichen
        Schiedsverfahren zu unterziehen. Bitte lesen Sie diesen Abschnitt sorgfältig durch, bevor Sie diese Vereinbarung akzeptieren. Sie dürfen die Plattform oder die Dienstleistungen nicht nutzen,
        wenn Sie diesem Abschnitt nicht zustimmen.<br/>
        <br/>
        •	Abschnitt 5: Zusätzliche rechtliche Bestimmungen enthält zusätzliche rechtliche Bestimmungen, einschliesslich unserer Fähigkeit, diese Vereinbarung, Haftungsausschlüsse und Haftungsbeschränkungen
        sowie einige spezifische Bestimmungen für Benutzer ausserhalb der Schweiz zu aktualisieren. Es enthält auch andere Dokumente, die Ihre Nutzung der Dienstleistungen regeln, einschliesslich unserer
        Community-Richtlinien, Gebühren, Datenschutzrichtlinien sowie Stornierungs- und Rückerstattungsrichtlinien.<br/>
        <br/>
        Wenn Sie Fragen zu dieser Vereinbarung haben, wenden Sie sich bitte an support@horsedeal24.com Durch Ihre Nutzung der Plattform oder der Dienstleistungen akzeptieren Sie diese Vereinbarung in der
        jeweils gültigen Fassung weiterhin.
      </p>
      <br/>

      <h3>Abschnitt 1: Allgemeine Geschäftsbedingungen</h3><br/>
      <h4>1.1 Dienstleistungen</h4>
      <p>
      HorseDeal24 bietet Ihnen Zugriff auf Dienstleistungen über die Plattform. Sie können über unsere Website oder Apps auf die Plattform zugreifen. Sie können die Dienstleistung verwenden,
      um Pferde aufzulisten, als Reiter Pferde zu buchen, mit anderen Benutzern zu kommunizieren und auf Ihr Konto zuzugreifen.<br/>
      <br/>
      Möglicherweise können Sie HorseDeal24-Dienstleistungen („HorseDeal24-Services“) auch über Drittanbieter oder über den Pferdebesitzer buchen, sodass Sie womöglich zusätzlichen Geschäftsbedingungen
      zustimmen müssen. Diese Dienstleistungen können Pferdepflege, Trainings oder andere Services umfassen, die in einer Reitanlage stattfinden können. Die HorseDeal24-Plattform fungiert ausschliesslich
      als Kommunikationsplattform und unterstützt weder vertragliche Vereinbarungen, Inkasso von Zahlungen noch Garantien. HorseDeal24 ist keine Partei von, hat keine Beteiligung oder kein Interesse an,
      gibt keine Zusicherungen oder Gewährleistungen in Bezug auf und übernimmt keine Verantwortung oder Haftung in Bezug auf Kommunikationen, Transaktionen, Interaktionen, Streitigkeiten oder irgendwelche
      Beziehungen zwischen Ihnen und einem anderen Mitglied, Person oder Organisation. Sie sind für Ihre Interaktionen mit anderen Mitgliedern unserer Dienstleistungen allein verantwortlich. Wir behalten 
      uns das Recht vor, sind jedoch nicht verpflichtet, die Interaktionen zwischen Ihnen und anderen Mitgliedern unserer Dienstleistungen zu überwachen.<br/>
      <br/>
      Wir verbessern die Plattform oder die Dienstleistung kontinuierlich für alle Benutzer und behalten uns das Recht vor, jederzeit Änderungen vorzunehmen. Änderungen, die wir an der Plattform oder
      der Dienstleistung vornehmen, einschlieslich der Einstellung bestimmter Funktionen, wirken sich auf alle Benutzer aus und wir versuchen, Störungen für Benutzer so gering wie möglich zu halten.
      Diese Änderungen können sich jedoch unterschiedlich auf Benutzer auswirken. Wir sind nicht verantwortlich, wenn bestimmte Änderungen, die wir an der Plattform oder der Dienstleistung vornehmen,
      sich nachteilig auf Ihre Nutzung auswirken.
      </p>
      <br/>

      <h4>1.2 Ihr Konto</h4>
      <p>
        Bevor Sie die Funktionen unserer Plattform oder unserer Dienstleistungen nutzen können, müssen Sie ein Konto bei HorseDeal24 („Konto“) erstellen und uns Informationen über sich selbst,
        Ihr Pferd oder Ihr Unternehmen zur Verfügung stellen. Wir können Sie jederzeit bitten, Ihr Konto zu aktualisieren oder zusätzliche oder andere Informationen bereitzustellen. Dies beinhaltet
        die Anforderung zusätzlicher Details zu Pferden. Alle Mitarbeiter, Auftragnehmer oder Dritten, die ein neues Konto eröffnen oder ein bestehendes Konto verwenden (zusammen „Vertreter“),
        versichern und garantieren, dass sie befugt sind, im Namen einer Person oder Organisation zu handeln, die sie behaupten zu vertreten; und wenn eine solche Autorisierung nicht von der Person
        oder Organisation bereitgestellt wird, erkennen diese Vertreter die persönliche Haftung für alle Verpflichtungen und Verbindlichkeiten an, die sich aus oder im Zusammenhang mit der Nutzung
        des Kontos durch diese Vertreter ergeben.<br/>
        <br/>
        Sie müssen eine E-Mail-Adresse und ein Passwort angeben, um Ihr Konto sicher zu halten („Anmeldeinformationen“), und sich damit einverstanden erklären, Ihre Anmeldeinformationen privat
        und sicher zu halten. Sie sind für alle Aktionen verantwortlich, die in Ihrem Konto unter Verwendung Ihrer Anmeldeinformationen ausgeführt werden, unabhängig davon, ob diese von Vertretern
        autorisiert oder ausgeführt wurden, um ein Pferd oder Dienstleistungen aufzulisten oder zu buchen. Sie sind allein verantwortlich für die Handlungen oder Mitteilungen Ihrer Vertreter.
        Wir sind nicht verantwortlich und lehnen jede Haftung für die Nutzung Ihres Kontos durch Ihre Vertreter ab.<br/>
        <br/>
        Beim Erstellen oder Verwenden Ihres Kontos müssen Sie möglicherweise Informationen über sich selbst oder Ihr Pferd angeben. Sie stellen uns nur Inhalte zur Verfügung, die Sie besitzen
        oder zu deren Bereitstellung Sie berechtigt sind, und stellen sicher, dass die Inhalte korrekt und vollständig sind. Sie müssen alle Inhalte auf dem neuesten Stand halten, einschliesslich
        Ihrer Kontakt- oder Zahlungsinformationen. Wir behalten uns das Recht vor, sind jedoch nicht verpflichtet, öffentliche und private Datenquellen zu verwenden, um die Richtigkeit von Inhalten
        zu überprüfen. Dies kann die Überprüfung Ihrer Identität oder Geschäftsinformationen oder die Überprüfung von Informationen zu Pferden umfassen. Sie werden uns zusätzliche Informationen zur
        Verfügung stellen, um die Richtigkeit oder Vollständigkeit der von Ihnen bereitgestellten Inhalte zu überprüfen und wir können Ihre Nutzung der Plattform oder der Dienstleistung von unserer Fähigkeit
        abhängig machen, die Richtigkeit und Vollständigkeit dieser Inhalte zu überprüfen. Wenn Sie uns die erforderlichen Inhalte nicht zur Verfügung stellen, wenn wir diese anfragen, können wir Ihr Konto
        sperren oder kündigen.<br/>
        <br/>
        Wenn Sie nicht mindestens 18 Jahre alt sind, dürfen Sie kein Konto eröffnen, nicht auf die Plattform zugreifen oder die Dienstleistungen nutzen. Benutzer (einschlieslich Vertreter),
        die die Dienstleistungen oder die Plattform nutzen, um Pferde, Dienstleistungen im Namen von Personen unter 18 Jahren aufzulisten oder zu buchen oder den Zugang oder die Nutzung von Pferden
        durch Personen unter 18 Jahren zu ermöglichen, übernehmen die persönliche Haftung für alle Handlungen oder Versäumnisse solcher Personen.<br/>
        <br/>
        Sie können Ihr Konto jederzeit schliessen, indem Sie uns eine E-Mail an support@horsedeal24.com senden. Sie sind für alle Aktivitäten verantwortlich, die mit Ihrem Konto verbunden sind,
        bevor es geschlossen wird, einschliesslich aller Verbindlichkeiten, die durch die Nutzung der Plattform oder der Dienstleistung verursacht werden oder daraus resultieren. Sie verstehen,
        dass wir möglicherweise Inhalte behalten und weiterhin öffentliche Inhalte (einschliesslich Bewertungen von Reitern & Pferdebesitzern) anzeigen und verwenden, die uns vor der Schliessung
        Ihres Kontos zur Verfügung gestellt wurden. Nach eigenen Ermessen können wir Ihr Konto sperren oder kündigen.
        
      </p>
      <br/>
          
      <h4>1.3 Einhaltung von Gesetzen</h4>
      <p>
        In dieser Vereinbarung bedeutet „Gesetze“ alle geltenden Bundes-, Landes-, lokalen und anderen staatlichen Gesetze, Vorschriften, Verordnungen, Kodexe, Regeln, Gerichtsbeschlüsse
        sowie alle aufgezeichneten und nicht aufgezeichneten privaten Verträge, Beschränkungen, Zusicherungen und sonstigen Vereinbarungen. Sie werden alle Gesetze einhalten, die für Ihre
        Nutzung des Pferdes, der Dienstleistungen, der Plattform und der HorseDeal24-Services gelten, sei es als Pferdebesitzer oder als Reiter. Wir stellen möglicherweise Informationen zur
        Verfügung, die Ihnen helfen, bestimmte Verpflichtungen zur Nutzung oder Listing von Pferdebesitzern zu verstehen, wir sind jedoch nicht berechtigt, Rechtsberatung zu leisten, und bieten
        diese auch nicht an. Sie sind allein für die Einhaltung der Gesetze verantwortlich und dürfen die Plattform oder die Dienstleistung nur in Übereinstimmung mit den geltenden Gesetzen nutzen.
        Wenn Sie sich nicht sicher sind, wie Sie die Gesetze einhalten sollen, sollten Sie sich bezüglich des Listings oder Buchung eines Pferdes rechtlich beraten lassen.
      </p>
      <br/>
      
          <h4>1.4 Einzug von Zahlungen, Gebühren & Steuern</h4>
      <p>
        HorseDeal24 ist eine Plattform, die ausschliesslich Reitern hilft, Pferde zu entdecken, und den Reitern hilft, mit Pferdebesitzern zu kommunizieren. Alle anfallenden Gebühren, die
        im Buchungsanforderungsprozess angegeben werden, einschliesslich der Listinggebühr, der Servicegebühren und aller anderen Gebühren (zusammen „Gesamtgebühren“), liegen in der direkten
        Verantwortung der Pferdebesitzer, die diese ausserhalb unserer Plattform direkt von den Reitern einholt.<br/>
        <br/>
        Sie sind auch allein verantwortlich für die Erhebung aller Steuern, Abgaben, Strafen und sonstigen Kosten, die von einer Steuerbehörde oder Regierungsbehörde im Zusammenhang mit
        Buchungen erhoben werden, die von unserer Plattform stammen, einschliesslich etwaiger Umsatz- oder Nutzungssteuern, indirekter Steuern wie Mehrwertsteuer (MwSt.) oder Waren- und
        Dienstleistungssteuer (GST), Nutzungsgebühren oder Genehmigungsgebühren, Abgaben und andere Steuern, die von Kommunen, Staaten oder Regierungen durch Regulierung, Verordnung, Gesetz
        oder gerichtliche oder behördliche Auslegung erhoben werden (zusammen „Steuern“).<br/>
        <br/>
        Um Zweifel auszuschliessen, liegt der Abschluss eines verbindlichen Rechtsvertrags ausserhalb des Geltungsbereichs der HorseDeal24-Services. HorseDeal24 erhebt oder verarbeitet
        keine Gebühren, Zahlungen oder Steuern im Zusammenhang mit Verträgen zwischen Mitgliedern.
      </p>
      <br/>
          
      <h4>1.5 Kommunikation und Hinweise</h4>
      <p>
        Wir können mit Ihnen kommunizieren und Ihnen Informationen oder Hinweise zu Ihrem Konto oder Ihren Transaktionen per E-Mail oder durch Nachrichten auf der Plattform zur
        Verfügung stellen. Sie werden umgehend auf alle Mitteilungen reagieren, die Sie erhalten, und verstehen, dass es sich auf Ihre Fähigkeit auswirken kann, Pferde zu buchen
        oder aufzulisten oder die Plattform oder die Dienstleistungen zu nutzen, wenn Sie dem nicht nachkommen.<br/>
        <br/>
        Möglicherweise senden wir Ihnen Benachrichtigungen an die in Ihrem Konto angegebene E-Mail-Adresse oder Anschrift über das Nachrichtensystem auf der Plattform.
        Sie können uns unter support@horsedeal24.com kontaktieren. Sie erklären sich damit einverstanden, dass jede E-Mail-Benachrichtigung von uns einen Tag nach dem
        Absenden als von Ihnen akzeptiert gilt und dieselbe rechtliche Wirkung hat, als ob sie Ihnen physisch zugestellt würde.<br/>
        <br/>
        Sie erklären sich damit einverstanden, Mitteilungen von uns zu erhalten und elektronisch mit uns zu handeln. Diese Annahme von E-Mails oder anderen elektronischen
        Nachrichten stellt Ihre Zustimmung dar und Ihre elektronische Unterschrift hat die gleiche rechtliche Wirkung wie die physische Unterzeichnung eines Dokuments.
        Sie können diese Einwilligung zur elektronischen Transaktion jederzeit widerrufen, indem Sie uns dies mitteilen. Da die elektronische Kommunikation jedoch ein
        wesentlicher Bestandteil der Plattform und der Dienstleistungen ist, können wir nach einer solchen Mitteilung Ihr Konto schliessen.<br/>
        <br/>
        Wenn Sie Probleme beim Kommunizieren von Nachrichten haben, kontaktieren Sie uns bitte zuerst unter support@horsedeal24.com.
      </p>
      <br/>
          
      <h4>1.6 Kommunikation mit anderen Benutzern</h4>
      <p>
        Über die Plattform können Sie mit anderen Benutzern kommunizieren, ohne vertrauliche persönliche Kontaktinformationen preiszugeben.
        Es liegt in Ihrer Verantwortung, die Informationen, die Sie anderen Benutzern zur Verfügung stellen, mit gutem Urteilsvermögen einzuschätzen.
        Sie dürfen die Plattform nur verwenden, um Pferde oder Dienstleistungen aufzulisten oder zu buchen, mit uns oder anderen Benutzern zu kommunizieren,
        Streitigkeiten beizulegen oder andere Funktionen zu nutzen, die wir Ihnen über die Plattform zur Verfügung stellen. Sie dürfen die Plattform nicht verwenden,
        um unerwünschte oder nicht mit einem Listing oder einer Buchung verbundene Nachrichten über die Plattform zu senden, um andere Benutzer zu belästigen oder
        andere Dienstleistungen zu vermarkten oder um Spam zu senden.<br/>
        <br/>
        Wir empfehlen dringend, dass Sie die Plattform verwenden, um mit anderen Benutzern zu kommunizieren. Wenn Sie andere Kommunikationsmittel verwenden,
        verstehen Sie, dass Sie Ihre persönlichen Kontaktinformationen möglicherweise einem Missbrauchsrisiko aussetzen. Sie verstehen auch, dass jegliche Kommunikation
        ausserhalb der Plattform Ihre Fähigkeit beeinträchtigen kann, im Falle eines Streits zwischen Ihnen und einem anderen Benutzer alle oder einige Ihnen geschuldete
        Beträge zurückzuerhalten.<br/>
        <br/>
        Wir sind nicht verantwortlich für und lehnen jegliche Haftung ab, die sich aus Verlusten oder Schäden durch die Weitergabe persönlicher oder sensibler Informationen
        an andere Benutzer oder der Kommunikation oder Interaktion mit Benutzern ausserhalb der Plattform für Sie ergibt.<br/>
        <br/>
        HorseDeal24 kann nach eigenem Ermessen und ohne vorherige Ankündigung oder Verpflichtung von Zeit zu Zeit (i) die Kommunikationen zwischen Benutzern entfernen,
        die persönliche Kontaktinformationen enthalten oder teilen, oder (ii) die Konten von Benutzern, die persönliche Kontaktinformationen teilen, sperren oder kündigen.
      </p>
      <br/>
          
      <h3>Abschnitt 2: Plattform und Dienstleistung</h3><br/>
      <h4>2.1 Eigentum, Lizenz, Einschränkungen</h4>
      <p>
        HorseDeal24 besitzt alle Rechte, Titel und Interessen an der Plattform, den Dienstleistungen und dem gesamten darin verkörperten oder enthaltenen geistigen Eigentum
        (einzeln und gemeinsam „GE“). GE umfasst alle eingetragenen oder potenziellen Patente, Urheberrechte, Marken, Geschäftsgeheimnisse und andere Eigentumsrechte.
        Über Ihr Konto gewähren wir Ihnen eine beschränkte, vorübergehende, widerrufliche, nicht übertragbare, nicht exklusive Lizenz zur Nutzung der Plattform und der
        Dienstleistung für die in dieser Vereinbarung beschriebenen Zwecke und nur so, wie sie Ihnen über die Plattform zur Verfügung gestellt werden. Diese Lizenz stellt
        keine Eigentumsübertragung dar und gewährt Ihnen keine zusätzlichen Rechte zur Nutzung des GE. Wir können Ihr Konto sperren oder schliessen und rechtliche Schritte
        gegen Sie einleiten, wenn wir der Ansicht sind oder feststellen, dass Ihre Nutzung der Plattform, der Dienstleistung oder des GE den Umfang dieser Bewilligung überschreitet;
        oder dass Sie versuchen, die Nutzung der Plattform, der Dienstleistung oder des GE durch andere zu hacken oder zu stören; oder dass Sie anderweitig den normalen Betrieb der
        Plattform oder der Dienstleistung hindern.
      </p>
      <br/>
          
      <h4>2.2 Community-Richtlinien</h4>
      <p>
        Wir haben Community-Richtlinien festgelegt, die unsere Erwartungen an alle Benutzer der Plattform festlegen. Sie werden die Community-Richtlinien überprüfen und
        einhalten, wenn Sie die Plattform oder Dienstleistungen nutzen, mit anderen Benutzern kommunizieren oder Pferde anbieten. Wenn Sie glauben, dass ein anderer Benutzer
        gegen die Community-Richtlinien verstösst, senden Sie uns bitte eine E-Mail an support@horsedeal24.com. HorseDeal24 ist nicht verpflichtet, die Einhaltung oder
        Durchsetzung der Community-Richtlinien durch Benutzer zu überwachen, und haftet nicht für Verstösse gegen die Community-Richtlinien durch Benutzer.
      </p>
      <br/>
          
     <h4>2.3 Inhalt</h4>
      <p>
        <strong>(a) Veröffentlichung von Inhalten.</strong> Sie versichern und garantieren, dass Sie berechtigt sind, Inhalte für die Plattform bereitzustellen,
        und dass von Ihnen bereitgestellte Inhalte nicht die Eigentums- oder Datenschutzrechte Dritter verletzen. Sie dürfen ohne deren ausdrückliche Genehmigung
        keine Inhalte bereitstellen, die von Dritten urheberrechtlich geschützt sind. Sie gewähren HorseDeal24 eine vollständig bezahlte, weltweite, nicht exklusive,
        unbefristete Lizenz zur Nutzung, zum Kopieren, Übertragen, Verteilen, Ändern, öffentlichen Anzeigen und Unterlizenzieren von Inhalten, die Sie uns zur Verfügung
        stellen. Diese Bewilligung beinhaltet unsere Fähigkeit, Inhalte sowohl für den internen Gebrauch (z.B. zur Analyse der Plattform oder der Dienstleistungen) als
        auch für den externen Gebrauch (z.B. für Marketing oder Online-Werbung) zu verwenden. Wenn Sie uns die oben genannte Bewilligung nicht gewähren können, stellen
        Sie uns keine Inhalte zur Verfügung. Sie erklären sich damit einverstanden, uns von Schäden oder Verlusten freizustellen, zu verteidigen und schadlos zu halten,
        die auf Ansprüchen Dritter beruhen, wonach Inhalte Eigentums- oder Datenschutzrechte verletzen.<br/>
        <br/>
        <strong>(b) Einschränkungen für bestimmte Inhalte.</strong> Sie dürfen niemals Inhalte veröffentlichen, die (i) diffamierend, obszön, profan oder pornografisch
        sind; (ii) andere Benutzer missbrauchen, belästigen oder respektlos behandeln; (iii) gegen geltende Gesetze verstossen, einschliesslich solcher, die Diskriminierung,
        falsche Werbung, Datenschutz oder rechtswidriges Marketing verbieten; (iv) täuschen oder irreführen, falsch oder ungenau sind oder die Art oder den Zustand eines Pferdes
        falsch darstellen; (v) Marketing- oder Werbeinhalte enthalten, die nicht mit den Details eines Pferdes zusammenhängen; oder (vi) sensible persönliche Informationen enthalten,
        einschliesslich Zahlungs- und Kontaktinformationen oder persönlicher Kontodaten.<br/>
        <br/>
        <strong>(c) DMCA-Mitteilungen.</strong> Wenn Sie der Meinung sind, dass veröffentlichte Inhalte Ihr Urheberrecht verletzen, benachrichtigen Sie uns bitte unter support@horsedeal24.com.
        Dieser Hinweis sollte den spezifischen Inhalt identifizieren und uns den Nachweis Ihres Eigentums am Urheberrecht oder Ihrer Berechtigung zur Durchsetzung der Rechte des Urheberrechtsinhabers
        liefern. Alle Informationen, die Sie uns zur Verfügung stellen, können an andere Benutzer, Dritte oder Strafverfolgungsbehörden weitergegeben werden, um die Behauptung eines Verstosses zu
        beurteilen oder verletzende Inhalte zu entfernen. Wir werden alle Inhalte entfernen, von denen wir feststellen, dass sie mit unseren Verpflichtungen aus dem Digital Millennium Copyright Act
        (DMCA) verstossen.
      </p>
      <br/>
      
      <h4>Datenschutz und Datennutzung</h4>
      <p>
        Unsere Datenschutzrichtlinie beschreibt das Sammeln, Verwenden, Speichern und Weitergeben persönlicher Daten. Dies schliesst persönliche Informationen ein, die in Inhalten enthalten sind,
        sowie Informationen, die durch die Nutzung der Plattform gesammelt werden. Wir können Informationen, einschliesslich persönlicher Informationen oder Inhalte, anonymisieren, pseudonymisieren
        oder aggregieren und diese Informationen für jeden Zweck verwenden, einschliesslich der Verbesserung der Plattform oder Dienstleistungen oder der Erstellung oder Verteilung von öffentlichen
        Marketingmaterialien.
      </p>
      <br/>
          
     <h3>Abschnitt 3: HorseDeal24-Services</h3><br/>
     <h4>3.1 Auflistung von Pferden - für Pferdebesitzer</h4>
      <p>
        <strong>(a) Listings.</strong> Wenn Sie ein Pferd auflisten, müssen Sie Details zum Raum angeben, einschliesslich einer Beschreibung, der Kosten einer Buchung, einer Liste der Geräte,
        aktueller Bilder und anderer Details zu den möglichen Verwendungszwecken und dem Zustand (zusammen „Beschreibung“). Während es wichtig ist, die Vorteile Ihres Pferdes zu kommunizieren,
        muss die Beschreibung korrekt sein und potenziellen Reitern ein einigermassen gutes Verständnis dafür vermitteln, wie sie das Pferd für ihre Buchung verwenden können. Die Beschreibungen
        dürfen keine zusätzlichen vertraglichen Verpflichtungen enthalten oder die gesetzlichen Verpflichtungen der Reiter gegenüber den in dieser Vereinbarung beschriebenen ändern.<br/>
        <br/> 
        <strong>(b) Kommunikation mit Reitern.</strong> Alle Pferdebesitzer müssen unsere Community-Richtlinien einhalten, wenn sie ein Pferd auflisten, eine Beschreibung bereitstellen und mit
        Reitern kommunizieren. Sie sind dafür verantwortlich, das Pferd und die Dienstleistungen so zu warten, dass Reiter sie angemessen nutzen können, wie in der Beschreibung und Buchung angegeben.
        Die Pferdebesitzer müssen in gutem Zustand sein und den Reitern in einem sicheren, sauberen und benutzbaren Zustand wie beschrieben zur Verfügung gestellt werden.<br/>
        <br/>
        <strong>(c) Verhalten und Gebühren.</strong> Als Pferdebesitzer sind Sie allein dafür verantwortlich, dass Ihr Pferd alle geltenden Gesetze einhält, einschliesslich aller lokalen Verordnungen
        in Bezug auf die Bedingung, Lizenzen oder Registrierung. Die Pferdebesitzer sind auch für die Zahlung der Steuern für alle Buchungen verantwortlich, die von unserer Plattform stammen.
        Wir können Ihre fortgesetzte Nutzung der Plattform und der Dienstleistungen davon abhängig machen, dass Sie zu unserer angemessenen Zufriedenheit jederzeit nachweisen, dass Sie die Gesetze einhalten.
      </p>
      <br/>
          
     <h4>3.2 Buchung von Pferden - für Reiter</h4>
      <p>
        <strong>(a) Buchungen.</strong> Als Reiter sollten Sie die Beschreibung und Verfügbarkeit überprüfen, um zu bestätigen, dass sie für Ihre Buchung geeignet sind. Über die Plattform können Sie
        Details bestätigen oder dem Pferdebesitzer bestimmte Fragen zu Pferd oder Dienstleistungen stellen oder Details einer Buchung bestätigen, ohne Ihre persönlichen Kontaktinformationen weiterzugeben.
        Sie sind für die Zahlung aller Gebühren und Steuern im Zusammenhang mit der Buchung ausserhalb unserer Plattform und direkt bei den Pferdebesitzern verantwortlich.<br/>
        <br/>
        Wenn Sie ein Pferd buchen, schliessen Sie auf unserer Plattform keine vertragliche Vereinbarung ab. Eine Buchung bietet Ihnen keinen Mietvertrag oder Zugang oder Nutzung des Pferdebesitzers,
        ausser dass Sie den Zugang zur Nutzung für eine bestimmte Zeit und Beschreibung anfordern.<br/> 
        <br/>
        <strong>(b) Verhalten und Gebühren.</strong> Sie werden die Community-Richtlinien und alle vereinbarten Buchungsvereinbarungen oder Verträge einhalten, die ausserhalb unserer Plattform direkt
        mit den Pferdebesitzern geschlossen wurden. Sie sind verantwortlich und übernehmen jegliche Haftung für Schäden, die während Ihrer Buchung durch Sie oder andere anwesende Personen am Pferd
        entstanden sind, ob beabsichtigt oder nicht, für Ihre Nichteinhaltung geltender Gesetze und für etwaige Bussgelder. HorseDeal24 fungiert ausschliesslich als Kommunikationsplattform und haftet
        nicht für die Handlungen von Reitern.
      </p>
      <br/>
      
     <h4>3.3 Erforderliche und zusätzliche Versicherung</h4>
      <p>
        <strong>(a) Erforderliche Versicherung.</strong> Jeder Benutzer wird alle gesetzlich vorgeschriebenen und für Sie oder Ihr Unternehmen geeigneten Versicherungen abschliessen und aufrechterhalten.
        Sie sind allein dafür verantwortlich, zu verstehen und zu bewerten, welche Versicherung zur Deckung von Schäden, Verlusten, Verletzungen, gesetzlicher Haftung und anderen Schäden geeignet
        ist, die für Sie, Ihr Unternehmen, die Teilnehmer der Buchung, Dritte, das Pferd, spezifisch sind, und zu entscheiden, welche Deckungsgrenzen gelten und welche Anbieter für Sie geeignet sind.
      </p>
      <br/>
          
     <h4>Stornierungen und Rückerstattungen</h4>
      <p>
        Auf HorseDeal24 können Pferdebesitzer ihre Stornierungsbedingungen direkt in ihrer Auflistung zu Informations- und Referenzzwecken angeben. Durch die Nutzung der HorseDeal24-Plattform
        müssen Sie alle Stornierungsbedingungen, die in einer Auflistung angegeben sind, durch Direktnachrichten oder auf andere Weise ausserhalb unserer Plattform, wie sie möglicherweise für
        eventuell getroffene Buchungsvereinbarungen gelten, mitteilen und diesen zustimmen. Da HorseDeal24 keine Gebühren oder Zahlungen über unsere Plattform verarbeitet, sind wir nicht dafür
        verantwortlich, einer Partei Rückerstattungen für geleistete oder erhaltene Zahlungen zu gewähren.<br/>
      </p>
      <br/>
          
     <h3>Abschnitt 4: Kündigung, Streitigkeiten und verbindliche Schiedsverfahren</h3><br/>
     <h4>4.1 Laufzeit, Kündigung und Bestand</h4>
      <p>
        <strong>(a) Laufzeit und Kündigung durch den Benutzer.</strong> Sie stimmen dieser Vereinbarung zu, wenn Sie zum ersten Mal auf die Plattform oder die Dienstleistungen zugreifen oder diese nutzen,
        und Ihre fortgesetzte Nutzung der Plattform und der Dienstleistungen stellt Ihre fortlaufende Zustimmung zu dieser Vereinbarung in der jeweils gültigen Fassung dar. Sie können diese
        Vereinbarung kündigen, indem Sie Ihr Konto bei uns schliessen, dadurch werden jedoch laufende Rechte oder Pflichten, die Sie oder wir möglicherweise haben, nicht sofort gekündigt. 
        Dies schliesst alle Verbindlichkeiten ein, die Sie vor der Kündigung eingegangen sind.<br/>
        <br/>
        <strong>(b) Suspendierung oder Beendigung durch HorseDeal24.</strong> Wir können Ihr Konto --einschliesslich Ihrer Fähigkeit, mit anderen Benutzern zu kommunizieren oder eine Buchung abzuschliessen
         -- jederzeit sperren oder diese Vereinbarung und Ihr Konto jederzeit kündigen, einschliesslich, ohne Einschränkung, (i) wenn wir der Ansicht sind, dass die Nutzung Ihres Kontos ein Risiko für HorseDeal24, 
        Sie, andere Benutzer oder Dritte, darstellt, (ii) bei tatsächlichem oder potenziellem Betrug durch Sie oder in Ihrem Namen, (iii) bei Nichtbeantwortung Ihrerseits auf Mitteilungen von uns oder anderen Benutzern 
        oder (iv) bei Nichtbeachtung dieser Vereinbarung oder geltendem Recht Ihrerseits.<br/>
        <br/>
        <strong>(c) Bestand.</strong> Die folgenden Bestimmungen bleiben auch nach Beendigung dieser Vereinbarung bestehen: Abschnitte 1.3 (Einhaltung von Gesetzen), 1.4 (Gebühren und Steuern), 1.5 (Kommunikation und Hinweise), 
        1.6 (Kommunikation mit anderen Benutzern), 2.1 (Eigentum, Lizenz, Einschränkungen), 2.3 (Inhalt), 2.4 (Datenschutz und Datennutzung), Abschnitt 3.1 (Verhalten und Gebühren) für Pferdebesitzer, Abschnitt 3.2(b) 
        (Verhalten und Gebühren) für Reiter, 3.3 (Erforderliche und Zusätzliche Versicherung), 3.4 (Stornierungen und Rückerstattungen), 4 (Kündigung, Streitigkeiten und verbindliche Schiedsverfahren) und Abschnitt 5
         (Zusätzliche rechtliche Bestimmungen).
      </p>
      <br/>
          
     <h4>4.2 Verbindliche Schiedsverfahren</h4>
      <p>
        In diesem Abschnitt wird beschrieben, wie Streitigkeiten oder Ansprüche aus dieser Vereinbarung zwischen Ihnen und HorseDeal24 oder zwischen Ihnen und einem anderen Benutzer (die nicht durch den in Abschnitt 
        4.3 beschriebenen Prozess beigelegt werden) beigelegt werden. Dies beinhaltet den Verzicht auf ein Gerichtsverfahren und Ihre Fähigkeit, sich anderen Klägern im Rahmen einer Sammelklage anzuschliesen. 
        Bitte lesen Sie diesen Abschnitt sorgfältig durch, bevor Sie diese Vereinbarung akzeptieren—Sie dürfen die Plattform oder die Dienstleistungen nicht nutzen, wenn Sie diesem Abschnitt nicht zustimmen.<br/>
        <br/>
        <strong>(a) Verfahren der Schiedsverfahren.</strong> Vorbehaltlich der in Abschnitt 4.2(b) angegebenen Ausschlüsse und des in Abschnitt 4.3 vorgesehenen Verfahrens werden alle Streitigkeiten, Ansprüche und Kontroversen, 
        die sich aus oder im Zusammenhang mit dieser Vereinbarung zwischen Ihnen und HorseDeal24 oder zwischen Ihnen und einem anderen Benutzer ergeben (sofern diese nicht gemäss Abschnitt 4.3 beigelegt wurden) 
        durch ein verbindliches Schiedsverfahren wie folgt gelöst:<br/>
        <br/>
        •	(i) wenn der Betrag der Streitigkeit, des Anspruchs oder der Kontroverse vernünftigerweise weniger als 25.000 Schweizer Franken beträgt, wird die Lösung online von FairClaims (www.fairclaims.com) oder 
        einem anderen Online-Schlichtungsanbieter unserer Wahl gemäss den geltenden Schiedsordnung und Verfahren verwaltet, die zum Zeitpunkt der Geltendmachung eines Anspruchs wirksam sind. Sie erklären sich 
        damit einverstanden, den elektronischen Prozessdienst per E-Mail zu erhalten, die Ihrem Konto zugeordnet ist. Wenn Sie die Beantwortung eines solchen Prozesses versäumen, sind Sie für alle mit dem 
        Vergehen verbundenen Anwalts-, Gerichts- oder sonstigen Gebühren verantwortlich. Die Partei, die den Nutzerstreitfall einreicht, ist für die Zahlung aller mit dieser Einreichung verbundenen Kosten 
        verantwortlich, einschliesslich der von HorseDeal24 getragenen Kosten. Im Rahmen des Nutzerstreitfalls können Sie auch versuchen, diese Kosten zu erstatten, wenn Sie sich durchsetzen.<br/>
        <br/>
        •	(ii) wenn der Betrag der Streitigkeit, des Anspruchs oder der Kontroverse vernünftigerweise 25.000 Schweizer Franken oder mehr beträgt, muss die Lösung vor einem einzelnen Vermittler 
        erfolgen. Dies umfasst, ist jedoch nicht beschränkt auf, gesetzliche oder gewohnheitsrechtliche Ansprüche in Bezug auf Verstösse, Durchsetzung oder Auslegung dieser Vereinbarung und 
        jeglicher Buchungsvereinbarung. Ein solches Schiedsverfahren findet in dem Landkreis statt, in der sich das gebuchte oder gelistete Pferd befindet, sofern Sie und HorseDeal24 nichts 
        anderes vereinbaren. Der Vermittler wendet das Schweizer Recht an. Um ein solches Schiedsverfahren einzuleiten, wird eine Partei eine schriftliche Aufforderung stellen, in der 
        sowohl die Grundlage des Anspruchs als auch die gewünschte Rechtshilfe angegeben sind. Jede Partei erklärt sich unwiderruflich und bedingungslos damit einverstanden, sich der 
        gerichtlichen Zustellung durch Zustellung einer Vorladung in ihrer Unternehmenszentrale, registrierten Adresse oder primären Adresse (für Einzelpersonen oder Einzelunternehmer) 
        zu bedienen. Nichts in dieser Vereinbarung berührt das Recht einer Partei, den Prozess auf eine andere gesetzlich zulässige Weise zu bedienen.<br/>
        <br/>
        Sobald ein Schiedsverfahren gemäss den oben beschriebenen Unterabschnitten (i) oder (ii) eingeleitet wurde, teilen sich die Parteien die Kosten des Schiedsverfahrens, 
        der Einrichtungen und der Referenten des Schiedsverfahrens (falls erforderlich) zu gleichen Teilen, sofern der Richter am Schiedsgericht nichts anderes bestimmt. 
        Jede Partei trägt die eigenen Anwalts- und Rechtskosten. Der Richter am Schiedsgericht kann der obsiegenden Partei die Erstattung von Kosten für Schiedsverfahren 
        oder Rechtskosten nach eigenem Ermessen zuweisen.<br/>
        <br/>
        Der Richter am Schiedsgericht kann finanzielle oder andere Rechtsmittel bereitstellen, die nach geltendem Recht verfügbar sind, die Bestimmungen dieser 
        Vereinbarung oder einer Buchungsvereinbarung jedoch nicht ändern. Der Richter am Schiedsgericht wird eine begründete Entscheidung treffen, die sich 
        mit den Einzelheiten des Rechtsstreits befasst. Die Entscheidung ist bindend und kann nicht angefochten werden. Die Parteien werden unverzüglich handeln, 
        um die Entscheidung des Richters zu respektieren, einschliesslich Zahlung der geschuldeten Beträge oder der Ergreifung erforderlicher Massnahmen.<br/>
        <br/>
        Ein Urteil über den Schiedsspruch des Richters kann bei jedem zuständigen Gericht eingereicht werden.<br/>
        <br/>
        <strong>(b) Bestimmte Ansprüche ausgeschlossen.</strong> Ungeachtet des Abschnitts 4.2(a) vereinbaren die Parteien, dass Ansprüche aufgrund 
        des Eigentums oder des Missbrauchs von geistigem Eigentum der anderen Partei—einschliesslich Patenten, Urheberrechten oder Marken—vor den 
        Landes- oder Bundesgerichten in der Schweiz geltend gemacht werden können. Jede Partei kann auch vorläufige Rechtsbehelfe für Unterlassungsansprüche 
        aufgrund solcher Ansprüche bei einem zuständigen Gericht beantragen.<br/>
        <br/>
        (c) Sammelklage und Verzicht der Jury. Jede Partei erklärt sich damit einverstanden, dass Klagen oder Ansprüche aus oder im Zusammenhang mit dieser 
        Vereinbarung oder einer Buchungsvereinbarung nur auf individueller Basis und nicht Teil einer Sammelklage oder eines konsolidierten Schiedsverfahrens 
        erhoben werden können oder Ansprüche mit anderen Benutzern oder Dritten verbinden. Ferner verzichtet jede Partei ausdrücklich auf das Recht einer Jury 
        im Schiedsverfahren und Gericht, sofern dies zulässig ist. Sie können diesen in Abschnitt 4.2(c) beschriebenen Verzicht bezüglich Sammelklage und Jury 
        verweigern, indem Sie uns innerhalb von 30 Tagen nach Ihrer ersten Nutzung der Plattform oder der Dienstleistungen eine E-Mail an support@horsedeal24.com 
        senden. Sie müssen Ihren Namen, Ihre Telefonnummer, Ihre physische Adresse und Ihre E-Mail-Adresse in Ihre Verweigerungsmitteilung beifügen. Dies ist Ihr 
        einziger Mechanismus, um diesen Abschnitt 4.2(c) zu verweigern und wenn Sie dies nicht wie beschrieben tun, stimmen Sie diesem Verzicht zu. Wenn Sie sich 
        gegen diesen Abschnitt 4.2(c) entscheiden, beachten Sie bitte, dass alle anderen Bestimmungen dieser Vereinbarung intakt und in vollem Umfang in Kraft und 
        wirksam bleiben.<br/>
        <br/>
        (d) Regelkonflikt. Sollte sich herausstellen, dass eine Bestimmung dieses Abschnitts 4.2 ungültig oder nicht durchsetzbar ist, wird das überprüfende 
        Gericht oder der Richter am Schiedsgericht die Bestimmungen gegebenenfalls nur so wenig auslegen oder überarbeiten, wie dies zur Einhaltung des Gesetzes 
        erforderlich ist. Alle anderen Bestimmungen bleiben wie geschrieben durchsetzbar und intakt.
      </p>
      <br/>
          
     <h4>Streitigkeiten zwischen Benutzern</h4>
      <p>
        In diesem Abschnitt wird beschrieben, wie Streitigkeiten oder Ansprüche aus dieser Vereinbarung zwischen Ihnen und einem anderen Benutzer beigelegt 
        werden. Bitte lesen Sie diesen Abschnitt sorgfältig durch, bevor Sie diese Vereinbarung akzeptieren—Sie dürfen die Plattform oder die Dienstleistungen 
        nicht nutzen, wenn Sie diesem Abschnitt nicht zustimmen.<br/>
        <br/>
        <strong>(a) Anfängliche Beilegung von Streitigkeiten zwischen Benutzern.</strong> Sie erklären sich damit einverstanden, zunächst zu versuchen, Streitigkeiten, 
        Unstimmigkeiten oder Ansprüche, die Sie mit anderen Benutzern haben („Nutzerstreitfall“), nach Treu und Glauben über die Plattform beizulegen. 
        Wenn Sie den Nutzerstreitfall nicht lösen können, senden Sie den Nutzerstreitfall an support@horsedeal24.com. Nach unserem alleinigen Ermessen 
        können wir (i) verlangen, dass Sie zusätzliche Details zu Nutzerstreitfällen einreichen. Wir werden die Zusammenfassung und die auf der Plattform 
        getätigten Mitteilungen überprüfen. Wir können, sind aber nicht verpflichtet, auch Mitteilungen ausserhalb der Plattform zu überprüfen. Nach 
        Überprüfung und Untersuchung werden wir entweder (a) Ihnen und dem anderen Benutzer unsere Schlussfolgerung auf der Grundlage der bereitgestellten 
        Zusammenfassung übermitteln, die Sie als endgültige und verbindliche Entscheidung mit der gleichen Kraft und Wirkung akzeptieren, als ob sie durch 
        ein Schiedsverfahren gemäss Abschnitt 4.2 bestimmt worden sei; oder (b) verlangen, dass der Streit durch ein verbindliches Schiedsverfahren beigelegt 
        wird, das von einem Dritten gemäss Abschnitt 4.2(a) entschieden wird. Die Partei, die den Nutzerstreitfall einreicht, ist für die Zahlung aller mit 
        dieser Einreichung verbundenen Kosten verantwortlich, einschliesslich der von HorseDeal24 getragenen Kosten. Im Rahmen des Nutzerstreitfalls können 
        Sie auch versuchen, diese Kosten zu erstatten, wenn Sie sich durchsetzen.<br/>
        <br/>
        <strong>(b) Nutzerstreitfälle unter 25.000 Schweizer Franken.</strong> Wenn Sie sich nach dem oben beschriebenen Verfahren auf einen Betrag von vernünftigerweise weniger 
        als 25.000 Schweizer Franken beziehen, erklären Sie sich damit einverstanden, den Nutzerstreitfall einem verbindlichen Schiedsverfahren gemäss Abschnitt 
        4.2(a)(i) zu unterziehen.<br/>
        <br/>
        <strong>(c) Nutzerstreitfälle von 25.000 Schweizer Franken oder höher.</strong> Wenn Sie sich nach dem oben beschriebenen Verfahren auf einen Betrag von vernünftigerweise 
        mindestens 25.000 Schweizer Franken beziehen, erklären Sie sich damit einverstanden, den Nutzerstreitfall einem verbindlichen Schiedsverfahren gemäss 
        Abschnitt 4.2(a)(ii) zu unterziehen.
      </p>
      <br/>
          
     <h4>4.4 Vertraulichkeit des Verfahrens</h4>
      <p>
        Alle Verfahren gemäss diesem Abschnitt 4 und ihre Ergebnisse werden von allen Parteien vertraulich behandelt. Sofern gesetzlich nicht anders vorgeschrieben, 
        werden die Parteien und die Personen, die in ihrem Namen an dem Verfahren teilnehmen, die während des Verfahrens bereitgestellten Materialien, Zeugnisse und 
        Beweise sowie die Ergebnisse dieses Verfahrens nicht offenlegen und die Vertraulichkeit wahren. Die Parteien vereinbaren, gegebenenfalls eine gesonderte 
        Vertraulichkeitsvereinbarung oder Anordnung zur Wahrung der Vertraulichkeit des Verfahrens abzuschliessen.
      </p>
      <br/>
          
     <h4>Datenschutz und Datennutzung</h4>
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
      <br/>
          
      <h3>Abschnitt 5: Zusätzliche rechtliche Bestimmungen</h3><br/>
      <h4>5.1 Recht zur Ergänzung</h4>
      <p>
        Wir können diese Vereinbarung jederzeit ergänzen oder ändern, indem wir die abgeänderte 
        Vereinbarung auf unserer Website veröffentlichen, Ihnen eine Kopie per E-Mail senden oder 
        Ihnen die Änderung auf andere Weise über die Plattform mitteilen. Ihre fortgesetzte Nutzung 
        der Plattform oder der Dienstleistungen nach Ergänzung oder Änderung dieser Vereinbarung stellt 
        Ihre Zustimmung zu der überarbeiteten Vereinbarung dar.
      </p>
      <br/>
          
      <h4>5.2 Keine Abtretung</h4>
      <p>
        Ohne unsere vorherige schriftliche Zustimmung dürfen Sie diese Vereinbarung oder Ihnen 
        gewährte Rechte, einschliesslich des Betriebs oder der Verwaltung Ihres Kontos, nicht abtreten. 
        Jeder Versuch, dies ohne unsere vorherige Zustimmung zu tun, ist nichtig. Wir können diese 
        Vereinbarung nach Benachrichtigung an Sie im Rahmen eines Verkaufs oder einer Übertragung eines 
        Teils oder unseres gesamten Geschäfts abtreten. Jede erlaubte Übertragung kommt den Rechtsnachfolgern 
        zugute und bindet sie.
      </p>
      <br/>
          
      <h4>Abschlussklauseln</h4>
      <p>
        HorseDeal24 bietet die Nachrichtenplattform und die Dienstleistung, um Pferde und Dienstleistungen 
        zu buchen und direkt mit anderen Benutzern zu kommunizieren. Wir unterstützen keine Verträge zwischen 
        Reitern und Pferdebesitzern für Buchungen oder Dienstleistungen, sammeln keine Zahlungen oder Gebühren 
        oder sind weder dafür verantwortlich noch haften wir dafür. Wir sind weder Ihnen noch Dritten gegenüber 
        für die Bereitstellung oder den Zustand von Pferden oder Dienstleistungen verantwortlich. Pferdebesitzer, 
        Reiter und Dienstleister sind unabhängige Dritte und stehen nicht in Verbindung mit HorseDeal24 und werden von 
        HorseDeal24 weder kontrolliert noch beschäftigt. Pferdebesitzer legen ihre eigenen Preise fest, nutzen ihre eigenen 
        Einrichtungen und Ressourcen und können den Nutzen von Pferden und Dienstleistungen bestimmen, wie sie für sie geeignet sind.<br/>
        <br/>
        Sie verstehen und stimmen zu, dass die Nutzung der Plattform und der Dienstleistungen auf eigenes Risiko erfolgt. HorseDeal24 ist 
        nicht für die Durchführung verantwortlich und führt keine Hintergrundüberprüfungen bei Reitern, Pferdebesitzern oder Dienstleistern 
        (einschliesslich Straf- oder Zivilkontrollen) durch; überprüft nicht den Zustand von Pferden oder stellt fest, dass sie das geltende 
        Recht einhalten, spezifische Anforderungen erfüllen oder ihrer Beschreibung entsprechen; und garantiert nicht die Leistung eines 
        Benutzers oder eines Dritten. Jegliche Informationen, die Ihnen in Bezug auf Reiter, Pferdebesitzer oder Dienstleister zur Verfügung 
        gestellt werden, werden nur für die Vermittlung ihrer Nutzung der Plattform zur Verfügung gestellt ohne jegliche Zusicherung oder Gewährleistung. 
        HorseDeal24 schliesst jegliche ausdrücklichen und stillschweigenden Zusicherungen und Gewährleistungen aus, dass jegliche auf der Plattform zur 
        Verfügung gestellten Informationen genau oder vollständig sind oder dass jegliche Reiter, Pferdebesitzer oder Dienstleister Ihnen wie in der 
        Beschreibung beschrieben zur Verfügung gestellt werden. HorseDeal24 schliesst jegliche Verantwortung und Verbindlichkeit aus, die aus Nachlässigkeit, 
        absichtlichem Fehlverhalten oder kriminellen Aktivitäten aller Benutzer oder Dritter resultiert sowie jegliche Verletzungen oder Eigentumsbeschädigungen, 
        die Ihnen, Dritten oder Eigentum durch Nutzung von Pferden und Dienstleistungen wiederfahren.<br/>
        <br/>
        Die Plattform oder die Dienstleistungen werden Ihnen „wie gesehen“ und „wie verfügbar“ ohne jegliche ausdrückliche oder stillschweigende Garantie 
        oder Gewährleistung jeglicher Art zur Verfügung gestellt, einschliesslich, jedoch nicht beschränkt auf, Gewährleistungen für die Marktgängigkeit, die Eignung 
        für einen bestimmten Zweck und die Tauglichkeit für Ihre bestimmte Verwendung, oder Nichtverletzung. Ohne das Vorstehende einzuschränken, lehnen wir ab, 
        dass die Plattform oder die Dienstleistungen frei von Fehlern oder Viren sind; dass sie niemals Schäden verursachen werden; dass sie Ihre Bedürfnisse oder 
        Anforderungen erfüllen oder dafür geeignet sind; dass sie immer verfügbar sind; oder dass sie Pferde oder Dienstleistungen genau vertreten. Wir lehnen 
        ausdrücklich jegliche Verpflichtungen zur Behebung von Fehlern ab, auch wenn wir uns diesen bewusst sind, und können uns jederzeit dafür entscheiden, 
        den Betrieb der Plattform oder Dienstleistung oder Funktionen jeglicher Art einzustellen.
      </p>
      <br/>
          
     <h4>5.4 Zusicherungen und Gewährleistungen</h4>
      <p>
        Durch die Eröffnung Ihres Kontos erklären Sie und garantieren, dass (a) Sie zur Nutzung der Plattform und Dienstleistungen berechtigt sind 
        und zur Ausführung dieser Vereinbarung befugt sind; (b) Sie nur ein Konto bei uns haben und noch kein Konto von Ihnen durch uns gekündigt 
        wurde; (c) alle uns zur Verfügung gestellten Informationen korrekt und vollständig sind; (d) Sie die Plattform oder Dienstleistungen nicht 
        unter Verstoss gegen das Gesetz oder der Community-Richtlinien verwenden werden, um Betrug zu begehen, andere Benutzer zu täuschen oder 
        für einen anderen unangemessenen Zweck; und (e) Sie berechtigt sind, uns Inhalte zur Verfügung zu stellen.<br/>
        <br/>
        Wenn Sie die Plattform oder Dienstleistungen als Pferdebesitzer nutzen, versichern Sie ferner, dass (f) Sie gemäss den geltenden Gesetzen 
        berechtigt sind, alle bereitgestellten Pferde aufzulisten; (g) Ihr Listing eines Pferdes und das Pferd selbst den geltenden Gesetzen entsprechen; 
        und (h) Sie die Nutzung der von Reitern gebuchten Pferden angemessen erleichtern und die Nutzung nicht behindern werden.<br/>
        <br/>
        Wenn Sie die Plattform oder Dienstleistungen als Reiter nutzen, versichern Sie ferner, dass (i) Sie alle Buchungsvereinbarungen einhalten werden; 
        (j) Sie Pferde oder Dienstleistungen nicht in einer Weise nutzen werden, die gegen Gesetze oder Community-Richtlinien verstösst oder die Verletzung 
        durch Dritte erleichtert; und (k) alle uns zur Verfügung gestellten Zahlungsinformationen wie in dieser Vereinbarung beschrieben verwendet werden können.
      </p>
      <br/>
          
     <h4>5.5 Schadenersatz</h4>
      <p>
        Sie halten HorseDeal24 und seine Eigentümer, Vertreter, Mitglieder, Informationsanbieter, Anwälte oder verbundenen Unternehmen 
        (zusammen „HorseDeal24-Vertragspartner“) von allen Ansprüchen, Verbindlichkeiten, Verlusten, Schäden und damit verbundenen Kosten 
        schadlos (einschlieslich angemessener Rechtskosten) (zusammen „Ansprüche“), die sich ergeben aus oder im Zusammenhang mit (a) der 
        Bereitstellung Ihres Pferdes (für Pferdebesitzer) oder Dienstleistungen (für Pferdebesitzer) oder der Nutzung von Pferden oder 
        Dienstleistungen (für Reiter); (b) Inhalten, die Sie über die Plattform bereitstellen; (c) Ihrer Nichteinhaltung von Gesetzen; 
        (d) Ihrer ungenauen oder unvollständigen Übermittlung von Informationen an uns, (e) Ihrer Verletzung einer Ihrer Verpflichtungen 
        aus dieser Vereinbarung und (f) eines Vertrags oder einer anderen Vereinbarung zwischen Ihnen und einem anderen Benutzer als über 
        die Plattform. Diese Entschädigung bleibt auch nach Beendigung dieser Vereinbarung bestehen.
      </p>
      <br/>
          
      <h4>5.6 Haftungsbeschränkungen</h4>
      <p>
        Mit Ausnahme des begrenzten Umfangs der HorseDeal24-Gebühren (wie unten festgelegt) wird HorseDeal24 oder dessen Eigentümer, 
        Vertreter, Mitglieder, Informationsanbieter, Anwälte oder Geschäftspartner unter keinen Umständen oder einer rechtlichen 
        Theorie für Sie oder Dritte haftbar sein im Falle von Schäden (ob direkt, indirekt, allgemein, kompensierend, nebensächlich, 
        folgend, speziell, strafend, beispielhaft oder anderweitig), Verletzung, Anspruch oder Haftung jeglicher Art oder basierend 
        auf oder sich ergebend aus, Ihrer Nutzung oder Nutzungsunfähigkeit der Plattform oder Dienstleistungen, oder Pferden, auch 
        wenn wir auf die Möglichkeit von Schäden hingewiesen wurden. Wenn Sie mit der Plattform oder Dienstleistungen oder den darin 
        enthaltenen Inhalten nicht zufrieden sind, besteht Ihre einzige und ausschliessliche Abhilfe darin, die Nutzung der Plattform 
        und Dienstleistungen einzustellen.<br/>
        <br/>
        Wie hierin verwendet, bedeuten „HorseDeal24-Gebühren“ den von Ihnen an HorseDeal24 gezahlten Betrag, ausschliessend Beträge, 
        die für Pferde oder Dienstleistungen bezahlt wurden oder zahlbar sind, für die Nutzung der Plattform oder Dienstleistungen.<br/>
        <br/>
        Die oben festgelegte Haftungsbeschränkung gilt in dem gesetzlich zulässigen Umfang.
      </p>
      <br/>
          
      <h4>5.7 Zusätzliche Bedingungen für Benutzer ausserhalb der Schweiz</h4>
      <p>
        Wir können die Nutzung der Dienstleistung zur Auflistung von Pferden ausserhalb der Schweiz zulassen. Wo dies zulässig ist, 
        müssen Sie sicherstellen, dass Ihre Nutzung der Dienstleistung, einschliesslich Auflistung oder Buchung, allen für Ihr Land, 
        Ihre Provinz oder Region spezifischen Gesetzen entspricht. Europäische Benutzer müssen möglicherweise Informationen bereitstellen, 
        um die Erhebung von Mehrwertsteuern oder anderen indirekten Steuern zu unterstützen, oder Nachweise für Ihre Befreiung von diesen Steuern.
      </p>
      <br/>
          
      <h4>5.8 Gesamte Vereinbarung; Auslegung</h4>
      <p>
        Diese Vereinbarung stellt zusammen mit jeder Buchungsvereinbarung die gesamte Vereinbarung zwischen Ihnen und HorseDeal24 dar, 
        die Ihre Nutzung der Plattform oder der Dienstleistungen regelt. Diese Vereinbarung ersetzt alle vorherigen Absprachen oder 
        Vereinbarungen zwischen Ihnen und HorseDeal24. Zwischen Ihnen und HorseDeal24 regelt diese Vereinbarung alle widersprüchlichen 
        Bestimmungen in einer Buchungsvereinbarung, sofern nicht ausdrücklich anders angegeben und zwischen den Parteien schriftlich vereinbart.<br/>
        <br/>
        Alle in dieser Vereinbarung beschriebenen Geldbeträge werden in Schweizer Franken angegeben, und „CHF“ bedeutet Schweizer Franken. 
      </p>
      <br/>
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
