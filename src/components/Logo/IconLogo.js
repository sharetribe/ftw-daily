import React from 'react';
import PropTypes from 'prop-types';
import logo from './Hypley.svg'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function IconLogo() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" width="100" height="130" />;

}

export default IconLogo;
