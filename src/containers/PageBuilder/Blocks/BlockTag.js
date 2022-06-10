import React from 'react';
import classNames from 'classnames';

import css from './BlockTag.module.css';

// This element can be used to wrap some common styles and features,
// if there are multiple blockTypes,
const BlockTag = props => {
  const { className, rootClassName, as, ...otherProps } = props;
  const Tag = as || 'div';
  const classes = classNames(rootClassName || css.root, className);

  return <Tag className={classes} {...otherProps} />;
};

export default BlockTag;
