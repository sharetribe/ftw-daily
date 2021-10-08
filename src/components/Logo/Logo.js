import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config';
import IconLogo from './IconLogo';

import MobileLogoImage from './cottagedays-logo-small.png';
import DesktopLogoImage from './cottagedays-logo.png';


import css from './Logo.module.css';

const Logo = props => {
  const { className, format, ...rest } = props;
  const isMobile = format !== 'desktop';
  const classes = classNames(className, { [css.logoMobile]: isMobile });
  const logoImage = isMobile ? MobileLogoImage : DesktopLogoImage;

  const mobileClasses = classNames(css.logoMobile, className);

  if (format === 'desktop') {
    return <img className={classes} src={logoImage} alt={config.siteTitle} {...rest} />;
  }

  return <IconLogo className={mobileClasses} {...rest} />;
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
