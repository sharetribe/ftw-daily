import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config';
import LogoImage from './horse-deal-logo.png';
import css from './Logo.css';

const Logo = props => {
  const { className, format, ...rest } = props;
  const mobileClasses = classNames(css.logoMobile, className);

  return <img
    className={format === 'desktop' ? className : mobileClasses}
    src={LogoImage}
    alt={config.siteTitle}
    {...rest}
  />;
};

const { oneOf, string } = PropTypes;

Logo.defaultProps = {
  className: null,
  format: 'desktop',
};

Logo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
};

export default Logo;
