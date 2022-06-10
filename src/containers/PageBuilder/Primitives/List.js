import React from 'react';
import classNames from 'classnames';

import css from './List.module.css';

export const Ul = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.ul, className);

  return <ul className={classes} {...otherProps} ref={ref} />;
});
Ul.displayName = 'Ul';

export const Ol = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.ol, className);

  return <ol className={classes} {...otherProps} ref={ref} />;
});
Ol.displayName = 'Ol';

export const Li = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.li, className);

  return <li className={classes} {...otherProps} ref={ref} />;
});
Li.displayName = 'Li';
