import React from 'react';
import classNames from 'classnames';

import css from './SectionTag.module.css';

// This element can be used to wrap some common styles and features.
const SectionTag = props => {
  const {
    className,
    rootClassName,
    themeClass,
    as,
    children,
    backgroundImage,
    ...otherProps
  } = props;
  const Tag = as || 'section';
  const classes = classNames(rootClassName || css.root, className, {
    // If section component has own dark-theme rules that should be applied:
    [themeClass]: !!themeClass,
  });

  return (
    <Tag className={classes} {...otherProps}>
      <div className={css.backgroundImageWrapper}>{backgroundImage}</div>
      <div className={css.sectionContent}>{children}</div>
    </Tag>
  );
};

export default SectionTag;
