import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { truncate } from 'lodash';
import classNames from 'classnames';
import { AvatarLarge, NamedLink, InlineTextButton } from '../../components';
import { ensureUser, ensureCurrentUser } from '../../util/data';
import * as propTypes from '../../util/propTypes';

import css from './UserCard.css';

const BIO_COLLAPSED_LENGTH = 100;

const truncated = s => {
  return truncate(s, {
    length: BIO_COLLAPSED_LENGTH,

    // Allow truncated text end only in specific characters. This will
    // make the truncated text shorter than the length if the original
    // text has to be shortened and the substring ends in a separator.
    //
    // This ensures that the final text doesn't get cut in the middle
    // of a word.
    separator: /\s|,|\.|:|;/,
    omission: '…',
  });
};

class ExpandableBio extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }
  render() {
    const { expand } = this.state;
    const { bio } = this.props;
    const truncatedBio = truncated(bio);

    const handleShowMoreClick = () => {
      this.setState({ expand: true });
    };
    const showMore = (
      <InlineTextButton className={css.showMore} onClick={handleShowMoreClick}>
        <FormattedMessage id="UserCard.showFullBioLink" />
      </InlineTextButton>
    );
    return (
      <p className={css.bio}>
        {expand ? bio : truncatedBio}
        {bio !== truncatedBio && !expand ? showMore : null}
      </p>
    );
  }
}

ExpandableBio.propTypes = {
  bio: string.isRequired,
};

const UserCard = props => {
  const { rootClassName, className, user, currentUser } = props;
  const ensuredUser = ensureUser(user);
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const isCurrentUser =
    ensuredUser.id && ensuredCurrentUser.id && ensuredUser.id.uuid === ensuredCurrentUser.id.uuid;
  const { displayName, bio } = ensuredUser.attributes.profile;

  const hasBio = !!bio;
  const classes = classNames(rootClassName || css.root, className);
  const linkClasses = classNames(css.links, {
    [css.withBioMissingAbove]: !hasBio,
  });
  return (
    <div className={classes}>
      <AvatarLarge className={css.avatar} user={user} />
      <div className={css.info}>
        <h3 className={css.heading}>
          <FormattedMessage id="UserCard.heading" values={{ name: displayName }} />
        </h3>
        {hasBio ? <ExpandableBio bio={bio} /> : null}
        <p className={linkClasses}>
          {ensuredUser.id ? (
            <NamedLink name="ProfilePage" params={{ id: ensuredUser.id.uuid }}>
              <FormattedMessage id="UserCard.viewProfileLink" />
            </NamedLink>
          ) : null}
          {isCurrentUser ? <span className={css.linkSeparator}>•</span> : null}
          {isCurrentUser ? (
            <NamedLink name="ProfileSettingsPage">
              <FormattedMessage id="UserCard.editProfileLink" />
            </NamedLink>
          ) : null}
        </p>
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  rootClassName: null,
  className: null,
};

UserCard.propTypes = {
  rootClassName: string,
  className: string,
  user: propTypes.user,
  currentUser: propTypes.currentUser,
};

export default UserCard;
