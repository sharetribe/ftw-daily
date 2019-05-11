import React from 'react';
import PropTypes from 'prop-types';
// import LogoImage from './BpoolFavicon.jpeg';

const IconLogo = props => {
  const { className, logoImage, ...rest } = props;

  return (
    <img src={logoImage}></img>
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
  logoImage: string
};

export default IconLogo;
