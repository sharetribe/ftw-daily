import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';

import css from './P.module.css';

export const P = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.p, className);

  return <p className={classes} {...otherProps} ref={ref} />;
});

P.displayName = 'P';

P.defaultProps = {
  rootClassName: null,
  className: null,
};

P.propTypes = {
  rootClassName: string,
  className: string,
  children: node.isRequired,
};
