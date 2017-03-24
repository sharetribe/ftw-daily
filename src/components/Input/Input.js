import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Input.css';

const Input = props => {
  const { className, ...rest } = props;

  const classes = classNames(css.root, className);

  return <input className={classes} {...rest} />;
};

const { string } = PropTypes;

Input.defaultProps = {
  className: null,
};

Input.propTypes = {
  className: string,
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
