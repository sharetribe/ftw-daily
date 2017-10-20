import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

import IconLogo from './IconLogo';
import LogoImage from './saunatime-logo.png';

const Logo = props => {
  const { className, format, ...rest } = props;

  if (format === 'desktop') {
    return <img className={className} src={LogoImage} alt={config.siteTitle} {...rest} />;
  }

  return <IconLogo className={className} {...rest} />;
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
