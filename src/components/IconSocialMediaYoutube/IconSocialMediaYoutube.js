import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaYoutube.css';

import youtubeIcon from './youtube.svg';

const IconSocialMediaYoutube = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M10 0C0.172 0 0 0.874 0 7.7C0 14.526 0.172 15.4 10 15.4C19.828 15.4 20 14.526 20 7.7C20 0.874 19.828 0 10 0ZM13.205 8.034L8.715 10.13C8.322 10.312 8 10.108 8 9.674V5.726C8 5.293 8.322 5.088 8.715 5.27L13.205 7.366C13.598 7.55 13.598 7.85 13.205 8.034Z" />
    </svg>
  )
};

IconSocialMediaYoutube.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaYoutube.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaYoutube;
