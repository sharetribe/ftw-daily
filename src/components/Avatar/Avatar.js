import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ensureUser, userDisplayName, userAbbreviatedName } from '../../util/data';
import { ResponsiveImage, IconBannedUser, NamedLink } from '../../components/';

import css from './Avatar.css';

export const AvatarComponent = props => {
  const { rootClassName, className, user, disableProfileLink, intl } = props;
  const classes = classNames(rootClassName || css.root, className);
  const avatarUser = ensureUser(user);
  const isBannedUser = avatarUser.attributes.banned;

  const bannedUserDisplayName = intl.formatMessage({
    id: 'Avatar.bannedUserDisplayName',
  });
  const bannedUserAbbreviatedName = '';

  const displayName = userDisplayName(avatarUser, bannedUserDisplayName);
  const abbreviatedName = userAbbreviatedName(avatarUser, bannedUserAbbreviatedName);
  const rootProps = { className: classes, title: displayName };
  const linkProps = avatarUser.id
    ? { name: 'ProfilePage', params: { id: avatarUser.id.uuid } }
    : { name: 'ProfileBasePage' };
  const hasProfileImage = avatarUser.profileImage && avatarUser.profileImage.id;

  if (isBannedUser) {
    return (
      <div {...rootProps}>
        <IconBannedUser className={css.bannedUserIcon} />
      </div>
    );
  } else if (hasProfileImage && !disableProfileLink) {
    return (
      <NamedLink {...rootProps} {...linkProps}>
        <ResponsiveImage
          rootClassName={css.avatarImage}
          alt={displayName}
          image={avatarUser.profileImage}
          nameSet={[
            { name: 'square-xlarge2x', size: '1x' },
            { name: 'square-xlarge4x', size: '2x' },
          ]}
        />
      </NamedLink>
    );
  } else if (hasProfileImage) {
    return (
      <div {...rootProps}>
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
  } else if (!disableProfileLink) {
    // Placeholder avatar (initials)
    return (
      <NamedLink {...rootProps} {...linkProps}>
        <span className={css.initials}>{abbreviatedName}</span>
      </NamedLink>
    );
  } else {
    // Placeholder avatar (initials)
    return (
      <div {...rootProps}>
        <span className={css.initials}>{abbreviatedName}</span>
      </div>
    );
  }
};

AvatarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  user: null,
  disableProfileLink: false,
};

const { string, oneOfType, bool } = PropTypes;

AvatarComponent.propTypes = {
  rootClassName: string,
  className: string,
  user: oneOfType([propTypes.user, propTypes.currentUser]),

  disableProfileLink: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Avatar = injectIntl(AvatarComponent);

export default Avatar;

export const AvatarMedium = props => <Avatar rootClassName={css.mediumAvatar} {...props} />;
AvatarMedium.displayName = 'AvatarMedium';

export const AvatarLarge = props => <Avatar rootClassName={css.largeAvatar} {...props} />;
AvatarLarge.displayName = 'AvatarLarge';
