import React from 'react';
import classNames from 'classnames';

import css from './Heading.module.css';

// Make it possible to use styling of H1, while the actual element is `<h2>`
const Heading = props => {
  const { className, rootClassName, as, tagRef, ...otherProps } = props;
  const Tag = as || 'h2';
  const classes = classNames(rootClassName, className);

  return <Tag className={classes} ref={tagRef} {...otherProps} />;
};

export const H1 = React.forwardRef((props, ref) => {
  const { rootClassName: rootClass, as, ...otherProps } = props;
  return (
    <Heading rootClassName={rootClass || css.h1} as={as || 'h1'} tagRef={ref} {...otherProps} />
  );
});
H1.displayName = 'H1';

export const H2 = React.forwardRef((props, ref) => {
  const { rootClassName: rootClass, as, ...otherProps } = props;
  return (
    <Heading rootClassName={rootClass || css.h2} as={as || 'h2'} tagRef={ref} {...otherProps} />
  );
});
H2.displayName = 'H2';

export const H3 = React.forwardRef((props, ref) => {
  const { rootClassName: rootClass, as, ...otherProps } = props;
  return (
    <Heading rootClassName={rootClass || css.h3} as={as || 'h3'} tagRef={ref} {...otherProps} />
  );
});
H3.displayName = 'H3';

export const H4 = React.forwardRef((props, ref) => {
  const { rootClassName: rootClass, as, ...otherProps } = props;
  return (
    <Heading rootClassName={rootClass || css.h4} as={as || 'h4'} tagRef={ref} {...otherProps} />
  );
});
H4.displayName = 'H4';

export const H5 = React.forwardRef((props, ref) => {
  const { rootClassName: rootClass, as, ...otherProps } = props;
  return (
    <Heading rootClassName={rootClass || css.h5} as={as || 'h5'} tagRef={ref} {...otherProps} />
  );
});
H5.displayName = 'H5';

export const H6 = React.forwardRef((props, ref) => {
  const { rootClassName: rootClass, as, ...otherProps } = props;
  return (
    <Heading rootClassName={rootClass || css.h6} as={as || 'h6'} tagRef={ref} {...otherProps} />
  );
});
H6.displayName = 'H6';
