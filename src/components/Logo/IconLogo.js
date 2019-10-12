import React from 'react';
import PropTypes from 'prop-types';
import logoImg from './OC-svg.svg';

const IconLogo = props => {
  const { className } = props;

  return (
    /*<svg
      className={className}
      {...rest}
      width="73"
      height="25"
      viewBox="0 0 73 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      
      
    </svg>*/
    <img src={logoImg} className={className} alt="outdoorcoach logotyp"/>
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
