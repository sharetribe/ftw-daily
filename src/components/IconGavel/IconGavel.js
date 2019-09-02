import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconGavel.css';

const IconGavel = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} viewBox="0 0 37.178 37.178" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M36.049,36.3c-0.586,0.585-1.354,0.878-2.121,0.878c-0.768,0-1.535-0.293-2.121-0.879L19.766,24.257
		c-0.885-0.884-1.1-2.182-0.649-3.269l-2.467-2.467l-3.408,3.407c0.682,1.088,0.537,2.562-0.435,3.53
		c-1.122,1.123-2.92,1.147-4.012,0.055l-7.742-7.739c-1.092-1.093-1.067-2.889,0.056-4.011c0.971-0.971,2.442-1.117,3.53-0.434
		l8.941-8.942c-0.685-1.087-0.538-2.559,0.433-3.529c1.123-1.123,2.919-1.147,4.012-0.055l7.741,7.741
		c1.093,1.092,1.068,2.888-0.055,4.011c-0.973,0.971-2.442,1.116-3.529,0.434L18.771,16.4l2.771,2.77
		c0.879-0.102,1.793,0.171,2.468,0.847l12.04,12.042C37.221,33.23,37.221,35.128,36.049,36.3z"
      />
    </svg>
  );
};

IconGavel.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconGavel.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconGavel;
