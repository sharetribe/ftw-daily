import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './DateInput.module.css';

const NextMonthIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootNextMonthIcon, className);

  return (
    <svg
      className={classes}
      width="9"
      height="13"
      viewBox="0 0 9 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.472 6.97c.26-.26.26-.68 0-.94L2.14.694c-.263-.26-.684-.26-.944 0-.26.26-.26.683 0 .943L6.056 6.5l-4.86 4.862c-.26.26-.26.683 0 .943.26.26.68.26.943 0L7.47 6.97z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const { string } = PropTypes;

NextMonthIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

NextMonthIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default NextMonthIcon;
