import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaYoutube.css';

import youtubeIcon from './youtube.svg';

const IconSocialMediaYoutube = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return <img className={classes} alt="youtube icon" src={youtubeIcon} />;
};

IconSocialMediaYoutube.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaYoutube.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaYoutube;
