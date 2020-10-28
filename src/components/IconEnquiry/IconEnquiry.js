import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import css from './IconEnquiry.module.css';

const IconEnquiry = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} width="47" height="46" xmlns="http://www.w3.org/2000/svg">
      <g
        className={css.marketplaceColorStroke}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M37.522 17L45 22.22v19.933C45 43.724 43.744 45 42.196 45H4.804C3.256 45 2 43.724 2 42.153V22.22L9.478 17"
          strokeWidth="2"
        />
        <path
          strokeWidth="2.5"
          d="M8 40l9.412-8h13.176L40 40M45 23l-11 8M2 23l11 8M38 27V2H10v25M15 8h4M19 13h13M15 19h17M15 24h17"
        />
      </g>
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
