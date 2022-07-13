import React from 'react';
import classNames from 'classnames';

import css from './Ingress.module.css';

export const Ingress = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.ingress, className);

  return <p className={classes} {...otherProps} ref={ref} />;
});

Ingress.displayName = 'Ingress';
