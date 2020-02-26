import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import css from './IconEnquiry.css';

const IconEnquiry = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="32" fill="#8E2B91" />
      <path d="M31.214 19.3576H24.3582C23.8387 19.3576 23.3405 19.564 22.9731 19.9313C22.6058 20.2987 22.3994 20.7969 22.3994 21.3164V42.708C22.3994 43.2275 22.6058 43.7257 22.9731 44.0931C23.3405 44.4604 23.8387 44.6668 24.3582 44.6668H38.0698C38.5893 44.6668 39.0875 44.4604 39.4549 44.0931C39.8222 43.7257 40.0286 43.2275 40.0286 42.708V28.1722" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38.5601 17.8885C38.9497 17.4989 39.4781 17.28 40.0292 17.28C40.5802 17.28 41.1086 17.4989 41.4983 17.8885C41.8879 18.2781 42.1068 18.8066 42.1068 19.3576C42.1068 19.9086 41.8879 20.4371 41.4983 20.8267L32.194 30.131L28.2764 31.1104L29.2558 27.1928L38.5601 17.8885Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="27.75" y1="35.25" x2="34.25" y2="35.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="27.75" y1="38.75" x2="30.25" y2="38.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

IconEnquiry.defaultProps = {
  rootClassName: null,
  className: null,
};

IconEnquiry.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconEnquiry;
