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
        regeln.<br>
        <br>
        Wichtig ist, dass diese Nutzungsvereinbarung einen Verzicht auf Sammelklagen und Gerichtsverfahren sowie eine Vereinbarung 
        zur Einreichung aller Ansprüche und Streitigkeiten bei einem verbindlichen Schiedsverfahren in Abschnitt 4 enthält. Wenn Sie
        nicht allen Bedingungen dieser Nutzungsvereinbarung zustimmen, einschliesslich jener, die Streitigkeiten in Abschnitt 4 regeln,
        dürfen Sie unsere Plattform oder Dienstleistungen nicht nutzen.
      </p>

      <h2>Dienstleistungsvereinbarung</h2>
      <p>
        Diese HorseDeal24-Dienstleistungsvereinbarung („Vereinbarung“) ist ein Vertrag zwischen der Horseplanet GmbH („HorseDeal24“ oder „wir“)
        und der/den Person(en), die bei HorseDeal24 registriert ist/sind („Benutzer“ oder „Sie“). Diese Vereinbarung beschreibt die Geschäftsbedingungen,
        die für Ihre Nutzung des HorseDeal24-Marktplatzes zum Buchen oder Auflisten von Pferden oder anderen Dienstleistungen über unsere Website oder Apps
        gelten, und legt die Verpflichtungen fest, die zwischen Ihnen und HorseDeal24 sowie zwischen Ihnen und anderen Benutzern entstehen.<br>
        <br>
        In dieser Vereinbarung bedeutet der Begriff „Dienstleistung“ die Dienstleistung, mit der Sie ein Pferd über einen bestimmten Zeitraum buchen oder
        Ihr Pferd und Ihre Dienstleistungen über unsere Website oder Apps (die „Plattform“) anderen anbieten können. Der Begriff Dienstleistung umfasst keine 
        Dienstleistungen, die von Dritten bereitgestellt werden. Die Begriffe „Reiter“ und „Pferd“ beziehen sich jeweils auf die Buchung bzw. Auflistung eines
        Pferdes auf unserem Marktplatz.<br>
        <br>
        Ein „Pferd“ ist das physische Tier, das einem Reiter zur Nutzung zu bestimmten Zeiten zur Verfügung gestellt wird und bestimmten Gebühren und
        ortsspezifischen Bedingungen, Gesetzen oder Einschränkungen unterliegt. Ein Pferdebesitzer kann ein Pferd „auflisten“, indem es bestimmte Details
        zum Pferd bereitstellt, einschliesslich Verfügbarkeit, Preisgestaltung und Nutzungsbedingungen oder -beschränkungen; dieser Beitrag über ein Pferd
        wird als „Listing“ bezeichnet.<br>
        <br>
        Ein Reiter kann ein Pferd „buchen“, indem er eine Uhrzeit, ein Datum sowie zusätzliche Dienstleistungen anfordert und einen Pferdebesitzer direkt
        über unsere Messaging-Plattform kontaktiert. Eine „Buchung“ ist keine vertragliche Vereinbarung oder rechtliche Verpflichtung einer der zwei Parteien.
        Denken Sie daran, HorseDeal24 ist keine Partei dieser Vereinbarung oder jeglicher anderen, wir sind lediglich eine Plattform, die Reitern hilft, Pferde
        zu entdecken, und den Reitern hilft, mit Pferdebesitzern zu kommunizieren. Alle im Buchungsprozess angegebenen Gebühren, einschliesslich der Listinggebühr,
        der Servicegebühren und aller anderen Gebühren (zusammen „Gesamtgebühren“), werden Ihnen vor dem Absenden einer Buchungsanfrage angezeigt. Dies sind vom Pferdebesitzer
        festgelegte Gebührenparameter. Sie müssen vom Pferdebesitzer bestätigt werden und HorseDeal24 ist keine Partei davon. Mit Ihrer Buchungsanfrage geben Sie Ihr Interesse an,
        die Gesamtgebühren für jede im Zusammenhang mit Ihrem HorseDeal24-Konto angeforderte Buchung zu zahlen. Der tatsächliche Abschluss eines Vertrags und etwaige Zahlungen zwischen
        Parteien fallen nicht in das Leistungsspektrum von HorseDeal24. HorseDeal24 erhebt oder verarbeitet keine Gebühren für Verträge zwischen Mitgliedern.
        
      </p>

      <h2>2 Sed ut perspiciatis unde</h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
        dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
        molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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
