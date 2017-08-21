import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';

import css from './Avatar.css';

const Avatar = props => {
  const { rootClassName, className, user } = props;
  const classes = classNames(rootClassName || css.root, className);
  const { displayName, abbreviatedName } = user.profile;
  const placeHolderAvatar = (
    <div className={classes} title={displayName}>
      <span className={css.initials}>{abbreviatedName}</span>
    </div>
  );

  return placeHolderAvatar;
};

const { string } = PropTypes;

Avatar.defaultProps = {
  className: null,
  rootClassName: null,
};

Avatar.propTypes = {
  className: string,
  user: propTypes.user.isRequired,
  rootClassName: string,
};

export default Avatar;

export const AvatarMedium = props => <Avatar rootClassName={css.mediumAvatar} {...props} />;
AvatarMedium.displayName = 'AvatarMedium';

export const AvatarLarge = props => <Avatar rootClassName={css.largeAvatar} {...props} />;
AvatarLarge.displayName = 'AvatarLarge';
