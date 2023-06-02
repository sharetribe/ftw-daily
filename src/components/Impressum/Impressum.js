import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.module.css';

const Impressum = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}></p>

      <h3>Kontakt</h3>
      <p>
      Unternehmensname (Carlo GmbH) <br />
      Straße und Hausnummer<br />
      PLZ und Ort<br />
      E-Mail: hello@carlo.at<br />
      UID: Wenn vorhanden
      </p>
      <p></p>
      <h3>Vertretung</h3>
      <p>
      Florian Schäfer, Founder, CEO<br />
      Jan-Niklas Schäfer, Founder, CEO
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
