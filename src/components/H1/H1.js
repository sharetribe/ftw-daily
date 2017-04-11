import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './H1.css';

const H1 = props => {
  const { children, className, ...rest } = props;

  const classes = classNames(css.root, className);

  return <h1 className={classes} {...rest}>{children}</h1>;
};

const { node, string } = PropTypes;

H1.defaultProps = {
  children: null,
  className: null,
};

H1.propTypes = {
  children: node,
  className: string,
};

export default H1;
