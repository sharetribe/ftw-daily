import React, { PropTypes } from 'react';

const MapIcon = props => {
  const { className } = props;

  return (
    <svg
      className={className}
      width="27"
      height="27"
      viewBox="0 0 27 27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          x="-3.8%"
          y="-10.4%"
          width="107.7%"
          height="129.2%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        filter="url(#a)"
        transform="translate(-41 -12)"
        strokeWidth="1.4"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M51.667 32L46 27.952V15l5.667 4.048L57.333 15 63 19.048V32l-5.667-4.048zM51.7 19v13M57.3 28V15"
        />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

MapIcon.defaultProps = {
  className: null,
};

MapIcon.propTypes = {
  className: string,
};

export default MapIcon;
