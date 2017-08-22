/**
 *  TopbarMobileMenu prints the menu content for authenticated user or
 * shows login actions for those who are not authenticated.
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser } from '../../util/data';
import { AvatarLarge, InlineTextButton, NamedLink, NotificationBadge } from '../../components';

import css from './TopbarMobileMenu.css';

const TopbarMobileMenu = props => {
  const {
    isAuthenticated,
    currentUserHasListings,
    currentUser,
    notificationCount,
    onLogout,
  } = props;

  const user = ensureCurrentUser(currentUser);

  if (!isAuthenticated) {
    const signup = (
      <NamedLink name="SignupPage" className={css.signupLink}>
        <FormattedMessage id="TopbarMobileMenu.signupLink" />
      </NamedLink>
    );

    const login = (
      <NamedLink name="LoginPage" className={css.loginLink}>
        <FormattedMessage id="TopbarMobileMenu.loginLink" />
      </NamedLink>
    );

    const signupOrLogin = (
      <span className={css.authenticationLinks}>
        <FormattedMessage id="TopbarMobileMenu.signupOrLogin" values={{ signup, login }} />
      </span>
    );
    return (
      <div className={css.root}>
        <div className={css.content}>
          <div className={css.authenticationGreeting}>
            <FormattedMessage
              id="TopbarMobileMenu.unauthorizedGreeting"
              values={{ lineBreak: <br />, signupOrLogin }}
            />
          </div>
        </div>
        <div className={css.footer}>
          <NamedLink className={css.createNewListingLink} name="NewListingPage">
            <FormattedMessage id="TopbarMobileMenu.newListingLink" />
          </NamedLink>
        </div>
      </div>
    );
  }

  const notificationCountBadge = notificationCount > 0
    ? <NotificationBadge className={css.notificationBadge} count={notificationCount} />
    : null;
  const inboxLink = (
    <NamedLink
      className={css.inbox}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <FormattedMessage id="TopbarMobileMenu.inboxLink" />
      {notificationCountBadge}
    </NamedLink>
  );

  const displayName = user.attributes.profile.displayName;

  return (
    <div className={css.root}>
      <AvatarLarge className={css.avatar} user={currentUser} />
      <div className={css.content}>
        <span className={css.greeting}>
          <FormattedMessage id="TopbarMobileMenu.greeting" values={{ displayName }} />
        </span>
        <InlineTextButton className={css.logoutButton} onClick={onLogout}>
          <FormattedMessage id="TopbarMobileMenu.logoutLink" />
        </InlineTextButton>
        {inboxLink}
      </div>
      <div className={css.footer}>
        <NamedLink className={css.createNewListingLink} name="NewListingPage">
          <FormattedMessage id="TopbarMobileMenu.newListingLink" />
        </NamedLink>
      </div>
    </div>
  );
};

TopbarMobileMenu.defaultProps = { currentUser: null, notificationCount: 0 };

const { bool, func, number } = PropTypes;

TopbarMobileMenu.propTypes = {
  isAuthenticated: bool.isRequired,
  currentUserHasListings: bool.isRequired,
  currentUser: propTypes.currentUser,
  notificationCount: number,
  onLogout: func.isRequired,
};

export default TopbarMobileMenu;
