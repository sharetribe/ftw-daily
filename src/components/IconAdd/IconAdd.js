import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconAdd.module.css';

const IconAdd = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <svg className={classes} width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.89 10.4V6.888h3.509a.889.889 0 1 0 0-1.779H6.89V1.6a.89.89 0 0 0-1.778 0v3.511h-3.51a.888.888 0 1 0 0 1.778h3.51v3.51a.889.889 0 1 0 1.778 0"
        fillRule="evenodd"
      />
    </svg>
  );
};

const { string } = PropTypes;

IconAdd.defaultProps = {
  className: null,
  rootClassName: null,
};

IconAdd.propTypes = {
  className: string,
  rootClassName: string,
};

export default IconAdd;
