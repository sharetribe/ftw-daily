import React, { PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Avatar, NamedLink } from '../../components';

import logo from './images/saunatime-logo.png';
import css from './TopbarDesktop.css';

const TopbarDesktop = props => {
  const { className, rootClassName, currentUserHasListings, intl, isAuthenticated, name } = props;

  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className);

  // TODO This is just a placeholder
  const search = (
    <div className={css.searchLink}>
      <span className={css.search}>Search should be here</span>
    </div>
  );

  const inboxLink = isAuthenticated
    ? <NamedLink
        className={css.inboxLink}
        name="InboxPage"
        params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
      >
        <span className={css.inbox}><FormattedMessage id="TopbarDesktop.inbox" /></span>
      </NamedLink>
    : null;

  // TODO This is just a placeholder
  const profileMenu = isAuthenticated
    ? <div className={css.avatarLink}> <Avatar className={css.avatar} name={name} /></div>
    : null;

  const signupLink = isAuthenticated
    ? null
    : <NamedLink name="SignupPage" className={css.signupLink}>
        <span className={css.signup}><FormattedMessage id="TopbarDesktop.signup" /></span>
      </NamedLink>;

  const loginLink = isAuthenticated
    ? null
    : <NamedLink name="LoginPage" className={css.loginLink}>
        <span className={css.login}><FormattedMessage id="TopbarDesktop.login" /></span>
      </NamedLink>;

  return (
    <div className={classes}>
      <NamedLink className={css.logoLink} name="LandingPage">
        <img className={css.logo} src={logo} alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })} />
      </NamedLink>
      {search}
      <div className={css.spacer} />
      <NamedLink className={css.createListingLink} name="NewListingPage">
        <span className={css.createListing}><FormattedMessage id="TopbarDesktop.createListing" /></span>
      </NamedLink>
      {inboxLink}
      {profileMenu}
      {signupLink}
      {loginLink}
    </div>
  );
};

TopbarDesktop.defaultProps = { name: '', className: null, rootClassName: '' };

const { bool, string } = PropTypes;

TopbarDesktop.propTypes = {
  className: string,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  name: string,
  rootClassName: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(TopbarDesktop);
