import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './ValidationError.css';

/**
 * This component can be used to show validation errors next to form
 * input fields. The component takes the redux-form Field component
 * `meta` object as a prop and infers if an error message should be
 * shown.
 */
const ValidationError = props => {
  const { className, fieldMeta } = props;
  const { touched, error } = fieldMeta;
  const classes = classNames(css.root, className);
  return touched && error ? <div className={classes}>{error}</div> : null;
};

ValidationError.defaultProps = { className: '' };

const { shape, bool, string } = PropTypes;

ValidationError.propTypes = {
  className: string,
  fieldMeta: shape({
    touched: bool.isRequired,
    error: string,
  }).isRequired,
};

export default ValidationError;
