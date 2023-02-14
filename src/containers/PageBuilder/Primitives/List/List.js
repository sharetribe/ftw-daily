import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';

import css from './List.module.css';

const defaultPropsList = {
  rootClassName: null,
  className: null,
};

const propTypesList = {
  rootClassName: string,
  className: string,
  children: node.isRequired,
};

export const Ul = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.ul, className);

  return <ul className={classes} {...otherProps} ref={ref} />;
});
Ul.displayName = 'Ul';
Ul.defaultProps = defaultPropsList;
Ul.propTypes = propTypesList;

export const Ol = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.ol, className);

  return <ol className={classes} {...otherProps} ref={ref} />;
});
Ol.displayName = 'Ol';
Ol.defaultProps = defaultPropsList;
Ol.propTypes = propTypesList;

export const Li = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.li, className);

  return <li className={classes} {...otherProps} ref={ref} />;
});
Li.displayName = 'Li';
Li.defaultProps = defaultPropsList;
Li.propTypes = propTypesList;
