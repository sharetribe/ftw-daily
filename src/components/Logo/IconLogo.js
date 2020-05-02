import React from 'react';
import PropTypes from 'prop-types';
import LogoImage from './mobilelogo.png';

const IconLogo = props => {
  const { className } = props;

  return (
    <img src={LogoImage} className={className} alt="Image doesn't exist"/>
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
