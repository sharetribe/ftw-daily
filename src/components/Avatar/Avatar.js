import React, { PropTypes } from 'react';
import classNames from 'classnames';

import avatarPlaceholder from './images/wireframeAvatar.svg';
import css from './Avatar.css';

const Avatar = props => {
  const { className, name } = props;
  const classes = classNames(css.avatar, className);

  return <img className={classes} src={avatarPlaceholder} alt={name} />;
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
