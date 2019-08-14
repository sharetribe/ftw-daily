import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Faq.css';

const Faq = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2017</p>

      <h2>När jag söker på en idrott i sökfältet finns det inga resultat. Varför?</h2>
      <p>
        I dagsläget fungerar fritextsök högst upp på sidan utifrån plats. Om du vill fritextsöka finns det ett filter på söksidan för nyckelord.
      </p>

      
    </div>
  );
};

Faq.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Faq.propTypes = {
  rootClassName: string,
  className: string,
};

export default Faq;
