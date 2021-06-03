import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './FieldDateAndTimeInput.module.css';

const PreviousMonthIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootPreviousMonthIcon, className);

  return (
    <svg
      className={classes}
      width="9"
      height="13"
      viewBox="0 0 9 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.195 6.03c-.26.26-.26.68 0 .94l5.333 5.335c.262.26.683.26.943 0 .262-.26.262-.683 0-.943L2.61 6.5l4.86-4.862c.262-.26.262-.683 0-.943-.26-.26-.68-.26-.942 0L1.195 6.03z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const { string } = PropTypes;

PreviousMonthIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

PreviousMonthIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default PreviousMonthIcon;
