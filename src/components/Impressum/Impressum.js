import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Impressum.css';

const Impressum = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2017</p>

      <p>
        <strong>Adresse</strong><br/>
        HorseDeal24<br/>
        Horseplanet GmbH<br/>
        Bösch 80a<br/>
        6331 Hünenberg<br/>
        <br/>
        Geschäftsführer: Benjamin Kröni<br/>
        Telefon: 044 520 05 06<br/>
        E-Mail: office@horsedeal24.com<br/>
        <br/>
        Nicht MwSt-Pflichtig<br/>
        Sitz: Kanton Zug<br/>
        <br/>
        <strong>Rechtlicher Hinweis</strong><br/>
        Im Hinblick auf die technischen Eigenschaften des Internet kann kein Gewähr für die Authentizität, 
        Richtigkeit und Vollständigkeit der im Internet zur Verfügung gestellten Informationen übernommen werden. 
        Es wird auch keine Gewähr für die Verfügbarkeit oder den Betrieb der gegenständlichen Webseite und ihrer 
        Inhalte übernommen.
        <br/>
        Jede Haftung für unmittelbare, mittelbare oder sonstige Schäden, unabhängig von deren Ursachen, die aus 
        der Benutzung oder Nichtverfügbarkeit der Daten und Informationen dieser Homepage erwachsen, wird, soweit 
        rechtlich zulässig, ausgeschlossen.
        <br/>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. 
        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten 
        ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortliche. Die verlinkten Seiten wurden zum Zeitpunkt 
        der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht 
        erkennbar.
        <br/>
        <strong>Urheberrecht</strong><br/>
        Die Betreiber dieser Webseite sind bemüht, stets die Urheberrechte anderer zu beachten bzw. auf selbst erstellte sowie 
        lizenzfreie Werke zurückzugreifen. Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Webseite unterliegen 
        dem Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung. Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. 
        Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
    </div>
  );
};

Impressum.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Impressum.propTypes = {
  rootClassName: string,
  className: string,
};

export default Impressum;
