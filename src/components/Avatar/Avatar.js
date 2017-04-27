import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Avatar.css';

const Avatar = props => {
  const { className, name } = props;

  // TODO hard coded placeholder image need to be changed to something else
  const avatarImageURL = 'http://placehold.it/44x44';
  const classes = classNames(css.avatar, className);

  return <img className={classes} src={avatarImageURL} alt={name} />;
};

const { string } = PropTypes;

Avatar.defaultProps = {
  className: null,
};

Avatar.propTypes = {
  className: string,
  name: string.isRequired,
};

export default Avatar;
