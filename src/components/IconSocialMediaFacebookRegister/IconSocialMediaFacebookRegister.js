import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaFacebookRegister.css';

const IconSocialMediaFacebookRegister = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg height="50pt" viewBox="0 0 512 512.00038" width="50pt" xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="169.9940010834" x2="299.4934135904" y1="71.98622701"
                      y2="349.0548448864">
        <stop offset="0" stopColor="#3457a0"/>
        <stop offset="1" stopColor="#3b5998"/>
      </linearGradient>
      <linearGradient id="b">
        <stop offset="0" stopColor="#3457a0" stopOpacity="0"/>
        <stop offset="1" stopColor="#1f3f77"/>
      </linearGradient>
      <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="353.1235291836" x2="-94.4479886224"
                      y1="322.733315145" y2="15.2083139858"/>
      <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="256.0003" x2="256.0003" y1="427.8731626752"
                      y2="497.1566308768"/>
      <linearGradient id="e" gradientUnits="userSpaceOnUse" x1="587.7778480508" x2="232.4072294702" y1="422.8294585472"
                      y2="243.6384168452">
        <stop offset="0" stopColor="#3457a0" stopOpacity="0"/>
        <stop offset=".3251" stopColor="#2a4c8d" stopOpacity=".32549"/>
        <stop offset=".7045" stopColor="#22427d" stopOpacity=".705882"/>
        <stop offset="1" stopColor="#1f3f77"/>
      </linearGradient>
      <path
        d="m420.421875 503.234375c-109.503906 11.6875-219.339844 11.6875-328.84375 0-43.664063-4.660156-78.152344-39.148437-82.8125-82.816406-11.6875-109.503907-11.6875-219.335938 0-328.839844 4.660156-43.664063 39.148437-78.152344 82.8125-82.8125 109.503906-11.6875 219.335937-11.6875 328.839844 0 43.667969 4.660156 78.15625 39.148437 82.816406 82.8125 11.6875 109.503906 11.6875 219.335937 0 328.839844-4.660156 43.667969-39.144531 78.15625-82.8125 82.816406zm0 0"
        fill="url(#a)"/>
      <path
        d="m475.386719 110.097656c-4.132813-38.746094-34.734375-69.351562-73.484375-73.488281-97.171875-10.367187-194.632813-10.367187-291.804688 0-38.746094 4.136719-69.351562 34.742187-73.488281 73.488281-10.367187 97.171875-10.367187 194.632813 0 291.800782 4.136719 38.75 34.742187 69.355468 73.488281 73.488281 97.171875 10.371093 194.632813 10.371093 291.800782 0 38.75-4.132813 69.355468-34.738281 73.488281-73.488281 10.371093-97.167969 10.371093-194.628907 0-291.800782zm0 0"
        fill="url(#c)"/>
      <path
        d="m7.671875 409.804688c.351563 3.539062.714844 7.078124 1.09375 10.617187 4.660156 43.664063 39.148437 78.152344 82.816406 82.8125 109.503907 11.6875 219.335938 11.6875 328.839844 0 43.667969-4.660156 78.152344-39.148437 82.8125-82.8125.378906-3.539063.742187-7.078125 1.097656-10.617187zm0 0"
        fill="url(#d)"/>
      <path
        d="m344.214844 85.269531c-44.609375 0-80.769532 36.164063-80.769532 80.773438v60.332031h-43.46875v74.699219l43.46875 38.933593v171.96875c52.351563-.253906 104.699219-3.164062 156.976563-8.742187 43.667969-4.660156 78.152344-39.148437 82.8125-82.816406 8.695313-81.476563 10.917969-163.132813 6.671875-244.703125l-90.445312-90.445313zm0 0"
        fill="url(#e)"/>
      <path
        d="m263.445312 511.976562c29.832032-.144531 59.660157-1.15625 89.476563-3.03125v-207.871093h59.367187l7.171876-74.699219h-66.539063v-47.433594c0-10.476562 8.492187-18.96875 18.96875-18.96875h47.570313v-74.703125h-75.246094c-44.609375 0-80.769532 36.164063-80.769532 80.773438v60.332031h-43.46875v74.699219h43.46875zm0 0"
        fill="#fff"/>
    </svg>
  );
};

IconSocialMediaFacebookRegister.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaFacebookRegister.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaFacebookRegister;
