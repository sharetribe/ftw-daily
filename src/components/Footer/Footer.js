import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import css from './Footer.css';

const Footer = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <p>TODO: footer here</p>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
};

export default Footer;
