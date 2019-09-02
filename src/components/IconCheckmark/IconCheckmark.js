import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconCheckMark.css';

const IconCheckmark = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} viewBox="0 0 488.878 488.878" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 
			144.423,442.58 488.878,98.123 437.055,46.298 		"
      />
    </svg>
  );
};

IconCheckmark.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconCheckmark.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconCheckmark;
