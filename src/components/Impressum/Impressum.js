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
        HorseDeal24<br/>
        Horseplanet GmbH<br/>
        Bösch 80a<br/>
        6331 Hünenberg<br/>
    
        Geschäftsführer: Benjamin Kröni<br/>
        Telefon: 044 520 05 06<br/>
        E-Mail: office@horsedeal24.com<br/>
    
        Nicht MwSt-Pflichtig<br/>
        Sitz: Kanton Zug<br/>
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
