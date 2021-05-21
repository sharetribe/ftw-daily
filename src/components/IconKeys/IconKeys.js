import React from 'react';
import PropTypes from 'prop-types';

import css from './IconKeys.module.css';

const IconKeys = props => {
  const { className } = props;
  return (
    <svg
      className={className}
      width="50px"
      height="57px"
      viewBox="0 0 50 57"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className={css.strokeMarketplaceColor} transform="translate(-538.000000, -240.000000)">
          <g transform="translate(540.000000, 242.000000)">
            <g>
              <path
                d="M25,19.65 C25,12.6626 19.4022727,7 12.5,7 C5.59772727,7 0,12.6626 0,19.65 C0,25.4391 3.84772727,30.3082 9.09090909,31.8101 L9.09090909,34.6 L6.81818182,36.8977 L9.09090909,39.2 L9.09090909,41.5 L6.81818182,43.8 L9.09090909,46.1 L9.09090909,49.55 L12.5,53 L15.9090909,49.55 L15.9090909,31.8101 C21.1522727,30.3082 25,25.4391 25,19.65 L25,19.65 Z"
                strokeWidth="2.5"
              />
              <path
                d="M16,15.5 C16,17.432 14.432,19 12.5,19 C10.568,19 9,17.432 9,15.5 C9,13.568 10.568,12 12.5,12 C14.432,12 16,13.568 16,15.5 L16,15.5 Z"
                strokeWidth="2"
              />
              <path
                d="M16,33.460821 C19.8584615,35.6660894 24.6353846,35.6843714 28.5192308,33.5362343 L31,35.7163649 L31,39.1442433 L34.4615385,39.1442433 L35.6153846,40.3440007 L35.6153846,43.7147478 L38.6546154,43.7147478 L41.1053846,46 L46,46 L46,41.15298 L33.4138462,28.6892143 C36.1138462,23.9061813 35.4192308,17.7474266 31.3138462,13.6819628 C28.42,10.8162565 24.4784615,9.62335484 20.71,10.1032578"
                strokeWidth="2.5"
              />
              <path
                d="M13,15 L13,4.61538462 C13,2.06769231 15.016,0 17.5,0 C19.984,0 22,2.06769231 22,4.61538462 L22,9.81230769"
                strokeWidth="2.5"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

IconKeys.defaultProps = { className: null };

const { string } = PropTypes;

IconKeys.propTypes = {
  className: string,
};

export default IconKeys;
