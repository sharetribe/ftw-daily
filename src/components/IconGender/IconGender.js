import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconGender.css';

const IconGender = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} viewBox="0 0 68.34 68.34" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M53.52,0H35.518c-1.53,0-2.77,1.24-2.77,2.77c0,1.529,1.241,2.77,2.769,2.769h11.316L36.204,16.168
	c-6-4.149-14.311-3.559-19.649,1.779c-6.007,6.007-6.007,15.78,0,21.787c2.299,2.299,5.151,3.71,8.131,4.25v11.081h-6.213
	c-1.529,0-2.77,1.24-2.77,2.77c0,1.529,1.24,2.77,2.77,2.77h6.213v4.967c0,1.529,1.24,2.77,2.77,2.77s2.77-1.24,2.77-2.77v-4.967
	h6.213c1.529,0,2.77-1.24,2.77-2.77c0-1.529-1.24-2.77-2.77-2.77h-6.213V43.981c2.975-0.541,5.821-1.952,8.117-4.247
	c5.338-5.338,5.928-13.648,1.779-19.649L50.75,9.456v11.316c0,0.764,0.31,1.457,0.811,1.958c0.501,0.501,1.194,0.811,1.958,0.811
	c1.53,0,2.77-1.24,2.77-2.77V2.769C56.29,1.241,55.049,0,53.52,0z M34.426,35.817c-3.847,3.847-10.106,3.847-13.953,0
	s-3.847-10.106,0-13.953c3.847-3.847,10.106-3.847,13.953,0C38.273,25.711,38.273,31.97,34.426,35.817z"
      />
    </svg>
  );
};

IconGender.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconGender.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconGender;
