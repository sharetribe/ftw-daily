import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaSnapchat.css';

import snapchatIcon from './snapchat.svg';

const IconSocialMediaSnapchat = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return <img className={classes} alt="snapchat icon" src={snapchatIcon} />;
};

IconSocialMediaSnapchat.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaSnapchat.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaSnapchat;
