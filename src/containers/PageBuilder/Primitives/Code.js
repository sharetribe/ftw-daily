import React from 'react';
import classNames from 'classnames';

import css from './Code.module.css';

/**
 * HTML element <code> represents an inline code.
 * It is marked in markdown with single backticks: some `inline code`
 */
export const Code = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.code, className);

  return <code className={classes} {...otherProps} ref={ref} />;
});
Code.displayName = 'Code';

/**
 * HTML element <pre> represents a preformatted text.
 * Codeblock in markdown is rendered with <pre> tag.
 */
export const CodeBlock = React.forwardRef((props, ref) => {
  const { className, rootClassName, ...otherProps } = props;
  const classes = classNames(rootClassName || css.codeBlock, className);

  return <pre className={classes} {...otherProps} ref={ref} />;
});
CodeBlock.displayName = 'CodeBlock';
