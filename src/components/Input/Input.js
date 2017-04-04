import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Input.css';

const Input = props => {
  const { className, inline, ...rest } = props;

  const classes = classNames(css.root, { [css.inline]: inline }, className);

  return <input className={classes} {...rest} />;
};

const { string, bool } = PropTypes;

Input.defaultProps = {
  className: null,
  inline: false,
};

Input.propTypes = {
  className: string,
  inline: bool,
};

/*
   Creates a new Input component for Redux Form Field.

   Usage:

   ```
   <Field name="password" type="password" component={Input.fieldComponent} />
   ```
*/
Input.fieldComponent = props => {
  /* eslint-disable react/prop-types */
  const { input, type } = props;
  /* eslint-enable react/prop-types */

  return <Input type={type} {...input} />;
};

export default Input;
