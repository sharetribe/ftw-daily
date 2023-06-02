import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';

import css from './Ingress.module.css';

// Ingress: a lead paragraph or an opening paragraph
//          It's usually between a headline and the article
export const Ingress = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.ingress, className);

  return <p className={classes} {...otherProps} ref={ref} />;
});

Ingress.displayName = 'Ingress';
Ingress.defaultProps = {
  rootClassName: null,
  className: null,
};

Ingress.propTypes = {
  rootClassName: string,
  className: string,
  children: node.isRequired,
};
