import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Avatar.css';

const Avatar = props => {
  const { className, firstName, lastName, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);

  const authorName = lastName ? `${firstName} ${lastName}` : firstName;
  const initials = lastName ? firstName.charAt(0) + lastName.charAt(0) : firstName.charAt(0);

  const placeHolderAvatar = (
    <div className={classes} title={authorName}>
      <span>{initials}</span>
    </div>
  );

  return placeHolderAvatar;
};

const { string } = PropTypes;

Avatar.defaultProps = {
  className: null,
  lastName: null,
  rootClassName: null,
};

Avatar.propTypes = {
  className: string,
  firstName: string.isRequired,
  lastName: string,
  rootClassName: string,
};

export default Avatar;

export const AvatarMedium = props => <Avatar rootClassName={css.mediumAvatar} {...props} />;
AvatarMedium.displayName = 'AvatarMedium';

export const AvatarLarge = props => <Avatar rootClassName={css.largeAvatar} {...props} />;
AvatarLarge.displayName = 'AvatarLarge';
