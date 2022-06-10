import React from 'react';
import classNames from 'classnames';

import css from './P.module.css';

export const P = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.p, className);

  return <p className={classes} {...otherProps} ref={ref} />;
});

P.displayName = 'P';
