import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './PasswordRecoveryPage.css';

const KeysIcon = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.keysIconRoot, className);
  return (
    <svg width="50" height="63" viewBox="0 0 50 63" xmlns="http://www.w3.org/2000/svg">
      <g
        transform="translate(-58 -55)"
        stroke="#C0392B"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M85 76.65C85 69.663 79.402 64 72.5 64S60 69.663 60 76.65c0 5.79 3.848 10.658 9.09 12.16v2.79l-2.272 2.298L69.09 96.2v2.3l-2.272 2.3 2.273 2.3v3.45L72.5 110l3.41-3.45V88.81C81.15 87.308 85 82.44 85 76.65z"
          strokeWidth="2.5"
        />
        <path
          d="M76 72.5c0 1.932-1.568 3.5-3.5 3.5S69 74.432 69 72.5s1.568-3.5 3.5-3.5 3.5 1.568 3.5 3.5z"
          strokeWidth="2"
        />
        <path
          d="M76 90.46c3.858 2.206 8.635 2.224 12.52.076l2.48 2.18v3.428h3.462l1.153 1.2v3.37h3.04l2.45 2.286H106v-4.847L93.414 85.69c2.7-4.784 2.005-10.943-2.1-15.008-2.894-2.866-6.836-4.06-10.604-3.58"
          strokeWidth="2.5"
        />
        <path
          d="M73 72V61.615C73 59.068 75.016 57 77.5 57s4.5 2.068 4.5 4.615v5.197"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
};

KeysIcon.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

KeysIcon.propTypes = {
  rootClassName: string,
  className: string,
};

export default KeysIcon;
