import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Select.css';

const Select = props => {
  const { className, children, ...rest } = props;

  const classes = classNames(css.root, className);

  return (
    <select className={classes} {...rest}>
      {children}
    </select>
  );
};

Select.defaultProps = {
  className: null,
  children: null,
};

const { string, node } = PropTypes;

Select.propTypes = {
  className: string,
  children: node,
};

export default Select;
