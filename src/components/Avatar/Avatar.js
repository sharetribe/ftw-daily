import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ensureUser, userDisplayName, userAbbreviatedName } from '../../util/data';
import { ResponsiveImage, IconBannedUser } from '../../components/';

import css from './Avatar.css';

export const AvatarComponent = props => {
  const { rootClassName, className, user, intl } = props;
  const classes = classNames(rootClassName || css.root, className);
  const avatarUser = ensureUser(user);
  const isBannedUser = avatarUser.attributes.banned;

  const bannedUserDisplayName = intl.formatMessage({
    id: 'Avatar.bannedUserDisplayName',
  });
  const bannedUserAbbreviatedName = '';

  const displayName = userDisplayName(avatarUser, bannedUserDisplayName);
  const abbreviatedName = userAbbreviatedName(avatarUser, bannedUserAbbreviatedName);

  if (avatarUser.profileImage && avatarUser.profileImage.id) {
    return (
      <div className={classes} title={displayName}>
        <ResponsiveImage
          rootClassName={css.avatarImage}
          alt={displayName}
          image={avatarUser.profileImage}
          nameSet={[
            { name: 'square-xlarge2x', size: '1x' },
            { name: 'square-xlarge4x', size: '2x' },
          ]}
        />
      </div>
    );
  } else if (isBannedUser) {
    return (
      <div className={classes} title={displayName}>
        <IconBannedUser className={css.bannedUserIcon} />
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

AvatarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  user: null,
};

AvatarComponent.propTypes = {
  rootClassName: string,
  className: string,
  user: oneOfType([propTypes.user, propTypes.currentUser]),

  // from injectIntl
  intl: intlShape.isRequired,
};

const Avatar = injectIntl(AvatarComponent);

export default Avatar;

export const AvatarMedium = props => <Avatar rootClassName={css.mediumAvatar} {...props} />;
AvatarMedium.displayName = 'AvatarMedium';

export const AvatarLarge = props => <Avatar rootClassName={css.largeAvatar} {...props} />;
AvatarLarge.displayName = 'AvatarLarge';
