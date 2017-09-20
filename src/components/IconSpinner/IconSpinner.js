import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './SpinnerIcon.css';

// TODO: SVG needs to be changed so that it doesn't take 100x100 area,
// but just a little bit more than what actual spinner takes (~26px)
const SpinnerIcon = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="50" fill="none" r="10" strokeWidth="3" strokeLinecap="round">
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;180 50 50;720 50 50"
          keyTimes="0;0.5;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          calcMode="linear"
          values="6 56;46 14;6 56"
          keyTimes="0;0.5;1"
          dur="1"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

SpinnerIcon.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

SpinnerIcon.propTypes = {
  rootClassName: string,
  className: string,
};

export default SpinnerIcon;
