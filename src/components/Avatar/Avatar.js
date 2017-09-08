import React, { PropTypes } from 'react';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ensureUser } from '../../util/data';
import { ResponsiveImage } from '../../components/';

import css from './Avatar.css';

const Avatar = props => {
  const { rootClassName, className, user } = props;
  const classes = classNames(rootClassName || css.root, className);
  const avatarUser = ensureUser(user);
  const { displayName, abbreviatedName } = avatarUser.attributes.profile;

  // TODO this is a temporary avatar fix for currentUser's profile data.
  // Avatar images should be included to all user's attributes in the future.
  if (avatarUser.profileImage && avatarUser.profileImage.id) {
    return (
      <div className={classes} title={displayName}>
        <ResponsiveImage
          rootClassName={css.avatarImage}
          alt={displayName}
          image={avatarUser.profileImage}
          nameSet={[
            { name: 'square-xlarge', size: '1x' },
            { name: 'square-xlarge2x', size: '2x' },
          ]}
        />
      </div>
    );

  } else {
    // Placeholder avatar (initials)
    return (
      <div className={classes} title={displayName}>
        <span className={css.initials}>{abbreviatedName}</span>
      </div>
    );
  }
};

const { string, oneOfType } = PropTypes;

Avatar.defaultProps = {
  className: null,
  rootClassName: null,
  user: null,
};

Avatar.propTypes = {
  rootClassName: string,
  className: string,
  user: oneOfType([propTypes.user, propTypes.currentUser]),
};

export default Avatar;

export const AvatarMedium = props => <Avatar rootClassName={css.mediumAvatar} {...props} />;
AvatarMedium.displayName = 'AvatarMedium';

export const AvatarLarge = props => <Avatar rootClassName={css.largeAvatar} {...props} />;
AvatarLarge.displayName = 'AvatarLarge';
