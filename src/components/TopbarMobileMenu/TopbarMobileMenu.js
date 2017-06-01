/**
 *  TopbarMobileMenu prints the menu content for authenticated user or
 * shows login actions for those who are not authenticated.
 */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Avatar, InlineButton, NamedLink } from '../../components';

import css from './TopbarMobileMenu.css';

const TopbarMobileMenu = props => {
  const { isAuthenticated, currentUserHasListings, firstName, lastName, onLogout } = props;

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

  const inboxLink = (
    <NamedLink
      className={css.inbox}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <FormattedMessage id="TopbarMobileMenu.inboxLink" />
    </NamedLink>
  );

  return (
    <div className={css.root}>
      <Avatar rootClassName={css.avatar} firstName={firstName} lastName={lastName} />
      <div className={css.content}>
        <span className={css.greeting}>
          <FormattedMessage id="TopbarMobileMenu.greeting" values={{ firstName }} />
        </span>
        <InlineButton className={css.logoutButton} onClick={onLogout}>
          <FormattedMessage id="TopbarMobileMenu.logoutLink" />
        </InlineButton>
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

TopbarMobileMenu.defaultProps = { firstName: '', lastName: '' };

const { bool, func, string } = PropTypes;

TopbarMobileMenu.propTypes = {
  isAuthenticated: bool.isRequired,
  currentUserHasListings: bool.isRequired,
  firstName: string,
  lastName: string,
  onLogout: func.isRequired,
};

export default TopbarMobileMenu;
