import React, { PropTypes } from 'react';
import _ from 'lodash';

import css from './Button.css';

/*
   Take list of `classes` as an array, and return a string
   separated by space, or null if the array is empty after
   compacting the array (removing null and undefined)

   Note: If this is a common pattern, this should be moved to
   utils.
 */
const concatClasses = (classes) => {
  const compactClasses = _.compact(classes);

  if (compactClasses.length) {
    return compactClasses.join(' ');
  } else {
    return null;
  }
}

/*
   Take object `obj` and remove all keys where the value is
   `null` or `undefined`
 */
const compactObject = (obj) => _.omitBy(obj, v => v == null);

const Button = props => {
  const { children, className, type, disabled, onClick } = props;

  const attrs = compactObject({
    className: concatClasses([className, css.root]),
    type,
    disabled,
    onClick,
  })

  return (
    <button {...attrs}>{children}</button>
  );
}



const { any, string, bool, func } = PropTypes;

Button.defaultProps = {
  children: null,
  className: null,
  type: null,
  disabled: null,
  onClick: null,
}

Button.propTypes = {
  children: any,
  className: string,
  type: string,
  disabled: bool,
  onClick: func,
}

export default Button;
