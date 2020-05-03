import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaYoutube.css';

const IconSocialMediaYoutube = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M204,369.75v-229.5L357,255L204,369.75z"/>
    </svg>
  );
};

IconSocialMediaYoutube.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaYoutube.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaYoutube;
