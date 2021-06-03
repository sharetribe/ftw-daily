import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconReviewUser.module.css';

const IconReviewUser = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <svg
      className={classes}
      width="46"
      height="47"
      viewBox="0 0 46 47"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="2.75" d="M8 45h32V2H8z" />
        <path d="M8 2H4c-1.1 0-2 .84-2 1.87v39.26C2 44.16 2.9 45 4 45h4" strokeWidth="2.5" />
        <path
          d="M26.35 24v2.77l4.822 1.34c1.005.278 1.828 1.336 1.828 2.352V36H14v-5.538c0-1.016.823-2.074 1.826-2.352l4.824-1.34V24M29 18c0 3.315-2.464 6-5.5 6-3.038 0-5.5-2.685-5.5-6 0-3.313 2.462-6 5.5-6 3.036 0 5.5 2.687 5.5 6z"
          strokeWidth="2"
        />
        <path
          d="M28.5 17.01c-.847 1-3.27.996-4.183-1.01-1.694 2-4.447 2-5.817.858M41 5h1.333C43.8 5 45 6.62 45 8.6V14h-4M41 14h4v9h-4M41 23h4v10h-4M41 33h4v5.4c0 1.98-1.2 3.6-2.667 3.6H41"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

IconReviewUser.defaultProps = { className: null, rootClassName: null };

const { string } = PropTypes;

IconReviewUser.propTypes = {
  className: string,
  rootClassName: string,
};

export default IconReviewUser;
