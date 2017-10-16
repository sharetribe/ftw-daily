import React from 'react';
import PropTypes from 'prop-types';

const IconKeysSuccess = props => {
  const { className } = props;
  return (
    <svg className={className} width="52" height="60" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2 2)" fill="none" fillRule="evenodd">
        <path
          d="M25 19.6C25 12.6 19.4 7 12.5 7 5.5 7 0 12.7 0 19.6c0 5.8 3.8 10.7 9 12.2v2.8L7 37 9 39v2.3L7 43.8 9 46v3.5l3.5 3.5 3.4-3.5V31.8c5.2-1.5 9-6.4 9-12.2z"
          stroke="#C0392B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 15.5c0 2-1.6 3.5-3.5 3.5-2 0-3.5-1.6-3.5-3.5 0-2 1.6-3.5 3.5-3.5 2 0 3.5 1.6 3.5 3.5z"
          stroke="#C0392B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 33.5c4 2.2 8.6 2.2 12.5 0l2.5 2.2V39h3.5l1 1.3v3.4h3.2L41 46h5v-4.8L33.4 28.7c2.7-4.8 2-11-2-15-3-3-7-4-10.7-3.6"
          stroke="#C0392B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 15V4.6C13 2 15 0 17.5 0S22 2 22 4.6v5.2"
          stroke="#C0392B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle stroke="#FFF" strokeWidth="2" fill="#2ECC71" cx="35.5" cy="43.5" r="13.5" />
        <path
          stroke="#FFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M42 41l-8 8-4-4"
        />
      </g>
    </svg>
  );
};

IconKeysSuccess.defaultProps = { className: null };

const { string } = PropTypes;

IconKeysSuccess.propTypes = {
  className: string,
};

export default IconKeysSuccess;
