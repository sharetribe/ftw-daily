import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconThunder.css';

const IconThunder = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M400.268,175.599c-1.399-3.004-4.412-4.932-7.731-4.932h-101.12l99.797-157.568c1.664-2.628,1.766-5.956,0.265-8.678
			C389.977,1.69,387.109,0,384.003,0H247.47c-3.234,0-6.187,1.826-7.637,4.719l-128,256c-1.323,2.637-1.178,5.777,0.375,8.294
			c1.562,2.517,4.301,4.053,7.262,4.053h87.748l-95.616,227.089c-1.63,3.883-0.179,8.388,3.413,10.59
			c1.382,0.845,2.918,1.254,4.446,1.254c2.449,0,4.864-1.05,6.537-3.029l273.067-324.267
			C401.206,182.161,401.667,178.611,400.268,175.599z"
      />
    </svg>
  );
};

IconThunder.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconThunder.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconThunder;
