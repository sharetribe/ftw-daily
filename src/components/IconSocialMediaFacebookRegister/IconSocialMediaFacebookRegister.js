import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaFacebookRegister.css';

const IconSocialMediaFacebookRegister = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg height="50pt" viewBox="0 0 512 512.00038" width="50pt" xmlns="http://www.w3.org/2000/svg">

      <path
        d="m420.421875 503.234375c-109.503906 11.6875-219.339844 11.6875-328.84375 0-43.664063-4.660156-78.152344-39.148437-82.8125-82.816406-11.6875-109.503907-11.6875-219.335938 0-328.839844 4.660156-43.664063 39.148437-78.152344 82.8125-82.8125 109.503906-11.6875 219.335937-11.6875 328.839844 0 43.667969 4.660156 78.15625 39.148437 82.816406 82.8125 11.6875 109.503906 11.6875 219.335937 0 328.839844-4.660156 43.667969-39.144531 78.15625-82.8125 82.816406zm0 0"
        fill="#fff"/>
      <path
        d="m263.445312 511.976562c29.832032-.144531 59.660157-1.15625 89.476563-3.03125v-207.871093h59.367187l7.171876-74.699219h-66.539063v-47.433594c0-10.476562 8.492187-18.96875 18.96875-18.96875h47.570313v-74.703125h-75.246094c-44.609375 0-80.769532 36.164063-80.769532 80.773438v60.332031h-43.46875v74.699219h43.46875zm0 0"
        fill="#3b5998"/>
    </svg>
  );
};

IconSocialMediaFacebookRegister.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaFacebookRegister.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaFacebookRegister;
